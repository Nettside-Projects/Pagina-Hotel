const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
<<<<<<< Updated upstream
const { validarUsuario, mostrarHabitaciones } = require('./crud');
=======
const { validarUsuario,mostrarHabitaciones,infoHabitacion } = require('./crud');
>>>>>>> Stashed changes
const db = new sqlite3.Database(
    path.join(path.join(__dirname, '/db', 'data.db'))
);

//vistas
let windowLogin;
let windowMain;

//rutas
let loginHtml = './src/views/login/index.html';
let habitacionesHTML = './src/views/vista_principal/inicio_habitacion.html';

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
            windowMain = new BrowserWindow({
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
<<<<<<< Updated upstream
                windowMain.webContents.on('did-finish-load', () => {
                    windowMain.webContents.send(
                        'envioInfoHabitaciones',
                        result
                    );
                });
            });
=======
                windowMain.webContents.on("did-finish-load", () => {
                    windowMain.webContents.send('informacion-general-habitaciones', result);
                })
            })
>>>>>>> Stashed changes
            windowMain.show();
        }
    });
});

ipcMain.on("envioIdHabitacion",(e,dato) =>{
    infoHabitacion(db,dato,(infoHabitacion)=>{
            windowMain.webContents.send('informacion-individual-habitacion', infoHabitacion);
    })
})

ipcMain.on("informacion-huespedes",(e,dato)=>{
console.log(dato)
})
