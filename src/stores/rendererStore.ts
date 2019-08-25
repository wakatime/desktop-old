import { createStore, applyMiddleware, compose } from "redux";
import crashReporter from "../middlewares/crashReporter";
import rootReducer from "../reducers";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(crashReporter),
    // @ts-ignore
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
