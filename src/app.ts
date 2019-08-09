import * as electron from "electron";
import { join } from "path";
import EditorManager from "./editorManager";

const isDev = process.env.DEV === "true";
const { Menu, Tray } = electron;
// Module to control application life.
const { app } = electron;
// Module to create native browser window.
const { BrowserWindow } = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let appIcon;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  console.log(`Starting in dev mode? ${isDev}`);
  if (isDev) {
    // Attempt to load window until successful
    // This is cause webpack is launching during this in dev mode
    const loadWin = async () => {
      try {
        mainWindow.loadURL("http://localhost:8080");
      } catch (e) {
        console.error("Unable to load page, waiting 500ms to retry...");
        setTimeout(loadWin, 500);
      }
    };
    setTimeout(loadWin, 500);
  } else {
    const indexHtmlPath = `file://${__dirname}/index.html`;
    console.log("indexHTMLPATH", indexHtmlPath);
    mainWindow.loadURL(indexHtmlPath);
  }

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  /* appIcon = new Tray('/Users/alanhamlett/git/wakatime-desktop/src/img/wakatime-240.png');
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu); */
  createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
