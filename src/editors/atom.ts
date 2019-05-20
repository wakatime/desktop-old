import Editor from './editor'
import { CommandExists } from '../lib/command-exists';
import * as os from 'os';
import * as fs from 'async-file'
import * as path from 'path'

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export default class Atom implements Editor {

    private commandExists = new CommandExists();

    public get name(): string {
        return 'atom'
    }

    public get displayName(): string {
        return 'Atom'
    }

    public get icon(): string {
        return ''
    }

    public async isEditorInstalled(): Promise<boolean> {
        try {
            return await this.commandExists.exists(this.name);
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    public async isPluginInstalled(): Promise<boolean> {
        if (await this.isDirectory(this.pluginsDirectory()))
            return true;

        try {
            return await this.apm();
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    public async installPlugin(): Promise<void> {
        return Promise.reject('method not implemented');
    }

    public async uninstallPlugin(): Promise<void> {
        return Promise.reject('method not implemented');
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
                return path.join(os.homedir(), '.atom/packages/wakatime');
            case 'linux':
                return ''
            default:
                return null;
        }
    }

    public async apm(): Promise<boolean> {
        const { stdout, stderr } = await exec('apm list -p -i -j');
        if (stderr)
            return Promise.reject(stderr);

        let json = JSON.parse(stdout);
        let obj = json.user.find(n => n.name === 'wakatime');
        return Promise.resolve(obj != undefined);
    }
}
