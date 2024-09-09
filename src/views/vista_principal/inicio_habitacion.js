function createRows(numClientes) {
    const contenedorFilas = document.getElementById('contenedorFilas');
    contenedorFilas.innerHTML = ''; // Limpiar las filas existentes
    const filasArray = []; // Array para almacenar las filas

    for (let i = 1; i <= numClientes; i++) {
        const fila = document.createElement('div');
        fila.classList.add('filas');

        if (i % 2 === 0) {
            fila.classList.add('par'); // Agregar clase para filas pares
        }

        const number = document.createElement('div');
        number.classList.add('number');
        number.textContent = i;

        const nombreCliente = document.createElement('div');
        nombreCliente.classList.add('nombreCliente');

        const Ndocumento = document.createElement('div');
        Ndocumento.classList.add('Ndocumento');

        const datareserva = document.createElement('div');
        datareserva.classList.add('widthDiv');

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
        fila.appendChild(datareserva);
        fila.appendChild(accion);
        contenedorFilas.appendChild(fila);
        filasArray.push(fila); // Agregar la fila al array
       
    }
// Definir los modales y botones
var btnsEditar = document.querySelectorAll('.contendorbtneditar');
var btnadd = document.querySelector('.btn_add');
var modaleditareseva = document.querySelectorAll('.modaleditareseva');
var salir = document.querySelectorAll('.salir');
var guardar = document.getElementById('guardar');
var modalhabitacion = document.getElementById('modalhabitacion');
var cuartos = document.getElementById('cuartos');
var agregar = document.getElementById('agregar');
var modalconfirmacion = document.getElementById('modalconfirmacion');
var modaleditar = document.getElementById('modaleditar'); // Definir modaleditar

// Función para mostrar un modal
function showModal(modal) {
    modal.classList.add('block'); // Asegúrate de que esta clase esté definida en CSS
}
// Función para ocultar un modal
function hideModal(modal) {
    modal.classList.remove('block');
}

// Función para mostrar un modal y ocultarlo automáticamente después de X segundos
function showModalWithAutoHide(modal, duration = 3000) {
    showModal(modal); // Mostrar el modal
    setTimeout(() => {
        hideModal(modal); // Ocultar el modal después del tiempo especificado
    }, duration);
}


btnadd.addEventListener('click', (e) => {
    guardar.style.display = "none";
    cuartos.style.display = "none";
    agregar.style.display = "flex"; 
    showModal(modaleditar);
});

salir.forEach((element) => {
    element.addEventListener('click', (e) => {
        hideModal(element.closest('.modal'));
        location.reload();
    });
});

cuartos.addEventListener('click', (e) => {
    e.preventDefault();
    hideModal(modaleditar)
    showModal(modalhabitacion) 
})

btnsEditar.forEach((element) => {
    element.addEventListener('click', (e) => {
        agregar.style.display = "none";
        showModal(modaleditar);
        modaleditareseva.forEach((modal) => {
            modal.style.display = "flex";
        });
    });
});
// Función que maneja la validación y el comportamiento dependiendo de qué botón se presionó
function handleButtonClick(e, actionType) {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
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

    // Solo procede si todos los campos obligatorios están llenos
    if (allFilled) {
        hideModal(modaleditar);

        // Diferenciamos el comportamiento dependiendo de si es "agregar" o "guardar"
        if (actionType === 'agregar') {
            showModalWithAutoHide(modalconfirmacion, 3000); // Mostrar modal por 3 segundos
            setTimeout(() => {
                location.reload(); // Recargar después de que se oculta el modal
            }, 3000); // Esperar 3 segundos antes de recargar
        } else if (actionType === 'guardar') {
            showModalWithAutoHide(modalconfirmacion, 3000); // Mostrar modal por 3 segundos
            setTimeout(() => {
                location.reload(); // Recargar después de que se oculta el modal
            }, 3000); // Esperar 3 segundos antes de recargar
        }
    }
}

// Verifica si existen 'agregar' y 'guardar' y asigna el evento a ambos
if (agregar) {
    agregar.addEventListener('click', (e) => handleButtonClick(e, 'agregar'));
}

if (guardar) {
    guardar.addEventListener('click', (e) => handleButtonClick(e, 'guardar'));
}

 

}
       document.getElementById('numClientes').addEventListener('input', function () {
        const numClientes = Math.max(this.value, 1); // Asegurarse de que el valor mínimo sea 1
        createRows(numClientes);
    });
    
    // Ejecutar la función al cargar la página con el valor inicial de 10
    window.onload = function () {
        createRows(10);
    };

document.addEventListener("DOMContentLoaded",()=>{
    window.preload.informacionGeneralSend("txt-activation")
    window.preload.informacionGeneralOn((e,info)=>{
        console.log(info)
        document.querySelectorAll(".xx")[0].textContent = info.total_habitaciones <= 10 ?  `0${info.total_habitaciones}` : info.total_habitaciones
        document.querySelectorAll(".xx")[1].textContent = info.habitaciones_libres <= 10 ?  `0${info.habitaciones_libres}` : info.habitaciones_libres
        document.querySelectorAll(".xx")[2].textContent = info.reserva <= 10 ?  `0${info.reserva}` : info.reserva
        document.querySelectorAll(".xx")[3].textContent = info.habitaciones_ocupadas <= 10 ?  `0${info.habitaciones_ocupadas}` : info.habitaciones_ocupadas
    })
})
