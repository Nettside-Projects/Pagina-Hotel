document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll('.frame-input, .frame-input-4');
    let formulario = document.querySelector("form")
   

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            const span = this.parentElement.querySelector('span');
            if (span) {
                span.style.display = 'none';
            }
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (this.value === '') {
                const span = this.parentElement.querySelector('span');
                if (span) {
                    span.style.display = 'block';
                }
                this.parentElement.classList.remove('focused');
            }
        });
    });

   
    

    formulario.addEventListener('submit',(e)=>{
        let formData = new FormData(e.target)
        e.preventDefault()
       
        let usuario = formData.get("nome")
        let password = formData.get("senha")

        const infoUsuario = {
            usuario : usuario,
            password : password
        }

        window.preload.validarUsuario(infoUsuario)
    })

    window.preload.mensajesDeValidacion((e,mensajesDeValidacion)=>{
       if(Object.keys(mensajesDeValidacion).find(mensaje => mensaje == "usuario")){
        document.querySelector(".nome").textContent = mensajesDeValidacion.usuario
       }else{
        document.querySelector(".nome").textContent = ""
       }

       if(Object.keys(mensajesDeValidacion).find(mensaje => mensaje == "password")){
        document.querySelector(".senha").textContent = mensajesDeValidacion.password
       }else{
        document.querySelector(".senha").textContent = ""
       }
      
    })


});
