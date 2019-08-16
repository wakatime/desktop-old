import os from "os";
import fs from "async-file";
import fsSync from "fs";
import path from "path";
import { CommandExists } from "../lib/command-exists";
import "./editor";

const plist = require("plist");

export default class AndroidStudio implements Editor {
  private plistObj;

  any = {};

  private commandExists = new CommandExists();

  constructor() {
    this.readPreferences();
  }

  public get name(): string {
    return "editor";
  }

  public get displayName(): string {
    return "Android Studio";
  }

  public get icon(): string {
    return "";
  }

  public async isEditorInstalled(): Promise<boolean> {
    try {
      if (await this.commandExists.exists(this.name)) {
        return true;
      }

      return await this.isDirectory(this.appDirectory());
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async isPluginInstalled(): Promise<boolean> {
    return await this.fileExists(
      path.join(this.pluginsDirectory(), "WakaTime.jar")
    );
  }

  public async installPlugin(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async uninstallPlugin(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async fileExists(file: string): Promise<boolean> {
    return await fs.exists(file);
  }

  public async isDirectory(directory: string): Promise<boolean> {
    const stats = await fs.stat(directory);
    return stats.isDirectory();
  }

  public pluginsDirectory(): string {
    switch (os.platform()) {
      case "win32": {
        const is64bit =
          process.arch === "x64" || process.env.PROCESSOR_ARCHITEW6432;
        if (is64bit) {
          return "";
        }
        return "";
      }
      case "darwin": {
        const version = this.plistObj.CFBundleShortVersionString;
        return path.join(
          os.homedir(),
          `Library/Application Support/AndroidStudio${version}`
        );
      }
      case "linux":
        return "";
      default:
        return null;
    }
  }

  private readPreferences(): void {
    switch (os.platform()) {
      case "win32":
        break;
      case "darwin": {
        const plistFile = path.join(this.appDirectory(), "Info.plist");
        this.plistObj = plist.parse(fsSync.readFileSync(plistFile, "utf8"));
        break;
      }
      default:
        break;
    }
  }

  private appDirectory(): string {
    switch (os.platform()) {
      case "win32":
        return "";
      case "darwin":
        return "/Applications/Android Studio.app/Contents";
      default:
        return null;
    }
  }
}
