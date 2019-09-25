import React, { useState } from 'react'
import { connect } from "react-redux";

import { useStyles } from '../themes';
import Button from './Button';

const InstallEditors = ({ editors }) => {

  const [installing, setInstalling] = useState(false);
  const { css, styles } = useStyles({ stylesFn });

  /**
   * Install Wakatime plugin on all available editors in the system
   */
  const installAllEditors = async () => {
    setInstalling(true);
    for (const editor of editors) {
      if (editor.name === 'Visual Studio Code') {
        await editor.instance.installPlugin();
      }
    };
    setInstalling(false);
  }

  return (
    <div {...css(styles.div)}>
      <Button text="Install" onClick={installAllEditors} enabled={!installing} />
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
  editors: editors.filter(e => e.enabled)
});

export default connect(
  mapStateToProps
)(InstallEditors);
