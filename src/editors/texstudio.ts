import os from 'os';
import fs from 'fs';
import path from 'path';
import request from 'request';

import Editor from './editor';

const python = require('child_process');

export default class TeXstudio extends Editor {
  public static getName(): string {
    return 'TeXstudio';
  }

  public get name(): string {
    return 'TeXstudio';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    return this.isDirectory(this.appDirectory());
  }

  public async isPluginInstalled(): Promise<boolean> {
    return this.findMacroFile() !== '';
  }

  public async installPlugin(): Promise<void> {
    let temp = path.join(os.tmpdir(), 'WakaTime', 'texstudio');

    // Create the temp folder first if this does not exists yet
    fs.mkdirSync(temp, { recursive: true });

    temp = path.join(temp, 'install.py');
    const file = fs.createWriteStream(temp);

    await new Promise((resolve, reject) => {
      request({
        uri: 'https://raw.githubusercontent.com/wakatime/texstudio-wakatime/master/install.py',
        gzip: true,
      })
        .pipe(file)
        .on('finish', async () => {
          python.spawn('python', [temp]);
          let output = '';
          python.stdout.on('data', data => {
            output += data;
          });
          python.on('close', code => {
            if (code !== 0) {
              console.error(code);
            }
          });
          console.log(output);
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
    try {
      const macrofile = this.findMacroFile();
      if (macrofile !== '') {
        fs.unlinkSync(macrofile);
      }
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject();
    }
  }

  private appDirectory(): string {
    switch (os.platform()) {
      case 'win32':
        return null;
      case 'darwin':
        return '/Applications/texstudio.app/Contents';
      case 'linux':
        return null;
      default:
        return null;
    }
  }

  public pluginsDirectory(): string {
    switch (os.platform()) {
      case 'win32':
        return path.join(os.homedir(), 'APPDATA', 'texstudio', 'macro');
      default:
        return path.join(os.homedir(), '.config', 'texstudio', 'macro');
    }
  }

  private findMacroFile(): string {
    let macrofile = '';
    fs.readdirSync(this.pluginsDirectory(), { withFileTypes: true })
      .filter(dirent => !dirent.isDirectory())
      .map(dirent => dirent.name)
      .some(file => {
        const fileContent = fs.readFileSync(path.join(this.pluginsDirectory(), file), 'utf8');
        const json = this.readJsonContent(fileContent);
        if (json !== '' && json.name === 'WakaTime') {
          macrofile = file;
          return true;
        }
        return false;
      });
    return macrofile;
  }

  private readJsonContent(str: string): any {
    try {
      return JSON.parse(str);
    } catch {
      return '';
    }
  }
}
