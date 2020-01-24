import { Extract } from 'unzipper';
import os from 'os';
import path from 'path';
import fs from 'fs';
import request from 'request';

import Editor from './editor';

export default class SublimeText3 extends Editor {
  public static getName(): string {
    return 'Sublime Text 3';
  }

  public get name(): string {
    return 'Sublime Text 3';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    return this.isDirectorySync(this.appDirectory());
  }

  public async isPluginInstalled(): Promise<boolean> {
    return this.isDirectorySync(path.join(this.pluginsDirectory(), 'WakaTime'));
  }

  public async installPlugin(): Promise<void> {
    let temp = path.join(os.tmpdir(), 'WakaTime', 'sublime');

    // Create the temp folder first if this does not exists yet
    fs.mkdirSync(temp, { recursive: true });

    temp = path.join(temp, 'sublime-wakatime-master.zip');

    const file = fs.createWriteStream(temp);

    await new Promise((resolve, reject) => {
      request({
        uri: 'https://codeload.github.com/wakatime/sublime-wakatime/zip/master',
        gzip: true,
      })
        .pipe(file)
        .on('finish', async () => {
          const pluginsDirectory = this.pluginsDirectory();
          const stream2 = await fs.createReadStream(temp);
          const extracted = path.join(os.tmpdir(), 'WakaTime', 'sublime', 'zip');

          fs.mkdirSync(extracted, { recursive: true });

          await stream2.pipe(Extract({ path: extracted })).on('close', () => {
            fs.renameSync(
              path.join(extracted, 'sublime-wakatime-master'),
              path.join(pluginsDirectory, 'WakaTime'),
            );
            fs.unlinkSync(temp);
            resolve();
          });
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
    const pluginPath = path.join(this.pluginsDirectory(), 'WakaTime');
    await fs.rmdirSync(pluginPath);
    return Promise.resolve();
  }

  private appDirectory(): string {
    switch (os.platform()) {
      case 'win32':
        return '';
      case 'darwin':
        return '/Applications/Sublime Text.app/Contents';
      default:
        return null;
    }
  }

  private pluginsDirectory(): string {
    switch (os.platform()) {
      case 'win32': {
        const is64bit = process.arch === 'x64' || process.env.PROCESSOR_ARCHITEW6432;
        if (is64bit) return '';
        return '';
      }
      case 'darwin':
        return path.join(os.homedir(), 'Library/Application Support/Sublime Text 3/Packages');
      case 'linux':
      default:
        return '';
    }
  }
}
