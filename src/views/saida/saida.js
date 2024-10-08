document.addEventListener('DOMContentLoaded', () => {
    window.preload.ActivacionInfoHabitacionOcupadasSend(
        'txt-activation-ocupadas'
    );
    const cont = document.querySelector('.flex-row-b');
    const btnBuscar = document.querySelector('.buscar_lupa');

    const estados = {
        disponible:
            '<svg xmlns="http://www.w3.org/2000/svg" height="88px" viewBox="0 -960 960 960" width="88px" fill="#EFEFEF"><path d="M200-200h-40l-26-80H80v-201q0-33 23.5-56t56.5-23v-120q0-33 23.5-56.5T240-760h480q33 0 56.5 23.5T800-680v120q33 0 56.5 23.5T880-480v200h-54l-26 80h-40l-26-80H226l-26 80Zm320-360h200v-120H520v120Zm-280 0h200v-120H240v120Zm-80 200h640v-120H160v120Zm640 0H160h640Z"/></svg>',
        ocupado:
            '<svg xmlns="http://www.w3.org/2000/svg" height="88px" viewBox="0 -960 960 960" width="88px" fill="#EFEFEF"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>',
        reserva:
            '<svg xmlns="http://www.w3.org/2000/svg" height="88px" viewBox="0 -960 960 960" width="88px" fill="#EFEFEF"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>',
        limpieza:
            '<svg xmlns="http://www.w3.org/2000/svg" height="88px" viewBox="0 -960 960 960" width="88px" fill="#EFEFEF"><path d="M120-40v-280q0-83 58.5-141.5T320-520h40v-320q0-33 23.5-56.5T440-920h80q33 0 56.5 23.5T600-840v320h40q83 0 141.5 58.5T840-320v280H120Zm80-80h80v-120q0-17 11.5-28.5T320-280q17 0 28.5 11.5T360-240v120h80v-120q0-17 11.5-28.5T480-280q17 0 28.5 11.5T520-240v120h80v-120q0-17 11.5-28.5T640-280q17 0 28.5 11.5T680-240v120h80v-200q0-50-35-85t-85-35H320q-50 0-85 35t-35 85v200Zm320-400v-320h-80v320h80Zm0 0h-80 80Z"/></svg>',
        fuera_servicio:
            '<svg xmlns="http://www.w3.org/2000/svg" height="88px" viewBox="0 -960 960 960" width="88px" fill="#EFEFEF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>',
        reparacion:
            '<svg xmlns="http://www.w3.org/2000/svg" height="88px" viewBox="0 -960 960 960" width="88px" fill="#EFEFEF"><path d="M756-120 537-339l84-84 219 219-84 84Zm-552 0-84-84 276-276-68-68-28 28-51-51v82l-28 28-121-121 28-28h82l-50-50 142-142q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 50 50-28 28 68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841-701q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L204-120Z"/></svg>',
    };

    window.preload.nivelesSend('pedir-niveles')
    window.preload.nivelesOn((e, niveles) => {
        let contentNiveles = document.querySelector(".todo")
        niveles.forEach(element => {
            agregandoEventosParaMostrarTodo()
            const anchorElement = document.createElement('a');
            console.log(element)
            // Establecer los atributos del elemento
            anchorElement.className = `nivel nivel_${element.id_nivel}`; // Asignar las clases
            anchorElement.setAttribute('id_nivel', element.id_nivel);     // Asignar el atributo id_nivel

            // Establecer el contenido del elemento
            anchorElement.textContent = element.nivel;

            // Ahora puedes añadir el elemento al DOM, por ejemplo a un contenedor con id 'container'
            contentNiveles.appendChild(anchorElement);

            agregandoEventosDeNiveles(element.nivel, anchorElement)
        })
    })

    //habitacion no encontrada
    btnBuscar.addEventListener('keyup', (e) => {
        const info = {
            valor: e.target.value,
            estado: 'Ocupado',
            nivel: document
                .querySelector('.pestaña_activa')
                .getAttribute('id_nivel'),
        };
        window.preload.buscarHabitacionOcupadasSend(info);
        window.preload.buscarHabitacionOcupadasOn((e, html) => {
            if (html === '') {
                cont.innerHTML =
                    '<h2 class="habitacion-no-encontrada">No se encontró la habitación ocupada. Asegurese de que el número de la habitación exista o que haya ingresado un valor correcto (solo se acepta un número y sin espacios)</h2>';
            } else {
                agregarTarjetasHabitaciones(html);
            }
        });
    });

    window.preload.InfoHabitacionesOcupadasOn((e, html) => {
        agregarTarjetasHabitaciones(html);
    });

    function agregarTarjetasHabitaciones(html) {
        cont.innerHTML = html;
        const tarjetasHabitacion = document.querySelectorAll('.rectangle-1');

        //Agregando imagen deacuerdo al estado de cada habitación
        tarjetasHabitacion.forEach((e) => {
            for (const estado in estados) {
                if (e.classList.contains(estado)) {
                    e.children[1].children[1].innerHTML = estados[estado];
                    break;
                }
            }
        });

        //--------redirigir al hacer onclick en las tarjetas
        //disponible
        tarjetasHabitacion.forEach((e) => {
            e.addEventListener('click', () => {
                if (e.classList.contains('disponible')) {
                    window.preload.envioIdHabitacion(
                        e.getAttribute('id_habitacion')
                    );
                    window.preload.infoHabitacionIndividualOn((e, info) => {
                        localStorage.setItem(
                            'informacionDeHabitacion',
                            JSON.stringify(info)
                        );
                        window.location.href = '../repcecion/recepcion.html';
                    });
                }
            });
        });
        //ocupado
        tarjetasHabitacion.forEach((e) => {
            e.addEventListener('click', () => {
                if (e.classList.contains('ocupado')) {
                    window.preload.envioIdHabitacion(
                        e.getAttribute('id_habitacion')
                    );
                    window.preload.infoHabitacionIndividualOn((e, info) => {
                        localStorage.setItem(
                            'informacionDeHabitacion',
                            JSON.stringify(info)
                        );
                        window.location.href = '../saida/saida_form.html';
                    });
                }
            });
        });
    }

    function agregandoEventosParaMostrarTodo() {
        document.querySelector(".todoxd").addEventListener("click", (e) => {
            document.querySelectorAll('.nivel').forEach((e) => {
                e.classList.remove('pestaña_activa');
            });
            e.target.classList.add('pestaña_activa');
            window.preload.ActivacioninfoHabitacionGeneralSend(
                'txt-activation-ocupado'
            );
            if(html != ""){
                window.preload.InfoHabitacionesGeneralOn((e, html) => {
                    agregarTarjetasHabitaciones(html);
                });
            }else{
                document.querySelector('.flex-row-b').innerHTML = "<h2>No hay habitaciones en este nivel</h2>" 
            }
            
        })
    }
    /* Convertir este codigo más flexible (en temas de busqueda por niveles) */
    function agregandoEventosDeNiveles(nivel, nivelHtml) {
        nivelHtml.addEventListener('click', (e) => {
            document.querySelectorAll('.nivel').forEach((e) => {
                e.classList.remove('pestaña_activa');
            });
            e.target.classList.add('pestaña_activa');
            const infoFiltro = {
                nivel: nivel,
                estado: 'Ocupado',
            };
            window.preload.filtrarPorNivelSend(infoFiltro);
            window.preload.filtrarPorNivelOn((e, html) => {
                if(html != ""){
                    agregarTarjetasHabitaciones(html);
                }else{
                    document.querySelector('.flex-row-b').innerHTML = "<h2>No hay habitaciones en este nivel</h2>" 
                }
              
            });

        });
    }
});
