import os from "os";
import fs from "async-file";
import "./editor";

export default class Chrome implements Editor {
  public get name(): string {
    return "chrome";
  }

  public get displayName(): string {
    return "Google Chrome";
  }

  public get icon(): string {
    return "";
  }

  public async isEditorInstalled(): Promise<boolean> {
    return await this.isDirectory(this.appDirectory());
  }

  public async isPluginInstalled(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async installPlugin(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async uninstallPlugin(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async isDirectory(directory: string): Promise<boolean> {
    const stats = await fs.stat(directory);
    return stats.isDirectory();
  }

  private appDirectory(): string {
    switch (os.platform()) {
      case "win32":
        return "";
      case "darwin":
        return "/Applications/Google Chrome.app/Contents";
      default:
        return null;
    }
  }
}
