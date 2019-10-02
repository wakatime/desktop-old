import os from "os";

import Editor from "./editor";
import { CommandExists } from "../lib/command-exists";

const findInFiles = require("find-in-files");

interface TerminalInterface {
  exists: boolean;
  pluginInstalled?: boolean;
}

export default class Terminal extends Editor {
  private commandExists = new CommandExists();

  private availableTerminals: { [id: string]: TerminalInterface };

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
    Object.keys(this.binaries).forEach(async binary => {
      const exists = await this.commandExists.exists(binary);
      this.availableTerminals[binary].exists = exists;
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
    // Need to check also for antigen and zgen
    if (await this.isDirectory("~/.oh-my-zsh/custom/plugins/wakatime"))
      return true;
    if (await this.isDirectory("~/.oh-my-zsh/custom/plugins/zsh-wakatime"))
      return true;

    return false;
  }

  private async isPluginInstalledForBash(): Promise<boolean> {
    if (this.fileExists("~/.bashrc")) {
      const find = await findInFiles.find("bash-wakatime.sh", "~/", ".bashrc$");
      return find[".bashrc"].count > 0;
    }

    return false;
  }

  private async isPluginInstalledForiTerm(): Promise<boolean> {
    // Preferences are stored as a binary file at ~/Library/Preferences/com.googlecode.iterm2.plist
    // Need to find a way on asking iTerm if WakaTime is enabled
    return false;
  }

  private async isPluginInstalledForFish(): Promise<boolean> {
    if (this.fileExists("~/.config/fish/functions/fish_prompt.fish")) {
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
