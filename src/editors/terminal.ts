import os from 'os';
import path from 'path';

import Editor from './editor';
import { CommandExists } from '../lib/command-exists';

const findInFiles = require('find-in-files');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

interface TerminalInterface {
  exists: boolean;
  pluginInstalled?: boolean;
}

export default class Terminal extends Editor {
  private commandExists = new CommandExists();

  private availableTerminals: { [id: string]: TerminalInterface } = {};

  constructor() {
    super();
    this.getTerminals();
  }

  public static getName(): string {
    return 'Terminal';
  }

  public get name(): string {
    return 'Terminal';
  }

  public get icon(): string {
    return '';
  }

  public get binaries(): string[] {
    return ['bash', 'zsh', 'iterm', 'fish'];
  }

  public async isEditorInstalled(): Promise<boolean> {
    return this.isAnyTerminalAvailable();
  }

  public isAnyTerminalAvailable(): boolean {
    return Object.keys(this.availableTerminals)
      .map(key => this.availableTerminals[key])
      .some(el => el.exists);
  }

  private getTerminals() {
    this.binaries.forEach(async (binary: string) => {
      let exists: boolean = await this.commandExists.exists(binary);

      if (!exists) {
        exists = this.isDirectorySync(`/Applications/${binary}.app/Contents`);
      }

      this.availableTerminals[binary] = { exists };
    });
  }

  public async isPluginInstalled(): Promise<boolean> {
    switch (os.platform()) {
      case 'win32':
        return false;
      case 'darwin': {
        await Promise.all(
          Object.keys(this.availableTerminals).map(async terminal => {
            if (terminal === 'zsh') {
              this.availableTerminals[
                terminal
              ].pluginInstalled = await this.isPluginInstalledForZsh();
            } else if (terminal === 'bash') {
              this.availableTerminals[
                terminal
              ].pluginInstalled = await this.isPluginInstalledForBash();
            } else if (terminal === 'iterm') {
              this.availableTerminals[
                terminal
              ].pluginInstalled = await this.isPluginInstalledForiTerm();
            } else if (terminal === 'fish') {
              this.availableTerminals[
                terminal
              ].pluginInstalled = await this.isPluginInstalledForFish();
            }
          }),
        );
        return this.isAnyTerminalInstalled();
      }
      case 'linux':
      default:
        return false;
    }
  }

  public isAnyTerminalInstalled(): boolean {
    return Object.keys(this.availableTerminals)
      .map(key => this.availableTerminals[key])
      .some(x => x.pluginInstalled);
  }

  private async isPluginInstalledForZsh(): Promise<boolean> {
    if (this.isDirectorySync(path.join(os.homedir(), '.oh-my-zsh/custom/plugins/wakatime')))
      return true;
    if (this.isDirectorySync(path.join(os.homedir(), '.oh-my-zsh/custom/plugins/zsh-wakatime')))
      return true;

    if (await this.commandExists.exists('antigen')) {
      const { stdout, stderr } = await exec('antigen list --simple');
      if (stderr) return Promise.reject(new Error(stderr));

      return stdout.includes('wakatime');
    }

    if (await this.commandExists.exists('zgen')) {
      const { stdout, stderr } = await exec('zgen list');
      if (stderr) return Promise.reject(new Error(stderr));

      return stdout.includes('wakatime');
    }

    return false;
  }

  private async isPluginInstalledForBash(): Promise<boolean> {
    if (this.fileExistsSync(path.join(os.homedir(), '.bashrc'))) {
      const find = await findInFiles.find('bash-wakatime.sh', os.homedir(), '.bashrc$');
      return find['.bashrc'].count > 0;
    }

    return false;
  }

  private async isPluginInstalledForiTerm(): Promise<boolean> {
    const { stdout, stderr } = await exec(
      `plutil -convert xml1 -o - ${os.homedir()}/Library/Preferences/com.googlecode.iterm2.plist`,
    );
    if (stderr) return Promise.reject(new Error(stderr));

    return stdout.includes('wakatime');
  }

  private async isPluginInstalledForFish(): Promise<boolean> {
    if (this.fileExistsSync(path.join(os.homedir(), '.config/fish/functions/fish_prompt.fish'))) {
      const find = await findInFiles.find(
        'wakatime',
        path.join(os.homedir(), '.config/fish/functions/'),
        'fish_prompt.fish$',
      );
      return find['fish_prompt.fish'].count > 0;
    }

    return false;
  }

  public async installPlugin(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async uninstallPlugin(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
