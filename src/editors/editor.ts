import fs from 'fs';
import util from 'util';

const stat = util.promisify(fs.stat);

export default abstract class Editor implements EditorInterface {
  abstract name: string;

  abstract icon: string;

  get key(): string {
    return this.name.replace(/\s/g, '').toLowerCase();
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
