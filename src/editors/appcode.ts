import os from "os";
import fs from "fs";
import path from "path";
import request from "request";

import Editor from "./editor";

export default class AppCode extends Editor {
  public static getName(): string {
    return "AppCode";
  }

  public get name(): string {
    return "AppCode";
  }

  public get icon(): string {
    return "";
  }

  public get binaries(): string[] {
    return ["appcode"];
  }

  public async isEditorInstalled(): Promise<boolean> {
    return await this.isDirectory(this.appDirectory());
  }

  public async isPluginInstalled(): Promise<boolean> {
    return await this.isFileSync(`${this.pluginsDirectory()}/WakaTime.jar`);
  }

  public async installPlugin(): Promise<void> {
    let temp = path.join(this.pluginsDirectory());

    // Create the temp folder first if this does not exists yet
    fs.mkdirSync(temp, { recursive: true });

    temp = path.join(temp, "WakaTime.jar");

    const file = fs.createWriteStream(temp);

    await new Promise((resolve, reject) => {
      request({
        uri: "https://plugins.jetbrains.com/files/7425/51419/WakaTime.jar"
      })
        .pipe(file)
        .on("finish", async () => {
          resolve();
        })
        .on("error", (err: any) => {
          console.error(err);
          reject(err);
        });
    }).catch(err => {
      console.error(err);
    });
  }

  public async uninstallPlugin(): Promise<void> {
    try {
      fs.unlinkSync(`${this.pluginsDirectory()}/WakaTime.jar`);
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject();
    }
  }

  private appDirectory(): string {
    switch (os.platform()) {
      case "win32":
        return null;
      case "darwin":
        return "/Applications/AppCode.app/Contents";
      case "linux":
        return null;
      default:
        return null;
    }
  }

  private pluginsDirectory(): string {
    let directory = "";
    switch (os.platform()) {
      case "win32": {
        return "";
      }
      case "darwin":
        this.pluginsDirectories().some(pluginPath => {
          if (this.isDirectorySync(pluginPath)) {
            directory = pluginPath;
            return true;
          }
          return false;
        });
        return directory;
      case "linux":
        return "";
      default:
        return null;
    }
  }

  private pluginsDirectories(): string[] {
    const pathsToCheck = ["2019.2", "2019.1", "2018.2", "2018.1"];
    switch (os.platform()) {
      case "win32": {
        return [""];
      }
      case "darwin":
        return pathsToCheck.map(
          check =>
            `${os.homedir()}/Library/Application\ Support/AppCode${check}`
        );
      case "linux":
        return [""];
      default:
        return null;
    }
  }
}
