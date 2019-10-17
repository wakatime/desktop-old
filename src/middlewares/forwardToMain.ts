import { Store, Dispatch, Action } from 'redux';
import { ipcRenderer } from 'electron';
import isRenderProcess from '../utils/isRendererProcess';
import isForwardToMainAction from '../utils/isForwardToMainAction';
import { setMainProcessState } from '../actions/rendererActions';

const forwardToMain = (store: Store) => (next: Dispatch) => (action: Action) => {
  const result = next(action);
  if (isRenderProcess && isForwardToMainAction(action)) {
    // This should happen on the render process
    const mainProcessState = ipcRenderer.sendSync('synchronous-message', action);
    store.dispatch(setMainProcessState(mainProcessState));
  }
  return result;
};
export default forwardToMain;
