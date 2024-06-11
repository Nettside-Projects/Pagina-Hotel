const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('preload', {
    /* funcionDeEjemplo: (variableInformacion) => ipcRenderer.send("informacion",(variableInformacion)),
 funcionDeEjemploRecibir: (callback) => ipcRenderer.on("recibir",(e,html)=> callback(e,html)), */
    validarUsuario: (datosValidacion) => ipcRenderer.send('validacion', datosValidacion),
    mensajesDeValidacion: (callback) => ipcRenderer.on('mensajes', (e, html) => callback(e, html)),
    envioInfoHabitaciones: (callback) => ipcRenderer.on('envioInfoHabitaciones',(e,html) => callback(e,html))
});
