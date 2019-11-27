import os from 'os';
import fs from 'fs';
import path from 'path';
import request from 'request';

import Editor from './editor';
import { CommandExists } from '../lib/command-exists';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export default class Kakoune extends Editor {
  private commandExists = new CommandExists();

  public static getName(): string {
    return 'Kakoune';
  }

  public get name(): string {
    return 'Kakoune';
  }

  public get icon(): string {
    return '';
  }

  public async isEditorInstalled(): Promise<boolean> {
    const list = await this.brewList();
    return list.includes('kakoune');
  }

  public async isPluginInstalled(): Promise<boolean> {
    return this.fileExistsSync(path.join(this.pluginsDirectory(), 'wakatime.kak'));
  }

  public async installPlugin(): Promise<void> {
    let temp = path.join(os.tmpdir(), 'WakaTime', 'kakoune');

    // Create the temp folder first if this does not exists yet
    fs.mkdirSync(temp, { recursive: true });

    temp = path.join(temp, 'wakatime.kak');
    const file = fs.createWriteStream(temp);

    await new Promise((resolve, reject) => {
      request({
        uri: 'https://raw.githubusercontent.com/WhatNodyn/kakoune-wakatime/master/wakatime.kak',
        gzip: true,
      })
        .pipe(file)
        .on('finish', async () => {
          const pluginsDirectory = this.pluginsDirectory();
          const fileStream = fs.createWriteStream(path.join(pluginsDirectory, 'wakatime.kak'));
          const stream2 = await fs.createReadStream(temp);
          await stream2.pipe(fileStream);
          fs.unlinkSync(temp);
          resolve();
        })
        .on('error', (err: any) => {
          console.error(err);
          reject(err);
        });
    }).catch(err => {
      console.error(err);
    });
  }

  public async uninstallPlugin(): Promise<void> {
    const pluginPath = path.join(this.pluginsDirectory(), 'wakatime.kak');
    await fs.unlinkSync(pluginPath);
    return Promise.resolve();
  }

  public async isHomebrewInstalled(): Promise<boolean> {
    return this.commandExists.exists('brew');
  }

  public async brewList(): Promise<string> {
    if (await this.isHomebrewInstalled()) {
      const { stdout, stderr } = await exec('brew list');
      if (stderr) return Promise.reject(new Error(stderr));

      return stdout;
    }

    return '';
  }

  private pluginsDirectory(): string {
    switch (os.platform()) {
      case 'win32': {
        const is64bit = process.arch === 'x64' || process.env.PROCESSOR_ARCHITEW6432;
        if (is64bit) {
          return '';
        }
        return '';
      }
      case 'darwin': {
        if (process.env.XDG_CONFIG_HOME) {
          return `${process.env.XDG_CONFIG_HOME}/kak/autoload`;
        }
        if (this.isDirectorySync(path.join(os.homedir(), '.config/kak/autoload'))) {
          return path.join(os.homedir(), '.config/kak/autoload');
        }
        if (this.isDirectorySync('/usr/local/share/kak/autoload')) {
          return '/usr/local/share/kak/autoload';
        }

        return '';
      }
      case 'linux':
        return '';
      default:
        return null;
    }
  }
}
