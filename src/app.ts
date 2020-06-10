import electron from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';

import { registerWindow, unRegisterWindow } from './middlewares/forwardToRenderer';
import isMainProcess from './utils/isMainProcess';
import wakatimeIcon from './imgs/wakatime-16x16.png';
import API from './utils/api';
import logger, { LogLevel } from './utils/logger';
import Options from './utils/options';

import './stores/mainProcStore';

const isDev = process.env.NODE_ENV === 'development';
// Module to control application life.
const { app, Tray, Menu, ipcMain } = electron;
// Module to create native browser window.
const { BrowserWindow } = electron;

const api = new API();
const options = new Options();

logger.debug(`isMainProcess ${isMainProcess ? 'true' : 'false'}`);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let apiWindow;
let tray = null;

const createWindow = async () => {
  if (mainWindow) {
    mainWindow.showInactive();
    return;
  }
  if (apiWindow) {
    apiWindow.close();
  }
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.webContents.on('did-finish-load', () => {
    logger.debug('mainWindow registered');
    registerWindow(mainWindow);
  });

  // and load the index.html of the app.
  // eslint-disable-next-line no-console
  logger.debug(`Starting in dev mode? ${isDev}`);
  if (isDev) {
    // Attempt to load window until successful
    // This is cause webpack is launching during this in dev mode
    const loadExt = async (extObject: any) => {
      const name = await installExtension(extObject);
      // eslint-disable-next-line no-console
      logger.debug(`Added Extension:  ${name}`);
      return true;
    };
    const loadWin = async () => {
      try {
        mainWindow.loadURL('http://localhost:8080/index.html');
        await loadExt(REACT_DEVELOPER_TOOLS);
        await loadExt(REDUX_DEVTOOLS);
      } catch (e) {
        // eslint-disable-next-line no-console
        logger.error('Unable to load page, waiting 5s to retry...', e);
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

const apiKeyWindow = () => {
  if (apiWindow) {
    apiWindow.showInactive();
    return;
  }
  if (mainWindow) {
    mainWindow.close();
  }

  apiWindow = new BrowserWindow({
    width: 1000,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the apiKey.html of the app.
  // eslint-disable-next-line no-console
  logger.debug(`Starting in dev mode? ${isDev}`);
  if (isDev) {
    // Attempt to load window until successful
    // This is cause webpack is launching during this in dev mode
    const loadExt = async (extObject: any) => {
      const name = await installExtension(extObject);
      // eslint-disable-next-line no-console
      logger.debug(`Added Extension:  ${name}`);
      return true;
    };
    const loadWin = async () => {
      try {
        apiWindow.loadURL('http://localhost:8080/apikey.html');
        await loadExt(REACT_DEVELOPER_TOOLS);
        await loadExt(REDUX_DEVTOOLS);
      } catch (e) {
        // eslint-disable-next-line no-console
        logger.error('Unable to load page, waiting 5s to retry...', e);
        setTimeout(loadWin, 5000);
      }
    };
    setTimeout(loadWin, 500);
  } else {
    const apiKeyHtmlPath = `file://${__dirname}/apikey.html`;
    apiWindow.loadURL(apiKeyHtmlPath);
  }

  // Open the DevTools.
  if (isDev) {
    apiWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  apiWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    apiWindow = null;
    unRegisterWindow(apiWindow);
  });
};

ipcMain.on('close-apikey', () => {
  if (apiWindow) {
    apiWindow.close();
  }
});

const quitApp = () => {
  app.quit();
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
  app.on('ready', async () => {
    const setTray = async () => {
      const todayMins = await api.todayMins();
      if (tray) {
        tray.destroy();
      }
      tray = new Tray(wakatimeIcon);
      const contextMenu = Menu.buildFromTemplate([
        { label: 'Wakatime\t\t\t', type: 'normal', click: createWindow },
        { label: 'API Key', type: 'normal', click: apiKeyWindow },
        { label: 'Check for updates', type: 'normal' },
        { label: `${todayMins} today`, type: 'normal' },
        { type: 'separator' },
        { label: 'Quit', type: 'normal', click: quitApp },
      ]);
      tray.setToolTip('This is my application.');
      tray.setContextMenu(contextMenu);
    };

    await api.init();
    await setTray();

    setInterval(async () => {
      await setTray();
    }, 60000);
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
options.getSetting('settings', 'debug', (_error, debug) => {
  if (debug === 'true') {
    logger.setLevel(LogLevel.DEBUG);
    logger.debug('::WakaTime debug mode::');
  }
});

ipcMain.on('get-user-agents', async (event) => {
  const userAgents = await api.userAgents();
  const e = event;
  e.returnValue = userAgents;
});
