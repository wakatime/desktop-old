import { Store, Dispatch, Action } from 'redux';

import logger from '../utils/logger';

const crashReporter = (store: Store) => (next: Dispatch) => (action: Action) => {
  let result;
  try {
    result = next(action);
  } catch (err) {
    // This will not trigger when the chrome redux extension takes control
    logger.error(
      'Uncaught exception:',
      err,
      '/naction:',
      JSON.stringify(action, null, 2),
      '/nstate',
      JSON.stringify(store.getState(), null, 2),
    );
    // clear out action
    result = {};
  }
  return result;
};
export default crashReporter;
