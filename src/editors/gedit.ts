import os from 'os';
import path from 'path';

import Editor from './editor';
import { CommandExists } from '../lib/command-exists';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export default class Gedit extends Editor {
  private commandExists = new CommandExists();

  public static getName(): string {
    return 'Gedit';
  }

  public get name(): string {
    return 'Gedit';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    if (await this.isDirectory(this.appDirectory())) return true;

    const list = await this.brewList();
    return list.includes('gedit');
  }

  public async isPluginInstalled(): Promise<boolean> {
    return this.isDirectory(this.pluginsDirectory());
  }

  public async installPlugin(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async uninstallPlugin(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async isHomebrewInstalled(): Promise<boolean> {
    return this.commandExists.exists('brew');
  }

  public async brewList(): Promise<string> {
    if (await this.isHomebrewInstalled()) {
      const { stdout, stderr } = await exec('brew list');
      if (stderr) return Promise.reject(new Error(stderr));

      return stdout;
    }

    return '';
  }

  public pluginsDirectory(): string {
    switch (os.platform()) {
      case 'win32': {
        const is64bit = process.arch === 'x64' || process.env.PROCESSOR_ARCHITEW6432;
        if (is64bit) {
          return '';
        }
        return '';
      }
      case 'darwin': {
        return path.join(os.homedir(), '.local/share/gedit/plugins/gedit_wakatime');
      }
      case 'linux':
        return '';
      default:
        return null;
    }
  }

  public appDirectory(): string {
    switch (os.platform()) {
      case 'win32':
        return '';
      case 'darwin':
        return '/Applications/gedit.app/Contents';
      default:
        return null;
    }
  }
}
