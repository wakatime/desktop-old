import os from "os";
import path from "path";
import fsSync from "fs";

import Editor from "./editor";
import CommandExists from "../lib/command-exists";

export default class Blender extends Editor {
  private commandExists = new CommandExists();

  public static getName(): string {
    return "Blender";
  }

  public get name(): string {
    return "Blender";
  }

  public get icon(): string {
    return "";
  }

  public get binaries(): string[] {
    return ["blender"];
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
    const temp = path.join(os.tmpdir(), "WakaTime", "blender", "WakaTime.py");
    const file = fsSync.createWriteStream(temp);
    /*
     * Might use bpy from pip
     * This module allows to install WakaTime from command line
     * There's a issue opened to support Mac
     * https://github.com/TylerGubala/blenderpy/issues/2
     */
  }

  public async uninstallPlugin(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
