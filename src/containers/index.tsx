import * as React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

const reducer = () => "TODO";
const store = createStore(reducer);
const div = document.getElementById("container");
console.log("div", div);
ReactDom.render(
  <Provider store={store}>
    <div>Hello World</div>
  </Provider>,
  div
);
