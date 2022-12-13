const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const DiscordRPC = require('discord-rpc');

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;
let isQuiting = false;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.resolve(__dirname, '../build/icon.ico'),
  });

  mainWindow.loadURL('http://localhost');

  mainWindow.maximize();

  mainWindow.on('close', (event) => {
    if(!isQuiting){
      event.preventDefault();
      mainWindow.hide();
    }
  
    return false;
  });

  const tray = new Tray(path.resolve(__dirname, '../build/icon.ico'));
  const trayMenu = [
    {
      label: 'eArchives',
      click: function() {
        mainWindow.show();
      }
    },
    {
      label: 'Fechar',
      click: function() {
        isQuiting = true;
        app.quit();
      }
    }
  ];

  const trayCtxMenu = Menu.buildFromTemplate(trayMenu);
  tray.setContextMenu(trayCtxMenu);
  tray.setTitle('eArchives');

  tray.on('double-click', () => {
    mainWindow.show();
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