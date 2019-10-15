/* eslint-disable no-undef */
import { Store, Dispatch, Action } from 'redux';
import isMainProcess from '../utils/isMainProcess';
import isForwardToRendererAction from '../utils/isForwardToRendererAction';

let wins = [];
export const registerWindow = win => {
  wins.push(win);
};
export const unRegisterWindow = win => {
  wins = wins.filter(w => w !== win);
};

const forwardToMain = (store: Store) => (next: Dispatch) => (action: Action) => {
  const result = next(action);

  if (isMainProcess && isForwardToRendererAction(action)) {
    const msgArgs = ['message', store.getState()];
    wins.forEach(w => {
      console.log('forwarding message', w);
      w.webContents.send(...msgArgs);
    });
  }
  return result;
};
export default forwardToMain;
