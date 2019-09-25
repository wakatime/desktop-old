import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EditorIcon from "./EditorIcon";
import { enableEditors } from '../actions/rendererActions';
import { useStyles } from '../themes';

const ActiveEditors = ({ editors, enableEditors }) => {

  const { css, styles } = useStyles({ stylesFn });

  useEffect(() => {
    const fetchData = async () => {
      const enabledEditors = await Promise.all(editors.map(async editor => {
        return {
          ...editor,
          enabled: await editor.instance.isEditorInstalled()
        }
      }))
      enableEditors(enabledEditors);
    };
    fetchData();
  }, []); // eslint-disable-line

  return (
    <div {...css(styles.div)}>
      {editors.map(editor => (
        <EditorIcon {...editor} />
      ))}
    </div>
  )
};
ActiveEditors.propTypes = {
  editors: PropTypes.array
};
ActiveEditors.defaultProps = {
  editors: []
};

const stylesFn = () => {
  return ({
    div: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  });
}

const mapStateToProps = ({ editors = [] }) => ({
  editors: editors.filter(e => e.enabled)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      enableEditors
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveEditors);
