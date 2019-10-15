import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import ActiveEditors from '../components/ActiveEditors';
import InstallEditors from '../components/InstallEditors';
import store from '../stores/rendererStore';
import isMainProcess from '../utils/isMainProcess';

console.log('isMainProcess', isMainProcess);
const div = document.getElementById('container');
render(
  <Provider store={store}>
    <InstallEditors />
    <ActiveEditors />
  </Provider>,
  div,
);
