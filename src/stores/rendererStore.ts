import { createStore, applyMiddleware, compose } from "redux";
import crashReporter from "../middlewares/crashReporter";
import logger from "../middlewares/logger";
import rootReducer from "../reducers";

let composeEnhancers = compose;
// @ts-ignore
if (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  // @ts-ignore
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
}
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(logger, crashReporter))
);
export default store;
