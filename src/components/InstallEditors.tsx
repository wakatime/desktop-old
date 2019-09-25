import React, { useState } from 'react'
import { connect } from "react-redux";

import Button from './Button';

const InstallEditors = ({ editors }) => {
  
  const [installing, setInstalling] = useState(false);
  const [uninstalling, setUninstalling] = useState(false);

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

  /**
   * Uninstall Wakatime plugin on all available editors in the system
   */
  const uninstallAllEditors = async () => {
    setUninstalling(true);
    for (const editor of editors) {
      if (editor.name === 'Visual Studio Code') {
        await editor.instance.uninstallPlugin();
      }
    };
    setUninstalling(false);
  }

  return (
    <div>
      <Button text="Install" onClick={installAllEditors} enabled={!installing} />
      <Button text="UnInstall" onClick={uninstallAllEditors} enabled={!uninstalling} />
    </div>
  )
}

const mapStateToProps = ({ editors = [] }) => ({
  editors: editors.filter(e => e.enabled)
});

export default connect(
  mapStateToProps
)(InstallEditors);
