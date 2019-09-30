/**
 * Returns the current state of local editors, if they are installed and enable
 * @param editors 
 */
export const getEditorsState = async (editors) => {
  return await Promise.all(editors.map(async editor => {

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
      enabled
    }
  }));
};
