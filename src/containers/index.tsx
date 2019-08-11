import React from "react";
import { render } from "react-dom";
import { ipcRenderer } from "electron";
import AllIconImgs from "../components/AllIconImgs";

// TODO: Make an abstraction to handle this in a meaningful manner
const sendSyncMsg = () => {
  console.log(ipcRenderer.sendSync("synchronous-message", "ping")); // prints "pong"
};
const sendAsync = () => {
  console.log("Send msg at ", new Date());
  ipcRenderer.send("asynchronous-message", "ping");
};
ipcRenderer.on("asynchronous-reply", (event, arg) => {
  console.log(`Recieved msg at ${new Date()}: ${arg}`); // prints "pong"
});
const div = document.getElementById("container");
render(
  <div>
    <div onClick={sendSyncMsg}>Send Sync msg</div>
    <div onClick={sendAsync}>Send Async msg</div>
    <AllIconImgs />
  </div>,
  div
);
