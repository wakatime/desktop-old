import electron from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import trayWindow from 'electron-tray-window';

import { registerWindow, unRegisterWindow } from './middlewares/forwardToRenderer';
import isMainProcess from './utils/isMainProcess';
import wakatimeIcon from './imgs/wakatime-16x16.png';

import './stores/mainProcStore';

console.log('isMainProcess', isMainProcess);
const isDev = process.env.NODE_ENV === 'development';
// Module to control application life.
const { app, Tray } = electron;
// Module to create native browser window.
const { BrowserWindow } = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let appIcon = null;

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    // width: 300,
    // height: 400,
    width: 1000,
    height: 700,
    // movable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('mainWindow registered');
    registerWindow(mainWindow);
  });

  // and load the index.html of the app.
  // eslint-disable-next-line no-console
  console.log(`Starting in dev mode? ${isDev}`);
  if (isDev) {
    // Attempt to load window until successful
    // This is cause webpack is launching during this in dev mode
    const loadExt = async (extObject: any) => {
      const name = await installExtension(extObject);
      // eslint-disable-next-line no-console
      console.log(`Added Extension:  ${name}`);
      return true;
    };
    const loadWin = async () => {
      try {
        mainWindow.loadURL('http://localhost:8080/index.html');
        await loadExt(REACT_DEVELOPER_TOOLS);
        await loadExt(REDUX_DEVTOOLS);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Unable to load page, waiting 5s to retry...', e);
        setTimeout(loadWin, 5000);
      }
    };
    setTimeout(loadWin, 500);
  } else {
    const indexHtmlPath = `file://${__dirname}/index.html`;
    mainWindow.loadURL(indexHtmlPath);
  }

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    unRegisterWindow(mainWindow);
  });
};

// The return value of this method indicates whether or not this instance of
// your application successfully obtained the lock. If it failed to obtain the lock,
// you can assume that another instance of your application is already
// running with the lock and exit immediately.
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    appIcon = new Tray(wakatimeIcon);

    createWindow();

    trayWindow.setOptions({
      tray: appIcon,
      window: mainWindow,
    });
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
