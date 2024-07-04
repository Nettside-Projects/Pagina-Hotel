const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('preload', {
    /* funcionDeEjemplo: (variableInformacion) => ipcRenderer.send("informacion",(variableInformacion)),
 funcionDeEjemploRecibir: (callback) => ipcRenderer.on("recibir",(e,html)=> callback(e,html)), */
    informacionGeneralSend: (mensaje) => ipcRenderer.send('informacion-general', mensaje),
    informacionGeneralOn: (callback) => ipcRenderer.on('informacion-general-recibido', (e,html)=> callback(e,html)),
    validarUsuario: (datosValidacion) => ipcRenderer.send('validacion', datosValidacion),
    mensajesDeValidacion: (callback) => ipcRenderer.on('mensajes', (e, html) => callback(e, html)),
    ActivacioninfoHabitacionGeneralSend: (mensaje) => ipcRenderer.send('recibiendo-mensaje', mensaje),
    InfoHabitacionesGeneralOn: (callback) => ipcRenderer.on('informacion-general-habitaciones', (e, html) => callback(e, html)),
    envioIdHabitacion: (idHabitacion) => ipcRenderer.send('envioIdHabitacion', idHabitacion),
    infoHabitacionIndividualOn: (callback) => ipcRenderer.on('informacion-individual-habitacion', (e, info) => callback(e, info)),
    infoHuespedesSend: (infoHuespedes) => ipcRenderer.send('informacion-huespedes', infoHuespedes),
    buscarHabitacion: (info) => ipcRenderer.send('buscar-habitacion', info),
    buscadHabitacionOn: (callback) => ipcRenderer.on('informacion-habitacion-buscada', (e, respuesta) => callback(e, respuesta)),
    filtrarPorNivelSend: (nivel) => ipcRenderer.send('filtrar-habitacion-por-nivel', nivel),
    filtrarPorNivelOn: (callback) => ipcRenderer.on('filtrar-habitacion-por-nivel-send', (e, respuesta) => callback(e, respuesta)),
    ActivacionInfoHabitacionOcupadasSend: (mensaje) => ipcRenderer.send('txt-activation-ocupado', mensaje),
    InfoHabitacionesOcupadasOn: (callback) => ipcRenderer.on('txt-activation-ocupado-send', (e, html) => callback(e, html)),
    buscarHabitacionOcupadasSend: (info) => ipcRenderer.send('buscar-habitacion-ocupadas', info),
    buscarHabitacionOcupadasOn: (callback) => ipcRenderer.on('buscar-habitacion-ocupadas-send', (e, html) => callback(e, html))

});
