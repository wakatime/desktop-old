import os from 'os';
import path from 'path';

import Editor from './editor';

export default class SqlServerManagementStudio extends Editor {
  private versions: { [id: number]: number } = {
    110: 2012,
    120: 2014,
    130: 16,
    140: 17,
    150: 18,
  };

  public static getName(): string {
    return 'Sql Server Management Studio';
  }

  public get name(): string {
    return 'Sql Server Management Studio';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    return this.appDirectory().some(directory => {
      return this.isDirectorySync(directory);
    });
  }

  public async isPluginInstalled(): Promise<boolean> {
    return this.pluginsDirectory().some(directory => {
      return this.isDirectorySync(path.join(directory, 'WakaTime'));
    });
  }

  public async installPlugin(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async uninstallPlugin(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private appDirectory(): string[] {
    let directories: string[];
    switch (os.platform()) {
      case 'win32':
        directories = Object.keys(this.versions).map(
          check =>
            `C:\\Program Files (x86)\\Microsoft SQL Server\\${check}\\Tools\\Binn\\ManagementStudio`,
        );
        return directories;
      default:
        return [''];
    }
  }

  private pluginsDirectory(): string[] {
    let directories: string[];
    switch (os.platform()) {
      case 'win32':
        directories = Object.keys(this.versions).map(
          check =>
            `C:\\Program Files (x86)\\Microsoft SQL Server\\${check}\\Tools\\Binn\\ManagementStudio\\Extensions`,
        );
        return directories;
      default:
        return [''];
    }
  }
}
