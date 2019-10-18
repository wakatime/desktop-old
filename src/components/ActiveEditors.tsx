import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EditorIcon from './EditorIcon';
import { enableEditors, selectEditorToInstall } from '../actions/rendererActions';
import { useStyles } from '../themes';
import { getEditorsState } from '../utils/editors';

const stylesFn = () => {
  return {
    div: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    editor: {
      textAlign: 'center',
      marginBottom: '.5rem',
      borderRadius: '.3rem',
      ':hover': {
        backgroundColor: '#f5fbfb',
      },
    },
    editorName: {
      fontSize: '.9rem',
      opacity: 0.6,
    },
  };
};

const ActiveEditors = ({ editors, enableEditors: ee, selectEditorToInstall: seti }) => {
  const { css, styles } = useStyles({ stylesFn });

  useEffect(() => {
    const fetchData = async () => {
      const enabledEditors = await getEditorsState(editors);
      ee(enabledEditors);
    };
    fetchData();
  }, []); // eslint-disable-line

  const onCheckboxChange = (changeEvent, selected) => {
    const { name } = changeEvent.target;

    seti({ name, selected });
  };

  return (
    <div {...css(styles.div)}>
      {editors.map(editor => (
        <div
          {...css(styles.editor)}
          onClick={() => seti({ name: editor.name, selected: !editor.isSelected })}
        >
          <EditorIcon {...editor} />
          <div {...css(styles.editorName)}>
            {editor.name} :{editor.enabled ? 'true' : 'false'}
          </div>
          <input
            type="checkbox"
            checked={editor.isSelected}
            name={editor.name}
            onChange={e => onCheckboxChange(e, !editor.isSelected)}
          />
        </div>
      ))}
    </div>
  );
};

ActiveEditors.propTypes = {
  editors: PropTypes.array,
  enableEditors: PropTypes.func,
  selectEditorToInstall: PropTypes.func,
};
ActiveEditors.defaultProps = {
  editors: [],
  enableEditors: null,
  selectEditorToInstall: null,
};

const mapStateToProps = ({ editors = [] }) => ({
  editors: editors.filter(e => e.installed),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      enableEditors,
      selectEditorToInstall,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveEditors);
