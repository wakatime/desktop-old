import Editor from "./editor";
import { CommandExists } from "../lib/command-exists";
import * as os from 'os';
import * as fs from 'async-file'
import * as path from 'path'

export default class Xcode implements Editor {

    private commandExists = new CommandExists();

    public get name(): string {
        return 'xed'
    }

    public get displayName(): string {
        return 'Xcode'
    }

    public get icon(): string {
        return ''
    }

    public async isEditorInstalled(): Promise<boolean> {
        try {
            if (await this.commandExists.exists(this.name)) {
                return true;
            }

            return await this.isDirectory(this.appDirectory());
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    public async isPluginInstalled(): Promise<boolean> {
        return await this.isDirectory(path.join(this.pluginsDirectory(), 'WakaTime.xcplugin/Contents'));
    }

    public async installPlugin(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async uninstallPlugin(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async isDirectory(directory: string): Promise<boolean> {
        let stats = await fs.stat(directory);
        return stats.isDirectory();
    }

    public pluginsDirectory(): string {
        switch (os.platform()) {
            case 'win32':
                var is64bit = process.arch === 'x64' || process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432');
                if (is64bit)
                    return ''
                else
                    return ''
            case 'darwin':
                return path.join(os.homedir(), 'Library/Application Support/Developer/Shared/Xcode/Plug-ins');
            case 'linux':
                return ''
            default:
                return null;
        }
    }

    private appDirectory(): string {
        switch (os.platform()) {
            case 'win32':
                return '';
            case 'darwin':
                return '/Applications/Xcode.app/Contents';
            default:
                return null;
        }
    }
}