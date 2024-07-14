const informacionDeHabitacion = JSON.parse(localStorage.getItem("informacionDeHabitacion"))
let inputSelect = document.querySelector(".dropdown")
function cuentaTotalPresente(inf) {
    if(inf[0].fecha_salida == 0){
        let partes_fecha = document.querySelector(".fecha_entrada").textContent.split(" ")[0].replaceAll("/","-").split("-")
        const fecha_formateada = `${partes_fecha[2]}-${partes_fecha[1]}-${partes_fecha[0]}`;
        let entrada = new Date(fecha_formateada);
        let fecha_actual_obj = new Date();
        const anioActual = fecha_actual_obj.getFullYear();
        const diaActual = fecha_actual_obj.getDate();
        const mesActual = fecha_actual_obj.getMonth() + 1;
        let fecha_actual = new Date(`${anioActual}-${mesActual}-${diaActual}`)
        var diferenciaMilisegundos =  fecha_actual.getTime() -  entrada.getTime() ;
        var diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

        // Redondeamos el número para obtener un número entero de días
        diferenciaDias = Math.ceil(diferenciaDias)-1; // Usamos Math.ceil para incluir el último día
        console.log(diferenciaDias)
        // Supongamos que este es el valor diario de la habitación
        var valorDiario = inf[0].valor_diaria;

        // Calculamos el costo total de la estadía
        var costoTotal = diferenciaDias * valorDiario;
        document.querySelectorAll(".card_input")[2].textContent = 'R$'+costoTotal   
        return costoTotal

    }else{
        document.querySelectorAll(".card_input")[2].textContent = 'R$'+inf[0].cuenta_total 
        return inf[0].cuenta_total 
    }
   
} 
/* Agregando información inicial de la habitación a través del JSON recibido */
// tipo de habitación

window.preload.informacionDeHabitacionYHuespedesSend(informacionDeHabitacion.id_habitacion)
window.preload.informacionDeHabitacionYHuespedesOn((e, info) => {
    console.log(info)
   agregandoInformacionInicial(informacionDeHabitacion,info)
   mostrarInformacionNuevaHuesped()
   let costo_total = cuentaTotalPresente(info)
   //Con el valor del costo_total se actualiza el valor del costo total de estadía. Así mismo, se registra el pago que se hizo
})

function agregandoInformacionInicial(infoHabitacion, infoHabitacionYHuespede) {
    let html = ""
    let txt_informacion_inicial = document.querySelectorAll(".card_input")
    txt_informacion_inicial[0].textContent = infoHabitacion.numero // numero de habitación
    txt_informacion_inicial[1].textContent = infoHabitacion.tipo
    txt_informacion_inicial[3].textContent = infoHabitacionYHuespede[0].descuento === null ? "sin descuento" : infoHabitacionYHuespede[0].descuento
    txt_informacion_inicial[4].textContent = infoHabitacionYHuespede[0].nombre_completo 
    txt_informacion_inicial[5].textContent = infoHabitacionYHuespede[0].numero_documento
    txt_informacion_inicial[6].textContent = infoHabitacionYHuespede[0].nacionalidad === null ? 'sin nacionalidad' : infoHabitacionYHuespede[0].nacionalidad
    txt_informacion_inicial[7].textContent = infoHabitacionYHuespede[0].procedencia === null ? 'sin procedencia' : infoHabitacionYHuespede[0].procedencia
    txt_informacion_inicial[8].textContent = infoHabitacionYHuespede[0].fecha_entrada
    txt_informacion_inicial[9].textContent =  formatearFecha(infoHabitacionYHuespede[0].fecha_salida)
    infoHabitacionYHuespede.forEach(e=>{
        html += `<option value="${e.numero_documento}">${e.nombre_completo}</option>`
    })
    document.querySelector(".dropdown").innerHTML = html
}

function formatearFecha(fecha) {
    if(fecha != ""){
        const fechaOriginal = new Date(fecha);
        const dia = String(fechaOriginal.getDate()).padStart(2, '0');
        const mes = String(fechaOriginal.getMonth() + 1).padStart(2,'0'); // Los meses en JavaScript son base 0 (enero = 0)
        const anio = fechaOriginal.getFullYear();
        const horas = fechaOriginal.getHours();
        const minutos = fechaOriginal.getMinutes();
        const segundos = fechaOriginal.getSeconds();
    
        // Formatea la fecha en el formato deseado (hora de 12 horas)
        const ampm = horas >= 12 ? 'PM' : 'AM';
        const hora12 = horas % 12 || 12;
        const fechaFormateada = `${dia}/${mes}/${anio} ${hora12}:${minutos}:${segundos} ${ampm}`;
        return fechaFormateada;
    }else{
        return "Sin fecha prevista"
    }
   
}

console.log("Desde el archivo fuente")

//Función para enviar y recuperar datos del huesped seleccionado
function mostrarInformacionNuevaHuesped() {
   
    inputSelect.addEventListener('change',(e)=>{
      window.preload.informacionHuespedIndividualSend(e.target.value)
      window.preload.informacionHuespedIndividualOn((e,info)=>{
        console.log(info)
        let txt_informacion_inicial = document.querySelectorAll(".card_input")
        txt_informacion_inicial[0].textContent = informacionDeHabitacion.numero // numero de habitación
        txt_informacion_inicial[1].textContent = informacionDeHabitacion.tipo
        txt_informacion_inicial[3].textContent = info.descuento === null ? "sin descuento" : info.descuento
        txt_informacion_inicial[4].textContent = info.nombre_completo 
        txt_informacion_inicial[5].textContent = info.numero_documento
        txt_informacion_inicial[6].textContent = info.nacionalidad === null ? 'sin nacionalidad' : info.nacionalidad
        txt_informacion_inicial[7].textContent = info.procedencia === null ? 'sin procedencia' : info.procedencia
        txt_informacion_inicial[8].textContent = info.fecha_entrada
        txt_informacion_inicial[9].textContent =  formatearFecha(info.fecha_salida)
        
      })
    
    })
}

function registroDePago() {
    
}
