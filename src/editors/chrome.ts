import os from 'os';
import { shell } from 'electron';
import path from 'path';
import fs from 'fs';

import Editor from './editor';

export default class Chrome extends Editor {
  public static getName(): string {
    return 'Google Chrome';
  }

  public get name(): string {
    return 'Google Chrome';
  }

  public get extVersionId(): string {
    return 'jnbbnacmeggbgdjgaoojpmhdlkkpblgi';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    return this.isDirectory(this.appDirectory());
  }

  public async isPluginInstalled(): Promise<boolean> {
    return this.isDirectorySync(this.pluginsDirectory());
  }

  public async installPlugin(): Promise<void> {
    shell.openExternal(`https://chrome.google.com/webstore/detail/wakatime/${this.extVersionId}`);
  }

  public async uninstallPlugin(): Promise<void> {
    try {
      fs.unlinkSync(this.pluginsDirectory());
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject();
    }
  }

  private appDirectory(): string {
    switch (os.platform()) {
      case 'win32':
        return '';
      case 'darwin':
        return '/Applications/Google Chrome.app/Contents';
      default:
        return null;
    }
  }

  private pluginsDirectory(): string {
    switch (os.platform()) {
      case 'win32': {
        return '';
      }
      case 'darwin':
        return path.join(
          os.homedir(),
          'Library',
          'Application Support',
          'Google',
          'Chrome',
          'Default',
          'Extensions',
          this.extVersionId,
        );
      case 'linux':
        return '';
      default:
        return null;
    }
  }
}
