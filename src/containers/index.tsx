import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import ActiveEditors from '../components/ActiveEditors';
import InstallEditors from '../components/InstallEditors';
// import Tray from '../components/tray-menu/Tray';
import store from '../stores/rendererStore';
import isMainProcess from '../utils/isMainProcess';
import logger from '../utils/logger';

const div = document.getElementById('container');

logger.debug(`isMainProcess ${isMainProcess ? 'true' : 'false'}`);

if (div) {
  render(
    <Provider store={store}>
      <InstallEditors />
      <ActiveEditors />
      {/* <Tray /> */}
    </Provider>,
    div,
  );
}
