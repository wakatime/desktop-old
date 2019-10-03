import os from "os";

import Editor from "./editor";

export default class AppCode extends Editor {
  public static getName(): string {
    return "IntelliJ IDEA";
  }

  public get name(): string {
    return "IntelliJ IDEA";
  }

  public get icon(): string {
    return "";
  }

  public get binaries(): string[] {
    return ["intellij"];
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
        return "/Applications/IntelliJ IDEA CE.app/Contents"; // This one is Community edition
      // return "/Applications/IntelliJ IDEA CE.app/Contents";  // This one is Ultimate edition
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
        return `${os.homedir()}/Library/Application\ Support/IdeaIC2019.2/WakaTime.jar`; // This one is Community edition
      // return `${os.homedir()}/Library/Application\ Support/IntelliJIdea2019.2/WakaTime.jar`; // This one is Ultimate edition
      case "linux":
        return "";
      default:
        return null;
    }
  }
}
