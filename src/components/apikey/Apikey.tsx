import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import { useStyles } from '../../themes';
import Button from '../Button';
import { Options } from '../../utils/options';

const stylesFn = () => {
  return {
    div: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
    },
    input: {
      // height: '70px',
      lineHeight: '1.5',
      padding: '.375rem .75rem',
      minWidth: '285px',
      fontWeight: '400',
      fontSize: '14px',
      marginBottom: '5px',
    },
  };
};

const options = new Options();

const ApiKey = () => {
  const { css, styles } = useStyles({ stylesFn });
  const [key, setKey] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const apikey = await options.getApiKeyAsync();
      setKey(apikey);
    };
    fetchData();
  }, []); // eslint-disable-line

  return (
    <div {...css(styles.div)}>
      <input
        {...css(styles.input)}
        type="input"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        maxLength={36}
      />
      <div>
        <Button text="Update" onClick={() => console.log('Update')} />{' '}
        <Button text="Cancel" onClick={() => ipcRenderer.send('close-apikey')} />
      </div>
    </div>
  );
};

export default ApiKey;
