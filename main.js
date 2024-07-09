const {
    app,
    BrowserWindow,
    ipcMain,
    webContents,
    dialog,
} = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const {
    validarUsuario,
    infoGeneral,
    mostrarHabitaciones,
    infoHabitacion,
    agregarHuespedes,
    cambiarEstadoHabitacion,
    buscarHabitacion,
    filtrarPorNivelSend,
    mostrarHabitacionesPorEstado,
    buscarHabitacionPorEstado,
} = require('./crud');
const db = new sqlite3.Database(
    path.join(path.join(__dirname, '/db', 'data.db'))
);
const i18next = require('./src/i18n/i18n.js');

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

    // Enviar el texto traducido a la ventana
    windowLogin.webContents.on('did-finish-load', () => {
        windowLogin.webContents.send('i18n', {
            'login.start': i18next.t('login.start'),
        });
    });
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

ipcMain.on('change-language', (event, lng) => {
    i18next.changeLanguage(lng, (err, t) => {
        if (err) return console.error('something went wrong loading', err);
        sendTranslations();
    });
});

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
            /* mostrarHabitaciones(db, (err, result) => {
                windowMain.webContents.on("did-finish-load", () => {
                    windowMain.webContents.send('informacion-general-habitaciones', result);
                })
            }) */
            windowMain.show();
        }
    });
});

ipcMain.on('informacion-general', (e, mensaje) => {
    infoGeneral(db, (info) => {
        windowMain.webContents.send('informacion-general-recibido', info);
    });
});

ipcMain.on('recibiendo-mensaje', (e, dato) => {
    mostrarHabitaciones(db, (err, result) => {
        /* windowMain.webContents.on("did-finish-load", () => { */
        windowMain.webContents.send('informacion-general-habitaciones', result);
        windowMain.webContents.send('informacion-general-habitaciones', result);
        /* }) */
    });
});

ipcMain.on('envioIdHabitacion', (e, dato) => {
    infoHabitacion(db, dato, (infoHabitacion) => {
        windowMain.webContents.send(
            'informacion-individual-habitacion',
            infoHabitacion
        );
    });
});

ipcMain.on('informacion-huespedes', (e, dato) => {
    agregarHuespedes(db, dato, (err) => {
        if (err.code == 'SQLITE_CONSTRAINT') {
            dialog.showErrorBox(
                'Error',
                'Alguno de los números de documentos que se quiere registrar ya está presente en la base de datos'
            );
            windowMain.webContents.send(
                'notificacion-error-registrar-huesped',
                err
            );
        } else {
            windowMain.webContents.send(
                'notificacion-error-registrar-huesped',
                err
            );
        }
        /* 
    if(err == ""){
        console.log("No hay errores")
        windowMain.loadFile("./src/views/vista_general_habitaciones/vistaGeneral.html")
    }
    if(err.code == 'SQLITE_CONSTRAINT'){
        dialog.showErrorBox('Error', 'No se puede repetir datos');
        windowMain.webContents.send('notificacion-error-registrar-huesped',err)
    } */
    });
});

ipcMain.on('buscar-habitacion', (e, info) => {
    buscarHabitacion(db, info, (html) => {
        windowMain.webContents.send('informacion-habitacion-buscada', html);
    });
});

ipcMain.on('filtrar-habitacion-por-nivel', (e, info) => {
    filtrarPorNivelSend(db, info, (html) => {
        windowMain.webContents.send('filtrar-habitacion-por-nivel-send', html);
    });
});

ipcMain.on('txt-activation-ocupado', (e, mensaje) => {
    mostrarHabitacionesPorEstado(db, 'ocupado', (html) => {
        windowMain.webContents.send('txt-activation-ocupado-send', html);
    });
});

ipcMain.on('buscar-habitacion-ocupadas', (e, info) => {
    buscarHabitacionPorEstado(db, info, (html) => {
        windowMain.webContents.send('buscar-habitacion-ocupadas-send', html);
    });
});
