import os from 'os';

import Editor from './editor';
import { installJetbrainsPlugin, unInstallJetbrainsPlugin } from '../utils/jetbrains';

export default class AppCode extends Editor {
  public static getName(): string {
    return 'IntelliJ IDEA';
  }

  public get name(): string {
    return 'IntelliJ IDEA';
  }

  public get icon(): string {
    return '';
  }

  public get binaries(): string[] {
    return ['intellij'];
  }

  public async isEditorInstalled(): Promise<boolean> {
    return (
      (await this.isDirectory(this.appDirectory()[0])) ||
      (await this.isDirectory(this.appDirectory()[1]))
    );
  }

  public async isPluginInstalled(): Promise<boolean> {
    return await this.isFileSync(`${this.pluginsDirectory()}/WakaTime.jar`);
  }

  public async installPlugin(): Promise<void> {
    installJetbrainsPlugin(this.pluginsDirectory()[0]);
  }

  public async uninstallPlugin(): Promise<void> {
    unInstallJetbrainsPlugin(this.pluginsDirectory()[0]);
  }

  private appDirectory(): string[] {
    switch (os.platform()) {
      case 'win32':
        return [''];
      case 'darwin':
        return [
          '/Applications/IntelliJ IDEA CE.app/Contents', // This one is Community edition
          '/Applications/IntelliJ IDEA.app/Contents', // This one is Ultimate edition
        ];
      case 'linux':
        return [''];
      default:
        return [''];
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
    const pathsToCheck = ['2019.2', '2019.1', '2018.2', '2018.1'];
    let intelliJIdea = [];
    let IdeaIC = [];
    switch (os.platform()) {
      case 'win32': {
        return [''];
      }
      case 'darwin':
        intelliJIdea = pathsToCheck.map(
          path => `${os.homedir()}/Library/Application Support/IntelliJIdea${path}/WakaTime.jar`,
        );
        IdeaIC = pathsToCheck.map(
          path => `${os.homedir()}/Library/Application Support/IdeaIC${path}/WakaTime.jar`,
        );
        return intelliJIdea.concat(IdeaIC);
      case 'linux':
        return [''];
      default:
        return null;
    }
  }
}
