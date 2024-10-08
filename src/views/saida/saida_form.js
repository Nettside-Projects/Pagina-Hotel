// Selección de elementos del DOM
const modalimpieza = document.getElementById('modalimpieza');
const modalterminarlimpieza = document.getElementById('modalterminarlimpieza');
const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const limpiezaterminado = document.getElementById('limpiezaterminado');
const hacerlimpieza = document.getElementById('hacerlimpieza');

const informacionDeHabitacion = JSON.parse(
    localStorage.getItem('informacionDeHabitacion')
);
let informacionDeHuesped;
if (informacionDeHabitacion.estado != "limpieza-ocupado") {
    hacerlimpieza.style.display = "flex"
    limpiezaterminado.style.display = "none"
} else {
    hacerlimpieza.style.display = "none"
    limpiezaterminado.style.display = "flex"
}

// Función para abrir un modal
function abrirModal(modal) {
    modal.style.display = 'block';
}

// Función para cerrar un modal
function cerrarModal(modal) {
    modal.style.display = 'none';
}

// Event listener para abrir el primer modal al hacer clic en el botón (ajusta el selector según tu botón)
document.querySelector(".btn-limpieza").addEventListener('click', () => {
    abrirModal(modalimpieza);
});

// Event listener para el botón "No", cierra el primer modal
noButton.addEventListener('click', () => {
    cerrarModal(modalimpieza);
});

// Event listener para el botón "Yes", cierra el primer modal y abre el segundo
yesButton.addEventListener('click', (e) => {
    cerrarModal(modalimpieza);
    hacerlimpieza.style.display = "none"
    limpiezaterminado.style.display = "flex"
    cambioDeEstadoDeHabitacion(informacionDeHabitacion.id_habitacion,4)
    
});
limpiezaterminado.addEventListener('click', () => {
    hacerlimpieza.style.display = "flex"
    limpiezaterminado.style.display = "none"
    abrirModal(modalterminarlimpieza);
    cambioDeEstadoDeHabitacion(informacionDeHabitacion.id_habitacion,2)

    // Después de 3 segundos, cerrar el segundo modal
    setTimeout(() => {
        cerrarModal(modalterminarlimpieza);
    }, 3000);
})

// Event listener para cerrar el modal si se hace clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    if (event.target == modalimpieza) {
        cerrarModal(modalimpieza);
    }
});




/* Función para validar descuento */
/* En esta función se utiliza el costo total del huesped más el descuento que se aplicará*/
function validarDescuento(costo_total, descuento) {
    /* En caso de tener un descuento*/
    if (descuento !== 0) {
        /* Sí el descuento se maneja con porcentaje... */
        if (descuento % 1 != 0 || descuento == 1) {
            // Calcular el valor original (antes del descuento)
            const valorOriginal = costo_total / (1 - descuento);

            // Actualizar los elementos del DOM
            document.querySelector('#valor-sin-descuento').textContent =
                'R$' + valorOriginal.toFixed(2); // Aseguramos que tenga dos decimales
            document.querySelector('#valor-con-descuento').textContent =
                costo_total.toFixed(2) < 0
                    ? '(Vueltas) R$' + costo_total.toFixed(2)
                    : 'R$' + costo_total.toFixed(2); // Valor modificado (con descuento)
            document.querySelector('#descuento').textContent =
                '%' + descuento * 100; // Mostrar el porcentaje de descuento
        } else {
            // Calcular el valor original (antes del descuento)
            const valorOriginal = costo_total + descuento;

            // Actualizar los elementos del DOM
            document.querySelector('#valor-sin-descuento').textContent =
                'R$' + valorOriginal.toFixed(2); // Aseguramos que tenga dos decimales
            document.querySelector('#valor-con-descuento').textContent =
                costo_total.toFixed(2) < 0
                    ? '(Vueltas) R$' + costo_total.toFixed(2)
                    : 'R$' + costo_total.toFixed(2); // Valor modificado (con descuento)
            document.querySelector('#descuento').textContent =
                'R$-' + descuento; // Mostrar el porcentaje de descuento
        }
    } else {
        // Si no hay descuento, muestra el valor total original
        document.querySelectorAll('.card_input')[2].textContent =
            costo_total.toFixed(2) < 0
                ? '(Vueltas) R$' + costo_total.toFixed(2)
                : 'R$' + costo_total.toFixed(2);
    }
}

