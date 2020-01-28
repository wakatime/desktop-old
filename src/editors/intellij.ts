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
    try {
      return this.appDirectory().some(directory => {
        return this.isDirectorySync(directory);
      });
    } catch (err) {
      console.error(err);
      return false;
    }
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

  private appDirectory(): string[] {
    const directories = [];
    const pathsToCheck = ['2019.2', '2019.1', '2018.2', '2018.1'];
    let intelliJIdea = [];
    let IdeaIC = [];
    switch (os.platform()) {
      case 'win32':
        intelliJIdea = pathsToCheck.map(check => `${os.homedir()}\\.IntelliJIdea${check}`);
        IdeaIC = pathsToCheck.map(check => `${os.homedir()}\\.IdeaIC${check}`);
        directories.push(this.directory(intelliJIdea));
        directories.push(this.directory(IdeaIC));
        return directories;
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
    switch (os.platform()) {
      case 'win32':
      case 'darwin':
        return this.directory(this.pluginsDirectories());
      case 'linux':
        return '';
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

  private pluginsDirectories(): string[] {
    const pathsToCheck = ['2019.2', '2019.1', '2018.2', '2018.1'];
    let intelliJIdea = [];
    let IdeaIC = [];
    switch (os.platform()) {
      case 'win32': {
        intelliJIdea = pathsToCheck.map(
          path => `${os.homedir()}\\.IntelliJIdea${path}\\config\\plugins`,
        );
        IdeaIC = pathsToCheck.map(path => `${os.homedir()}\\.IdeaIC${path}\\config\\plugins`);
        return intelliJIdea.concat(IdeaIC);
      }
      case 'darwin':
        intelliJIdea = pathsToCheck.map(
          path => `${os.homedir()}/Library/Application Support/IntelliJIdea${path}`,
        );
        IdeaIC = pathsToCheck.map(
          path => `${os.homedir()}/Library/Application Support/IdeaIC${path}`,
        );
        return intelliJIdea.concat(IdeaIC);
      case 'linux':
        return [''];
      default:
        return null;
    }
  }
}
