import Editor from './editor'
import CommandExists from '../lib/command-exists';

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
      this.commandExists.exists(this.name, null).then((exists) => {
        resolve(exists);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public async isPluginInstalled(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      resolve(false);
    });
  }

  public async installPlugin(): Promise<void> {
    return new Promise<void>(resolve => {
      resolve();
    });
  }

  public async uninstallPlugin(): Promise<void> {
    return new Promise<void>(resolve => {
      resolve();
    });
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