/* Actualizar costo total cada vez que se aplica un nuevo cambio*/
function actualizarCostoTotal(numero_documento, costo_total, descuento) {
    /* Se aplica descuento antes de enviar el costo total en caso de tener un descuento */
    validarDescuento(costo_total, descuento);

    /* Se envía un objeto con los datos requeridos para la respectiva actualización del costo total en la db */
    const actualizacion_cuenta_total = {
        documento: numero_documento,
        cuenta_total: costo_total,
    };

    /* Se envía el objeto*/
    window.preload.actualizarCostoTotal(actualizacion_cuenta_total);
}

console.log(informacionDeHabitacion);
let inputSelect = document.querySelector('.dropdown');

function cuentaTotalPresente(inf) {
    return new Promise((resolve, reject) => {
        if (inf.length > 0) {
            if (inf[0].fecha_salida == 0) {
                let partes_fecha = document
                    .querySelector('.fecha_entrada')
                    .textContent.split(' ')[0]
                    .replaceAll('/', '-')
                    .split('-');
                const fecha_formateada = `${partes_fecha[2]}-${partes_fecha[1]}-${partes_fecha[0]}`;
                let entrada = new Date(fecha_formateada);
                let fecha_actual_obj = new Date();
                const anioActual = fecha_actual_obj.getFullYear();
                const diaActual = fecha_actual_obj.getDate();
                const mesActual = fecha_actual_obj.getMonth() + 1;
                let fecha_actual = new Date(
                    `${anioActual}-${mesActual}-${diaActual}`
                );
                var diferenciaMilisegundos =
                    fecha_actual.getTime() - entrada.getTime();
                var diferenciaDias =
                    diferenciaMilisegundos / (1000 * 60 * 60 * 24);

                diferenciaDias = Math.ceil(diferenciaDias) - 1;
                console.log(diferenciaDias);

                var valorDiario =
                    inf[0]
                        .valor_diaria; /* - (inf[0].valor_diaria * inf[0].descuento) */
                var costoTotal = diferenciaDias * valorDiario;
                console.log('valor del día' + costoTotal);
                window.preload.mostrarRegistroDePagosSend(
                    informacionDeHabitacion.id_habitacion
                );

                window.preload.mostrarRegistroDePagosOn(async (e, info) => {
                    let pagosTotales = 0;
                    console.log(info);

                    for (let element of info) {
                        pagosTotales += element.registro_pago;
                    }
                    console.log('Pagos hechos: ' + pagosTotales);
                    if (inf[0].descuento != 0) {
                        if (
                            inf[0].descuento % 1 !=
                            0 /*  && inf[0].descuento == 1 */
                        ) {
                            costoTotal -= costoTotal * inf[0].descuento;
                            costoTotal -= pagosTotales;
                            console.log(
                                'descuentos en porcentajes' + costoTotal
                            );
                        } else {
                            costoTotal -=
                                costoTotal - inf[0].descuento < 0
                                    ? 0
                                    : inf[0].descuento;
                            costoTotal -= pagosTotales;
                            console.log('descuentos en entero' + costoTotal);
                        }
                    } else {
                        costoTotal -= pagosTotales;
                    }

                    actualizarCostoTotal(
                        inf[0].numero_documento,
                        costoTotal,
                        inf[0].descuento
                    );
                    const informacion = {
                        costoTotal: costoTotal,
                        registro_pago: info,
                    };
                    console.log('Returning informacion:', informacion);
                    resolve(informacion);
                });
            } else {
                validarDescuento(inf[0].cuenta_total, inf[0].descuento);
                window.preload.mostrarRegistroDePagosSend(
                    informacionDeHabitacion.id_habitacion
                );

                window.preload.mostrarRegistroDePagosOn(async (e, info) => {
                    const informacion = {
                        costoTotal: inf[0].cuenta_total,
                        registro_pago: info,
                    };
                    console.log(
                        'Returning informacion con cuenta ya definida:',
                        informacion
                    );
                    resolve(informacion);
                });
            }
        } else {
            if (inf.fecha_salida == 0) {
                let partes_fecha = document
                    .querySelector('.fecha_entrada')
                    .textContent.split(' ')[0]
                    .replaceAll('/', '-')
                    .split('-');
                const fecha_formateada = `${partes_fecha[2]}-${partes_fecha[1]}-${partes_fecha[0]}`;
                let entrada = new Date(fecha_formateada);
                let fecha_actual_obj = new Date();
                const anioActual = fecha_actual_obj.getFullYear();
                const diaActual = fecha_actual_obj.getDate();
                const mesActual = fecha_actual_obj.getMonth() + 1;
                let fecha_actual = new Date(
                    `${anioActual}-${mesActual}-${diaActual}`
                );
                var diferenciaMilisegundos =
                    fecha_actual.getTime() - entrada.getTime();
                var diferenciaDias =
                    diferenciaMilisegundos / (1000 * 60 * 60 * 24);

                diferenciaDias = Math.ceil(diferenciaDias) - 1;
                console.log(diferenciaDias);

                var valorDiario = inf.valor_diaria;
                var costoTotal = diferenciaDias * valorDiario;

                window.preload.mostrarRegistroDePagosSend(
                    informacionDeHabitacion.id_habitacion
                );

                window.preload.mostrarRegistroDePagosOn(async (e, info) => {
                    let pagosTotales = 0;
                    console.log(info);

                    for (let element of info) {
                        pagosTotales += element.registro_pago;
                    }

                    if (inf.descuento % 1 != 0 && inf.descuento == 1) {
                        costoTotal -= costoTotal * inf.descuento;
                        costoTotal -= pagosTotales;
                    } else {
                        costoTotal -=
                            costoTotal - inf.descuento < 0 ? 0 : inf.descuento;
                    }

                    actualizarCostoTotal(
                        inf.numero_documento,
                        costoTotal,
                        inf.descuento
                    );
                    const informacion = {
                        costoTotal: costoTotal,
                        registro_pago: info,
                    };
                    console.log('Returning informacion:', informacion);
                    resolve(informacion);
                });
            } else {
                validarDescuento(inf.cuenta_total, inf.descuento);
                window.preload.mostrarRegistroDePagosSend(
                    informacionDeHabitacion.id_habitacion
                );

                window.preload.mostrarRegistroDePagosOn(async (e, info) => {
                    const informacion = {
                        costoTotal: inf.cuenta_total,
                        registro_pago: info,
                    };
                    console.log(
                        'Returning informacion con cuenta ya definida:',
                        informacion
                    );
                    resolve(informacion);
                });
            }
        }
    });
}

