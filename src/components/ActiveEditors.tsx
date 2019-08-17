import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EditorIcon from "./EditorIcon";

const ActiveEditors = ({ editors }) => (
  <div>
    {editors.map(editor => (
      <EditorIcon {...editor} />
    ))}
  </div>
);
ActiveEditors.propTypes = {
  editors: PropTypes.array
};
ActiveEditors.defaultProps = {
  editors: []
};
const mapStateToProps = ({ editors = [] }) => ({
  editors: editors.filter(e => e.enabled)
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveEditors);
