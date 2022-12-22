const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require("electron-updater")

const path = require('path');
const DiscordRPC = require('discord-rpc');

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    center: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: false,
    },
    icon: path.resolve(__dirname, '../build/icon.ico'),
  });

  mainWindow.maximize();

  mainWindow.loadURL('http://localhost');

  mainWindow.on('close', (event) => {
    app.quit();
  });
};

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

rpc.login({ clientId: '1052358549558280202' }).catch(console.error);

rpc.on('ready', () => {
  rpc.setActivity({
    details: `earchives.org`,
    startTimestamp: new Date(),
    largeImageKey: 'icon',
    largeImageText: `eArchives`,
    instance: false,
  }).catch(console.error);
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
});

app.on('ready', function()  {
  autoUpdater.checkForUpdatesAndNotify();
});

function sendStatusToWindow(text) {
  win.webContents.send('message', text);
}