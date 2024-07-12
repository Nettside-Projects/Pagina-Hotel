document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.frame-input, .frame-input-4');
    let formulario = document.querySelector('form');

    // Traducir el contenido utilizando i18next
    window.preload.i18n.onTranslate((translations) => {
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.getAttribute('data-i18n');
            element.innerText = translations[key] || element.innerText;
        });
        document
            .querySelectorAll('[data-i18n-placeholder]')
            .forEach((element) => {
                const key = element.getAttribute('data-i18n-placeholder');
                element.placeholder = translations[key] || element.placeholder;
            });
    });

    inputs.forEach((input) => {
        input.addEventListener('focus', function () {
            const span = this.parentElement.querySelector('span');
            if (span) {
                span.style.display = 'none';
            }
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (this.value === '') {
                const span = this.parentElement.querySelector('span');
                if (span) {
                    span.style.display = 'block';
                }
                this.parentElement.classList.remove('focused');
            }
        });
    });

    formulario.addEventListener('submit', (e) => {
        let formData = new FormData(e.target);
        e.preventDefault();

        let usuario = formData.get('nome');
        let password = formData.get('senha');

        const infoUsuario = {
            usuario: usuario,
            password: password,
        };

        window.preload.validarUsuario(infoUsuario);
    });

    window.preload.mensajesDeValidacion((e, mensajesDeValidacion) => {
        console.log(mensajesDeValidacion);
        if (
            Object.keys(mensajesDeValidacion).find(
                (mensaje) => mensaje == 'usuario'
            )
        ) {
            document.querySelector('.nome').textContent =
                mensajesDeValidacion.usuario;
        } else {
            document.querySelector('.nome').textContent = '';
        }

        if (
            Object.keys(mensajesDeValidacion).find(
                (mensaje) => mensaje == 'password'
            )
        ) {
            document.querySelector('.senha').textContent =
                mensajesDeValidacion.password;
        } else {
            document.querySelector('.senha').textContent = '';
        }
    });
});

function toggleEye() {
    const closedEye = document.getElementById('closedEye');
    const openEye = document.getElementById('openEye');
    const passwordField = document.getElementById('password');

    if (closedEye.style.display === 'none') {
        closedEye.style.display = 'block';
        openEye.style.display = 'none';
        passwordField.type = 'password';
    } else {
        closedEye.style.display = 'none';
        openEye.style.display = 'block';
        passwordField.type = 'text';
    }
}

/* ----------- &copy --------- */
const fecha = Date.now();
const hoy = new Date(fecha);
const year = hoy.getFullYear();

let footer = document.getElementById('year');
footer.innerHTML = year;
