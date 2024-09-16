/* Logica con la db */

document.addEventListener("DOMContentLoaded", () => {
    window.preload.listaDeHuespedesSend("listado-huespedes")
    window.preload.listaDeHuespedesOn((e, info) => {
        console.log(info)
        let total = 0
        for (const key in info) {
            total += info[key][0].length
            console.log(total)
        }
        createRows(total, info);



        document.getElementById('numClientes').addEventListener('input', function () {
         /*    this.value = total */
            const numClientes = Math.max(this.value, 1); // Asegurarse de que el valor mínimo sea 10
            createRows(numClientes, info);
        });



    })
})




function createRows(numClientes, info) {
    let contador = 0
    const contenedorFilas = document.getElementById('contenedorFilas');
    contenedorFilas.innerHTML = ''; // Limpiar las filas existentes
    const filasArray = []; // Array para almacenar las filas
    info["actuales"][0].forEach(element => {
        contador++
        if (contador <= numClientes) {
            console.log(element)
            /*   for (let i = 1; i <= numClientes; i++) { */
            const fila = document.createElement('div');
            fila.classList.add('filas');

            if (contador % 2 === 0) {
                fila.classList.add('par'); // Agregar clase para filas pares
            }

            const number = document.createElement('div');
            number.classList.add('number');
            number.textContent = contador;

            const nombreCliente = document.createElement('div');
            nombreCliente.classList.add('nombreCliente');
            nombreCliente.textContent = element.nombre_completo

            const Ndocumento = document.createElement('div');
            Ndocumento.classList.add('Ndocumento');

            const habitacion = document.createElement('div');
            habitacion.classList.add('widthDiv');

            const papel = document.createElement('div');
            papel.classList.add('widthDiv');

            const entrada = document.createElement('div');
            entrada.classList.add('widthDiv');

            const estado = document.createElement('div');
            estado.className = 'estado';

            const verde = document.createElement('div');
            verde.className = 'azul';

            const accion = document.createElement('div');
            accion.classList.add('accion');

            const contendorbtneditar = document.createElement('div');
            contendorbtneditar.classList.add('contendorbtneditar');
            // Crear el primer img
            const imgCirculadoX = document.createElement('img');
            imgCirculadoX.src = '../../../recursos/editar.webp';
            imgCirculadoX.alt = '';

            const contendorbtneliminar = document.createElement('div');
            contendorbtneliminar.classList.add('contendorbtneliminar');
            // Crear el segundo img
            const imgEditarArchivo = document.createElement('img');
            imgEditarArchivo.src = '../../../recursos/icons8-circulado-x-50.webp';
            imgEditarArchivo.alt = '';

            // Añadir las imágenes al contenedor principal div
            accion.appendChild(contendorbtneditar);
            accion.appendChild(contendorbtneliminar);
            contendorbtneditar.appendChild(imgCirculadoX);
            contendorbtneliminar.appendChild(imgEditarArchivo);

            fila.appendChild(number);
            fila.appendChild(nombreCliente);
            fila.appendChild(Ndocumento);
            fila.appendChild(habitacion);
            fila.appendChild(papel);
            fila.appendChild(entrada);
            entrada.appendChild(estado);
            estado.appendChild(verde);
            fila.appendChild(accion);

            contenedorFilas.appendChild(fila);
            filasArray.push(fila); // Agregar la fila al array
            /*   } */
        }
    })




    // Obtener todos los botones que abren los modales
    var btnsEditar = document.querySelectorAll('.contendorbtneditar');
    var btnsEliminar = document.querySelectorAll('.contendorbtneliminar');

    // Obtener el botón "No" y "Sí" dentro del modal de edición
    var noButton = document.getElementById('noButton');
    var yesButton = document.getElementById('yesButton');

    // Obtener el botón "No" y "Sí" dentro del modal de eliminación
    var noButtontres = document.getElementById('noButtontres');
    var yesButtontres = document.getElementById('yesButtontres');

    // Obtener el botón "No" y "Sí" dentro del modal de confirmación
    var noButtonConfirm = document.getElementById('noButtonConfirm');
    var yesButtonConfirm = document.getElementById('yesButtonConfirm');

    // Obtener los elementos <span> que cierran los modales
    var spans = document.querySelectorAll('.closedos, .closeinfo');

    // Obtener los modales
    var modalEditarcliente = document.getElementById('modalEditarcliente');
    var modalConfirmar = document.getElementById('modalConfirmar');
    var modalEliminarcliente = document.getElementById('modalELiminarcliente');
    var modalInformacion = document.getElementById('modalInformacion');
    var modalInformacionEliminar = document.getElementById(
        'modalInformacionEliminar'
    );

    // Función para mostrar un modal
    function showModal(modal) {
        modal.classList.add('block');
    }

    // Función para ocultar un modal
    function hideModal(modal) {
        modal.classList.remove('block');
    }

    // Función para mostrar un modal y ocultarlo automáticamente después de 3 segundos
    function showModalWithAutoHide(modal, duration = 3000) {
        showModal(modal);
        setTimeout(() => {
            hideModal(modal);
        }, duration);
    }

    // Añadir evento de click a cada botón para abrir el modal de edición
    btnsEditar.forEach((element) => {
        element.addEventListener('click', (e) => {
            showModal(modalEditarcliente);
        });
    });

    // Añadir evento de click al botón "No" para cerrar el modal de edición
    noButton.addEventListener('click', (e) => {
        hideModal(modalEditarcliente);
    });

    // Añadir evento de click al botón "Sí" para cerrar el modal de edición y abrir el modal de confirmación
    yesButton.addEventListener('click', (e) => {
        hideModal(modalEditarcliente);
        showModal(modalConfirmar);
    });

    // Añadir evento de click a cada botón para abrir el modal de eliminación
    btnsEliminar.forEach((element) => {
        element.addEventListener('click', (e) => {
            showModal(modalEliminarcliente);
        });
    });

    // Añadir evento de click al botón "No" para cerrar el modal de eliminación
    noButtontres.addEventListener('click', (e) => {
        hideModal(modalEliminarcliente);

    });

    // Añadir evento de click al botón "Sí" para cerrar el modal de eliminación y abrir el modal de información
    yesButtontres.addEventListener('click', (e) => {
        hideModal(modalEliminarcliente);
        showModalWithAutoHide(modalInformacionEliminar);
    });

    // Verificar si noButtonConfirm existe antes de añadir el event listener
    if (noButtonConfirm) {
        noButtonConfirm.addEventListener('click', (e) => {
            hideModal(modalConfirmar);
            location.reload();
        });
    }

    // Verificar si yesButtonConfirm existe antes de añadir el event listener
    if (yesButtonConfirm) {
        yesButtonConfirm.addEventListener('click', (e) => {
            let allFilled = true;
            let inputnombre = document.querySelectorAll(".input_obligatorio");

            inputnombre.forEach((element) => {
                if (element.value === '') {
                    element.nextElementSibling.textContent = 'Por favor llenar el campo';
                    setTimeout(() => {
                        element.nextElementSibling.textContent = '';
                    }, 5000);
                    allFilled = false;
                } else {
                    element.nextElementSibling.textContent = '';
                }
            });

            if (allFilled) {
                hideModal(modalConfirmar);
                showModalWithAutoHide(modalInformacion);
            }
        });
    }




    // Añadir evento de click a los elementos <span> para cerrar los modales
    spans.forEach((element) => {
        element.addEventListener('click', (e) => {
            hideModal(element.closest('.modal'));
            location.reload();
        });
    });

    return filasArray; // Devolver el array con las filas
}



// Ejecutar la función al cargar la página con el valor inicial de 10
/* window.onload = function () {
    
}; */
document.querySelectorAll('.contendorBtn button').forEach((button) => {
    if (!isNaN(button.innerText)) {
        // Verifica que el texto del botón es un número
        button.addEventListener('click', () => {
            // Remover clase vistaActiva de cualquier botón que la tenga
            document
                .querySelector('.vistaActiva')
                .classList.remove('vistaActiva');
            // Agregar clase vistaActiva al botón que se hizo clic
            button.classList.add('vistaActiva');
        });
    }
});


