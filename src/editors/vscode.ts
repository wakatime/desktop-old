import os from 'os';

import { CommandExists } from '../lib/command-exists';
import Editor from './editor';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export default class VsCode extends Editor {
  private commandExists = new CommandExists();

  public static getName(): string {
    return 'Visual Studio Code';
  }

  public get name(): string {
    return 'Visual Studio Code';
  }

  public get icon(): string {
    return '';
  }

  public get binaries(): string[] {
    return ['code'];
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
      return this.appDirectory().some(directory => {
        return this.isDirectorySync(directory);
      });
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async isPluginInstalled(): Promise<boolean> {
    return this.listExtensions('wakatime');
  }

  public async installPlugin(): Promise<void> {
    const { stdout, stderr } = await exec('code --install-extension wakatime.vscode-wakatime');
    if (stderr) {
      return Promise.reject(new Error(stderr));
    }
    return Promise.resolve(stdout);
  }

  public async uninstallPlugin(): Promise<void> {
    const { stdout, stderr } = await exec('code --uninstall-extension wakatime.vscode-wakatime');
    if (stderr) {
      return Promise.reject(new Error(stderr));
    }
    return Promise.resolve(stdout);
  }

  public async listExtensions(filter: string): Promise<boolean> {
    const { stdout, stderr } = await exec('code --list-extensions');
    if (stderr) return Promise.reject(new Error(stderr));

    return stdout.includes(filter);
  }

  public async isBinary(binary: string): Promise<boolean> {
    return this.commandExists.exists(binary);
  }

  private appDirectory(): string[] {
    switch (os.platform()) {
      case 'win32':
        return [
          'C:\\Program Files\\Microsoft VS Code',
          `${os.homedir()}\\AppData\\Local\\Programs\\Microsoft VS Code`,
        ];
      case 'darwin':
        return ['/Applications/Visual Studio Code.app/Contents'];
      default:
        return [''];
    }
  }
}
