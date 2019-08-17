import { createStore } from "redux";
import rootReducer from "../reducers";

const store = createStore(
  rootReducer,
  // @ts-ignore
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default store;
