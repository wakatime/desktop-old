import { combineReducers } from 'redux';
import createReducer from '../utils/createReducer';
import { ON_MAIN_PROCESS_STATE } from '../constants/rendererActionTypes';
import editors from './editors';
import { FSA } from '../actions/fsaAction';

const handlers = {
  [ON_MAIN_PROCESS_STATE]: (state = {}, action: FSA<any>) => action.payload || state,
};
const main = createReducer({}, handlers);
export default combineReducers({
  editors,
  main,
});
