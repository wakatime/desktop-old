import fs from "fs";

export default abstract class Editor implements EditorInterface {
  abstract name: string;

  abstract icon: string;

  get key(): string {
    return this.name.replace(/\s/g, "").toLowerCase();
  }

  public isDirectory(directory: string): boolean {
    const stats = fs.statSync(directory);
    return stats.isDirectory();
  }

  public isDirectorySync(directory: string): boolean {
    try {
      const stats = fs.statSync(directory);
      return stats.isDirectory();
    } catch (err) {
      return false;
    }
  }

  public isFile(path: string): boolean {
    const stats = fs.statSync(path);
    return stats.isFile();
  }

  abstract isEditorInstalled(): Promise<boolean>;

  abstract isPluginInstalled(): Promise<boolean>;

  abstract installPlugin(): Promise<void>;

  abstract uninstallPlugin(): Promise<void>;
}

declare interface EditorInterface {
  key: string;
  name: string;
  icon: string;

  isEditorInstalled(): Promise<boolean>;
  isPluginInstalled(): Promise<boolean>;
  installPlugin(): Promise<void>;
  uninstallPlugin(): Promise<void>;
}
