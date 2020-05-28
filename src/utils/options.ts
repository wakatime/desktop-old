import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

import { ExpirationStrategy } from './cache/expiration-strategy';
import { MemoryStorage } from './cache/memory-storage';

export default class Options {
  private configFile: string;

  private logFile: string;

  private readonly cache: ExpirationStrategy;

  constructor() {
    this.cache = new ExpirationStrategy(new MemoryStorage());
    const wakaHome = this.getWakaHome();
    this.configFile = path.join(wakaHome, '.wakatime.cfg');
    this.logFile = path.join(wakaHome, '.wakatime.log');
  }

  private getWakaHome(): string {
    const home = process.env.WAKATIME_HOME;
    if (home) {
      return home;
    }
    return this.getUserHomeDir();
  }

  public async getSettingAsync<T = any>(section: string, key: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.getSetting(section, key, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }

  public getSetting(section: string, key: string, callback: (string, any) => void): void {
    fs.readFile(
      this.getConfigFile(),
      'utf-8',
      (err: NodeJS.ErrnoException | null, content: string) => {
        if (err) {
          if (callback) callback(new Error(`could not read ${this.getConfigFile()}`), null);
        } else {
          let currentSection = '';
          const lines = content.split('\n');
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (this.startsWith(line.trim(), '[') && this.endsWith(line.trim(), ']')) {
              currentSection = line
                .trim()
                .substring(1, line.trim().length - 1)
                .toLowerCase();
            } else if (currentSection === section) {
              const parts = line.split('=');
              const currentKey = parts[0].trim();
              if (currentKey === key && parts.length > 1) {
                callback(null, parts[1].trim());
                return;
              }
            }
          }

          if (callback) callback(null, null);
        }
      },
    );
  }

  public async setSettingAsync<T = any>(section: string, key: string, val: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.setSetting(section, key, val, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }

  public setSetting(
    section: string,
    key: string,
    val: string,
    callback: (string, any) => void = null,
  ): void {
    fs.readFile(
      this.getConfigFile(),
      'utf-8',
      (err: NodeJS.ErrnoException | null, content: string) => {
        // ignore errors because config file might not exist yet
        if (err) {
          // eslint-disable-next-line no-param-reassign
          content = '';
          if (callback) callback(new Error(`could not write ${this.getConfigFile()}`), null);
        }

        const contents: string[] = [];
        let currentSection = '';

        let found = false;
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (this.startsWith(line.trim(), '[') && this.endsWith(line.trim(), ']')) {
            if (currentSection === section && !found) {
              contents.push(`${key} = ${val}`);
              found = true;
            }
            currentSection = line
              .trim()
              .substring(1, line.trim().length - 1)
              .toLowerCase();
            contents.push(line);
          } else if (currentSection === section) {
            const parts = line.split('=');
            const currentKey = parts[0].trim();
            if (currentKey === key) {
              if (!found) {
                contents.push(`${key} = ${val}`);
                found = true;
              }
            } else {
              contents.push(line);
            }
          } else {
            contents.push(line);
          }
        }

        if (!found) {
          if (currentSection !== section) {
            contents.push(`[${section}]`);
          }
          contents.push(`${key} = ${val}`);
        }

        fs.writeFile(this.getConfigFile(), contents.join('\n'), (wfErr) => {
          if (wfErr) throw wfErr;
          if (callback) callback(null, null);
        });
      },
    );
  }

  public getConfigFile(): string {
    return this.configFile;
  }

  public setConfigFile(configFile: string): void {
    this.configFile = configFile;
  }

  public getLogFile(): string {
    return this.logFile;
  }

  public setLogFile(logFile: string): void {
    this.logFile = logFile;
  }

  public async getApiKeyAsync(): Promise<string> {
    const cachedApiKey = await this.cache.getItem<string>('api_key');
    if (cachedApiKey) {
      return cachedApiKey;
    }

    let apiKey = '';
    try {
      apiKey = await this.getSettingAsync<string>('settings', 'api_key');
    } catch (_) {
      try {
        apiKey = await this.getSettingAsync<string>('settings', 'apikey');
      } catch (__) {
        try {
          apiKey = await this.getSettingAsync<string>('settings', 'key');
        } catch (err) {
          console.log('api key not found on config file');
        }
      }
    }
    if (apiKey !== '') {
      this.cache.setItem('api_key', apiKey, { ttl: 300 });
    }
    return apiKey;
  }

  public getUserHomeDir(): string {
    if (this.isPortable()) return process.env.WAKATIME_DESKTOP_PORTABLE as string;

    return process.env[os.platform() === 'win32' ? 'USERPROFILE' : 'HOME'] || '';
  }

  public isPortable(): boolean {
    return !!process.env.WAKATIME_DESKTOP_PORTABLE;
  }

  public startsWith(outer: string, inner: string): boolean {
    return outer.slice(0, inner.length) === inner;
  }

  public endsWith(outer: string, inner: string): boolean {
    return inner === '' || outer.slice(-inner.length) === inner;
  }
}