/* Agregando información inicial de la habitación a través del JSON recibido */
function enviarDatos() {
    /* Se envía la información del id de la habitación registrada del huesped a través de esta función
    para recibir información de los huespedes registrados (como lo sería los nombres,nacionalidad, documento,etc..)
    */
    window.preload.informacionDeHabitacionYHuespedesSend(
        informacionDeHabitacion.id_habitacion
    );

    /* Se recibe información del huesped y se procede a utilizar la información en las diferentes funciones*/
    window.preload.informacionDeHabitacionYHuespedesOn((e, info) => {
        informacionDeHuesped = info;
        console.log(informacionDeHuesped);
        /* Agregando información a los textos iniciales  */
        agregandoInformacionInicial(informacionDeHabitacion, info);

        /* Agregar eventos del input tipo "select" luego después de agregar la información inicial */
        mostrarInformacionNuevaHuesped();

        /* Obteniendo la cuenta total y el registro de pago presente mediante una fución con promesa */
        cuentaTotalPresente(info).then((cuenta_total_y_registro_pago) => {
            console.log(cuenta_total_y_registro_pago);

            /* Mostrando registro de pagos en el frontend */

            //                     Seleccionando el número de documento                   cuenta total presente y registro de pago (objeto)
            //                                     |                                                                                           |
            //                                     V                                                                                              V
            mostrarRegistroDePagos(
                document.querySelectorAll('.card_input')[5].textContent,
                cuenta_total_y_registro_pago
            );
        });
    });

}
enviarDatos();

