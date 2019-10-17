import { composeWithDevTools } from 'remote-redux-devtools';
import { createStore, compose, applyMiddleware } from 'redux';
import { ipcMain } from 'electron';
import mainProcessReducer from '../reducers/mainProc';
import forwardToRenderer from '../middlewares/forwardToRenderer';
import logger from '../middlewares/logger';
import crashReporter from '../middlewares/crashReporter';
import isForwardToMainAction from '../utils/isForwardToMainAction';

let composeEnhancer = compose;
if (process.env.NODE_ENV === 'development') {
  composeEnhancer = composeWithDevTools({
    host: 'localhost',
    port: 8000,
    realtime: true,
  });
}
const store = createStore(
  mainProcessReducer,
  composeEnhancer(applyMiddleware(forwardToRenderer, logger, crashReporter)),
);
ipcMain.on('synchronous-message', (event, action) => {
  if (isForwardToMainAction(action)) {
    store.dispatch(action);
  }
  // eslint-disable-next-line no-param-reassign
  event.returnValue = store.getState();
});
export default store;
