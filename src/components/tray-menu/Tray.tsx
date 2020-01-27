import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import EditorIcon from '../EditorIcon';
import { useStyles } from '../../themes';
import Button from '../Button';
import { getEditorsState } from '../../utils/editors';
import {
  selectEditorToInstall,
  enableEditors,
  setEditorEnabled,
  clearSelectEditors,
} from '../../actions/rendererActions';
import checkImage from '../../imgs/check.png';

const stylesFn = () => {
  return {
    installSelected: {
      marginBottom: '1rem',
      textAlign: 'center',
      position: 'fixed',
      width: '100%',
    },
    div: {
      borderRadius: '3px',
    },
    editor: {
      padding: '0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      userSelect: 'none',
      ':hover': {
        backgroundColor: '#ebebeb',
        cursor: 'default',
      },
    },
    clickableEditor: {
      padding: '0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      userSelect: 'none',
      ':hover': {
        backgroundColor: '#ebebeb',
        cursor: 'pointer',
      },
    },
    editorDesc: {
      display: 'flex',
      alignItems: 'center',
    },
    installed: {
      width: 12,
      margin: 3,
    },
  };
};

const Tray = ({
  editors,
  enableEditors: ee,
  selectEditorToInstall: seti,
  setEditorEnabled: see,
  clearSelectEditors: cse,
}) => {
  const imageStyles = {
    width: 'auto',
    height: '20px',
    minHeight: 15,
    margin: '0 10px',
  };

  const { css, styles } = useStyles({ stylesFn });
  const [installing, setInstalling] = useState(false);

  let enabled = [];
  let notEnabled = [];
  editors.forEach(e => {
    e.enabled ? enabled.push(e) : notEnabled.push(e);
  });
  enabled = enabled.sort((a, b) => a.name.localeCompare(b.name));
  notEnabled = notEnabled.sort((a, b) => a.name.localeCompare(b.name));
  const editorsList = enabled.concat(notEnabled);

  const selected = editorsList.filter(e => e.isSelected);

  useEffect(() => {
    const fetchData = async () => {
      const enabledEditors = await getEditorsState(editorsList);
      ee(enabledEditors);
    };
    fetchData();
  }, []); // eslint-disable-line

  const onCheckboxChange = editor => {
    if (!editor.enabled) {
      seti({ name: editor.name, selected: !editor.isSelected });
    }
  };

  const installPlugin = async editor => {
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
  const installAllEditors = async selectedEditors => {
    const message = `Install the plugin for ${selectedEditors} editor${selectedEditors > 1 ? 's' : ''}?`;
    const confirmation = window.confirm(message);

    if (confirmation) {
      setInstalling(true);
      const editorsToInstall = [];
      editorsList.map(editor => {
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
            onClick={() => installAllEditors(selected.length)}
            enabled={!installing}
            loading={installing}
          />
        </div>
      )}
      {editorsList.map(editor => {
        return (
          <div
            {...css(editor.enabled ? styles.editor : styles.clickableEditor)}
            onClick={() => !installing && onCheckboxChange(editor)}
          >
            <div {...css(styles.editorDesc)}>
              {editor.enabled ? (
                <img {...css(styles.installed)} src={checkImage} alt={editor.name} />
              ) : (
                <input
                  alt="Wakatime already installed"
                  type="checkbox"
                  checked={editor.isSelected}
                  name={editor.name}
                  disabled={editor.enabled}
                />
              )}
              <EditorIcon {...editor} imageStyles={imageStyles} />
              <div>{editor.name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Tray.propTypes = {
  editors: PropTypes.array,
  selectEditorToInstall: PropTypes.func,
  enableEditors: PropTypes.func,
  setEditorEnabled: PropTypes.func,
  clearSelectEditors: PropTypes.func,
};

Tray.defaultProps = {
  editors: [],
  selectEditorToInstall: null,
  enableEditors: null,
  setEditorEnabled: null,
  clearSelectEditors: null,
};

const mapStateToProps = ({ editors = [] }) => ({
  editors: editors.filter(e => e.installed), // .sort((a, b) => a.name.localeCompare(b.name)),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      selectEditorToInstall,
      enableEditors,
      setEditorEnabled,
      clearSelectEditors,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tray);