/* Función para agregar la información del primer huesped al frontend */
function agregandoInformacionInicial(infoHabitacion, infoHabitacionYHuespede) {
    let html = '';
    let txt_informacion_inicial = document.querySelectorAll('.card_input'); //Seleccionando el elemento html donde se colocará la información

    //Colocando la información
    txt_informacion_inicial[0].textContent = infoHabitacion.numero;
    txt_informacion_inicial[1].textContent = infoHabitacion.tipo;
    txt_informacion_inicial[3].textContent =
        'R$' + infoHabitacionYHuespede[0].valor_diaria;
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

/* Función para formatear fecha y validar si tiene fecha de salida o no */
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

//Función para enviar y recuperar datos del huesped seleccionado en el input tipo "select"
function mostrarInformacionNuevaHuesped() {
    inputSelect.addEventListener('change', (e) => {
        window.preload.informacionHuespedIndividualSend(e.target.value);
        window.preload.informacionHuespedIndividualOn((e, info) => {
            console.log(info);
            let txt_informacion_inicial =
                document.querySelectorAll('.card_input');
            txt_informacion_inicial[0].textContent =
                informacionDeHabitacion.numero; // numero de habitación
            txt_informacion_inicial[1].textContent =
                informacionDeHabitacion.tipo;
            txt_informacion_inicial[3].textContent = 'R$' + info.valor_diaria;
            txt_informacion_inicial[4].textContent = info.nombre_completo;
            txt_informacion_inicial[5].textContent = info.numero_documento;
            txt_informacion_inicial[6].textContent =
                info.nacionalidad === null
                    ? 'sin nacionalidad'
                    : info.nacionalidad;
            txt_informacion_inicial[7].textContent =
                info.procedencia === null
                    ? 'sin procedencia'
                    : info.procedencia;
            txt_informacion_inicial[8].textContent = info.fecha_entrada;
            txt_informacion_inicial[9].textContent = formatearFecha(
                info.fecha_salida
            );

            /*   let cuenta_total = cuentaTotalPresente(info) */
            cuentaTotalPresente(info)
                .then((cuenta_total_y_registro_pago) => {
                    console.log(cuenta_total_y_registro_pago);
                    mostrarRegistroDePagos(
                        document.querySelectorAll('.card_input')[5].textContent,
                        cuenta_total_y_registro_pago
                    );
                })
                .catch((e) => {
                    console.log(e);
                }); /* MODIFICADO TEST */
        });
    });
}

function mostrarRegistroDePagos(
    numero_documento,
    cuenta_total_y_registro_pago
) /* MODIFICADO TEST */ {
    document.querySelector('tbody').innerHTML = '';
    /* Se extrae el registro de pago del objeto pasado en los parametros (objeto) */
    const registro_pago = cuenta_total_y_registro_pago.registro_pago;

    /* Se extrae la cuenta total del objeto pasado en los parametros (valor entero)*/
    let cuenta_total = cuenta_total_y_registro_pago.costoTotal;

    /*  window.preload.mostrarRegistroDePagosSend(id_habitacion) */ /* MODIFICADO TEST */
    /* window.preload.mostrarRegistroDePagosOn((e, info) => { */
    if (registro_pago.length != 0) {
        let html = '';

        //Se agrega filas de cada registro de pago efectuado por el huesped
        registro_pago.forEach((element) => {
            //Agregando cada información de los registros de pago en cada fila
            /* 
            NOTA: Dentro de "element.cuenta_actual" contiene la cuenta total ya restada por el pago
            ya hecho por el huesped, así que para hayar el valor que realmente pago el huesped originalmente se
            suma la "cuenta_total" + "registro_pago"
            */
            html += `<tr class="fila_pago">
                            <td class="currency-input-container"><span class="currency-symbol">R$ </span><input class="cuadro" type="number" disabled value="${element.registro_pago
                }"></td>
                            <td>
                                <select class="cuadro" disabled>
                                    <option select>${element.metodo_pago
                }</option>
                                </select>
                            </td>
                            <td class="currency-input-container"><span class="currency-symbol">R$ </span><input class="cuadro" type="number" disabled value="${element.extra
                }"></td>
                            <td>R$ ${element.cuenta_actual /* - element.registro_pago */
                }</td>
                            <td>R$ ${element.cuenta_actual + element.registro_pago
                }</td>
                            <td></td>
                        </tr>`;
        });
        document.querySelector('tbody').innerHTML = html;

        //Si la cuenta total es mayor a 0, asignará una fila lista para ingresar el valor a pagar y así efectuar el pago
        if (cuenta_total > 0) {
            document.querySelector('tbody').innerHTML += `<tr class="fila_pago">
                            <td>R$ <input class="cuadro" type="number" class="registro_pago"></td>
                            <td>
                                <select class="cuadro">
                                    <option>Pix</option>
                                    <option>Cartão</option>
                                    <option>Dinheiro</option>
                                </select>
                            </td>
                            <td>R$ <input class="cuadro" type="number" class="extra"></td>
                            <td>R$ ${cuenta_total /*  -
                    info[info.length - 1].registro_pago */
                }</td>
                            <td>R$ ${cuenta_total}</td>
                            <td></td>
                        </tr>`;

            agregandoEventosDePagos(cuenta_total);
            enviarRegistroDePago(numero_documento);
        } else {
            /* Caso contrario, no agregará nada */

            /* Botón ya seleccionado */
            let btnConcluirPagamento =
                document.querySelectorAll('.btn-pagamento')[1];
            btnConcluirPagamento.remove();
            // Creación del contenedor principal
            // Crear elementos
            const container = document.createElement('div');
            container.classList.add('container');

            container.id = 'pagamento-concluido';

            const leftSide = document.createElement('div');
            leftSide.classList.add('left-side');

            const card = document.createElement('div');
            card.classList.add('second-card');

            const cardLine = document.createElement('div');
            cardLine.classList.add('card-line');
            card.appendChild(cardLine);

            const buttons = document.createElement('div');
            buttons.classList.add('buttons');
            card.appendChild(buttons);

            const post = document.createElement('div');
            post.classList.add('post');

            const postLine = document.createElement('div');
            postLine.classList.add('post-line');
            post.appendChild(postLine);

            const screen = document.createElement('div');
            screen.classList.add('screen');

            const dollar = document.createElement('div');
            dollar.classList.add('dollar');
            dollar.textContent = '$';
            screen.appendChild(dollar);

            post.appendChild(screen);

            const numbers = document.createElement('div');
            numbers.classList.add('numbers');
            post.appendChild(numbers);

            const numbersLine2 = document.createElement('div');
            numbersLine2.classList.add('numbers-line2');
            post.appendChild(numbersLine2);

            leftSide.appendChild(card);
            leftSide.appendChild(post);

            const rightSide = document.createElement('div');
            rightSide.classList.add('right-side');

            const newElement = document.createElement('div');
            newElement.classList.add('new');
            newElement.textContent = 'Pagamento concluido';
            rightSide.appendChild(newElement);

            container.appendChild(leftSide);
            container.appendChild(rightSide);

            document.querySelector('.btn-container').appendChild(container);
            container.addEventListener('click', (e) => {
                openModalConfirmar('¿Desea concluir pagamento?', 'modalExito');
            });
        }
    } else {
        /*
        Si no hay registro de pago almacenada en la db, se procede a habilitar una fila para agregar
        el primer registro de pago del huesped
        */
        document.querySelector('tbody').innerHTML += `<tr class="fila_pago">
                            <td class="currency-input-container"><span class="currency-symbol">R$ </span><input type="number" class="registro_pago"></td>
                            <td>
                                <select class="cuadro">
                                    <option>Pix</option>
                                    <option>Cartão</option>
                                    <option>Dinheiro</option>
                                </select>
                            </td>
                            <td class="currency-input-container"><span class="currency-symbol">R$ </span><input type="number" class="extra"></td>
                            <td>R$ ${cuenta_total}</td>
                            <td>R$ ${cuenta_total}</td>
                            <td></td>
                        </tr>`;
        agregandoEventosDePagos(cuenta_total);
        enviarRegistroDePago(numero_documento);
    }
    /*    }) */
}

function agregandoEventosDePagos(cuenta_actual) {
    let filas = document.querySelectorAll('.fila_pago');
    let saldo_anterior = cuenta_actual;
    /* let saldo_anterior = parseInt(filas[filas.length - 1].children[3].textContent.split(" ")[1] || 0) */
    document.querySelector('.extra').addEventListener('input', (e) => {
        if (e.target.value != '') {
            filas[filas.length - 1].children[4].textContent = `R$ ${saldo_anterior + parseInt(e.target.value || 0)
                }`;
            filas[filas.length - 1].children[3].textContent = `R$ ${saldo_anterior +
                parseInt(e.target.value || 0) -
                (parseInt(document.querySelector('.registro_pago').value) || 0)
                }`;
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

/* ---- Modal ---- */
const btnPagamento = document.querySelector('#btn-pagamento');
const btnAggHospede = document.querySelector('#btn-agg-hospede');
const btnRemoverHospede = document.querySelector('#btn-remover-hospede');
const closeModal = (modal) => {
    modal.style.display = 'none';
};
const displayModal = (modal) => {
    modal.style.display = 'flex';
};

function openModalExito(message) {
    const modalExito = document.getElementById('modalExito');
    const modalExitoMessage = document.getElementById('modalExitoMessage');
    modalExitoMessage.textContent = message;
    displayModal(modalExito);
    setTimeout(() => {
        /* window.preload.infoHuespedesSend(infoGeneral); */
        closeModal(modalExito);
        window.location.href =
            '../vista_general_habitaciones/vistaGeneral.html';
    }, 2000);
}
function openModalDatosCliente() {
    const modalDatosCliente = document.getElementById('modalDatosCliente');
    const noButtonConfirm = document.getElementById('noButtonConfirm');
    const x = document.getElementById('x');
    const yesButtonConfirm = document.getElementById('yesButtonConfirm');
    let input = document.querySelectorAll('.input');
    let inputnombre = document.querySelectorAll('.input_obligatorio');

    displayModal(modalDatosCliente);
    yesButtonConfirm.addEventListener('click', (e) => {
        let allFilled = true;
        inputnombre.forEach((e) => {
            if (e.value === '') {
                e.nextElementSibling.textContent = 'Por favor llenar el campo';
                setTimeout(() => {
                    e.nextElementSibling.textContent = '';
                }, 5000);
                allFilled = false;
            } else {
                e.nextElementSibling.textContent = '';
            }
        });
        if (allFilled) {
            closeModal(modalDatosCliente);
            openModalExito('cliente agregado');
            //logica al rrellenar los datos
        }
    });

    const closeModalbuttons = [noButtonConfirm, x];
    closeModalbuttons.forEach((button) => {
        button.addEventListener('click', () => {
            input.value = '';
            inputnombre.value = '';
            closeModal(modalDatosCliente);
        });
    });
}
function openModalDigiteNovoPreco(verDatosClientes) {
    const modalDigiteNovoPreco = document.getElementById(
        'modalDigiteNovoPreco'
    );
    const btnCancelar = document.getElementById('btn-cancelar');
    const btnAceitar = document.getElementById('btn-aceitar');
    const input = document.getElementById('input-digite-preco');

    displayModal(modalDigiteNovoPreco);
    function verificarInput() {
        if (input.value === '') {
            btnAceitar.disabled = true;
            btnAceitar.style.background = '#167900';
        } else {
            btnAceitar.disabled = false;
            btnAceitar.style.background = '#35C928';
        }
    }
    verificarInput();
    input.addEventListener('input', verificarInput);

    btnCancelar.onclick = () => {
        input.value = '';
        closeModal(modalDigiteNovoPreco);
    };

    btnAceitar.onclick = () => {
        closeModal(modalDigiteNovoPreco);
        input.value = '';
        verificarInput();
        if (verDatosClientes == 'verDatosClientes') {
            openModalDatosCliente();
        } else {
            openModalExito('preço alterado');
        }
    };
}
function openModalConfirmar(message, sig) {
    const modalConfirmar = document.getElementById('modalConfirmar');
    const noBtn = document.getElementById('confirmar-no');
    const yesBtn = document.getElementById('confirmar-yes');
    const modalConfirmarMessage = document.getElementById(
        'modalConfimarMessage'
    );
    modalConfirmarMessage.textContent = message;
    displayModal(modalConfirmar);
    noBtn.onclick = () => closeModal(modalConfirmar);
    yesBtn.onclick = () => {
        closeModal(modalConfirmar);
        if (sig == 'verDatos') {
            openModalDigiteNovoPreco('verDatosClientes');
        } else if (sig == 'modalExito') {
            cuentaTotalPresente(informacionDeHuesped)
                .then((cuenta_total_y_registro_pago) => {
                    console.log(cuenta_total_y_registro_pago);
                    concluirPago(
                        informacionDeHuesped,
                        cuenta_total_y_registro_pago.registro_pago
                    );
                })
                .catch((e) => {
                    console.log(e);
                }); /* MODIFICADO TEST */
            openModalExito('Pagamento concluido');
        } else {
            openModalDigiteNovoPreco();
        }
    };
}

const generarMensaje = (accion) => {
    return `No momento de ${accion} hóspede deve alterar o valor do quarto, lembre-se que o valor anterior permanecerá no registro para levar em consideração. ¿Fazer alteração?`;
};
btnRemoverHospede.addEventListener('click', () => {
    openModalConfirmar(generarMensaje('remover'));
});
btnAggHospede.addEventListener('click', () => {
    openModalConfirmar(generarMensaje('agregar'), 'verDatos');
});
btnPagamento.addEventListener('click', (e) => {
    const input = document.querySelector('.');
    const rellenarCampo = document.querySelector('.rellenar-campo');
    console.log('bfuireiu');
    if (input.value === '') {
        rellenarCampo.nextElementSibling.textContent =
            'Por favor llenar el campo';
        setTimeout(() => {
            rellenarCampo.nextElementSibling.textContent = '';
        }, 5000);
    } else {
        rellenarCampo.nextElementSibling.textContent = '';
        closeModal(modalDatosCliente);
        openModalExito('cliente agregado');
    }
});
const modals = [
    modalConfirmar,
    modalDigiteNovoPreco,
    modalExito,
    modalDatosCliente,
];
window.onclick = (event) => {
    modals.forEach((modal) => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
};

function enviarRegistroDePago(numero_documento) {
    let fecha_actual_obj = new Date();
    const anioActual = fecha_actual_obj.getFullYear();
    const diaActual = fecha_actual_obj.getDate();
    const mesActual = fecha_actual_obj.getMonth() + 1;
    let fecha_actual = `${anioActual}-${mesActual}-${diaActual}`;
    console.log(fecha_actual)
    let filas = document.querySelectorAll('.fila_pago');
    let btnEnviarPago = document.querySelectorAll('.btn-pagamento')[1];
    btnEnviarPago.addEventListener('click', (e) => {
        if (
            filas[filas.length - 1].querySelector('.registro_pago').value != ''
        ) {
            const registroPagoInfo = {
                documento: numero_documento,
                pago: parseInt(
                    filas[filas.length - 1].querySelector('.registro_pago')
                        .value
                ),
                fecha_pago: fecha_actual,
                metodo_pago:
                    filas[filas.length - 1].querySelector('select').value,
                extra:
                    filas[filas.length - 1].querySelector('.extra').value || 0,
                cuenta_total: parseInt(
                    filas[filas.length - 1].children[3].textContent.split(
                        ' '
                    )[1]
                ),
            };
            window.preload.enviarRegistroDePagoSend(registroPagoInfo);
            location.reload();
        } else {
            console.log('Está vacío');
        }
    });
}

function concluirPago(informacionDeHuesped, registros_pagos) {
    console.log('Guardando en historial...');
    let fecha_actual_obj = new Date();
    const anioActual = fecha_actual_obj.getFullYear();
    const diaActual = fecha_actual_obj.getDate();
    const mesActual = fecha_actual_obj.getMonth() + 1;
    let fecha_actual = `${anioActual}-${mesActual}-${diaActual}`;
    let btnConcluirPagamento = document.querySelector('#pagamento-concluido');
    const informacionAguardarEnHistorial = {
        informacionDeHuespedes: informacionDeHuesped,
        registros_pagos: registros_pagos,
        fecha_registro_historial: fecha_actual,
    };

    window.preload.guardandoEnHistorialSend(informacionAguardarEnHistorial);
}

function cambioDeEstadoDeHabitacion(id_habitacion,estado) {
    let info = {
        id_habitacion: id_habitacion,
        estado: estado
    }
    
     window.preload.cambiarEstado(info)
    }




