import os from 'os';
import path from 'path';

import Editor from './editor';

export default class Sketch extends Editor {
  public static getName(): string {
    return 'Sketch';
  }

  public get name(): string {
    return 'Sketch';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    return await this.isDirectory(this.appDirectory());
  }

  public async isPluginInstalled(): Promise<boolean> {
    return await this.isFile(path.join(this.pluginsDirectory(), 'WakaTime.sketchplugin'));
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
        return '/Applications/Sketch.app/Contents';
      case 'linux':
        return null;
      default:
        return null;
    }
  }

  private pluginsDirectory(): string {
    switch (os.platform()) {
      case 'win32':
        return null;
      case 'darwin':
        return path.join(
          os.homedir(),
          'Library/Application Support/com.bohemiancoding.sketch3/Plugins',
        );
      case 'linux':
        return null;
      default:
        return null;
    }
  }
}
