import { composeWithDevTools } from "remote-redux-devtools";
import { createStore, compose, applyMiddleware } from "redux";
import mainProcessReducer from "../reducers/mainProc";
import logger from "../middlewares/logger";
import crashReporter from "../middlewares/crashReporter";

let composeEnhancer = compose;
if (process.env.NODE_ENV === "development") {
  composeEnhancer = composeWithDevTools({
    host: "localhost",
    port: 8000,
    realtime: true
  });
}
const store = createStore(
  mainProcessReducer,
  composeEnhancer(applyMiddleware(logger, crashReporter))
);

export default store;
