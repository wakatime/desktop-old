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
      ':hover': {
        backgroundColor: '#ebebeb',
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
  const { css, styles } = useStyles({ stylesFn });
  const [showInstall, setShowInstall] = useState({});
  const [installing, setInstalling] = useState(false);

  let enabled = [];
  let notEnabled = [];
  editors.forEach(e => {
    e.enabled ? enabled.push(e) : notEnabled.push(e);
  });
  enabled = enabled.sort((a, b) => a.name.localeCompare(b.name));
  notEnabled = notEnabled.sort((a, b) => a.name.localeCompare(b.name));
  const editorsList = enabled.concat(notEnabled);

  useEffect(() => {
    const fetchData = async () => {
      const enabledEditors = await getEditorsState(editorsList);
      ee(enabledEditors);
    };
    fetchData();
  }, []); // eslint-disable-line

  const onCheckboxChange = (name, selected) => {
    seti({ name, selected });
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
  const installAllEditors = async () => {
    // TODO: @alanhamlett do we want this confirm here? i think is good but you have the last word on this
    const confirmation = window.confirm('Do you want to install Wakatime on all the editors?');
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

  const installSinglePlugin = async (e, editor) => {
    e.stopPropagation();
    // TODO: @alanhamlett do we want this confirm here? i think is good but you have the last word on this
    const confirmation = window.confirm(`Do you want to install Wakatime on ${editor.name}?`);
    if (confirmation) {
      setInstalling(true);
      await installPlugin(editor);
      cse();
      setInstalling(false);
    }
  };

  const imageStyles = {
    width: 'auto',
    height: '20px',
    minHeight: 15,
    margin: '0 10px',
  };

  const selected = editorsList.filter(e => e.isSelected);

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
      {editorsList.map(editor => {
        return (
          <div
            {...css(styles.editor)}
            onMouseEnter={() => setShowInstall({ [editor.name]: !editor.enabled && true })}
            onMouseLeave={() => setShowInstall({ [editor.name]: !editor.enabled && false })}
            onClick={() => onCheckboxChange(editor.name, !editor.isSelected)}
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
                  // onChange={e => onCheckboxChange(e.target.name, !editor.isSelected)}
                />
              )}
              <EditorIcon {...editor} imageStyles={imageStyles} />
              <div>{editor.name}</div>
            </div>
            {showInstall[editor.name] && (
              <button
                {...css(styles.install)}
                type="button"
                onClick={e => installSinglePlugin(e, editor)}
              >
                Install
              </button>
            )}
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
