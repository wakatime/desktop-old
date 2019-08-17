import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import ActiveEditors from "../components/ActiveEditors";
import store from "../stores/rendererStore";

const div = document.getElementById("container");
render(
  <Provider store={store}>
    <ActiveEditors />
  </Provider>,
  div
);
