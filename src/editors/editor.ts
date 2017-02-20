declare interface Editor {
    name: string;
    icon: string;
    isEditorInstalled(): Promise<boolean>;
    isPluginInstalled(): Promise<boolean>;
    installPlugin(): Promise<void>;
    uninstallPlugin(): Promise<void>;
}

export default Editor;
