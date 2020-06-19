import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from '../themes';

const stylesFn = ({ loader }) => {
  return {
    small: loader.small,
    medium: loader.medium,
  };
};

const Loader = ({ size }) => {
  const { css, styles } = useStyles({ stylesFn });
  return <div {...css(styles[size] || styles.small)} />;
};

Loader.propTypes = {
  size: PropTypes.string,
};
Loader.defaultProps = {
  size: null,
};

export default Loader;
