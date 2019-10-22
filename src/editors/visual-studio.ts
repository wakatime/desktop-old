import os from 'os';

import Editor from './editor';

const Registry = require('winreg');
const Registry2 = require('registry-js');
const readdirp = require('readdirp');

export default class VisualStudio extends Editor {
  private versions: { [id: number]: number } = {
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
    switch (os.platform()) {
      case 'win32': {
        return this.getInstalledVersions().length > 0;
      }
      case 'darwin':
        return await this.isDirectory(this.appDirectory());
      case 'linux':
        return true; // TODO: implement this
      default:
        return false;
    }
  }

  private getInstalledVersions(): number[] {
    switch (os.platform()) {
      case 'win32': {
        const installedVersions: number[] = [];
        Object.keys(this.versions).forEach(v => {
          const key = `\\VisualStudio.DTE.${v}.0`;
          if (this.isRegKey(key)) {
            installedVersions.push(this.versions[v]);
          }
        });
        return installedVersions;
      }
      case 'darwin':
      case 'linux':
      default:
        return [];
    }
  }

  public async isPluginInstalled(): Promise<boolean> {
    switch (os.platform()) {
      case 'win32': {
        const settings = {
          root: '%LocalAppData%\\Microsoft\\VisualStudio',
          type: 'files',
          fileFilter: ['WakaTime.dll'],
        };
        return this.isFileWindows(settings);
      }
      case 'darwin':
      case 'linux':
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

  private isFileWindows(settings: { root: string; type: string; fileFilter: string[] }): boolean {
    const filePaths: string[] = [];
    readdirp(
      settings,
      function(fileInfo) {
        filePaths.push(fileInfo.fullPath);
      },
      function(err, _res) {
        if (err) return false;
      },
    );
    return filePaths.length > 0;
  }

  private isRegKey(key: string): boolean {
    const regkey = new Registry({
      hive: Registry.HKCR,
      key,
    });
    console.log('=============================1');
    console.log(regkey);
    console.log('=============================');
    const { enumerateValues, HKEY } = Registry2;
    const regkey2 = enumerateValues(HKEY.HKCR, key);
    console.log('=============================2');
    console.log(regkey2);
    console.log('=============================');

    let exist = false;
    regkey.values(function(err, items) {
      if (err) {
        console.log(err);
        return [];
      }
      exist = items.length > 0;
    });
    return exist;
  }

  private appDirectory(): string {
    switch (os.platform()) {
      case 'win32':
        return '';
      case 'darwin':
        return '/Applications/Visual Studio.app/Contents';
      default:
        return null;
    }
  }
}
