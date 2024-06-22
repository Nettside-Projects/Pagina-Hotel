window.preload.envioInfoHabitaciones((e, html) => {
    cont.innerHTML = html;
    const tarjetasHabitacion = document.querySelectorAll('.rectangle-1');

    tarjetasHabitacion.forEach((e) => {
        for (const estado in estados) {
            if (e.classList.contains(estado)) {
                e.children[1].children[1].innerHTML = estados[estado];
                break;
            }
        }
    });
});
