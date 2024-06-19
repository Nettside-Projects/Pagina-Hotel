let main = document.querySelector(".main-container")


function createDatosAcompanantes() {
    const datosAcompanantes = document.createElement('div');
    datosAcompanantes.className = 'datos_acompañantes none';
    datosAcompanantes.style.marginBottom = '60px';
    datosAcompanantes.id = 'cuadro';

    const datosCliente = document.createElement('div');
    datosCliente.className = 'datos_cliente';

    const columRight = document.createElement('div');
    columRight.className = 'colum rigth';

    const informeEncabezadoCliente = document.createElement('div');
    informeEncabezadoCliente.className = 'infomre_encabezado';
    const pCliente = document.createElement('p');
    pCliente.textContent = 'Dados do Cliente';
    informeEncabezadoCliente.appendChild(pCliente);

    const nombreCliente = document.createElement('div');
    nombreCliente.className = 'nombre_cliente';
    const encabezadoNombre = document.createElement('div');
    encabezadoNombre.className = 'encabezado_nombre';
    encabezadoNombre.textContent = 'Nome';
    const inputNombre = document.createElement('input');
    inputNombre.className = 'input_xd completo';

    nombreCliente.appendChild(encabezadoNombre);
    nombreCliente.appendChild(inputNombre);

    columRight.appendChild(informeEncabezadoCliente);
    columRight.appendChild(nombreCliente);

    const documentoCliente1 = document.createElement('div');
    documentoCliente1.className = 'documento_cliente';

    const colum1 = document.createElement('div');
    colum1.className = 'colum';
    const encabezadoNombreDoc1 = document.createElement('div');
    encabezadoNombreDoc1.className = 'encabezado_nombre documento';
    encabezadoNombreDoc1.textContent = 'N° de Passaporte';
    const inputDoc1 = document.createElement('input');
    inputDoc1.className = 'input_xd';

    colum1.appendChild(encabezadoNombreDoc1);
    colum1.appendChild(inputDoc1);

    const colum2 = document.createElement('div');
    colum2.className = 'colum';
    const encabezadoNombreDoc2 = document.createElement('div');
    encabezadoNombreDoc2.className = 'encabezado_nombre documento';
    encabezadoNombreDoc2.textContent = 'N° de Documento';
    const inputDoc2 = document.createElement('input');
    inputDoc2.className = 'input_xd';

    colum2.appendChild(encabezadoNombreDoc2);
    colum2.appendChild(inputDoc2);

    documentoCliente1.appendChild(colum1);
    documentoCliente1.appendChild(colum2);

    columRight.appendChild(documentoCliente1);

    // Repeat for the other fields as necessary
    const documentoCliente2 = document.createElement('div');
    documentoCliente2.className = 'documento_cliente';

    const colum3 = document.createElement('div');
    colum3.className = 'colum';
    const encabezadoNombreDoc3 = document.createElement('div');
    encabezadoNombreDoc3.className = 'encabezado_nombre documento';
    encabezadoNombreDoc3.textContent = 'Profissão';
    const inputDoc3 = document.createElement('input');
    inputDoc3.className = 'input_xd';

    colum3.appendChild(encabezadoNombreDoc3);
    colum3.appendChild(inputDoc3);

    const colum4 = document.createElement('div');
    colum4.className = 'colum';
    const encabezadoNombreDoc4 = document.createElement('div');
    encabezadoNombreDoc4.className = 'encabezado_nombre documento';
    encabezadoNombreDoc4.textContent = 'Procedência';
    const inputDoc4 = document.createElement('input');
    inputDoc4.className = 'input_xd';

    colum4.appendChild(encabezadoNombreDoc4);
    colum4.appendChild(inputDoc4);

    documentoCliente2.appendChild(colum3);
    documentoCliente2.appendChild(colum4);

    columRight.appendChild(documentoCliente2);

    const documentoCliente3 = document.createElement('div');
    documentoCliente3.className = 'documento_cliente';

    const colum5 = document.createElement('div');
    colum5.className = 'colum';
    const encabezadoNombreDoc5 = document.createElement('div');
    encabezadoNombreDoc5.className = 'encabezado_nombre documento';
    encabezadoNombreDoc5.textContent = 'Data de nascimento';
    const inputDoc5 = document.createElement('input');
    inputDoc5.className = 'input_xd';

    colum5.appendChild(encabezadoNombreDoc5);
    colum5.appendChild(inputDoc5);

    const colum6 = document.createElement('div');
    colum6.className = 'colum';
    const encabezadoNombreDoc6 = document.createElement('div');
    encabezadoNombreDoc6.className = 'encabezado_nombre documento';
    encabezadoNombreDoc6.textContent = 'Destino';
    const inputDoc6 = document.createElement('input');
    inputDoc6.className = 'input_xd';

    colum6.appendChild(encabezadoNombreDoc6);
    colum6.appendChild(inputDoc6);

    documentoCliente3.appendChild(colum5);
    documentoCliente3.appendChild(colum6);

    columRight.appendChild(documentoCliente3);

    const documentoCliente4 = document.createElement('div');
    documentoCliente4.className = 'documento_cliente';

    const colum7 = document.createElement('div');
    colum7.className = 'colum';
    const encabezadoNombreDoc7 = document.createElement('div');
    encabezadoNombreDoc7.className = 'encabezado_nombre documento';
    encabezadoNombreDoc7.textContent = 'Naturalidade';
    const inputDoc7 = document.createElement('input');
    inputDoc7.className = 'input_xd';

    colum7.appendChild(encabezadoNombreDoc7);
    colum7.appendChild(inputDoc7);

    const colum8 = document.createElement('div');
    colum8.className = 'colum';
    const encabezadoNombreDoc8 = document.createElement('div');
    encabezadoNombreDoc8.className = 'encabezado_nombre documento';
    encabezadoNombreDoc8.textContent = 'Papel da pessoa';
    const inputDoc8 = document.createElement('input');
    inputDoc8.className = 'input_xd';

    colum8.appendChild(encabezadoNombreDoc8);
    colum8.appendChild(inputDoc8);

    documentoCliente4.appendChild(colum7);
    documentoCliente4.appendChild(colum8);

    columRight.appendChild(documentoCliente4);

    const telefonoCliente = document.createElement('div');
    telefonoCliente.className = 'telefono_cliente';
    const encabezadoTelefono = document.createElement('div');
    encabezadoTelefono.className = 'encabezado_nombre';
    encabezadoTelefono.textContent = 'Telefone';
    const inputTelefono = document.createElement('input');
    inputTelefono.className = 'input_xd completo';

    telefonoCliente.appendChild(encabezadoTelefono);
    telefonoCliente.appendChild(inputTelefono);

    const emailCliente = document.createElement('div');
    emailCliente.className = 'email_cliente';
    const encabezadoEmail = document.createElement('div');
    encabezadoEmail.className = 'encabezado_nombre';
    encabezadoEmail.textContent = 'E-mail';
    const inputEmail = document.createElement('input');
    inputEmail.className = 'input_xd completo';

    emailCliente.appendChild(encabezadoEmail);
    emailCliente.appendChild(inputEmail);

    columRight.appendChild(telefonoCliente);
    columRight.appendChild(emailCliente);

    datosCliente.appendChild(columRight);

    const columAlojamiento = document.createElement('div');
    columAlojamiento.className = 'colum';
    const informeEncabezadoAlojamiento = document.createElement('div');
    informeEncabezadoAlojamiento.className = 'infomre_encabezado';
    const pAlojamiento = document.createElement('p');
    pAlojamiento.textContent = 'Dados de Alojamento';
    informeEncabezadoAlojamiento.appendChild(pAlojamiento);
    columAlojamiento.appendChild(informeEncabezadoAlojamiento);

    datosCliente.appendChild(columAlojamiento);

    datosAcompanantes.appendChild(datosCliente);

    return datosAcompanantes;
}
let btnAddCliente = document.querySelector(".add_vista")
function agregarBtn() {
   
   /*  const contenBoton = document.createElement('div');
            contenBoton.className = 'conten_boton'; */

            const addVistaButton = document.createElement('button');
            addVistaButton.className = 'add_vista';
            addVistaButton.textContent = 'Adicionar Cliente';

            contenBoton.appendChild(addVistaButton);
            contenBoton.addEventListener("click",e => {
                e.preventDefault()
                console.log("activado")
                contenBoton.remove()
                main.appendChild(createDatosAcompanantes())
                agregarBtn()
            }) 
    main.appendChild(contenBoton)
}


    btnAddCliente.addEventListener("click",e => {
        e.preventDefault()
        console.log("activado")
        btnAddCliente.remove()
        main.appendChild(createDatosAcompanantes())
        agregarBtn()
    }) 


   
function toggleCuadro() {
    console.log("sapoo")
    const cuadro = document.getElementById('cuadro');
    cuadro.classList.toggle('none');
}
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const hour12 = hours % 12 || 12; // Converts 0 to 12 for 12-hour format
    const timeString = `${hour12}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('clock').textContent = timeString;

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = now.getFullYear();
    const dateString = `${day}/${month}/${year}`;
    document.getElementById('date').textContent = dateString;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call to display clock immediately


// Obtener el modal
var modal = document.getElementById("myModal");

// Obtener el botón que abre el modal
var btn = document.getElementById("openModalButton");

// Obtener el <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario haga clic en el botón, se abre el modal
btn.onclick = function() {
    modal.style.display = "flex";
}

// Cuando el usuario haga clic en <span> (x), se cierra el modal
span.onclick = function() {
    modal.style.display = "none";
}

// Cuando el usuario haga clic en cualquier lugar fuera del modal, se cierra
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
