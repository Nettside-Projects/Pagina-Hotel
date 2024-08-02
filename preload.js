const { contextBridge, ipcRenderer } = require('electron');

let informacionHuespedCallback;
let mostrarRegistroDePagosCallback;
window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('informacion-huesped-individual-recibido', (e, info) => {
        if (informacionHuespedCallback) {
            informacionHuespedCallback(e, info);
        }
    });
    ipcRenderer.on('mostrar-registro-pagos-recibido',(e,info) => {
        if(mostrarRegistroDePagosCallback){
            mostrarRegistroDePagosCallback(e, info)
        }
    })
});


contextBridge.exposeInMainWorld('preload', {
    /* funcionDeEjemplo: (variableInformacion) => ipcRenderer.send("informacion",(variableInformacion)),
    funcionDeEjemploRecibir: (callback) => ipcRenderer.on("recibir",(e,html)=> callback(e,html)), */
    informacionGeneralSend: (mensaje) =>
        ipcRenderer.send('informacion-general', mensaje),
    informacionGeneralOn: (callback) =>
        ipcRenderer.on('informacion-general-recibido', (e, html) =>
            callback(e, html)
        ),
    validarUsuario: (datosValidacion) =>
        ipcRenderer.send('validacion', datosValidacion),
    mensajesDeValidacion: (callback) =>
        ipcRenderer.on('mensajes', (e, html) => callback(e, html)),
    ActivacioninfoHabitacionGeneralSend: (mensaje) =>
        ipcRenderer.send('recibiendo-mensaje', mensaje),
    InfoHabitacionesGeneralOn: (callback) =>
        ipcRenderer.on('informacion-general-habitaciones', (e, html) =>
            callback(e, html)
        ),
    envioIdHabitacion: (idHabitacion) =>
        ipcRenderer.send('envioIdHabitacion', idHabitacion),
    infoHabitacionIndividualOn: (callback) =>
        ipcRenderer.on('informacion-individual-habitacion', (e, info) =>
            callback(e, info)
        ),
    infoHuespedesSend: (infoHuespedes) =>
        ipcRenderer.send('informacion-huespedes', infoHuespedes),
    buscarHabitacion: (info) => ipcRenderer.send('buscar-habitacion', info),
    buscadHabitacionOn: (callback) =>
        ipcRenderer.on('informacion-habitacion-buscada', (e, respuesta) =>
            callback(e, respuesta)
        ),
    filtrarPorNivelSend: (nivel) =>
        ipcRenderer.send('filtrar-habitacion-por-nivel', nivel),
    filtrarPorNivelOn: (callback) =>
        ipcRenderer.on('filtrar-habitacion-por-nivel-send', (e, respuesta) =>
            callback(e, respuesta)
        ),
    ActivacionInfoHabitacionOcupadasSend: (mensaje) =>
        ipcRenderer.send('txt-activation-ocupado', mensaje),
    InfoHabitacionesOcupadasOn: (callback) =>
        ipcRenderer.on('txt-activation-ocupado-send', (e, html) =>
            callback(e, html)
        ),
    buscarHabitacionOcupadasSend: (info) =>
        ipcRenderer.send('buscar-habitacion-ocupadas', info),
    buscarHabitacionOcupadasOn: (callback) =>
        ipcRenderer.on('buscar-habitacion-ocupadas-send', (e, html) =>
            callback(e, html)
        ),
    notificarErrorRegistroHuesped: (callback) =>
        ipcRenderer.on('notificacion-error-registrar-huesped', (e, err) => callback(e, err)),
    informacionDeHabitacionYHuespedesSend: (id_habitacion) => ipcRenderer.send('informacion-habitacion-y-huespedes',id_habitacion),
    informacionDeHabitacionYHuespedesOn: (callback) => ipcRenderer.on("informacion-habitacion-y-recibido",(e,info) => callback(e,info)),
    
    //Envío del numero de documento del huesped seleccionado para la respectiva recuperación de datos
    informacionHuespedIndividualSend: (numero_documento) => ipcRenderer.send("informacion-huesped-individual",numero_documento),
    
    //Recibiendo datos del huesped seleccionado
    informacionHuespedIndividualOn: (callback) => {
        informacionHuespedCallback = callback;
    },
    mostrarRegistroDePagosSend:(numero_documento)=>{
        ipcRenderer.send("mostrar-registro-pagos",numero_documento)
    },
    mostrarRegistroDePagosOn: (callback) => {
        mostrarRegistroDePagosCallback = callback;
    },
    enviarRegistroDePagoSend:(registro_pago)=>{
        ipcRenderer.send("registrar-pago",registro_pago)
    },
    actualizarCostoTotal:(info_actualizacion)=>{
        ipcRenderer.send("actualizar-costo-total",info_actualizacion)
    },
    guardandoEnHistorialSend:(guardarEnHistorial)=>{
        ipcRenderer.send("guardar-en-historial",guardarEnHistorial)
    },
    i18n: {
        onTranslate: (callback) =>
            ipcRenderer.on('i18n', (event, data) => callback(data)),
    },
});
