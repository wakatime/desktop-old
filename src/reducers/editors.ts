import editors from "../constants/editors";
import imgPathMap from "../config/editorsImgMap";
import createReducer from "../utils/createReducer";
import { ENABLE_EDITORS } from "../constants/rendererActionTypes";
import { FSA } from "../actions/fsaAction";

const initialState = Object.values(editors).reduce((accum, Val) => {
  const instance = new Val();
  // eslint-disable-next-line no-param-reassign
  accum.push({
    name: instance.name,
    installed: true,
    enabled: true, // Enabled by default for now
    img: imgPathMap[instance.name],
    instance
  });
  return accum;
}, []);

const handlers = {
  [ENABLE_EDITORS]: (state = [], action: FSA<any>) => {
    return action.payload || state;
  }
};

export default createReducer(initialState, handlers);
