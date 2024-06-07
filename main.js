const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { validarUsuario } = require('./crud');
const db = new sqlite3.Database(
    path.join(path.join(__dirname, '/db', 'data.db'))
);

let windowLogin;
let indexHtml = './src/views/index.html';
// funcion para crear la ventana
function createWindow() {
    windowLogin = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    windowLogin.loadFile(indexHtml);
}

/* if (process.env.NODE_ENV !== 'production') {
    templateMenuMain.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                },

            },
            {
                role: 'reload'
            }
        ]
    })
} */

app.whenReady().then(() => {
    /*  ipcMain.on("informacion",(event,i)=>{
      console.log(i)
    }) */
    createWindow();
});

ipcMain.on('validacion', (e, datos) => {
    validarUsuario(db, datos, (mensajeValidaciones) => {
        if (mensajeValidaciones.length !== 2) {
            windowLogin.webContents.send(
                'mensajes',
                'Error en el usuario y/o contraseña'
            );
        } else {
            let windowMain = new BrowserWindow({
                width: 1260,
                height: 840,
                webPreferences: {
                    nodeIntegration: true,
                    preload: path.join(__dirname, 'preload.js'),
                },
            });
            windowLogin.close();
            windowMain.show();
        }
    });
});
