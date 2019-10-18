import os from 'os';
import path from 'path';

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
      return await this.isBinary(this.binary);      
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
    return Promise.reject(new Error('method not implemented'));
  }

  public async uninstallPlugin(): Promise<void> {
    return Promise.reject(new Error('method not implemented'));
  }

  public async isBinary(binary: string): Promise<boolean> {
    return await this.commandExists.exists(binary);
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
