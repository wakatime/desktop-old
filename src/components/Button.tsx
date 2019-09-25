import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "../themes";

const Button = ({ enabled, text, onClick }) => {

  const { css, styles } = useStyles({ stylesFn });

  return (
    <div
      onClick={() => enabled ? onClick() : console.log('disabled')}
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
};

Button.defaultProps = {
  enabled: true
};

const stylesFn = () => {
  return ({
    wrapper: {
      cursor: "pointer",
      userSelect: 'none',
      display: 'inline-block',
      fontWeight: 400,
      textAlign: 'center',
      verticalAlign: 'middle',
      border: '1px solid transparent',
      padding: '.375rem .75rem',
      fontSize: '1rem',
      lineHeight: '1.5',
      borderRadius: '.25rem',
      transition: 'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out',
      color: '#fff',
      backgroundColor: '#17a2b8',
      borderColor: '#17a2b8',
      ':hover': {
        backgroundColor: '#138496',
        borderColor: '#117a8b'
      }
    },
    enabled: {
      opacity: 1
    },
    disabled: {
      opacity: 0.6
    }
  });
}

export default Button;
