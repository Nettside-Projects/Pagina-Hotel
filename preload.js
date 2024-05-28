const { contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('preload', {
 funcionDeEjemplo: (variableInformacion) => ipcRenderer.send("informacion",(variableInformacion)),
 funcionDeEjemploRecibir: (callback) => ipcRenderer.on("recibir",(e,html)=> callback(e,html))
 

})