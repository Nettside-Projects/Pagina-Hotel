const clientCountInput = document.getElementById('numClientes');
    const clientCountDisplay = document.getElementById('clientCountDisplay');
clientCountInput.addEventListener('input', () => {
    const count = clientCountInput.value;
    clientCountDisplay.textContent = count;
    renderClients(count);
});
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
        
        const habitacion = document.createElement('div');
        
        const papel = document.createElement('div');
        
        const entrada = document.createElement('div');
        
        const accion = document.createElement('div');
        accion.classList.add('accion');
        
        fila.appendChild(number);
        fila.appendChild(nombreCliente);
        fila.appendChild(Ndocumento);
        fila.appendChild(habitacion);
        fila.appendChild(papel);
        fila.appendChild(entrada);
        fila.appendChild(accion);
        
        contenedorFilas.appendChild(fila);
        filasArray.push(fila); // Agregar la fila al array
    }

    return filasArray; // Devolver el array con las filas
}

document.getElementById('numClientes').addEventListener('input', function() {
    const numClientes = Math.max(this.value, 10); // Asegurarse de que el valor mínimo sea 10
    createRows(numClientes);
});

// Ejecutar la función al cargar la página con el valor inicial de 10
window.onload = function() {
    createRows(10);
};
document.querySelectorAll('.contendorBtn button').forEach(button => {
    if (!isNaN(button.innerText)) { // Verifica que el texto del botón es un número
        button.addEventListener('click', () => {
            // Remover clase vistaActiva de cualquier botón que la tenga
            document.querySelector('.vistaActiva').classList.remove('vistaActiva');
            // Agregar clase vistaActiva al botón que se hizo clic
            button.classList.add('vistaActiva');
        });
    }
});