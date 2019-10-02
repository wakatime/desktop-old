import React from "react";

import { useStyles } from "../themes";

export default function Loader() {
  const { css, styles } = useStyles({ stylesFn });
  return <div {...css(styles.loader)} />;
}

const stylesFn = ({ loader }) => {
  return {
    loader: loader.small
  };
};
