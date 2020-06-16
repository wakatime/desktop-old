import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ipcRenderer, shell } from 'electron';
import moment from 'moment-timezone';

import EditorIcon from './EditorIcon';
import { enableEditors, selectEditorToInstall } from '../actions/rendererActions';
import { useStyles } from '../themes';
import { getEditorsState } from '../utils/editors';
import Loader from './Loader';

const stylesFn = () => {
  return {
    loader: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    div: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    plugin: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: '30px 40px',
      fontSize: '15px',
      color: '#637280',
      border: '1px solid #e0e0e0',
      lineHeight: '1.2',
      fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",sans-serif',
    },
    pluginName: {
      marginBottom: '3px',
      fontSize: '20px',
      fontWeight: '300',
    },
    statusText: {
      textAlign: 'right',
      marginTop: '5px',
      fontSize: '15px',
    },
    pluginVersion: {
      cursor: 'pointer',
      color: '#337ab7',
      ':hover': {
        color: '#23527c',
        textDecoration: 'underline',
      },
    },
    cliVersion: {
      cursor: 'pointer',
      color: '#337ab7',
      ':hover': {
        color: '#23527c',
        textDecoration: 'underline',
      },
    },
  };
};

const ActiveEditors = ({ editors, enableEditors: ee, selectEditorToInstall: seti }) => {
  const { css, styles } = useStyles({ stylesFn });
  const [loading, setLoading] = useState(true);
  const [userAgents, setUserAgents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ua = ipcRenderer.sendSync('get-user-agents');
      const enabledEditors = await getEditorsState(editors);
      ee(enabledEditors);
      setUserAgents(ua);
      setLoading(false);
    };
    fetchData();
  }, []); // eslint-disable-line

  const onCheckboxChange = (changeEvent, selected) => {
    const { name } = changeEvent.target;

    seti({ name, selected });
  };

  if (loading) {
    return (
      <div {...css(styles.loader)}>
        <Loader />
      </div>
    );
  }

  return (
    <div {...css(styles.div)}>
      {userAgents.map((editor) => {
        const values = editor.value.split(' ');
        return (
          <div {...css(styles.plugin)}>
            <div>
              <div {...css(styles.pluginName)}>{editor.editor}</div>
              <div>
                <strong>Last Seen: </strong>
                <span title="something">
                  {moment.tz(editor.last_seen, moment.tz.guess()).fromNow()}
                </span>
              </div>
              <div>
                <strong>Version: </strong>
                <span
                  {...css(styles.pluginVersion)}
                  onClick={() => shell.openExternal('https://github.com/wakatime/vscode-wakatime/blob/master/CHANGELOG.md#changelog')}
                >
                  {editor.version}
                </span>
                {' with cli '}
                <span
                  {...css(styles.cliVersion)}
                  onClick={() => shell.openExternal('https://github.com/wakatime/wakatime/blob/master/HISTORY.rst#history')}
                >
                  {values[0].split('/')[1]}
                </span>
              </div>
            </div>
            <div>
              <div {...css(styles.statusText)}>
                <div {...css(styles.updated)}>OK</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

ActiveEditors.propTypes = {
  editors: PropTypes.array,
  enableEditors: PropTypes.func,
  selectEditorToInstall: PropTypes.func,
};
ActiveEditors.defaultProps = {
  editors: [],
  enableEditors: null,
  selectEditorToInstall: null,
};

const mapStateToProps = ({ editors = [] }) => ({
  editors: editors.filter((e) => e.installed),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      enableEditors,
      selectEditorToInstall,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveEditors);
