import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '../themes';

const EditorIcon = ({ enabled, img, name, imageStyles = {} }) => {
  const stylesFn = () => {
    return {
      wrapper: {
        textAlign: 'center',
      },
      img: {
        width: 'auto',
        height: '20vw',
        maxHeight: 128,
        minHeight: 48,
        margin: '.5rem',
        ...imageStyles,
      },
      enabled: {
        opacity: 1,
      },
      disabled: {
        opacity: 0.6,
        filter: 'grayscale(100%)',
      },
    };
  };

  const { css, styles } = useStyles({ stylesFn });

  return (
    <div {...css(styles.wrapper)}>
      <img {...css(styles.img, enabled ? styles.enabled : styles.disabled)} alt={name} src={img} />
    </div>
  );
};

EditorIcon.propTypes = {
  enabled: PropTypes.bool.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageStyles: PropTypes.object,
};
EditorIcon.defaultProps = {
  imageStyles: {},
};

export default EditorIcon;
