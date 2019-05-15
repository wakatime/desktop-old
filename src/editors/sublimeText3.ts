import Editor from './editor'
import * as os from 'os';
import * as fs from 'async-file'
import * as path from 'path'

export default class SublimeText3 implements Editor {

    public get name(): string {
        return 'subl'
    }

    public get displayName(): string {
        return 'Sublime Text 3'
    }

    public get icon(): string {
        return ''
    }

    public async isEditorInstalled(): Promise<boolean> {
        let stats = await fs.stat(this.appDirectory());
        return Promise.resolve(stats.isDirectory());
    }

    public async isPluginInstalled(): Promise<boolean> {
        let stats = await fs.stat(this.pluginsDirectory());
        return Promise.resolve(stats.isDirectory());
    }

    public async installPlugin(): Promise<void> {
        return Promise.reject('method not implemented');
    }

    public async uninstallPlugin(): Promise<void> {
        return Promise.reject('method not implemented');
    }

    private appDirectory(): string {
        var dir: string;
        switch (os.platform()) {
            case 'win32':
                break;
            case 'darwin':
                dir = '/Applications/Sublime Text.app/Contents'
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
                return path.join(os.homedir(), 'Library/Application Support/Sublime Text 3/Packages/WakaTime');
            case 'linux':
                return ''
            default:
                return null;
        }
    }
}
