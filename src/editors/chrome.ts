import os from 'os';

import Editor from './editor';

export default class Chrome extends Editor {
  public static getName(): string {
    return 'Google Chrome';
  }

  public get name(): string {
    return 'Google Chrome';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    return await this.isDirectory(this.appDirectory());
  }

  public async isPluginInstalled(): Promise<boolean> {
    throw new Error('Method not implemented.');
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
        return '/Applications/Google Chrome.app/Contents';
      default:
        return null;
    }
  }
}
