import Editor from "./editor";
import { CommandExists } from "../lib/command-exists";
import { terminal128Path } from "../constants/imgPaths";

export default class Terminal extends Editor {
  private commandExists = new CommandExists();

  public static getName(): string {
    return "Terminal";
  }

  public get name(): string {
    return "Terminal";
  }

  public get icon(): string {
    return terminal128Path;
  }

  public get binaries(): string[] {
    return ["Terminal", "iterm", "fish"];
  }

  public async isEditorInstalled(): Promise<boolean> {
    try {
      return Object.keys(this.binaries).some(async binary => {
        if (await this.commandExists.exists(binary)) {
          return true;
        }
      });
    } catch (err) {
      console.error(err);
      return false;
    }
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
