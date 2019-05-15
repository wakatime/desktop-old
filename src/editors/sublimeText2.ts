import Editor from './editor'
import * as os from 'os';
import * as fs from 'async-file'
import * as path from 'path'

export default class SublimeText2 implements Editor {

    public get name(): string {
        return 'subl'
    }

    public get displayName(): string {
        return 'Sublime Text 2'
    }

    public get icon(): string {
        return ''
    }

    public async isEditorInstalled(): Promise<boolean> {
        let stats = await fs.stat(this.appDirectory());
        return new Promise<boolean>((resolve) => {
            resolve(stats.isDirectory());
        });
    }

    public async isPluginInstalled(): Promise<boolean> {
        let pluginDir = path.join(this.pluginsDirectory(), 'WakaTime');
        let stats = await fs.stat(pluginDir);
        return new Promise<boolean>(resolve => {
            resolve(stats.isDirectory());
        });
    }

    public async installPlugin(): Promise<void> {
        return new Promise<void>(resolve => {
            resolve();
        });
    }

    public async uninstallPlugin(): Promise<void> {
        return new Promise<void>(resolve => {
            resolve();
        });
    }

    private appDirectory(): string {
        var dir: string;
        switch (os.platform()) {
            case 'win32':
                break;
            case 'darwin':
                dir = '/Applications/Sublime Text 2.app/Contents'
                break;
            default:
                dir = null;
        }
        return dir;
    }

    private pluginsDirectory(): string {
        switch (os.platform()) {
            case 'win32':
                var is64bit = process.arch === 'x64' || process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432');
                if (is64bit)
                    return ''
                else
                    return ''
            case 'darwin':
                return path.join(os.homedir(), 'Library/Application Support/Sublime Text 2/Packages');
            case 'linux':
                return ''
            default:
                return null;
        }
    }
}
