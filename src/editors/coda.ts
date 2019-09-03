import os from "os";
import Editor from "./editor";

export default class Coda extends Editor {
  public get name(): string {
    return "Coda";
  }

  public get icon(): string {
    return "";
  }

  public async isEditorInstalled(): Promise<boolean> {
    try {
      let ret = false;
      Object.keys(this.appDirectory).forEach(async directory => {
        if (await this.isDirectory(directory)) {
          ret = true;
          return ret;
        }
      });
      return ret;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async isPluginInstalled(): Promise<boolean> {
    try {
      let ret = false;
      Object.keys(this.pluginsDirectory).forEach(async directory => {
        if (await this.isFile(directory)) {
          ret = true;
          return ret;
        }
      });
      return ret;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async installPlugin(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async uninstallPlugin(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private appDirectory(): string[] {
    switch (os.platform()) {
      case "win32":
        return [];
      case "darwin":
        return [
          "/Applications/Coda.app/Contents",
          "/Applications/Coda 2.app/Contents"
        ];
      case "linux":
        return [];
      default:
        return [];
    }
  }

  private pluginsDirectory(): string[] {
    switch (os.platform()) {
      case "win32": {
        return [];
      }
      case "darwin":
        return [
          "~/Library/Application Support/Coda/Plug-ins/WakaTime.codaplugin",
          "~/Library/Application Support/Coda 2/Plug-ins/WakaTime.codaplugin"
        ];
      case "linux":
        return [];
      default:
        return [];
    }
  }
}
