const {app, BrowserWindow, ipcMain} = require('electron')
const url = require('url');
const path = require('path');

const numberOfWindows = 50;

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 450,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    }
  })

  return mainWindow;
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

const createManyWindows = () => {      
  for(let i=0; i<numberOfWindows; i++){
    const win = createWindow();
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }
};

app.on('ready', createManyWindows)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
