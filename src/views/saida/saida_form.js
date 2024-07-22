const informacionDeHabitacion = JSON.parse(
    localStorage.getItem('informacionDeHabitacion')
);
console.log(informacionDeHabitacion)
let inputSelect = document.querySelector('.dropdown');
function cuentaTotalPresente(inf) {
    if (inf.length > 0) {
        if (inf[0].fecha_salida == 0) {
            let partes_fecha = document.querySelector(".fecha_entrada").textContent.split(" ")[0].replaceAll("/", "-").split("-")
            const fecha_formateada = `${partes_fecha[2]}-${partes_fecha[1]}-${partes_fecha[0]}`;
            let entrada = new Date(fecha_formateada);
            let fecha_actual_obj = new Date();
            const anioActual = fecha_actual_obj.getFullYear();
            const diaActual = fecha_actual_obj.getDate();
            const mesActual = fecha_actual_obj.getMonth() + 1;
            let fecha_actual = new Date(`${anioActual}-${mesActual}-${diaActual}`)
            var diferenciaMilisegundos = fecha_actual.getTime() - entrada.getTime();
            var diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

            // Redondeamos el número para obtener un número entero de días
            diferenciaDias = Math.ceil(diferenciaDias) - 1; // Usamos Math.ceil para incluir el último día
            console.log(diferenciaDias)
            // Supongamos que este es el valor diario de la habitación
            var valorDiario = inf[0].valor_diaria;

            // Calculamos el costo total de la estadía
            var costoTotal = diferenciaDias * valorDiario;
            document.querySelectorAll(".card_input")[2].textContent = 'R$' + costoTotal
            return costoTotal

        } else {
            document.querySelectorAll(".card_input")[2].textContent = 'R$' + inf[0].cuenta_total
            return inf[0].cuenta_total
        }
    } else {
        if (inf.fecha_salida == 0) {
            let partes_fecha = document.querySelector(".fecha_entrada").textContent.split(" ")[0].replaceAll("/", "-").split("-")
            const fecha_formateada = `${partes_fecha[2]}-${partes_fecha[1]}-${partes_fecha[0]}`;
            let entrada = new Date(fecha_formateada);
            let fecha_actual_obj = new Date();
            const anioActual = fecha_actual_obj.getFullYear();
            const diaActual = fecha_actual_obj.getDate();
            const mesActual = fecha_actual_obj.getMonth() + 1;
            let fecha_actual = new Date(`${anioActual}-${mesActual}-${diaActual}`)
            var diferenciaMilisegundos = fecha_actual.getTime() - entrada.getTime();
            var diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

            // Redondeamos el número para obtener un número entero de días
            diferenciaDias = Math.ceil(diferenciaDias) - 1; // Usamos Math.ceil para incluir el último día
            console.log(diferenciaDias)
            // Supongamos que este es el valor diario de la habitación
            var valorDiario = inf.valor_diaria;

            // Calculamos el costo total de la estadía
            var costoTotal = diferenciaDias * valorDiario;
            document.querySelectorAll(".card_input")[2].textContent = 'R$' + costoTotal
            return costoTotal

        } else {
            document.querySelectorAll(".card_input")[2].textContent = 'R$' + inf.cuenta_total
            return inf.cuenta_total
        }
    }


}
/* Agregando información inicial de la habitación a través del JSON recibido */
// tipo de habitación
enviarDatos()
function enviarDatos() {
    window.preload.informacionDeHabitacionYHuespedesSend(
        informacionDeHabitacion.id_habitacion
    );
    window.preload.informacionDeHabitacionYHuespedesOn((e, info) => {
        console.log(info)
        agregandoInformacionInicial(informacionDeHabitacion, info)
        mostrarInformacionNuevaHuesped()
        let cuenta_total = cuentaTotalPresente(info)
        mostrarRegistroDePagos(document.querySelectorAll(".card_input")[5].textContent,informacionDeHabitacion.id_habitacion, cuenta_total) /* MODIFICADO TEST */
        //Con el valor del costo_total se actualiza el valor del costo total de estadía. Así mismo, se registra el pago que se hizo
    })
}


