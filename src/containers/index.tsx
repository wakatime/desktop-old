import React from "react";
import { render } from "react-dom";
import electron from 'electron';
import AllIconImgs from "../components/AllIconImgs";

console.log('electron', electron)
const div = document.getElementById("container");
render(
  <div>
    <AllIconImgs />
  </div>,
  div
);
