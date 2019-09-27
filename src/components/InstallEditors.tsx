import React, { useState } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { useStyles } from '../themes';
import Button from './Button';
import { enableEditors } from '../actions/rendererActions';
import { getEditorsState } from '../utils/editors';

const InstallEditors = ({ editors, enableEditors }) => {

  const [installing, setInstalling] = useState(false);
  const { css, styles } = useStyles({ stylesFn });

  /**
   * Install Wakatime plugin on all available editors in the system
   */
  const installAllEditors = async () => {
    setInstalling(true);
    for (const editor of editors) {

      // TODO: Remove this if once the `installPlugin` is implemented on all editors
      if (editor.name === 'Visual Studio Code' || editor.name === 'Processing') {
        await editor.instance.installPlugin();
      }
    };
    const enabledEditors = await getEditorsState(editors);
    enableEditors(enabledEditors);
    setInstalling(false);
  }

  return (
    <div {...css(styles.div)}>
      <Button
        text="Install"
        onClick={installAllEditors}
        enabled={!installing}
        loading={installing}
      />
    </div>
  )
}

const stylesFn = () => {
  return ({
    div: {
      marginBottom: '1rem',
      textAlign: 'center'
    }
  });
}

const mapStateToProps = ({ editors = [] }) => ({
  editors: editors.filter(e => e.installed)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      enableEditors
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallEditors);
