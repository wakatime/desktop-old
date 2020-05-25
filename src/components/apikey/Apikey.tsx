import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import { useStyles } from '../../themes';
import Button from '../Button';
import Options from '../../utils/options';
import Libs from '../../utils/libs';

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
      lineHeight: '1.5',
      padding: '.375rem .75rem',
      minWidth: '285px',
      fontWeight: '400',
      fontSize: '14px',
      marginBottom: '5px',
    },
    success: {
      color: '#00ff00',
    },
    error: {
      color: '#ff0000',
    },
  };
};

const options = new Options();

const ApiKey = () => {
  const { css, styles } = useStyles({ stylesFn });
  const [key, setKey] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const apikey = await options.getApiKeyAsync();
      setKey(apikey);
    };
    fetchData();
  }, []); // eslint-disable-line

  const updateApiKey = () => {
    setLoading(true);
    if (key !== undefined) {
      const validation = Libs.validateKey(key);
      if (validation === '') {
        options.setSetting('settings', 'api_key', key);
        setMessage({ level: 'success', msg: 'Api updated' });
      } else setMessage({ level: 'error', msg: validation });
    } else setMessage({ level: 'error', msg: 'WakaTime api key not provided' });
    setLoading(false);
  };

  return (
    <div {...css(styles.div)}>
      {message && <div {...css(styles[message.level])}>{message.msg}</div>}
      <input
        {...css(styles.input)}
        type="input"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        maxLength={36}
        autoFocus
      />
      <div>
        <Button text="Update" onClick={() => updateApiKey()} loading={loading} enabled={!loading} />{' '}
        <Button text="Cancel" onClick={() => ipcRenderer.send('close-apikey')} enabled={!loading} />
      </div>
    </div>
  );
};

export default ApiKey;
