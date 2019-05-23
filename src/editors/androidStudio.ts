import Editor from "./editor";
import { CommandExists } from "../lib/command-exists";
import * as os from 'os';
import * as fs from 'async-file'
import * as fs_sync from 'fs';
import * as path from 'path'

const plist = require('plist');

export default class AndroidStudio implements Editor {

    private plistObj; any = {};
    private commandExists = new CommandExists();

    constructor() {
        this.readPreferences();
    }

    public get name(): string {
        return 'editor'
    }

    public get displayName(): string {
        return 'Android Studio'
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
        return await this.fileExists(path.join(this.pluginsDirectory(), 'WakaTime.jar'));
    }

    public async installPlugin(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async uninstallPlugin(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async fileExists(file: string): Promise<boolean> {
        return await fs.exists(file);
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
                let version = this.plistObj['CFBundleShortVersionString'];
                return path.join(os.homedir(), `Library/Application Support/AndroidStudio${version}`);
            case 'linux':
                return ''
            default:
                return null;
        }
    }

    private readPreferences(): void {
        switch (os.platform()) {
            case 'win32':
                break;
            case 'darwin':
                let plistFile = path.join(this.appDirectory(), 'Info.plist');
                this.plistObj = plist.parse(fs_sync.readFileSync(plistFile, 'utf8'));
                break;
            default:
                break;
        }
    }

    private appDirectory(): string {
        switch (os.platform()) {
            case 'win32':
                return '';
            case 'darwin':
                return '/Applications/Android Studio.app/Contents';
            default:
                return null;
        }
    }
}