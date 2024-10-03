import { app, BrowserWindow, dialog, ipcMain, protocol } from 'electron';
import path from 'path';
import os from 'os';
import { config } from "dotenv";
import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { atcProtocolHandler, fileResponse } from './protocols/atcProtocol';
import fs from 'fs';

config({ path: '.env' });

const getAssetPath = () => {
  if (app.isPackaged) {
    // In production, use the path relative to the executable
    return path.join(process.resourcesPath, 'assets');
  } else {
    // In development, use the path relative to the project root
    return path.join(__dirname, '..', '..', 'src', 'assets');
  }
};

const isMac = os.platform() === "darwin";
const isWindows = os.platform() === "win32";
const isLinux = os.platform() === "linux";

const APP_PROTOCOL = 'chill-airwaves';

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient(APP_PROTOCOL, process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient(APP_PROTOCOL)
}


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  ipcMain.handle('get-downloads-path', () => {
    return path.join(app.getPath('downloads'));
  });

  const gotTheLock = app.requestSingleInstanceLock()

  if (!gotTheLock) {
    app.quit()
  } else if (isWindows || isLinux) {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
      }
      // the commandLine is array of strings in which last element is deep link url
      dialog.showErrorBox('Welcome Back', `You arrived from: ${commandLine.pop()}`)
    })

    // Create mainWindow, load the rest of the app, etc...
    app.whenReady().then(() => {
      createWindow()
    })
  }

  ipcMain.handle('getEnv', (_, key: string) => {
    console.log(process.env[key]);

    return process.env[key];
  });

  protocol.handle(process.env.ATC_PROTOCOL, atcProtocolHandler)
  protocol.handle('icon', async (request) => {
    const url = new URL(request.url);
    const iconName = url.hostname;
    console.log('------------------------------------');
    console.log(iconName);
    console.log('------------------------------------');

    const iconPath = path.join(getAssetPath(), 'phosphor-icons', 'SVGs', 'bold', iconName);

    console.log(`Attempting to load icon: ${iconPath}`);

    if (fs.existsSync(iconPath)) {
      try {
        const data = await fs.promises.readFile(iconPath);
        console.log(`Successfully read icon file: ${iconPath}`);
        return new Response(data, {
          headers: {
            'Content-Type': 'image/svg+xml',
          }
        });
      } catch (error) {
        console.error(`Error reading icon file: ${iconPath}`, error);
        return new Response(`Error reading icon file: ${error.message}`, { status: 500 });
      }
    } else {
      console.error(`Icon not found: ${iconPath}`);
      return new Response('Icon not found', { status: 404 });
    }
  })

  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension: ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension: ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
// Handle the protocol. In this case, we choose to show an Error Box.
app.on('open-url', (event, url) => {
  dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
})