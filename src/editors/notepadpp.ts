import os from 'os';

import Editor from './editor';

export default class Notepadpp extends Editor {
  public static getName(): string {
    return 'Notepadpp';
  }

  public get name(): string {
    return 'Notepadpp';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    return this.isDirectory(this.appDirectory());
  }

  public async isPluginInstalled(): Promise<boolean> {
    return this.isFile(this.pluginsDirectory());
  }

  public async installPlugin(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async uninstallPlugin(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private appDirectory(): string {
    const is64bit: string | boolean = process.arch === 'x64' || process.env.PROCESSOR_ARCHITEW6432;
    switch (os.platform()) {
      case 'win32':
        if (is64bit) {
          return 'C:\\Program Files\\Notepad++';
        }
        return 'C:\\Program Files(x86)\\Notepad++';
      case 'darwin':
        return '';
      case 'linux':
        return '';
      default:
        return null;
    }
  }

  private pluginsDirectory(): string {
    switch (os.platform()) {
      case 'win32': {
        return '';
      }
      case 'darwin':
        return '';
      case 'linux':
        return '';
      default:
        return null;
    }
  }
}
