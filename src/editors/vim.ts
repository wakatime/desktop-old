import "./editor";
import { CommandExists } from "../lib/command-exists";
import Editor from "./editor";

export default class Vim extends Editor {
  private commandExists = new CommandExists();

  public get name(): string {
    return "Vim";
  }

  public get icon(): string {
    return "";
  }

  public get binary(): string {
    return "vim";
  }

  public async isEditorInstalled(): Promise<boolean> {
    // @ts-ignore
    return this.commandExists.exists(this.binary);
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
