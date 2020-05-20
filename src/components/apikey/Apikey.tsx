import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { useStyles } from '../../themes';
import Button from '../Button';

const stylesFn = () => {
  return {};
};

const Apikey = ({ apikey }) => {
  const { css, styles } = useStyles({ stylesFn });

  useEffect(() => {
    const fetchData = async () => { };
    fetchData();
  }, []); // eslint-disable-line

  return (
    <div {...css(styles.div)}>
      <input type="input" />
      <Button text="Update" onClick={() => console.log('Update')} />
      <Button text="Cancel" onClick={() => console.log('Cancel')} />
    </div>
  );
};

Apikey.propTypes = { apikey: PropTypes.string };

Apikey.defaultProps = { apikey: '' };

const mapStateToProps = ({ apikey = '' }) => ({ apikey: '' });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Apikey);
