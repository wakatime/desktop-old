import os from 'os';
import fs from 'fs';
import path from 'path';

import Editor from './editor';

export default class VisualStudio extends Editor {
  private versions: { [id: number]: number } = {
    // keep this for future implementations
    10: 2010,
    11: 2012,
    12: 2013,
    14: 2015,
    15: 2017,
    16: 2019,
  };

  public static getName(): string {
    return 'Visual Studio';
  }

  public get name(): string {
    return 'Visual Studio';
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
      case 'win32':
        return (
          this.findFilesRecurive(
            path.join(os.homedir(), 'AppData', 'Local', 'Microsoft', 'VisualStudio'),
            'WakaTime.dll',
          ).length > 0
        );
      case 'darwin':
        return false; // Implement this for Mac
      default:
        return false;
    }
  }

  public async installPlugin(): Promise<void> {
    // https://stackoverflow.com/questions/28652798/install-vs-net-extension-from-command-line
    throw new Error('Method not implemented.');
  }

  public async uninstallPlugin(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private findFilesRecurive(
    base: string,
    filename: string,
    files: string[] = null,
    result: string[] = null,
    breakOnFirstOccurence: boolean = true,
  ): string[] {
    const files2 = files || fs.readdirSync(base);
    let result2 = result || [];

    files2.some(file => {
      const newbase = path.join(base, file);
      if (this.isDirectorySync(newbase))
        result2 = this.findFilesRecurive(newbase, filename, fs.readdirSync(newbase), result2);
      else if (file === filename) {
        result2.push(file);

        if (breakOnFirstOccurence) return true;
      }
      return false;
    });
    return result2;
  }

  private appDirectory(): string[] {
    const directories: string[] = [];
    switch (os.platform()) {
      case 'win32':
        directories.push(
          'C:\\Program Files (x86)\\Microsoft Visual Studio 10.0\\Common7\\IDE',
          'C:\\Program Files (x86)\\Microsoft Visual Studio 11.0\\Common7\\IDE',
          'C:\\Program Files (x86)\\Microsoft Visual Studio 12.0\\Common7\\IDE',
          'C:\\Program Files (x86)\\Microsoft Visual Studio 14.0\\Common7\\IDE',
        );
        directories.push(
          this.directory(
            ['Community', 'Professional', 'Enterprise'].map(
              v => `C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\${v}\\Common7\\IDE`,
            ),
          ),
        );
        directories.push(
          this.directory(
            ['Community', 'Professional', 'Enterprise'].map(
              v => `C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\${v}\\Common7\\IDE`,
            ),
          ),
        );
        return directories;
      case 'darwin':
        return ['/Applications/Visual Studio.app/Contents'];
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
}
