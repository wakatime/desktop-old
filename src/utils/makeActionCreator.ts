import { Action } from 'redux';

const makeActionCreator = (type, ...argNames) => {
  return (...args): Action => {
    const action = { type };
    argNames.forEach((_arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
};
export const makeActionWithMeta = meta => (type, ...argNames) => {
  return (...args): Action => {
    const action = { type, meta };
    argNames.forEach((_arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
};
export default makeActionCreator;
