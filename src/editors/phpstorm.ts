import os from "os";

import Editor from "./editor";

export default class PhpStorm extends Editor {
  public static getName(): string {
    return "PhpStorm";
  }

  public get name(): string {
    return "PhpStorm";
  }

  public get icon(): string {
    return "";
  }

  public get binaries(): string[] {
    return ["phpstorm"];
  }

  public async isEditorInstalled(): Promise<boolean> {
    return await this.isDirectory(this.appDirectory());
  }

  public async isPluginInstalled(): Promise<boolean> {
    return await this.isFile(this.pluginsDirectory());
  }

  public async installPlugin(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async uninstallPlugin(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private appDirectory(): string {
    switch (os.platform()) {
      case "win32":
        return null;
      case "darwin":
        return "/Applications/PhpStorm.app/Contents";
      case "linux":
        return null;
      default:
        return null;
    }
  }

  private pluginsDirectory(): string {
    switch (os.platform()) {
      case "win32": {
        return "";
      }
      case "darwin":
        return `${os.homedir()}/Library/Application\ Support/PhpStorm2019.2/WakaTime.jar`;
      case "linux":
        return "";
      default:
        return null;
    }
  }
}
