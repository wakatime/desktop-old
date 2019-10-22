import os from 'os';
import path from 'path';
import fs from 'fs';
import request from 'request';

import Editor from './editor';

export default class Eclipse extends Editor {
  public static getName(): string {
    return 'Eclipse';
  }

  public get name(): string {
    return 'Eclipse';
  }

  public get icon(): string {
    return '';
  }

  public get versions(): Array<string> {
    return ['2019-12', '2019-09', '2019-06', '2019-03', '2018-12', '2018-09'];
  }

  public get pluginVersion(): string {
    return 'com.wakatime.eclipse.plugin_3.0.3.jar';
  }

  public async isEditorInstalled(): Promise<boolean> {
    return this.isDirectorySync(this.appDirectory());
  }

  public async isPluginInstalled(): Promise<boolean> {
    return this.isFileSync(`${os.homedir()}/.p2/pool/plugins/${this.pluginVersion}`);
  }

  public async installPlugin(): Promise<void> {
    let temp = path.join(os.homedir(), '/.p2/pool/plugins/');

    // Create the temp folder first if this does not exists yet
    fs.mkdirSync(temp, { recursive: true });

    temp = path.join(temp, this.pluginVersion);

    const file = fs.createWriteStream(temp);

    await new Promise((resolve, reject) => {
      request({
        uri: `https://github.com/wakatime/eclipse-wakatime/raw/master/update-site/plugins/${this.pluginVersion}`,
      })
        .pipe(file)
        .on('finish', async () => {
          resolve();
        })
        .on('error', (err: any) => {
          console.error(err);
          reject(err);
        });
    }).catch(err => {
      console.error(err);
    });
  }

  public async uninstallPlugin(): Promise<void> {
    try {
      fs.unlinkSync(`${os.homedir()}/.p2/pool/plugins/${this.pluginVersion}`);
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject();
    }
  }

  private appDirectory(): string {
    switch (os.platform()) {
      case 'win32':
        return '';
      case 'darwin':
        // find a way of recursively find Eclipse.app folder
        return this.directory(this.appDirectories());
      default:
        return null;
    }
  }

  private directory(directories: Array<string>): string {
    let directory = '';
    directories.some(pluginPath => {
      if (this.isDirectorySync(pluginPath)) {
        directory = pluginPath;
        return true;
      }
      return false;
    });
    return directory;
  }

  private appDirectories(): string[] {
    switch (os.platform()) {
      case 'win32': {
        return [''];
      }
      case 'darwin':
        return this.versions.map(check => `${os.homedir()}/eclipse/java-${check}`);
      case 'linux':
        return [''];
      default:
        return null;
    }
  }
}
