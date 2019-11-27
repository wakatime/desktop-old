import os from 'os';
import fs from 'fs';
import path from 'path';
import request from 'request';

import Editor from './editor';
import { CommandExists } from '../lib/command-exists';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export default class Eric extends Editor {
  private commandExists = new CommandExists();

  public static getName(): string {
    return 'Eric';
  }

  public get name(): string {
    return 'Eric';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    try {
      const list = await this.pipList();
      return list.includes('eric-ide');
    } catch (err) {
      return false;
    }
  }

  public async isPluginInstalled(): Promise<boolean> {
    try {
      return this.pluginsDirectory().some(directory => {
        const pluginPath = path.join(directory, 'PluginWakaTime.py');
        return this.fileExistsSync(pluginPath);
      });
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async installPlugin(): Promise<void> {
    let temp = path.join(os.tmpdir(), 'WakaTime', 'eric');

    // Create the temp folder first if this does not exists yet
    fs.mkdirSync(temp, { recursive: true });

    temp = path.join(temp, 'PluginWakaTime.py');
    const file = fs.createWriteStream(temp);

    await new Promise((resolve, reject) => {
      request({
        uri: 'https://raw.githubusercontent.com/wakatime/eric6-wakatime/master/PluginWakaTime.py',
        gzip: true,
      })
        .pipe(file)
        .on('finish', async () => {
          const pluginsDirectories = this.pluginsDirectory();
          pluginsDirectories.forEach(async directory => {
            const fileStream = fs.createWriteStream(path.join(directory, 'PluginWakaTime.py'));
            const stream2 = await fs.createReadStream(temp);
            await stream2.pipe(fileStream);
          });
          fs.unlinkSync(temp);
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
    this.pluginsDirectory().forEach(async directory => {
      const pluginPath = path.join(directory, 'PluginWakaTime.py');
      await fs.unlinkSync(pluginPath);
    });
    return Promise.resolve();
  }

  public async isPipInstalled(): Promise<boolean> {
    return this.commandExists.exists('pip');
  }

  public async pipList(): Promise<string> {
    if (await this.isPipInstalled()) {
      const { stdout, stderr } = await exec('pip list');
      if (stderr) return Promise.reject(new Error(stderr));

      return stdout;
    }

    return '';
  }

  public pluginsDirectory(): string[] {
    switch (os.platform()) {
      case 'win32':
        return [
          path.join(os.homedir(), '_pymakr', 'eric6plugins'),
          path.join(os.homedir(), '_eric6', 'eric6plugins'),
        ];
      default:
        return [
          path.join(os.homedir(), '.pymakr', 'eric6plugins'),
          path.join(os.homedir(), '.eric6', 'eric6plugins'),
        ];
    }
  }
}
