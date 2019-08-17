import React from "react";
import PropTypes from "prop-types";

const EditorIcon = ({ enabled, img, name, width, height, maxHeight }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        alt={name}
        src={img}
        style={{
          opacity: enabled ? 1 : 0.6,
          width,
          height,
          maxHeight
        }}
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
  maxHeight: PropTypes.oneOf([PropTypes.number, PropTypes.string])
};
EditorIcon.defaultProps = {
  height: "20vw",
  width: "auto",
  maxHeight: 100
};
export default EditorIcon;
