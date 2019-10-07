import os from "os";

import Editor from "./editor";
import { CommandExists } from "../lib/command-exists";

const findInFiles = require("find-in-files");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

interface TerminalInterface {
  exists: boolean;
  pluginInstalled?: boolean;
}

export default class Terminal extends Editor {
  private commandExists = new CommandExists();

  private availableTerminals: { [id: string]: TerminalInterface } = {};

  constructor() {
    super();
    this.getTerminals();
  }

  public static getName(): string {
    return "Terminal";
  }

  public get name(): string {
    return "Terminal";
  }

  public get icon(): string {
    return "";
  }

  public get binaries(): string[] {
    return ["bash", "zsh", "iterm", "iterm2", "fish"];
  }

  public async isEditorInstalled(): Promise<boolean> {
    return Object.keys(this.availableTerminals).length > 0;
  }

  private getTerminals() {
    this.binaries.forEach(async (binary: string) => {
      const exists: boolean = await this.commandExists.exists(binary);
      this.availableTerminals[binary] = { exists };
    });
  }

  public async isPluginInstalled(): Promise<boolean> {
    switch (os.platform()) {
      case "win32":
        return false;
      case "darwin": {
        Object.keys(this.availableTerminals).forEach(async terminal => {
          if (terminal === "zsh") {
            this.availableTerminals[
              terminal
            ].pluginInstalled = await this.isPluginInstalledForZsh();
          } else if (terminal === "bash") {
            this.availableTerminals[
              terminal
            ].pluginInstalled = await this.isPluginInstalledForBash();
          } else if (["iterm", "iterm2"].includes(terminal)) {
            this.availableTerminals[
              terminal
            ].pluginInstalled = await this.isPluginInstalledForiTerm();
          } else if (terminal === "fish") {
            this.availableTerminals[
              terminal
            ].pluginInstalled = await this.isPluginInstalledForFish();
          }
        });
        return (
          Object.keys(this.availableTerminals)
            .map(key => this.availableTerminals[key])
            .filter(x => x.pluginInstalled === true).length > 0
        );
      }
      case "linux":
      default:
        return false;
    }
  }

  private async isPluginInstalledForZsh(): Promise<boolean> {
    if (await this.isDirectory("~/.oh-my-zsh/custom/plugins/wakatime"))
      return true;
    if (await this.isDirectory("~/.oh-my-zsh/custom/plugins/zsh-wakatime"))
      return true;

    if (await this.commandExists.exists("antigen")) {
      const { stdout, stderr } = await exec("antigen list --simple");
      if (stderr) return Promise.reject(new Error(stderr));

      return stdout.includes("wakatime");
    }

    if (await this.commandExists.exists("zgen")) {
      const { stdout, stderr } = await exec("zgen list");
      if (stderr) return Promise.reject(new Error(stderr));

      return stdout.includes("wakatime");
    }

    return false;
  }

  private async isPluginInstalledForBash(): Promise<boolean> {
    if (this.fileExistsSync("~/.bashrc")) {
      const find = await findInFiles.find("bash-wakatime.sh", "~/", ".bashrc$");
      return find[".bashrc"].count > 0;
    }

    return false;
  }

  private async isPluginInstalledForiTerm(): Promise<boolean> {
    const { stdout, stderr } = await exec(
      "plutil -convert xml1 -o - ~/Library/Preferences/com.googlecode.iterm2.plist"
    );
    if (stderr) return Promise.reject(new Error(stderr));

    return stdout.includes("wakatime");
  }

  private async isPluginInstalledForFish(): Promise<boolean> {
    if (this.fileExistsSync("~/.config/fish/functions/fish_prompt.fish")) {
      const find = await findInFiles.find(
        "wakatime",
        "~/.config/fish/functions/",
        "fish_prompt.fish$"
      );
      return find["fish_prompt.fish"].count > 0;
    }

    return false;
  }

  public async installPlugin(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async uninstallPlugin(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
