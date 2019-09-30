import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "../themes";

const EditorIcon = ({ enabled, img, name, styles, css }) => {
  return (
    <div {...css(styles.wrapper)}>
      <img
        {...css(styles.img, enabled ? styles.enabled : styles.disabled)}
        alt={name}
        src={img}
      />
    </div>
  );
};

EditorIcon.propTypes = {
  enabled: PropTypes.bool.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  height: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  maxHeight: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  styles: PropTypes.object,
  css: PropTypes.func
};
EditorIcon.defaultProps = {
  height: "20vw",
  width: "auto",
  maxHeight: 100,
  styles: {},
  css: () => {}
};
export default withStyles(() => ({
  wrapper: {
    textAlign: "center"
  },
  img: {
    width: "auto",
    height: "20vw",
    maxHeight: 128,
    minHeight: 48,
    margin: '.5rem'
  },
  enabled: {
    opacity: 1
  },
  disabled: {
    filter: "grayscale(100%)"
  }
}))(EditorIcon);
