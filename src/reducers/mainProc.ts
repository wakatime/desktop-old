import editors from '../constants/editors';
import createReducer from '../utils/createReducer';

const initialState = Object.values(editors).reduce((accum, val) => {
  // eslint-disable-next-line no-param-reassign
  accum[val.name] = {
    installed: false,
    installing: false,
  };
  return accum;
}, {});

const handlers = {};

export default createReducer(initialState, handlers);
