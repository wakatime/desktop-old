import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import Apikey from '../components/apikey/Apikey';
import store from '../stores/rendererStore';

const div = document.getElementById('apikey-container');
if (div) {
  render(
    <Provider store={store}>
      <Apikey />
    </Provider>,
    div,
  );
}
