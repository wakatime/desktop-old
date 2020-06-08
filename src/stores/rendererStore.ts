import { createStore, applyMiddleware, compose } from 'redux';
import { ipcRenderer, IpcRendererEvent } from 'electron';

import crashReporter from '../middlewares/crashReporter';
import reduxLogger from '../middlewares/logger';
import forwardToMain from '../middlewares/forwardToMain';
import rootReducer from '../reducers/renderProc';
import { onRenderStoreCreated } from '../actions/rendererActions';
import logger from '../utils/logger';

let composeEnhancers = compose;
// @ts-ignore
if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  // @ts-ignore
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
}
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(forwardToMain, reduxLogger, crashReporter)),
);
const onFetchMainStoreState = () => {
  store.dispatch(onRenderStoreCreated());
};
// onFetchMainStoreState();
ipcRenderer.on('message', (event: IpcRendererEvent, message) => {
  logger.debug(`[on message] ${event} ${message}`);
  // onFetchMainStoreState();
});
export default store;
