import os from 'os';
import path from 'path';

import { CommandExists } from '../lib/command-exists';
import Editor from './editor';

export default class Xcode extends Editor {
  private commandExists = new CommandExists();

  public static getName(): string {
    return 'Xcode';
  }

  public get name(): string {
    return 'Xcode';
  }

  public get icon(): string {
    return '';
  }

  public get binaries(): string[] {
    return ['xed'];
  }

  public async isEditorInstalled(): Promise<boolean> {
    try {
      let exists = false;
      await Promise.all(
        Object.keys(this.binaries).map(async binary => {
          if (await this.isBinary(binary)) {
            exists = true;
          }
        }),
      );
      if (exists) return true;
      return await this.isDirectory(this.appDirectory());
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async isPluginInstalled(): Promise<boolean> {
    const pluginPath = path.join(this.pluginsDirectory(), 'WakaTime.xcplugin/Contents');
    return this.isDirectory(pluginPath);
  }

  public async installPlugin(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async uninstallPlugin(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async isBinary(binary: string): Promise<boolean> {
    return this.commandExists.exists(binary);
  }

  public pluginsDirectory(): string {
    switch (os.platform()) {
      case 'win32': {
        const is64bit = process.arch === 'x64' || process.env.PROCESSOR_ARCHITEW6432;
        if (is64bit) return '';
        return '';
      }
      case 'darwin':
        return path.join(
          os.homedir(),
          'Library/Application Support/Developer/Shared/Xcode/Plug-ins',
        );
      case 'linux':
        return '';
      default:
        return null;
    }
  }

  private appDirectory(): string {
    switch (os.platform()) {
      case 'win32':
        return '';
      case 'darwin':
        return '/Applications/Xcode.app/Contents';
      default:
        return null;
    }
  }
}
