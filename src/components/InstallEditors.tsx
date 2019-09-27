import React, { useState } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { useStyles } from '../themes';
import Button from './Button';

import { enableEditors, clearSelectEditors } from '../actions/rendererActions';
import { getEditorsState } from '../utils/editors';

const InstallEditors = ({ editors, enableEditors, clearSelectEditors }) => {

  const [installing, setInstalling] = useState(false);
  const { css, styles } = useStyles({ stylesFn });

  /**
   * Install Wakatime plugin on all available editors in the system
   */
  const installAllEditors = async () => {

    // TODO: @alanhamlett do we want this confirm here? i think is good but you have the last word on this
    const confirmation = confirm('Do you want to install Wakatime on all the editors?');
    if (confirmation) {
      setInstalling(true);
      for (const editor of editors) {

        // Install only editors that the user picked and are not already installed
        if (editor.isSelected && !editor.enabled) {
          await editor.instance.installPlugin();
        }
      };
      const enabledEditors = await getEditorsState(editors);
      enableEditors(enabledEditors);
      clearSelectEditors();
      setInstalling(false);
    }
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
      enableEditors,
      clearSelectEditors
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallEditors);
