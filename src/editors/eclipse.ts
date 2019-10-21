import os from 'os';
import path from 'path';

import Editor from './editor';

export default class Eclipse extends Editor {
  public static getName(): string {
    return 'Eclipse';
  }

  public get name(): string {
    return 'Eclipse';
  }

  public get icon(): string {
    return '';
  }

  public get versions(): Array<string> {
    return ['2019-12', '2019-09', '2019-06', '2019-03', '2018-12', '2018-09'];
  }

  public async isEditorInstalled(): Promise<boolean> {
    return this.isDirectorySync(this.appDirectory());
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
        // find a way of recursively find Eclipse.app folder
        return this.directory(this.appDirectories());
      default:
        return null;
    }
  }

  private directory(directories: Array<string>): string {
    let directory = '';
    directories.some(pluginPath => {
      if (this.isDirectorySync(pluginPath)) {
        directory = pluginPath;
        return true;
      }
      return false;
    });
    return directory;
  }

  private appDirectories(): string[] {
    switch (os.platform()) {
      case 'win32': {
        return [''];
      }
      case 'darwin':
        return this.versions.map(check => `${os.homedir()}/eclipse/java-${check}`);
      case 'linux':
        return [''];
      default:
        return null;
    }
  }
}
