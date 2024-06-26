const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('preload', {
    /* funcionDeEjemplo: (variableInformacion) => ipcRenderer.send("informacion",(variableInformacion)),
 funcionDeEjemploRecibir: (callback) => ipcRenderer.on("recibir",(e,html)=> callback(e,html)), */
    validarUsuario: (datosValidacion) => ipcRenderer.send('validacion', datosValidacion),
    mensajesDeValidacion: (callback) => ipcRenderer.on('mensajes', (e, html) => callback(e, html)),
    ActivacioninfoHabitacionGeneralSend:(mensaje) => ipcRenderer.send('recibiendo-mensaje', mensaje),
    InfoHabitacionesGeneralOn: (callback) => ipcRenderer.on('informacion-general-habitaciones',(e,html) => callback(e,html)),
    envioIdHabitacion:(idHabitacion) => ipcRenderer.send('envioIdHabitacion',idHabitacion),
    infoHabitacionIndividualOn:(callback) => ipcRenderer.on('informacion-individual-habitacion',(e,info) => callback(e,info)),
    infoHuespedesSend: (infoHuespedes) => ipcRenderer.send('informacion-huespedes', infoHuespedes)
});
