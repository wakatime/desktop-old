import { Reducer } from 'redux';

type handlers = {
  [s: string]: Reducer;
};
type State = object | number | string;

const createReducer = (initialState: State, handlers: handlers) => {
  return (state = initialState, action) => {
    if (handlers[action.type]) {
      return handlers[action.type](state, action);
    }
    return state;
  };
};
export default createReducer;
