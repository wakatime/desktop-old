import editors from "../constants/editors";
import createReducer from "../utils/createReducer";
import { FSA } from "../actions/fsaAction";
import {
  ENABLE_EDITORS,
  SELECT_EDITOR_TO_INSTALL,
  SET_EDITOR_ENABLED,
  CLEAR_SELECT_EDITORS
} from "../constants/rendererActionTypes";

const initialState = Object.values(editors).reduce((accum, Val) => {
  const instance = new Val();
  // eslint-disable-next-line no-param-reassign
  accum.push({
    name: instance.name,
    installed: true,
    enabled: true, // Enabled by default for now
    img: instance.icon,
    instance,
    isSelected: false
  });
  return accum;
}, []);

const handlers = {
  [ENABLE_EDITORS]: (state = [], action: FSA<any>) => {
    return action.payload || state;
  },
  [SELECT_EDITOR_TO_INSTALL]: (state = [], action: FSA<any>) => {
    return state.map(editor => {
      const newEditor = { ...editor };
      if (newEditor.name === action.payload.name) {
        newEditor.isSelected = action.payload.selected;
      }
      return newEditor;
    });
  },
  [SET_EDITOR_ENABLED]: (state = [], action: FSA<any>) => {
    return state.map(editor => {
      const newEditor = { ...editor };
      if (newEditor.name === action.payload.name) {
        newEditor.enabled = true;
      }
      return newEditor;
    });
  },
  [CLEAR_SELECT_EDITORS]: (state = [], action: FSA<any>) => {
    return state.map(editor => {
      const newEditor = { ...editor };
      newEditor.isSelected = false;
      return newEditor;
    });
  }
};

export default createReducer(initialState, handlers);
