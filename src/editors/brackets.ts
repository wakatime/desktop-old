import os from "os";

import Editor from "./editor";
import { brackets128Path } from "../constants/imgPaths";

export default class Brackets extends Editor {
  public static getName(): string {
    return "Brackets";
  }

  public get name(): string {
    return "Brackets";
  }

  public get icon(): string {
    return brackets128Path;
  }

  public async isEditorInstalled(): Promise<boolean> {
    return await this.isDirectory(this.appDirectory());
  }

  public async isPluginInstalled(): Promise<boolean> {
    return await this.isDirectory(this.appDirectory());
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
        return "C:\\Program Files (x86)\\Brackets";
      case "darwin":
        return "/Applications/Brackets.app/Contents";
      case "linux":
        return null;
      default:
        return null;
    }
  }

  private pluginsDirectory(): string {
    switch (os.platform()) {
      case "win32":
        return "%USERPROFILE\\AppData\\Roaming\\Brackets\\extensions\\user\\brackets-wakatime";
      case "darwin":
        return "~/Library/Application Support/Brackets/extensions/user/brackets-wakatime";
      case "linux":
        return "~/.config/brackets/extensions/user/brackets-wakatime";
      default:
        return null;
    }
  }
}
