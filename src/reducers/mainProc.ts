import editors from '../constants/editors';
import createReducer from '../utils/createReducer';
import { FSA } from '../actions/fsaAction';
import { SYNC_EDITORS_STATE } from '../constants/rendererActionTypes';

const initialState = Object.values(editors).reduce((accum, val) => {
  // eslint-disable-next-line no-param-reassign
  accum[val.name] = {
    enabled: false,
    img: '',
    installed: false,
    instance: null,
    isSelected: false,
    name: '',
  };
  return accum;
}, {});

const handlers = {
  [SYNC_EDITORS_STATE]: (state: [], action: FSA<any>) => {
    return action.payload || state;
  },
};

export default createReducer(initialState, handlers);