function agregandoInformacionInicial(infoHabitacion, infoHabitacionYHuespede) {
    let html = '';
    let txt_informacion_inicial = document.querySelectorAll('.card_input');
    txt_informacion_inicial[0].textContent = infoHabitacion.numero; // numero de habitación
    txt_informacion_inicial[1].textContent = infoHabitacion.tipo;
    txt_informacion_inicial[3].textContent =
        infoHabitacionYHuespede[0].descuento === null
            ? 'sin descuento'
            : infoHabitacionYHuespede[0].descuento;
    txt_informacion_inicial[4].textContent =
        infoHabitacionYHuespede[0].nombre_completo;
    txt_informacion_inicial[5].textContent =
        infoHabitacionYHuespede[0].numero_documento;
    txt_informacion_inicial[6].textContent =
        infoHabitacionYHuespede[0].nacionalidad === null
            ? 'sin nacionalidad'
            : infoHabitacionYHuespede[0].nacionalidad;
    txt_informacion_inicial[7].textContent =
        infoHabitacionYHuespede[0].procedencia === null
            ? 'sin procedencia'
            : infoHabitacionYHuespede[0].procedencia;
    txt_informacion_inicial[8].textContent =
        infoHabitacionYHuespede[0].fecha_entrada;
    txt_informacion_inicial[9].textContent = formatearFecha(
        infoHabitacionYHuespede[0].fecha_salida
    );
    infoHabitacionYHuespede.forEach((e) => {
        html += `<option value="${e.numero_documento}">${e.nombre_completo}</option>`;
    });
    document.querySelector('.dropdown').innerHTML = html;
}

