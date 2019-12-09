import os from 'os';
import fs from 'fs';
import path from 'path';

import { CommandExists } from '../lib/command-exists';
import Editor from './editor';
import { installJetbrainsPlugin, unInstallJetbrainsPlugin } from '../utils/jetbrains';

const plist = require('plist');

export default class AndroidStudio extends Editor {
  private plistObj;

  private commandExists = new CommandExists();

  constructor() {
    super();
    this.readPreferences();
  }

  public static getName(): string {
    return 'Android Studio';
  }

  public get name(): string {
    return 'Android Studio';
  }

  public get icon(): string {
    return '';
  }

  public get binary(): string {
    return 'editor';
  }

  public async isEditorInstalled(): Promise<boolean> {
    try {
      const ret = await this.isBinary(this.binary);
      if (ret) return true;
      return this.isDirectorySync(this.appDirectory());
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async isBinary(binary: string): Promise<boolean> {
    return this.commandExists.exists(binary);
  }

  public async isPluginInstalled(): Promise<boolean> {
    return this.fileExistsSync(path.join(this.pluginsDirectory(), 'WakaTime.jar'));
  }

  public async installPlugin(): Promise<void> {
    installJetbrainsPlugin(this.pluginsDirectory());
  }

  public async uninstallPlugin(): Promise<void> {
    unInstallJetbrainsPlugin(this.pluginsDirectory());
  }

  public pluginsDirectory(): string {
    switch (os.platform()) {
      case 'win32': {
        const is64bit = process.arch === 'x64' || process.env.PROCESSOR_ARCHITEW6432;
        if (is64bit) {
          return '';
        }
        return '';
      }
      case 'darwin': {
        if (this.plistObj) {
          const version = this.plistObj.CFBundleShortVersionString;
          return path.join(os.homedir(), `Library/Application Support/AndroidStudio${version}`);
        }
        return '';
      }
      case 'linux':
        return '';
      default:
        return null;
    }
  }

  private readPreferences(): void {
    switch (os.platform()) {
      case 'win32':
        break;
      case 'darwin': {
        if (this.isDirectorySync(this.appDirectory())) {
          const plistFile = path.join(this.appDirectory(), 'Info.plist');
          this.plistObj = plist.parse(fs.readFileSync(plistFile, 'utf8'));
        }
        break;
      }
      default:
        break;
    }
  }

  private appDirectory(): string {
    switch (os.platform()) {
      case 'win32':
        return '';
      case 'darwin':
        return '/Applications/Android Studio.app/Contents';
      default:
        return null;
    }
  }
}
