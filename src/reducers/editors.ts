import editors from "../constants/editors";
import imgPathMap from "../config/editorsImgMap";
import createReducer from "../utils/createReducer";

const initialState = Object.values(editors).reduce((accum, val) => {
  // eslint-disable-next-line no-param-reassign
  accum.push({
    name: val,
    enabled: true, // Enabled by default for now
    img: imgPathMap[val]
  });
  return accum;
}, []);

const handlers = {};
export default createReducer(initialState, handlers);
