import os from 'os';

import Editor from './editor';
import { installJetbrainsPlugin, unInstallJetbrainsPlugin } from '../utils/jetbrains';

export default class WebStorm extends Editor {
  public static getName(): string {
    return 'WebStorm';
  }

  public get name(): string {
    return 'WebStorm';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    return this.isDirectory(this.appDirectory());
  }

  public async isPluginInstalled(): Promise<boolean> {
    return this.isFileSync(`${this.pluginsDirectory()}/WakaTime.jar`);
  }

  public async installPlugin(): Promise<void> {
    installJetbrainsPlugin(this.pluginsDirectory());
  }

  public async uninstallPlugin(): Promise<void> {
    unInstallJetbrainsPlugin(this.pluginsDirectory());
  }

  private appDirectory(): string {
    let directory = '';
    let pathsToCheck = ['2019.2', '2019.1', '2018.2', '2018.1'];
    switch (os.platform()) {
      case 'win32':
        pathsToCheck = pathsToCheck.map(check => `${os.homedir()}\\.WebStorm${check}`);
        pathsToCheck.some(pluginPath => {
          if (this.isDirectorySync(pluginPath)) {
            directory = pluginPath;
            return true;
          }
          return false;
        });
        return directory;
      case 'darwin':
        return '/Applications/WebStorm.app/Contents';
      case 'linux':
        return null;
      default:
        return null;
    }
  }

  private pluginsDirectory(): string {
    let directory = '';
    switch (os.platform()) {
      case 'win32':
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
    const pathsToCheck = ['2019.2', '2019.1', '2018.2', '2018.1'];
    switch (os.platform()) {
      case 'win32': {
        return pathsToCheck.map(check => `${os.homedir()}\\.WebStorm${check}\\config\\plugins`);
      }
      case 'darwin':
        return pathsToCheck.map(
          check => `${os.homedir()}/Library/Application Support/WebStorm${check}`,
        );
      case 'linux':
        return [''];
      default:
        return null;
    }
  }
}
