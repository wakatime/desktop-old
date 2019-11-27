import React from 'react';
import PropTypes from 'prop-types';

import Loader from './Loader';
import { useStyles } from '../themes';

const stylesFn = ({ color }) => {
  return {
    wrapper: {
      cursor: 'pointer',
      userSelect: 'none',
      display: 'inline-flex',
      fontWeight: 400,
      textAlign: 'center',
      verticalAlign: 'middle',
      border: '1px solid transparent',
      padding: '.375rem .75rem',
      fontSize: '1rem',
      lineHeight: '1.5',
      borderRadius: '.25rem',
      transition:
        'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out',
      color: '#fff',
      backgroundColor: color.primary,
      borderColor: color.primary,
      minWidth: '70px',
      justifyContent: 'center',
      ':hover': {
        backgroundColor: color.secondary,
        borderColor: color.secondary,
      },
    },
    enabled: {
      opacity: 1,
    },
    disabled: {
      opacity: 0.6,
    },
    text: {},
    textLoading: {
      marginRight: '.25rem',
    },
  };
};

const Button = ({ enabled, text, onClick, loading }) => {
  const { css, styles } = useStyles({ stylesFn });

  return (
    <div
      onClick={() => (enabled ? onClick() : '')}
      {...css(styles.wrapper, enabled ? styles.enabled : styles.disabled)}
    >
      <span {...css(loading ? styles.textLoading : styles.text)}>{text}</span>
      {loading && <Loader />}
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  enabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  enabled: true,
  loading: false,
  onClick: null,
};

export default Button;
