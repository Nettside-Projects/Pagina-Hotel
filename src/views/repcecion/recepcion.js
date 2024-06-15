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
