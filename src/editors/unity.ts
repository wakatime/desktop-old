import os from 'os';

import Editor from './editor';

export default class Unity extends Editor {
  public static getName(): string {
    return 'Unity';
  }

  public get name(): string {
    return 'Unity';
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

  private appDirectory(): string {
    switch (os.platform()) {
      case 'win32':
        return 'C:\\Program Files\\Unity\\Editor';
      case 'darwin':
        return '/Applications/Unity/Unity.app/Contents';
      case 'linux':
        return '/opt/Unity/Editor/Unity';
      default:
        return null;
    }
  }
}
