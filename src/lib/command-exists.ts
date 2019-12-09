import { exec } from 'child_process';

const path = require('path');
const fs = require('fs');

export class CommandExists {
  private isWindows = process.platform === 'win32';

  private access = fs.access;

  private constants = fs.constants || fs;

  private cleanInput(str: string): string {
    let s = str;
    if (this.isWindows) {
      const isPathName = /[\\]/.test(s);
      if (isPathName) {
        const dirname = `"${path.dirname(s)}"`;
        const basename = `"${path.basename(s)}"`;
        return `${dirname}:${basename}`;
      }
      return `"${s}"`;
    }
    if (/[^A-Za-z0-9_\/:=-]/.test(s)) {
      s = `'${s.replace(/'/g, "'\\''")}'`;
      s = s
        .replace(/^(?:'')+/g, '') // unduplicate single-quote at the beginning
        .replace(/\\'''/g, "\\'"); // remove non-escaped single-quote if there are enclosed between 2 escaped
    }
    return s;
  }

  private fileNotExists(commandName: string, callback: (arg0: boolean) => void) {
    this.access(commandName, this.constants.F_OK, (err: any) => {
      callback(!err);
    });
  }

  private localExecutable(commandName: string, callback): void {
    this.access(commandName, this.constants.F_OK || this.constants.X_OK, (err: any) => {
      callback(!err);
    });
  }

  private commandExistsUnix(commandName: string, cleanedCommandName: string, callback): void {
    this.fileNotExists(commandName, isFile => {
      if (!isFile) {
        exec(
          `command -v ${cleanedCommandName} 2>/dev/null && { echo >&1 ${cleanedCommandName}; exit 0; }`,
          (_error, stdout) => {
            callback(!!stdout);
          },
        );
        return;
      }

      this.localExecutable(commandName, callback);
    });
  }

  private commandExistsWindows(commandName: string, cleanedCommandName: string, callback): void {
    if (/[\x00-\x1f<>:"\|\?\*]/.test(commandName)) {
      callback(false);
      return;
    }
    exec(`where ${cleanedCommandName}`, error => {
      if (error !== null) {
        callback(false);
      } else {
        callback(true);
      }
    });
  }

  public exists(commandName: string, callback: any = null): Promise<boolean> {
    try {
      const cleanedCommandName = this.cleanInput(commandName);
      if (!callback && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
          this.exists(commandName, (output: boolean) => {
            resolve(output);
          });
        });
      }
      if (this.isWindows) {
        this.commandExistsWindows(commandName, cleanedCommandName, callback);
      } else {
        this.commandExistsUnix(commandName, cleanedCommandName, callback);
      }
    } catch (e) {
      return Promise.reject(new Error(e));
    }
  }

  // public exists(commandNames: string[], callback: any = null) {
  //   for(let commandName of commandNames) {
  //     if (this.exists(commandName)) {
  //       callback(true);
  //       return;
  //     }
  //   }

  //   callback(false);
  // }
}

export default CommandExists;