function formatearFecha(fecha) {
    if (fecha != '') {
        const fechaOriginal = new Date(fecha);
        const dia = String(fechaOriginal.getDate()).padStart(2, '0');
        const mes = String(fechaOriginal.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son base 0 (enero = 0)
        const anio = fechaOriginal.getFullYear();
        const horas = fechaOriginal.getHours();
        const minutos = fechaOriginal.getMinutes();
        const segundos = fechaOriginal.getSeconds();

        // Formatea la fecha en el formato deseado (hora de 12 horas)
        const ampm = horas >= 12 ? 'PM' : 'AM';
        const hora12 = horas % 12 || 12;
        const fechaFormateada = `${dia}/${mes}/${anio} ${hora12}:${minutos}:${segundos} ${ampm}`;
        return fechaFormateada;
    } else {
        return 'Sin fecha prevista';
    }
}

//Función para enviar y recuperar datos del huesped seleccionado
function mostrarInformacionNuevaHuesped() {
    inputSelect.addEventListener('change', (e) => {
        window.preload.informacionHuespedIndividualSend(e.target.value);
        window.preload.informacionHuespedIndividualOn((e, info) => {
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
            txt_informacion_inicial[9].textContent = formatearFecha(info.fecha_salida)

            let cuenta_total = cuentaTotalPresente(info)
            mostrarRegistroDePagos(document.querySelectorAll(".card_input")[5].textContent,informacionDeHabitacion.id_habitacion, cuenta_total) /* MODIFICADO TEST */
        })

    })
}

function mostrarRegistroDePagos(numero_documento, id_habitacion, cuenta_total)/* MODIFICADO TEST */ {
    console.log(cuenta_total)
    document.querySelector("tbody").innerHTML = ""
    window.preload.mostrarRegistroDePagosSend(/* numero_documento */id_habitacion) /* MODIFICADO TEST */
    window.preload.mostrarRegistroDePagosOn((e, info) => {
        console.log(info)
        if (info.length != 0) {
            let html = '';
            info.forEach((element) => {
                html += `<tr class="fila_pago">
                            <td>R$ <input type="number" disabled value="${element.registro_pago
                    }"></td>
                            <td>
                                <select disabled>
                                    <option select>${element.metodo_pago
                    }</option>
                                </select>
                            </td>
                            <td>R$ <input type="number" disabled value="${element.extra
                    }"></td>
                            <td>R$ ${element.cuenta_actual /* - element.registro_pago */
                    }</td>
                            <td>R$ ${element.cuenta_actual + element.registro_pago}</td>
                            <td></td>
                        </tr>`;
            });
            document.querySelector('tbody').innerHTML = html;
            if (
                info[info.length - 1].cuenta_actual >
                0
            ) {
                document.querySelector(
                    'tbody'
                ).innerHTML += `<tr class="fila_pago">
                            <td>R$ <input type="number" class="registro_pago"></td>
                            <td>
                                <select>
                                    <option>Pix</option>
                                    <option>Cartão</option>
                                    <option>Dinheiro</option>
                                </select>
                            </td>
                            <td>R$ <input type="number" class="extra"></td>
                            <td>R$ ${info[info.length - 1].cuenta_actual/*  -
                    info[info.length - 1].registro_pago */
                    }</td>
                            <td>R$ ${info[info.length - 1].cuenta_actual
                    }</td>
                            <td></td>
                        </tr>`

                agregandoEventosDePagos(cuenta_total)
                enviarRegistroDePago(numero_documento)
            }else{
                /* Agregar algún cambio (como sería una sencilla animación) al botón de "Salvar pagamento" en caso de que la cuenta total sea  menor o igual 0*/
                
                /* Botón ya seleccionado */let btnConcluirPagamento = document.querySelectorAll(".btn-pagamento")[1]
                console.log("Llego a cero")
            }
        } else {
            document.querySelector('tbody').innerHTML += `<tr class="fila_pago">
                            <td>R$ <input type="number" class="registro_pago"></td>
                            <td>
                                <select>
                                    <option>Pix</option>
                                    <option>Cartão</option>
                                    <option>Dinheiro</option>
                                </select>
                            </td>
                            <td>R$ <input type="number" class="extra"></td>
                            <td>R$ ${cuenta_total}</td>
                            <td>R$ ${cuenta_total}</td>
                            <td></td>
                        </tr>`
            agregandoEventosDePagos(cuenta_total)
            enviarRegistroDePago(numero_documento)
        }
    })

}

function agregandoEventosDePagos(cuenta_actual) {
    let filas = document.querySelectorAll(".fila_pago")
    let saldo_anterior = cuenta_actual
    /* let saldo_anterior = parseInt(filas[filas.length - 1].children[3].textContent.split(" ")[1] || 0) */
    document.querySelector(".extra").addEventListener("input", (e) => {
        if (e.target.value != "") {
            filas[filas.length - 1].children[4].textContent = `R$ ${saldo_anterior + parseInt(e.target.value || 0)}`
            filas[filas.length - 1].children[3].textContent = `R$ ${saldo_anterior + parseInt(e.target.value || 0) - (parseInt(document.querySelector(".registro_pago").value) || 0)}`
        } else {
            if (document.querySelector('.registro_pago').value != '') {
                filas[filas.length - 1].children[3].textContent = `R$ ${saldo_anterior +
                    parseInt(e.target.value || 0) -
                    parseInt(
                        document.querySelector('.registro_pago').value || 0
                    )
                    }`;
                filas[
                    filas.length - 1
                ].children[4].textContent = `R$ ${saldo_anterior}`;
            } else {
                filas[
                    filas.length - 1
                ].children[4].textContent = `R$ ${saldo_anterior}`;
                filas[
                    filas.length - 1
                ].children[3].textContent = `R$ ${saldo_anterior}`;
            }
        }
    });

    document.querySelector('.registro_pago').addEventListener('input', (e) => {
        let saldo_anterior2 = parseInt(
            filas[filas.length - 1].children[4].textContent.split(' ')[1] || 0
        );
        if (e.target.value != '') {
            filas[filas.length - 1].children[3].textContent = `R$ ${saldo_anterior2 - parseInt(e.target.value || 0)
                }`;
        } else {
            filas[
                filas.length - 1
            ].children[3].textContent = `R$ ${saldo_anterior2}`;
        }
    });
}


/* El registro de pago le hace falta poder agregar pagos a los huespedes que no tienen previa fecha de salida (cuenta total no definida) */
function enviarRegistroDePago(numero_documento) {
    let fecha_actual_obj = new Date();
    const anioActual = fecha_actual_obj.getFullYear();
    const diaActual = fecha_actual_obj.getDate();
    const mesActual = fecha_actual_obj.getMonth() + 1;
    let fecha_actual = new Date(`${anioActual}-${mesActual}-${diaActual}`)
    let filas = document.querySelectorAll(".fila_pago")
    let btnEnviarPago = document.querySelectorAll(".btn-pagamento")[1]
    btnEnviarPago.addEventListener("click", (e) => {
        if (filas[filas.length - 1].querySelector(".registro_pago").value != "") {
            const registroPagoInfo = {
                documento: numero_documento,
                pago: parseInt(filas[filas.length - 1].querySelector(".registro_pago").value),
                fecha_pago:fecha_actual,
                metodo_pago: filas[filas.length - 1].querySelector("select").value,
                extra: filas[filas.length - 1].querySelector(".extra").value || 0,
                cuenta_total: parseInt(filas[filas.length - 1].children[3].textContent.split(" ")[1])
            }
            window.preload.enviarRegistroDePagoSend(registroPagoInfo)
            location.reload()
            console.log(registroPagoInfo)
        } else {
            console.log("Está vacío")
        }
    })
}


