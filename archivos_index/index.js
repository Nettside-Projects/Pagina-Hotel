document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === "admin" && password === "password123") {
            // Simula una redirección después de un inicio de sesión exitoso
            window.location.href = "welcome.html";
        } else {
            errorMessage.textContent = "Invalid username or password.";
        }
    });
});
