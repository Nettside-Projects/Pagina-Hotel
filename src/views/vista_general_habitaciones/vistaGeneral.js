document.addEventListener('DOMContentLoaded', () => {
    let cont = document.querySelector(".flex-row-b")
    window.preload.envioInfoHabitaciones((e, html) => {
        cont.innerHTML = html
        let tarjetasHabitacion = document.querySelectorAll(".rectangle-1 ")
        tarjetasHabitacion.forEach(e => {
            if(e.classList.contains("disponible")){
                e.children[1].children[1].innerHTML = "<img src='../../../recursos/icons8-ojo-64.webp'></img>"
            }
            if(e.classList.contains("ocupado")){
                 e.children[1].children[1].innerHTML = "<img src='../../../recursos/icons8-ojo-64.webp'></img>"
            }
            if(e.classList.contains("reserva")){
                 e.children[1].children[1].innerHTML = "<img src='../../../recursos/icons8-ojo-64.webp'></img>"
            }
            if(e.classList.contains("limpieza")){
                e.children[1].children[1].innerHTML = "<img src='../../../recursos/icons8-ojo-64.webp'></img>"
            }
            if(e.classList.contains("fuera_servicio")){
                e.children[1].children[1].innerHTML = "<img src='../../../recursos/icons8-ojo-64.webp'></img>"
            }
            if(e.classList.contains("reparacion")){
                 e.children[1].children[1].innerHTML = "<img src='../../../recursos/icons8-ojo-64.webp'></img>"
            }
           /*  switch (e) {
                case e.classList.contains("disponible"):
                    console.log("Icono - disponible")
                    break;
                case e.classList.contains("ocupado"):
                    console.log("Icono - Ocupado")
                    break;
                case e.classList.contains("reserva"):
                    console.log("Icono - Reserva")
                    break;
                case e.classList.contains("limpieza"):
                    console.log("Icono - Reserva")
                    break;
                case e.classList.contains("fuera_servicio"):
                    console.log("Icono - fuera de Servicio")
                    break;
                case e.classList.contains("reparacion"):
                    console.log("Icono - Reparacion")
                    break;
                default:
                    break;
            } */
        })
    })

})