import Editor from "./editor";
import { CommandExists } from "../lib/command-exists";

export default class Vim implements Editor {
  private commandExists = new CommandExists();

  public get name(): string {
    return "vim";
  }

  public get displayName(): string {
    return "Vim";
  }

  public get icon(): string {
    return "";
  }

  public async isEditorInstalled(): Promise<boolean> {
    return this.commandExists.exists(this.name);
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
}
