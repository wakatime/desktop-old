import os from 'os';

import Editor from './editor';

export default class Aptana extends Editor {
  public static getName(): string {
    return 'Aptana';
  }

  public get name(): string {
    return 'Aptana';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    return this.isDirectory(this.appDirectory());
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

  public appDirectory(): string {
    switch (os.platform()) {
      case 'win32':
        return '';
      case 'darwin':
        return '/Applications/AptanaStudio.app/Contents';
      default:
        return null;
    }
  }
}
