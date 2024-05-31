// preload.js
const { contextBridge } = require('electron');

// Exponer una función al contexto del renderizador
contextBridge.exposeInMainWorld('miFuncion', () => {
    // Aquí puedes definir la lógica de tu función
    console.log('¡Hola desde la función de precarga!');
});
