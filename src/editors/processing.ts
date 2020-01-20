import { Extract } from 'unzipper';
import os from 'os';
import fs from 'fs';
import path from 'path';
import request from 'request';

import Editor from './editor';

export default class Processing extends Editor {
  private preferences: { [key: string]: string } = {};

  constructor() {
    super();
    this.readPreferences();
  }

  public static getName(): string {
    return 'Processing';
  }

  public get name(): string {
    return 'Processing';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    if (this.isDirectorySync(this.appDirectory())) return true;

    return this.isDirectorySync(this.getSketchbookPathThree());
  }

  public async isPluginInstalled(): Promise<boolean> {
    return this.isDirectorySync(path.join(this.pluginsDirectory(), 'WakatimeTool'));
  }

  public async installPlugin(): Promise<void> {
    let temp = path.join(os.tmpdir(), 'WakaTime', 'processing');

    // Create the temp folder first if this does not exists yet
    fs.mkdirSync(temp, { recursive: true });

    temp = path.join(temp, 'processing-wakatime-deploy.zip');

    const file = fs.createWriteStream(temp);

    await new Promise((resolve, reject) => {
      request({
        uri:
          'https://github.com/devgianlu/processing-wakatime/releases/latest/download/processing-wakatime-deploy.zip',
        gzip: true,
      })
        .pipe(file)
        .on('finish', async () => {
          const pluginsDirectory = this.pluginsDirectory();
          const stream2 = await fs.createReadStream(temp);
          await stream2.pipe(Extract({ path: pluginsDirectory })).on('close', () => {
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
    const pluginPath = path.join(this.pluginsDirectory(), 'WakatimeTool');
    await fs.rmdirSync(pluginPath);
    return Promise.resolve();
  }

  private appDirectory(): string {
    switch (os.platform()) {
      case 'win32':
        return '';
      case 'darwin':
        return '/Applications/Processing.app/Contents';
      default:
        return null;
    }
  }

  private readPreferences(): void {
    switch (os.platform()) {
      case 'win32':
        break;
      case 'darwin': {
        const file = path.join(os.homedir(), 'Library/Processing/preferences.txt');
        if (this.fileExistsSync(file)) {
          const data = fs.readFileSync(file, { encoding: 'utf8' });
          if (data) {
            data.split(/\r?\n/).forEach(line => {
              const split = line.split('=');
              this.preferences[split[0]] = split[1];
            });
          }
        }
        break;
      }
      default:
        break;
    }
  }

  private getSketchbookPathThree(): string {
    switch (os.platform()) {
      case 'win32':
        return '';
      case 'darwin': {
        const defaultDirectory = path.join(os.homedir(), 'Documents/Processing');
        return this.preferences.hasOwnProperty('sketchbook.path.three')
          ? this.preferences['sketchbook.path.three']
          : defaultDirectory;
      }
      default:
        return null;
    }
  }

  private pluginsDirectory(): string {
    switch (os.platform()) {
      case 'win32': {
        const is64bit = process.arch === 'x64' || process.env.PROCESSOR_ARCHITEW6432;
        if (is64bit) {
          return '';
        }
        return '';
      }
      case 'darwin':
        return path.join(this.getSketchbookPathThree(), 'tools');
      case 'linux':
        return '';
      default:
        return null;
    }
  }
}
