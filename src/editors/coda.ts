import os from "os";

import Editor from "./editor";
import { coda128Path } from "../constants/imgPaths";

export default class Coda extends Editor {
  public static getName(): string {
    return "Coda";
  }

  public get name(): string {
    return "Coda";
  }

  public get icon(): string {
    return coda128Path;
  }

  public async isEditorInstalled(): Promise<boolean> {
    try {
      return Object.keys(this.appDirectory).some(async directory => {
        if (await this.isDirectory(directory)) {
          return true;
        }
      });
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async isPluginInstalled(): Promise<boolean> {
    try {
      Object.keys(this.pluginsDirectory).some(async directory => {
        if (await this.isFile(directory)) {
          return true;
        }
      });
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
