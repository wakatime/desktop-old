import * as fs from "async-file";
import * as os from "os";
import "./editor";

export default class Vim implements Editor {
  public get name(): string {
    return "Vim";
  }

  public get icon(): string {
    return "";
  }

  public async isEditorInstalled(): Promise<boolean> {
    const stats = await fs.stat(this._editorFolder());
    return new Promise<boolean>(resolve => {
      resolve(stats.isDirectory());
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
