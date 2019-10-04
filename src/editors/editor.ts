import fs from "fs";
import util from "util";
import path from "path";
import request from "request";

const stat = util.promisify(fs.stat);

export default abstract class Editor implements EditorInterface {
  abstract name: string;

  abstract icon: string;

  get key(): string {
    return this.name.replace(/\s/g, "").toLowerCase();
  }

  public async isDirectory(directory: string): Promise<boolean> {
    try {
      const stats = await stat(directory);
      return stats.isDirectory();
    } catch (err) {
      // console.error(err);
      return false;
    }
  }

  public isDirectorySync(directory: string): boolean {
    try {
      const stats = fs.statSync(directory);
      return stats.isDirectory();
    } catch (err) {
      // console.error(err);
      return false;
    }
  }

  public async isFile(filePath: string): Promise<boolean> {
    const stats = await stat(filePath);
    return stats.isFile();
  }

  public isFileSync(filePath: string): boolean {
    try {
      const stats = fs.statSync(filePath);
      return stats.isFile();
    } catch (err) {
      // console.error(err);
      return false;
    }
  }

  public fileExistsSync(file: string): boolean {
    try {
      return fs.existsSync(file);
    } catch (err) {
      // console.error(err);
      return false;
    }
  }

  public async installJetbrainsPlugin(pluginsDirectory: string): Promise<void> {
    let temp = path.join(pluginsDirectory);

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

  public async unInstallJetbrainsPlugin(
    pluginsDirectory: string
  ): Promise<void> {
    try {
      fs.unlinkSync(`${pluginsDirectory}/WakaTime.jar`);
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject();
    }
  }

  abstract isEditorInstalled(): Promise<boolean>;

  abstract isPluginInstalled(): Promise<boolean>;

  abstract installPlugin(): Promise<void>;

  abstract uninstallPlugin(): Promise<void>;
}

export declare interface EditorInterface {
  key: string;
  name: string;
  icon: string;

  isEditorInstalled(): Promise<boolean>;
  isPluginInstalled(): Promise<boolean>;
  installPlugin(): Promise<void>;
  uninstallPlugin(): Promise<void>;
}
