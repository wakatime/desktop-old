import { Store, Dispatch, Action } from 'redux';

const logger = (store: Store) => (next: Dispatch) => (action: Action) => {
  const { getState } = store;
  const beforeActionState = getState();
  const result = next(action);
  const afterActionState = getState();
  console.info('action', action, 'beforeState', beforeActionState, 'afterState', afterActionState);
  return result;
};
export default logger;
