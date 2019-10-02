import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { useStyles } from "../themes";
import Button from "./Button";

import {
  setEditorEnabled,
  clearSelectEditors
} from "../actions/rendererActions";

const InstallEditors = ({ editors, setEditorEnabled, clearSelectEditors }) => {
  const [installing, setInstalling] = useState(false);
  const { css, styles } = useStyles({ stylesFn });

  const installPlugin = async editor => {
    await editor.instance.installPlugin();
    setEditorEnabled({ name: editor.name });
  };

  /**
   * Install Wakatime plugin on all available editors in the system
   */
  const installAllEditors = async () => {
    // TODO: @alanhamlett do we want this confirm here? i think is good but you have the last word on this
    const confirmation = confirm(
      "Do you want to install Wakatime on all the editors?"
    );
    if (confirmation) {
      setInstalling(true);
      const editorsToInstall = [];
      for (const editor of editors) {
        // Install only editors that the user picked and are not already installed
        if (editor.isSelected && !editor.enabled) {
          editorsToInstall.push(installPlugin(editor));
        }
      }
      await Promise.all(editorsToInstall);
      clearSelectEditors();
      setInstalling(false);
    }
  };

  return (
    <div {...css(styles.div)}>
      <Button
        text="Install"
        onClick={installAllEditors}
        enabled={!installing}
        loading={installing}
      />
    </div>
  );
};

const stylesFn = () => {
  return {
    div: {
      marginBottom: "1rem",
      textAlign: "center"
    }
  };
};

const mapStateToProps = ({ editors = [] }) => ({
  editors: editors.filter(e => e.installed)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setEditorEnabled,
      clearSelectEditors
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallEditors);
