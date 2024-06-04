document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit',(event) => {
        event.preventDefault();
        const formData = new FormData(loginForm); 

        const datos = {
            usuario: formData.get('username'),
            password: formData.get('password')
        };

        window.preload.validarUsuario(datos)

    });

    window.preload.mensajesDeValidacion((e,mensajesDeValidacion)=>{
        //Acomodar los mensajes que están dentro del array en el html
        errorMessage.textContent = mensajesDeValidacion
    })
});
