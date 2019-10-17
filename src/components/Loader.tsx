import React from 'react';

import { useStyles } from '../themes';

const stylesFn = ({ loader }) => {
  return {
    loader: loader.small,
  };
};

export default function Loader() {
  const { css, styles } = useStyles({ stylesFn });
  return <div {...css(styles.loader)} />;
}
