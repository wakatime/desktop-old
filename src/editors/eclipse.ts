import os from "os";
import fs from "async-file";
import fsSync from "fs";
import path from "path";
import Editor from "./editor";

export default class Eclipse extends Editor {
  public get name(): string {
    return "Eclipse";
  }

  public get icon(): string {
    return "";
  }

  public async isEditorInstalled(): Promise<boolean> {
    return await this.isDirectory(this.appDirectory());
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

  private appDirectory(): string {
    switch (os.platform()) {
      case "win32":
        return "";
      case "darwin":
        // find a way of recursively find Eclipse.app folder
        return path.join(
          os.homedir(),
          "eclipse/java-2019-06/Eclipse.app/Contents"
        );
      default:
        return null;
    }
  }

  // private async findDirectory(dir: string, folder: string): Promise<boolean> {
  //     var results = [];
  //     fs_sync.readdir(dir, function (err, list) {
  //         if (err) return false;
  //         var pending = list.length;
  //         if (!pending) return false;
  //         list.forEach(function (file) {
  //             file = path.resolve(dir, file);
  //             fs_sync.stat(file, function (_, stat) {
  //                 if (stat && stat.isDirectory()) {
  //                     return true;
  //                     this.findDirectory(file, function (err, res) {
  //                         results = results.concat(res);
  //                         if (!--pending) done(null, results);
  //                     });
  //                 } else {
  //                     results.push(file);
  //                     if (!--pending) done(null, results);
  //                 }
  //             });
  //         });
  //     });
  // };
}
