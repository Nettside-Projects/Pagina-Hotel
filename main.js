const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { validarUsuario,mostrarHabitaciones } = require('./crud');
const db = new sqlite3.Database(
    path.join(path.join(__dirname, '/db', 'data.db'))
);

//vistas
let windowLogin;
let windowHabitaciones;

//rutas
let loginHtml = './src/views/login/index.html';
let habitacionesHTML =
    './src/views/vista_general_habitaciones/vistaGeneral.html';

// funcion para crear la ventana
function createWindowLogin() {
    windowLogin = new BrowserWindow({
        width: 1060,
        height: 920,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    windowLogin.setMenu(null);
    windowLogin.loadFile(loginHtml);
}

app.whenReady().then(() => {
    createWindowLogin();
});

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

ipcMain.on('validacion', (e, datos) => {
    console.log(datos);
    validarUsuario(db, datos, (mensajeValidaciones) => {
        if (Object.keys(mensajeValidaciones).length > 0) {
            windowLogin.webContents.send('mensajes', mensajeValidaciones);
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
            windowMain.loadFile(habitacionesHTML);
            mostrarHabitaciones(db, (err, result) => {
                windowMain.webContents.on("did-finish-load", () => {
                    windowMain.webContents.send('envioInfoHabitaciones', result);
                })
            })
            windowMain.show();
        }
    });
});
