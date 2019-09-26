import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "../themes";

const Button = ({ enabled, text, styles, css, onClick }) => {
  return (
    <div
      onClick={onClick}
      {...css(styles.wrapper, enabled ? styles.enabled : styles.disabled)}
    >
      {text}
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  enabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  styles: PropTypes.object,
  css: PropTypes.func
};
Button.defaultProps = {
  styles: {},
  css: () => {}
};
export default withStyles(() => ({
  wrapper: {
    textAlign: "center",
    border: "1px solid #947777",
    width: "fit-content",
    padding: "0.3em 0.8em",
    borderRadius: "3px",
    cursor: "pointer",
    userSelect: 'none'
  },
  enabled: {
    opacity: 1
  },
  disabled: {
    opacity: 0.6
  }
}))(Button);