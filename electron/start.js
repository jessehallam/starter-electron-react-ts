/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow = null;

if (process.env.NODE_ENV === 'development') {
    // Add devtools to the browser.
    require('electron-debug')();
}

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map(ext => {
            console.log(`Instaling extension [${ext}]`)
            installer.default(installer[ext], true)
        })
    ).catch(console.log);
}

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
      app.quit();
    }
});

app.on('ready', async () => {
    if (process.env.NODE_ENV === 'development') {
        await installExtensions();
    }

    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    require('./menu.js')(mainWindow);
})