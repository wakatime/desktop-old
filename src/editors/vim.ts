import Editor from './editor'
import { CommandExists } from '../lib/command-exists';

export default class Vim implements Editor {

  private commandExists = new CommandExists();

  public get name(): string {
    return 'vim'
  }

  public get displayName(): string {
    return 'Vim'
  }

  public get icon(): string {
    return "";
  }

  public async isEditorInstalled(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.commandExists.exists(this.name).then((exists) => {
        resolve(exists);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public async isPluginInstalled(): Promise<boolean> {
    return Promise.reject('method not implemented');
  }

  public async installPlugin(): Promise<void> {
    return Promise.reject('method not implemented');
  }

  public async uninstallPlugin(): Promise<void> {
    return Promise.reject('method not implemented');
  }

  private _editorFolder(): string {
    let dir;
    switch (os.platform()) {
      case "win32":
        break;
      case "darwin":
        dir = "/Applications/Sublime Text 2.app/Contents";
        break;
      default:
        dir = null;
    }
    return dir;
  }
}
