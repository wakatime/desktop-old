import os from 'os';

import Editor from './editor';

export default class TextMate extends Editor {
  private preferences: { [key: string]: string } = {};

  public static getName(): string {
    return 'TextMate';
  }

  public get name(): string {
    return 'TextMate';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    return this.isDirectory(this.appDirectory());
  }

  public async isPluginInstalled(): Promise<boolean> {
    return this.isDirectory(`${this.pluginsDirectory()}/WakaTime.tmplugin`);
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
        return '';
      case 'darwin':
        return '/Applications/TextMate.app/Contents';
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
        return `${os.homedir()}/Library/Application Support/TextMate/PlugIns`;
      case 'linux':
        return '';
      default:
        return null;
    }
  }
}
