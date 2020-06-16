import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { useStyles } from '../themes';
import Button from './Button';

import { setEditorEnabled, clearSelectEditors } from '../actions/rendererActions';

const stylesFn = () => {
  return {
    div: {
      marginBottom: '1rem',
      textAlign: 'center',
    },
    installSelected: {
      marginBottom: '1rem',
      textAlign: 'center',
      position: 'fixed',
      width: '100%',
    },
  };
};

const InstallEditors = ({ editors, setEditorEnabled: see, clearSelectEditors: cse }) => {
  const [installing, setInstalling] = useState(false);
  const { css, styles } = useStyles({ stylesFn });
  const selected = editors.filter((e) => e.isSelected);

  const installPlugin = async (editor) => {
    // try to install the plugin and check if it was installed or not
    await editor.instance.installPlugin();
    const editorInstalled = await editor.instance.isPluginInstalled();
    see({
      name: editor.name,
      enabled: editorInstalled,
    });
  };

  /**
   * Install Wakatime plugin on all available editors in the system
   */
  const installAllEditors = async () => {
    // TODO: @alanhamlett do we want this confirm here? i think is good but you have the last word on this
    const confirmation = window.confirm('Do you want to install Wakatime on all the editors?');
    if (confirmation) {
      setInstalling(true);
      const editorsToInstall = [];
      editors.map((editor) => {
        if (editor.isSelected && !editor.enabled) {
          editorsToInstall.push(installPlugin(editor));
        }
        return editor;
      });
      await Promise.all(editorsToInstall);
      cse();
      setInstalling(false);
    }
  };

  return (
    <div {...css(styles.div)}>
      {selected.length > 0 && (
        <div {...css(styles.installSelected)}>
          <Button
            text="Install"
            onClick={installAllEditors}
            enabled={!installing}
            loading={installing}
          />
        </div>
      )}
    </div>
  );
};

InstallEditors.propTypes = {
  editors: PropTypes.array,
  setEditorEnabled: PropTypes.func,
  clearSelectEditors: PropTypes.func,
};

InstallEditors.defaultProps = {
  editors: [],
  setEditorEnabled: null,
  clearSelectEditors: null,
};

const mapStateToProps = ({ editors = [] }) => ({
  editors: editors.filter((e) => e.installed),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setEditorEnabled,
      clearSelectEditors,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InstallEditors);
