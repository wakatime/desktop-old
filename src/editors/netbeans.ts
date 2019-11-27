import os from 'os';

import Editor from './editor';

export default class Netbeans extends Editor {
  public static getName(): string {
    return 'Netbeans';
  }

  public get name(): string {
    return 'Netbeans';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    return this.isDirectory(this.appDirectory());
  }

  public async isPluginInstalled(): Promise<boolean> {
    return this.isFileSync(`${this.pluginsDirectory()}/org-wakatime-netbeans-plugin.jar`);
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
        return '/Applications/NetBeans.app/Contents';
      case 'linux':
        return null;
      default:
        return null;
    }
  }

  private pluginsDirectory(): string {
    let directory = '';
    switch (os.platform()) {
      case 'win32': {
        return '';
      }
      case 'darwin':
        this.pluginsDirectories().some(pluginPath => {
          if (this.isDirectorySync(pluginPath)) {
            directory = pluginPath;
            return true;
          }
          return false;
        });
        return directory;
      case 'linux':
        return '';
      default:
        return null;
    }
  }

  private pluginsDirectories(): string[] {
    const pathsToCheck = ['11.0', '10.0', '9.0'];
    switch (os.platform()) {
      case 'win32': {
        return [''];
      }
      case 'darwin':
        return pathsToCheck.map(
          check => `${os.homedir()}/Library/Application Support/NetBeans/${check}/modules`,
        );
      case 'linux':
        return [''];
      default:
        return null;
    }
  }
}
