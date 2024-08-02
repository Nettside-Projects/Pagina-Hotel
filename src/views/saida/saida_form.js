const informacionDeHabitacion = JSON.parse(
    localStorage.getItem('informacionDeHabitacion')
);

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

function actualizarCostoTotal(numero_documento, costo_total, descuento) {
    validarDescuento(costo_total, descuento);
    const actualizacion_cuenta_total = {
        documento: numero_documento,
        cuenta_total: costo_total,
    };
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
// tipo de habitación
enviarDatos();
function enviarDatos() {
    window.preload.informacionDeHabitacionYHuespedesSend(
        informacionDeHabitacion.id_habitacion
    );
    window.preload.informacionDeHabitacionYHuespedesOn((e, info) => {
        console.log(info);
        agregandoInformacionInicial(informacionDeHabitacion, info);
        mostrarInformacionNuevaHuesped();
        /*  const cuenta_total_y_registro_pago = cuentaTotalPresente(info) */
        /*  console.log(cuenta_total_y_registro_pago) */
        //mostrarRegistroDePagos(document.querySelectorAll(".card_input")[5].textContent,informacionDeHabitacion.id_habitacion, cuenta_total_y_registro_pago) /* MODIFICADO TEST */
        //Con el valor del costo_total se actualiza el valor del costo total de estadía. Así mismo, se registra el pago que se hizo
        cuentaTotalPresente(info).then((cuenta_total_y_registro_pago) => {
            console.log(cuenta_total_y_registro_pago);
            mostrarRegistroDePagos(
                document.querySelectorAll('.card_input')[5].textContent,
                informacionDeHabitacion.id_habitacion,
                cuenta_total_y_registro_pago
            );
        });
        /*    cuentaTotalPresente(info, (cuenta_total_y_registro_pago) => {
               console.log("lololol")
               console.log(cuenta_total_y_registro_pago)
               mostrarRegistroDePagos(document.querySelectorAll(".card_input")[5].textContent, informacionDeHabitacion.id_habitacion, cuenta_total_y_registro_pago) 
           }); */
    });
}

function agregandoInformacionInicial(infoHabitacion, infoHabitacionYHuespede) {
    let html = '';
    let txt_informacion_inicial = document.querySelectorAll('.card_input');
    txt_informacion_inicial[0].textContent = infoHabitacion.numero; // numero de habitación
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
                        informacionDeHabitacion.id_habitacion,
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
    id_habitacion,
    cuenta_total_y_registro_pago
) /* MODIFICADO TEST */ {
    document.querySelector('tbody').innerHTML = '';
    const registro_pago = cuenta_total_y_registro_pago.registro_pago;
    let cuenta_total = cuenta_total_y_registro_pago.costoTotal;

    /*  window.preload.mostrarRegistroDePagosSend(id_habitacion) */ /* MODIFICADO TEST */
    /* window.preload.mostrarRegistroDePagosOn((e, info) => { */
    if (registro_pago.length != 0) {
        let html = '';
        registro_pago.forEach((element) => {
            html += `<tr class="fila_pago">
                            <td>R$ <input type="number" disabled value="${
                                element.registro_pago
                            }"></td>
                            <td>
                                <select disabled>
                                    <option select>${
                                        element.metodo_pago
                                    }</option>
                                </select>
                            </td>
                            <td>R$ <input type="number" disabled value="${
                                element.extra
                            }"></td>
                            <td>R$ ${
                                element.cuenta_actual /* - element.registro_pago */
                            }</td>
                            <td>R$ ${
                                element.cuenta_actual + element.registro_pago
                            }</td>
                            <td></td>
                        </tr>`;
        });

        document.querySelector('tbody').innerHTML = html;
        if (cuenta_total > 0) {
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
                            <td>R$ ${
                                cuenta_total /*  -
                    info[info.length - 1].registro_pago */
                            }</td>
                            <td>R$ ${cuenta_total}</td>
                            <td></td>
                        </tr>`;

            agregandoEventosDePagos(cuenta_total);
            enviarRegistroDePago(numero_documento);
        } else {
            /* Agregar algún cambio (como sería una sencilla animación) al botón de "Salvar pagamento" en caso de que la cuenta total sea  menor o igual 0*/

            /* Botón ya seleccionado */
            let btnConcluirPagamento =
                document.querySelectorAll('.btn-pagamento')[1];
            btnConcluirPagamento.remove();
            // Creación del contenedor principal
            // Crear elementos
            const container = document.createElement('div');
            container.classList.add('container');

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
            document
                .querySelector('.container')
                .addEventListener('click', (e) => {
                    openModalExito('Pagamento concluido');
                });
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
            filas[filas.length - 1].children[4].textContent = `R$ ${
                saldo_anterior + parseInt(e.target.value || 0)
            }`;
            filas[filas.length - 1].children[3].textContent = `R$ ${
                saldo_anterior +
                parseInt(e.target.value || 0) -
                (parseInt(document.querySelector('.registro_pago').value) || 0)
            }`;
        } else {
            if (document.querySelector('.registro_pago').value != '') {
                filas[filas.length - 1].children[3].textContent = `R$ ${
                    saldo_anterior +
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
            filas[filas.length - 1].children[3].textContent = `R$ ${
                saldo_anterior2 - parseInt(e.target.value || 0)
            }`;
        } else {
            filas[
                filas.length - 1
            ].children[3].textContent = `R$ ${saldo_anterior2}`;
        }
    });
}

/* ---- Modal ---- */
const btnAggHospede = document.querySelector('#btn-agg-hospede');
const btnRemoverHospede = document.querySelector('#btn-remover-hospede');

function closeModal(modal) {
    modal.style.display = 'none';
}
function displayModal(modal) {
    modal.style.display = 'flex';
}
function openModalExito(message) {
    const modalExito = document.getElementById('modalExito');
    const modalExitoMessage = document.getElementById('modalExitoMessage');
    modalExitoMessage.textContent = message;
    displayModal(modalExito);
    setTimeout(() => {
        /* window.preload.infoHuespedesSend(infoGeneral); */
        closeModal(modalExito);
    }, 2000);
}
function openModalDatosCliente() {
    const modalDatosCliente = document.getElementById('modalDatosCliente');
    displayModal(modalDatosCliente);
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
            console.log('Está vacío');
            btnAceitar.disabled = true;
            btnAceitar.style.background = '#167900';
        } else {
            console.log('No está vacío');
            btnAceitar.disabled = false;
            btnAceitar.style.background = '#35C928';
        }
    }
    verificarInput();
    input.addEventListener('input', verificarInput);

    btnCancelar.onclick = () => closeModal(modalDigiteNovoPreco);
    btnAceitar.onclick = () => {
        closeModal(modalDigiteNovoPreco);
        input.value = '';
        verificarInput();
        if (verDatosClientes) {
            openModalDatosCliente();
        } else {
            openModalExito('preço alterado');
        }
    };
}
function openModalConfirmar(message, verDatosClientes) {
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
        if (verDatosClientes) {
            openModalDigiteNovoPreco('verDatosClientes');
        } else {
            openModalDigiteNovoPreco();
        }
    };
}

btnRemoverHospede.addEventListener('click', (e) => {
    openModalConfirmar('remover');
});
btnAggHospede.addEventListener('click', (e) => {
    openModalConfirmar('agregar', 'verDatosClientes');
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
    let fecha_actual = new Date(`${anioActual}-${mesActual}-${diaActual}`);
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
