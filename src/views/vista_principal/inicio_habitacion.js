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