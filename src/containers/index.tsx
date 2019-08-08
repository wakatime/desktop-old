import * as React from "react";
import { render } from "react-dom";
import imgPath from "../imgs/editor-icons/blender-128.png";

const div = document.getElementById("container");

render(
  <div>
    Hello World
    <img src={imgPath} alt="Test example of a png imported" />
  </div>,
  div
);
