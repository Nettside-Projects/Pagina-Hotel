document.addEventListener('DOMContentLoaded', () => {

    const info = JSON.parse(localStorage.getItem("informacionDeHabitacion"))
    const contenedorInfoHabitacion = document.querySelectorAll(".info_habitacion")

    let btnEnviar = document.querySelector('#enviar')
    let btnValorDiaria = document.querySelector("#valor_diaria")
    let btnAddCliente = document.querySelector(".add_vista")
    let main = document.querySelector("form")
    let porcentaValue = 1
    let valorDiaria = 0
    /* Variable encargada de agregar el indice correspondiente a cada input para su posterior envío dentro de un JSON */
    let contador = 1;

    /* Mateus -> Agregando informacion de las habitaciones */
    contenedorInfoHabitacion[0].textContent = info.numero
    contenedorInfoHabitacion[1].textContent = info.descripcion
    contenedorInfoHabitacion[3].textContent = info.tipo
    contenedorInfoHabitacion[4].textContent = info.estado


    

    /* Función para crear los campos del formulario del acompañante */
    function createDatosAcompanantes(contador) {
        const datosAcompanantes = document.createElement('div');
        datosAcompanantes.className = 'datos_acompañantes';
        datosAcompanantes.style.marginBottom = '60px';
        datosAcompanantes.id = 'cuadro';

        const datosCliente = document.createElement('div');
        datosCliente.className = 'datos_cliente';

        const columRight = document.createElement('div');
        columRight.className = 'colum rigth';

        const informeEncabezadoCliente = document.createElement('div');
        informeEncabezadoCliente.className = 'infomre_encabezado';
        const pCliente = document.createElement('p');
        pCliente.textContent = 'Dados do Cliente companheiro';
        informeEncabezadoCliente.appendChild(pCliente);
        /* --------- */
        const nombreCliente = document.createElement('div');
        nombreCliente.className = 'nombre_cliente';
        const encabezadoNombre = document.createElement('div');
        encabezadoNombre.className = 'encabezado_nombre';
        const spans = document.createElement('span');
        spans.className = 'input_requerid';
        spans.textContent ='*';
        encabezadoNombre.textContent = 'Nome';
        const inputNombre = document.createElement('input');
        inputNombre.className = 'input_xd completo nombre-completo';
        const nameErrorDiv = document.createElement('div');
        nameErrorDiv.id = 'name-error-nombre';
        nameErrorDiv.className = 'name-error-nombre';
        inputNombre.name = `huesped[${contador}][nombre]`
         /* --------- */

        nombreCliente.appendChild(encabezadoNombre);
        nombreCliente.appendChild(inputNombre);
        nombreCliente.appendChild(nameErrorDiv)
        encabezadoNombre.appendChild(spans)
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
        inputDoc1.name = `huesped[${contador}][pasaporte]`
        colum1.appendChild(encabezadoNombreDoc1);
        colum1.appendChild(inputDoc1);
        /*colum1.appendChild( Colocar la variable donde tiene el elemento html donde ira el mensaje de error);*/
        const colum2 = document.createElement('div');
        colum2.className = 'colum';
        const encabezadoNombreDoc2 = document.createElement('div');
        encabezadoNombreDoc2.className = 'encabezado_nombre documento';
        const span = document.createElement('span');
        span.className = 'input_requerid';
        span.textContent ='*';
        encabezadoNombreDoc2.textContent = 'N° de Documento';
        const inputDoc2 = document.createElement('input');
        inputDoc2.className = 'input_xd document-error-documment';
        inputDoc2.name = `huesped[${contador}][documento]`
        const documentErrorDiv = document.createElement('div');
        documentErrorDiv.id = 'document-error';
        documentErrorDiv.className = 'error-message-documment';
        const nameErrorDiv_document = document.createElement('div');
        nameErrorDiv_document.id = 'name-error-nombre';
        nameErrorDiv_document.className = 'name-error-nombre';
        colum2.appendChild(encabezadoNombreDoc2);
        colum2.appendChild(inputDoc2);

        documentoCliente1.appendChild(colum1);
        documentoCliente1.appendChild(colum2);
        colum2.appendChild(documentErrorDiv)
        encabezadoNombreDoc2.appendChild(span)
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
        inputDoc3.name = `huesped[${contador}][profesion]`

        colum3.appendChild(encabezadoNombreDoc3);
        colum3.appendChild(inputDoc3);

        const colum4 = document.createElement('div');
        colum4.className = 'colum';
        const encabezadoNombreDoc4 = document.createElement('div');
        encabezadoNombreDoc4.className = 'encabezado_nombre documento';
        encabezadoNombreDoc4.textContent = 'Procedência';
        const inputDoc4 = document.createElement('input');
        inputDoc4.className = 'input_xd';
        inputDoc4.name = `huesped[${contador}][procedencia]`

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
        inputDoc5.name = `huesped[${contador}][fecha_nacimiento]`

        colum5.appendChild(encabezadoNombreDoc5);
        colum5.appendChild(inputDoc5);

        const colum6 = document.createElement('div');
        colum6.className = 'colum';
        const encabezadoNombreDoc6 = document.createElement('div');
        encabezadoNombreDoc6.className = 'encabezado_nombre documento';
        encabezadoNombreDoc6.textContent = 'Destino';
        const inputDoc6 = document.createElement('input');
        inputDoc6.className = 'input_xd';
        inputDoc6.name = `huesped[${contador}][destino]`

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
        inputDoc7.name = `huesped[${contador}][naturalidad]`

        colum7.appendChild(encabezadoNombreDoc7);
        colum7.appendChild(inputDoc7);

        /*  const colum8 = document.createElement('div');
         colum8.className = 'colum';
         const encabezadoNombreDoc8 = document.createElement('div');
         encabezadoNombreDoc8.className = 'encabezado_nombre documento';
         encabezadoNombreDoc8.textContent = 'Papel da pessoa';
         const inputDoc8 = document.createElement('input');
         inputDoc8.className = 'input_xd'; */


        /*  colum8.appendChild(encabezadoNombreDoc8); */
        /*   colum8.appendChild(inputDoc8); */

        documentoCliente4.appendChild(colum7);
        /* documentoCliente4.appendChild(colum8); */

        columRight.appendChild(documentoCliente4);

        const telefonoCliente = document.createElement('div');
        telefonoCliente.className = 'telefono_cliente';
        const encabezadoTelefono = document.createElement('div');
        encabezadoTelefono.className = 'encabezado_nombre';
        encabezadoTelefono.textContent = 'Telefone';
        const inputTelefono = document.createElement('input');
        inputTelefono.className = 'input_xd completo';
        inputTelefono.name = `huesped[${contador}][telefono]`

        telefonoCliente.appendChild(encabezadoTelefono);
        telefonoCliente.appendChild(inputTelefono);

        const emailCliente = document.createElement('div');
        emailCliente.className = 'email_cliente';
        const encabezadoEmail = document.createElement('div');
        encabezadoEmail.className = 'encabezado_nombre';
        encabezadoEmail.textContent = 'E-mail';
        const inputEmail = document.createElement('input');
        inputEmail.className = 'input_xd completo';
        inputEmail.name = `huesped[${contador}][email]`

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
    /* Codigo de Mateus */
   
    function agregarBtn() {
        const contenBarra = document.createElement('div');
        contenBarra.className = 'conten_barra';

        // Crear el nodo 'barra_verde' y añadirlo a 'conten_barra'
        const barraVerde = document.createElement('div');
        barraVerde.className = 'barra_verde';
        contenBarra.appendChild(barraVerde);

        const contenBoton = document.createElement('div');
        contenBoton.className = 'conten_boton';

        // Crear el botón 'Adicionar Cliente' y añadirlo a 'conten_boton'
        const addButton = document.createElement('button');
        addButton.className = 'add_vista';
        addButton.textContent = 'Adicionar Cliente';
        contenBoton.appendChild(addButton);

        // Crear el botón 'Suprimir Cliente' y añadirlo a 'conten_boton'
        const deleteButton = document.createElement('button');
        deleteButton.className = 'eliminar_vista';
        deleteButton.textContent = 'Suprimir Cliente';
        contenBoton.appendChild(deleteButton);

        /* Agregar eventos al boton de agregar */
        addButton.addEventListener("click", e => {
            e.preventDefault()
            console.log("activado")
            contenBoton.remove()
            addButton.remove()
            main.appendChild(contenBarra)
            main.appendChild(createDatosAcompanantes(contador))
            agregarBtn()
        })

        /* Agregar eventos al boton de eliminar */
        deleteButton.addEventListener("click", e => {
            e.preventDefault()
            document.querySelectorAll(".conten_barra")[document.querySelectorAll(".conten_barra").length - 1].remove()
            main.children[main.children.length - 2].remove()
            contador -= 1

            if (document.querySelector(".conten_barra") == null) {
                document.querySelector(".eliminar_vista").remove()
            }
        })
        main.appendChild(contenBoton)
        contador += 1
    }

    btnAddCliente.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('activado');
        btnAddCliente.remove();
        document.querySelector('.conten_boton').remove();
        main.appendChild(createDatosAcompanantes(contador));
        agregarBtn();
    });

   
    btnValorDiaria.addEventListener("focusout", (e) => {
        valorDiaria = e.target.value
        calcularPrecioTotal(valorDiaria)
    })

    document.querySelector("#fecha_salida").addEventListener('focusout', e => {
        calcularPrecioTotal(valorDiaria)
    })

    function calcularPrecioTotal(valorDiaria) {
        // Supongamos que estas son las fechas de entrada y salida en formato YYYY-MM-DD
        const fechaOriginal = document.querySelector("#date").textContent;
        const partesFecha = fechaOriginal.split("/");
        const fechaFormateada = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`
        var fechaSalida = document.querySelector("#fecha_salida").value.split('T')[0];

       /*  console.log("fecha entrada -> " + fechaFormateada + "|" + "fecha salida -> " + fechaSalida) */

        // Convertimos las fechas a objetos Date de JavaScript
        var entrada = new Date(fechaFormateada);
        var salida = new Date(fechaSalida);

        // Calculamos la diferencia en milisegundos entre las dos fechas
        var diferenciaMilisegundos = salida.getTime() - entrada.getTime();
        if (diferenciaMilisegundos !== 0) {
            // Convertimos la diferencia de milisegundos a días
            var diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);

            // Redondeamos el número para obtener un número entero de días
            diferenciaDias = Math.ceil(diferenciaDias); // Usamos Math.ceil para incluir el último día

            // Supongamos que este es el valor diario de la habitación
            var valorDiario = valorDiaria;


            // Calculamos el costo total de la estadía
            var costoTotal = diferenciaDias * valorDiario;
           if(porcentaValue % 1 === 0 && porcentaValue != 1){
            costoTotal = costoTotal - porcentaValue
            console.log("Es entero: "+ porcentaValue)
           }else{
            costoTotal = costoTotal * porcentaValue
            console.log("No es entero: "+ porcentaValue)
           }
            

          /*   console.log('El huésped se hospedará por ' + diferenciaDias + ' días.');
            console.log('El costo total de la estadía es: ' + costoTotal);
            console.log(contenedorInfoHabitacion[2].textContent) */
            if (isNaN(costoTotal)) {
                contenedorInfoHabitacion[2].textContent = '$R0'
                return 0;
            } else {
                console.log(costoTotal)
                contenedorInfoHabitacion[2].textContent = `$R${costoTotal}`
                return costoTotal
            }
        } else {
            contenedorInfoHabitacion[2].textContent = `$R${valorDiaria - porcentaValue}`
            return valorDiaria - porcentaValue
        }
    }

    /* Envío de datos del formualrio */
    btnEnviar.addEventListener('click', e => {
        e.preventDefault()
        const nameInput = document.querySelectorAll('.nombre-completo');
        const documentInput = document.querySelectorAll('.document-error-documment');
        const nameError = document.querySelectorAll('.error-message-salida'); 
        const fecha_salida = document.querySelector('#fecha_salida')

       
        let formData = new FormData(main)
        const huespedes = [];

        // Obtén los valores de los campos con FormData
        for (const [key, value] of formData.entries()) {
            const [grupo, indice, campo] = key.match(/huesped\[(\d+)\]\[(\w+)\]/);
            if (!huespedes[indice]) {
                huespedes[indice] = {};
            }
            huespedes[indice][campo] = value;
            huespedes[indice]["estado_pago"] = false
            huespedes[indice]["id_habitacion"] = info.id_habitacion
            huespedes[indice]["fecha_entrada"] = `${document.querySelector(".date").textContent} ${document.querySelector(".clock").textContent}`
            huespedes[indice]["fecha_salida"] = `${document.querySelector("#fecha_salida").value}`
        }

        let cuentaTotal = calcularPrecioTotal(valorDiaria)
        const infoGeneral = {
            infoHuespedes : huespedes,
            cuentaTotal: cuentaTotal
        }

        /* Proceder hacer la validación de los campos para ejecutar el envío de datos a través de las dos líneas de codigo que siguen de esta */
       
        /* ___________mensaje error_______________ */

    
        
        nameInput.forEach(e =>{
            if(e.value == ""){
                e.nextElementSibling.textContent = "Por favor llenar el campo"
                setTimeout(() => {
                     e.nextElementSibling.textContent  = ""
                }, 5000);
            }else{
                e.nextElementSibling.textContent  = ""
            }
        })
        documentInput.forEach(e =>{
            if(e.value == ""){
                e.nextElementSibling.textContent = "Por favor llenar el campo"
                setTimeout(() => {
                     e.nextElementSibling.textContent  = ""
                }, 5000);
            }else{
                e.nextElementSibling.textContent  = ""
            }
        })
        console.log(typeof fecha_salida.value)
            if(fecha_salida.value == ""){
                fecha_salida.nextElementSibling.textContent = "Por favor llenar el campo"
                console.log("act" )
                fecha_salida.parentElement.nextElementSibling.textContent = "Por favor llenar el campo"
                setTimeout(() => {
                    fecha_salida.parentElement.nextElementSibling.textContent  = ""
                }, 5000);
            }else{
                fecha_salida.nextElementSibling.textContent  = ""
            }
        let isValid = true;
       

        /* window.preload.infoHuespedesSend(infoGeneral)
        window.location.href = "../vista_general_habitaciones/vistaGeneral.html" */
    })

    /* ______________________________________________________________________________ */

    function toggleCuadro() {
        const cuadro = document.getElementById('cuadro');
        cuadro.classList.toggle('none');
    }

    function setInitialClock() {
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

    // Call the function once when the page loads
    window.onload = setInitialClock;

    // Obtener el modal
    var modal = document.getElementById("myModal");

    // Obtener el botón que abre el modal
    var btn = document.getElementById("openModalButton");

    // Obtener el <span> que cierra el modal
    var span = document.getElementsByClassName("close")[0];

    // Cuando el usuario haga clic en el botón, se abre el modal
    btn.onclick = function () {
        modal.style.display = "flex";
    }

    // Cuando el usuario haga clic en <span> (x), se cierra el modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // Cuando el usuario haga clic en cualquier lugar fuera del modal, se cierra
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    /* Codigo para cambiar de input radio y deshabilitar el otro */
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('click', () => {
            document.querySelectorAll('input[type="radio"]').forEach(r => {
                r.checked = false;
            });
            radio.checked = true;
        });
    });

    document.querySelector("#radio1").addEventListener("click",e => {
        console.log("Usando los porcentajes")
        porcentaValue = document.querySelector("#porcentajeSelect").value
        calcularPrecioTotal(valorDiaria)
    })

    document.querySelector("#radio2").addEventListener("click",e => {
        console.log("Usando los inputs enteros")
        porcentaValue =  document.querySelectorAll(".barra_input")[1].value
        calcularPrecioTotal(valorDiaria)
    })

    document.querySelector("#radio2").addEventListener("click",e=>{
        document.querySelector("#content1").style.display = "none"
        document.querySelector("#content2").style.display  = "flex"
        document.querySelectorAll(".barra_input")[1].addEventListener('keyup',e => {
            porcentaValue = e.target.value
            calcularPrecioTotal(valorDiaria)
        })
    })

    /* Codigo para seleccionar el valor del input tipo select */
    document.querySelector("#porcentajeSelect").addEventListener('change', (e) => {
        porcentaValue = e.target.value;
        document.querySelector("#porcentajeSpan").textContent = `${e.target.value * 100}%`
        calcularPrecioTotal(valorDiaria)
        console.log(`Valor seleccionado: ${porcentaValue}`);
    });

    document.querySelector("#radio1").addEventListener("click",e=>{
        document.querySelector("#content2").style.display = "none"
        document.querySelector("#content1").style.display  = "flex"
    })
   
});


 