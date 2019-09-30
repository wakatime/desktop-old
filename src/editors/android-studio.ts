import os from "os";
import fs from "fs";
import path from "path";
import { CommandExists } from "../lib/command-exists";
import Editor from "./editor";

const plist = require("plist");

export default class AndroidStudio extends Editor {
  private plistObj;

  private commandExists = new CommandExists();

  constructor() {
    super();
    this.readPreferences();
  }

  public static getName(): string {
    return "Android Studio";
  }

  public get name(): string {
    return "Android Studio";
  }

  public get icon(): string {
    return "";
  }

  public get binaries(): string[] {
    return ["editor"];
  }

  public async isEditorInstalled(): Promise<boolean> {
    try {
      let ret = false;
      ret = Object.keys(this.binaries).some(async binary => {
        if (await this.commandExists.exists(binary)) {
          return true;
        }
      });
      if (ret) return true;
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

  public fileExists(file: string): boolean {
    return fs.existsSync(file);
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
        if (this.plistObj) {
          const version = this.plistObj.CFBundleShortVersionString;
          return path.join(
            os.homedir(),
            `Library/Application Support/AndroidStudio${version}`
          );
        }
        return "";
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
        if (this.isDirectorySync(this.appDirectory())) {
          const plistFile = path.join(this.appDirectory(), "Info.plist");
          this.plistObj = plist.parse(fs.readFileSync(plistFile, "utf8"));
        }
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
