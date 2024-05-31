const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const windowMain = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Ruta al archivo de precarga
        },
    });

    windowMain.loadFile('index.html');
}

app.whenReady().then(createWindow);
