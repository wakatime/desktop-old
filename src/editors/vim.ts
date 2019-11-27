import Editor from './editor';
import { CommandExists } from '../lib/command-exists';

export default class Vim extends Editor {
  private commandExists = new CommandExists();

  public static getName(): string {
    return 'Vim';
  }

  public get name(): string {
    return 'Vim';
  }

  public get icon(): string {
    return '';
  }

  public get binaries(): string[] {
    return ['vi', 'vim'];
  }

  public async isEditorInstalled(): Promise<boolean> {
    try {
      let exists = false;
      await Promise.all(
        Object.keys(this.binaries).map(async binary => {
          if (await this.isBinary(binary)) {
            exists = true;
          }
        }),
      );
      return exists;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async isPluginInstalled(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public async installPlugin(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async uninstallPlugin(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async isBinary(binary: string): Promise<boolean> {
    return this.commandExists.exists(binary);
  }
}
