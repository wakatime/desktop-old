import os from "os";
import fs from "fs";
import { CommandExists } from "../lib/command-exists";
import Editor from "./editor";

const util = require("util");
const exec = util.promisify(require("child_process").exec);

export default class VsCode extends Editor {
  private commandExists = new CommandExists();

  public static getName(): string {
    return "Visual Studio Code";
  }

  public get name(): string {
    return "Visual Studio Code";
  }

  public get icon(): string {
    return "";
  }

  public get binaries(): string[] {
    return ["code"];
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
    const val = await this.listExtensions("WakaTime");
    return val;
  }

  public async installPlugin(): Promise<void> {
    const { stdout, stderr } = await exec(
      "code --install-extension wakatime.vscode-wakatime"
    );
    if (stderr) return Promise.reject(new Error(stderr));
  }

  public async uninstallPlugin(): Promise<void> {
    const { stdout, stderr } = await exec(
      "code --uninstall-extension wakatime.vscode-wakatime"
    );
    if (stderr) return Promise.reject(new Error(stderr));
  }

  public async listExtensions(filter: string): Promise<boolean> {
    const { stdout, stderr } = await exec("code --list-extensions");
    if (stderr) return Promise.reject(new Error(stderr));

    return stdout.includes(filter);
  }

  public fileExists(file: string): boolean {
    const val = fs.existsSync(file);
    return val;
  }

  private appDirectory(): string {
    switch (os.platform()) {
      case "win32":
        return "%USERPROFILE\\AppData\\Local\\Programs\\Microsoft VS Code";
      case "darwin":
        return "/Applications/Visual Studio Code.app/Contents";
      default:
        return null;
    }
  }
}
