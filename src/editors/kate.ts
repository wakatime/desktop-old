import os from 'os';

import Editor from './editor';

export default class Kate extends Editor {
  public static getName(): string {
    return 'Kate';
  }

  public get name(): string {
    return 'Kate';
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
    switch (os.platform()) {
      case 'win32':
        return null;
      case 'darwin':
        return '/Applications/Kate.app/Contents';
      case 'linux':
        return null;
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
        // return "/Applications/kate.app/Contents/PlugIns";
        return '/opt/local/lib/plugins/ktexteditor/ktexteditor_wakatime.so';
      case 'linux':
        return '';
      default:
        return null;
    }
  }
}
