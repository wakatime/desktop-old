/**
 * Sorts the editors by the ones with the plugin installed first
 * @param editors
 */
export const orderByInstalledPlugin = editors => {
  return editors.sort((x, y) => {
    return x.enabled === y.enabled ? 0 : x.enabled ? -1 : 1;
  });
};

/**
 * Returns the current state of local editors, if they are installed and enable
 * @param editors
 */
export const getEditorsState = async editors => {
  const editorsList = await Promise.all(
    editors.map(async editor => {
      // This try catch will go away once the `isPluginInstalled` is implemented on each editor
      // right now we need to have it so it wont blow up at this point
      let enabled = false;
      try {
        enabled = await editor.instance.isPluginInstalled();
      } catch (err) {
        enabled = false;
      }
      return {
        ...editor,
        installed: await editor.instance.isEditorInstalled(),
        enabled,
      };
    }),
  );

  return orderByInstalledPlugin(editorsList);
};
