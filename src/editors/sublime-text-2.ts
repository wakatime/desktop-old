import os from 'os';
import path from 'path';

import Editor from './editor';

export default class SublimeText2 extends Editor {
  public static getName(): string {
    return 'Sublime Text 2';
  }

  public get name(): string {
    return 'Sublime Text 2';
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
    return Promise.reject(new Error('method not implemented'));
  }

  public async uninstallPlugin(): Promise<void> {
    return Promise.reject(new Error('method not implemented'));
  }

  private appDirectory(): string {
    switch (os.platform()) {
      case 'win32':
        return '';
      case 'darwin':
        return '/Applications/Sublime Text 2.app/Contents';
      default:
        return null;
    }
  }

  private pluginsDirectory(): string {
    switch (os.platform()) {
      case 'win32': {
        const is64bit =
          process.arch === 'x64' || process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432');
        if (is64bit) return '';
        return '';
      }
      case 'darwin':
        return path.join(os.homedir(), 'Library/Application Support/Sublime Text 2/Packages');
      case 'linux':
        return '';
      default:
        return null;
    }
  }
}
