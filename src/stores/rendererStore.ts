import { createStore, applyMiddleware, compose } from 'redux';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import crashReporter from '../middlewares/crashReporter';
import logger from '../middlewares/logger';
import forwardToMain from '../middlewares/forwardToMain';
import rootReducer from '../reducers/renderProc';
import { onRenderStoreCreated } from '../actions/rendererActions';

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
  composeEnhancers(applyMiddleware(forwardToMain, logger, crashReporter)),
);
const onFetchMainStoreState = () => {
  store.dispatch(onRenderStoreCreated());
};
onFetchMainStoreState();
ipcRenderer.on('message', (event: IpcRendererEvent, message) => {
  console.log('[on message]', event, message);
  onFetchMainStoreState();
});
export default store;
