
const clientCountInput = document.getElementById('numClientes');
    const clientCountDisplay = document.getElementById('clientCountDisplay');
clientCountInput.addEventListener('input', () => {
    const count = clientCountInput.value;
    clientCountDisplay.textContent = count;
    renderClients(count);
    if (i === count) {
        fila.style.borderBottom = '1px solid #4B4B4B';
    }
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
        habitacion.classList.add('widthDiv')
        
        const papel = document.createElement('div');
        papel.classList.add('widthDiv')
        
        const entrada = document.createElement('div');
        entrada.classList.add('widthDiv')

        const estado = document.createElement('div');
            estado.className = 'estado';

        const verde = document.createElement('div');
            verde.className = 'azul';
        
        const accion = document.createElement('div');
        accion.classList.add('accion');

        const contendorbtneditar = document.createElement('div');
        contendorbtneditar.classList.add('contendorbtneditar');
        contendorbtneditar.classList.add('openModaleditar');
        // Crear el primer img
        const imgCirculadoX = document.createElement('img');
        imgCirculadoX.src ='../../../recursos/editar.webp' ;
        imgCirculadoX.alt = '';

        const contendorbtneliminar = document.createElement('div');
        contendorbtneliminar.classList.add('contendorbtneliminar');
        // Crear el segundo img
        const imgEditarArchivo = document.createElement('img');
        imgEditarArchivo.src ='../../../recursos/icons8-circulado-x-50.webp' ;
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
        entrada.appendChild(estado)
        estado.appendChild(verde)
        fila.appendChild(accion);
        
        contenedorFilas.appendChild(fila);
        filasArray.push(fila); // Agregar la fila al array
    }
    return filasArray; // Devolver el array con las filas
}

document.getElementById('numClientes').addEventListener('input', function() {
    const numClientes = Math.max(this.value, 1); // Asegurarse de que el valor mínimo sea 10
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
/* 

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    // }
}
 */

/* document.querySelector("#select_num").addEventListener("change", function() {
    let select = document.querySelector("#select_num");
    let valor = select.value;

    // Re-populate the options while keeping "N°" at the top
    select.innerHTML = `
        <option value="default" selected disabled hidden>N°</option>
        <option value="+">A/Z</option>
        <option value="-">Z/A</option>
    `;

    // Set the selected value based on the user's selection
    if (valor === "+") {
        select.innerHTML += `<option value="+" selected>A/Z</option>`;
    } else if (valor === "-") {
        select.innerHTML += `<option value="-" selected>Z/A</option>`;
    }
});



document.querySelector("#select_nombre").addEventListener("click",e=>{
    let valor = e.target.value
        document.querySelector("#select_nombre").innerHTML = `<option value="+" >A/Z</option>
        <option value="-">Z/A</option>
        <option selected>Nome completo</option>`
                                    
                            } 
                ) */
// scripts.js
document.querySelectorAll('.encabezadoLista div').forEach(header => {
    header.addEventListener('mouseover', () => {
        const options = header.querySelector('.sort-options');
        if (options) {
            options.style.display = 'block';
        }
    });

    header.addEventListener('mouseout', () => {
        const options = header.querySelector('.sort-options');
        if (options) {
            options.style.display = 'none';
        }
    });

    header.addEventListener('click', () => {
        const options = header.querySelector('.sort-options');
        if (options) {
            options.style.display = 'block';
        }
    });
});

function sortTable(column, order) {
    console.log(`Sorting ${column} in ${order} order.`);
    // Aquí iría el código para ordenar la tabla
}

  // Obtener el modal
  var modal = document.getElementById("myModal");

  // Obtener el elemento <span> que cierra el modal
  var span = document.getElementsByClassName("close")[0];

  // Obtener todos los botones que abren el modal
  var btns = document.getElementsByClassName("openModaleditar");

  // Añadir evento click a todos los botones
  for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
          modal.style.display = "block";
      });
  }

  // Cuando el usuario hace clic en <span> (x), cierra el modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // Cuando el usuario hace clic fuera del modal, cierra el modal
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }