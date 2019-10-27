import os from 'os';

import Editor from './editor';

const readdirp = require('readdirp');

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
    switch (os.platform()) {
      case 'win32': {
        return Object.keys(this.versions)
          .map(v => this.versions[v])
          .map(
            check =>
              `C:\\Program Files (x86)\\Microsoft SQL Server\\${check}\\Tools\\Binn\\ManagementStudio`,
          )
          .some(directory => {
            const settings = {
              root: directory,
              type: 'files',
              fileFilter: ['WakaTime.dll'],
            };
            return this.isFileWindows(settings);
          });
      }
      case 'darwin':
      case 'linux':
      default:
        return false;
    }
  }

  public async installPlugin(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async uninstallPlugin(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private isFileWindows(settings: { root: string; type: string; fileFilter: string[] }): boolean {
    const filePaths: string[] = [];
    readdirp(
      settings,
      function(fileInfo) {
        filePaths.push(fileInfo.fullPath);
      },
      function(err, _res) {
        if (err) return false;
      },
    );
    return filePaths.length > 0;
  }

  private appDirectory(): string[] {
    let directories: string[];
    switch (os.platform()) {
      case 'win32':
        directories = Object.keys(this.versions)
          .map(v => this.versions[v])
          .map(
            check =>
              `C:\\Program Files (x86)\\Microsoft SQL Server\\${check}\\Tools\\Binn\\ManagementStudio`,
          );
        return directories;
      default:
        return [''];
    }
  }
}
