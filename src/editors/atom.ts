import { Extract } from 'unzipper';
import os from 'os';
import path from 'path';
import fs from 'fs';
import request from 'request';

import { CommandExists } from '../lib/command-exists';
import Editor from './editor';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export default class Atom extends Editor {
  private commandExists = new CommandExists();

  public static getName(): string {
    return 'Atom';
  }

  public get name(): string {
    return 'Atom';
  }

  public get icon(): string {
    return '';
  }

  public get binary(): string {
    return 'atom';
  }

  public async isEditorInstalled(): Promise<boolean> {
    try {
      return (await this.isBinary(this.binary)) || this.isDirectorySync(this.appDirectory());
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async isPluginInstalled(): Promise<boolean> {
    if (await this.isDirectory(path.join(this.pluginsDirectory(), 'wakatime'))) return true;

    try {
      return await this.apm();
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async installPlugin(): Promise<void> {
    let temp = path.join(os.tmpdir(), 'WakaTime', 'atom');

    // Create the temp folder first if this does not exists yet
    fs.mkdirSync(temp, { recursive: true });

    temp = path.join(temp, 'atom-wakatime-master.zip');

    const file = fs.createWriteStream(temp);

    await new Promise((resolve, reject) => {
      request({
        uri: 'https://github.com/wakatime/atom-wakatime/archive/v7.1.1.zip',
        gzip: true,
      })
        .pipe(file)
        .on('finish', async () => {
          // temp directory where the pluging content is going to be extracted
          const extracted = path.join(os.tmpdir(), 'WakaTime', 'atom', 'zip');
          fs.mkdirSync(extracted, { recursive: true });

          const pluginsDirectory = this.pluginsDirectory();
          const stream2 = await fs.createReadStream(temp);
          await stream2.pipe(Extract({ path: extracted })).on('close', async () => {
            fs.renameSync(
              path.join(extracted, 'atom-wakatime-7.1.1'),
              path.join(pluginsDirectory, 'wakatime'),
            );

            // Run the packages installation
            await exec(`npm i --prefix ${path.join(pluginsDirectory, 'wakatime')}`);

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
    const pluginPath = path.join(this.pluginsDirectory(), 'wakatime');
    await fs.rmdirSync(pluginPath);
    return Promise.resolve();
  }

  public async isBinary(binary: string): Promise<boolean> {
    return this.commandExists.exists(binary);
  }

  private appDirectory(): string {
    switch (os.platform()) {
      case 'win32':
        return null;
      case 'darwin':
        return '/Applications/Atom.app/Contents';
      case 'linux':
        return null;
      default:
        return null;
    }
  }

  public pluginsDirectory(): string {
    switch (os.platform()) {
      case 'win32': {
        const is64bit: string | boolean =
          process.arch === 'x64' || process.env.PROCESSOR_ARCHITEW6432;
        if (is64bit) {
          return '';
        }
        return '';
      }
      case 'darwin':
        return path.join(os.homedir(), '.atom/packages');
      case 'linux':
        return '';
      default:
        return null;
    }
  }

  public async apm(): Promise<boolean> {
    const { stdout, stderr } = await exec('apm list -p -i -j');
    if (stderr) return Promise.reject(new Error(stderr));

    const json = JSON.parse(stdout);
    const obj = json.user.find(n => n.name === 'wakatime');
    return Promise.resolve(obj !== undefined);
  }
}
