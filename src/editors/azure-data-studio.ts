import os from 'os';
import Editor from './editor';

export default class AzureDataStudio extends Editor {
  public static getName(): string {
    return 'Azure Data Studio';
  }

  public get name(): string {
    return 'Azure Data Studio';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    try {
      return this.isDirectorySync(this.appDirectory());
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async isPluginInstalled(): Promise<boolean> {
    // At this time there's no way of listing installed extensions via command line
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
        return `${os.homedir()}\\AppData\\Local\\Programs\\Azure Data Studio`;
      case 'darwin':
        return '/Applications/Azure Data Studio.app/Contents';
      default:
        return null;
    }
  }
}
