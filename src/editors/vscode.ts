import os from "os";
import fs from "async-file";
import "./editor";
import { CommandExists } from "../lib/command-exists";

const util = require("util");
const exec = util.promisify(require("child_process").exec);

export default class VsCode implements Editor {
  private commandExists = new CommandExists();

  public get name(): string {
    return "code";
  }

  public get displayName(): string {
    return "Visual Studio Code";
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
    const val = await this.listExtensions("WakaTime");
    return val;
  }

  public async installPlugin(): Promise<void> {
    const { stdout, stderr } = await exec(
      "code --install-extension WakaTime.vscode-wakatime"
    );
    if (stderr) return Promise.reject(new Error(stderr));
  }

  public async uninstallPlugin(): Promise<void> {
    const { stdout, stderr } = await exec(
      "code --uninstall-extension WakaTime.vscode-wakatime"
    );
    if (stderr) return Promise.reject(new Error(stderr));
  }

  public async listExtensions(filter: string): Promise<boolean> {
    const { stdout, stderr } = await exec("code --list-extensions");
    if (stderr) return Promise.reject(new Error(stderr));

    return stdout.includes(filter);
  }

  public async fileExists(file: string): Promise<boolean> {
    const val = await fs.exists(file);
    return val;
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
        return "/Applications/Visual Studio Code.app/Contents";
      default:
        return null;
    }
  }
}
