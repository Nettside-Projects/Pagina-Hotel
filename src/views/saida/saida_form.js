const informacionDeHabitacion = JSON.parse(localStorage.getItem("informacionDeHabitacion"))

/* Agregando información inicial de la habitación a través del JSON recibido */
// tipo de habitación

window.preload.informacionDeHabitacionYHuespedesSend(informacionDeHabitacion.id_habitacion)
window.preload.informacionDeHabitacionYHuespedesOn((e, info) => {
    console.log(info)
   agregandoInformacionInicial(informacionDeHabitacion,info)
})

function agregandoInformacionInicial(infoHabitacion, infoHabitacionYHuespede) {
    let html = ""
    let txt_informacion_inicial = document.querySelectorAll(".card_input")
    txt_informacion_inicial[0].textContent = infoHabitacion.numero // numero de habitación
    txt_informacion_inicial[1].textContent = infoHabitacion.tipo
    txt_informacion_inicial[2].textContent = 'R$'+infoHabitacionYHuespede[0].cuenta_total 
    txt_informacion_inicial[3].textContent = infoHabitacionYHuespede[0].descuento === null ? "sin descuento" : infoHabitacionYHuespede[0].descuento
    txt_informacion_inicial[4].textContent = infoHabitacionYHuespede[0].nombre_completo 
    txt_informacion_inicial[5].textContent = infoHabitacionYHuespede[0].numero_documento
    txt_informacion_inicial[6].textContent = infoHabitacionYHuespede[0].telefono === null ? 'sin telefono' : infoHabitacionYHuespede[0].telefono
    txt_informacion_inicial[7].textContent = infoHabitacionYHuespede[0].telefono === null ? 'sin email' : infoHabitacionYHuespede[0].email
    txt_informacion_inicial[8].textContent = infoHabitacionYHuespede[0].fecha_entrada
    txt_informacion_inicial[9].textContent =  formatearFecha(infoHabitacionYHuespede[0].fecha_salida)
    infoHabitacionYHuespede.forEach(e=>{
        html += `<option value="${e.numero_documento}">${e.nombre_completo}</option>`
    })
    document.querySelector(".dropdown").innerHTML = html
}

function formatearFecha(fecha) {
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
}
