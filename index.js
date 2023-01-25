const {
  app,
  BrowserWindow
} = require('electron');
const path = require('path');
if (require('electron-squirrel-startup')) {
  app.quit();
}
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.hide();
  win.loadFile(path.join(__dirname, 'mainmenu.html'));
  win.maximize();
  win.show();
  win.fullScreenable = true;
  // win.removeMenu();
  win.setIcon(path.join(__dirname, "favicon.ico"))
};
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