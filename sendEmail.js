const nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: 'mnunexaraujo@gmail.com',
        pass: 'uulp xfxn nmri ffug',
    },
    tls: {
        rejectUnauthorized: false,
    },
});

async function emialHuespedRegistrado(datos) {
    let html = '';
    datos.infoHuespedes.forEach((index, element) => {
        const num_huespedes = index + 1;
        html += `<html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                padding: 10px 0;
                border-bottom: 1px solid #ddd;
            }
            .header h1 {
                color: #007BFF;
            }
            .guest {
                padding: 10px;
                border-bottom: 1px solid #ddd;
            }
            .guest:last-child {
                border-bottom: none;
            }
            .guest span {
                color: #333;
                margin-bottom: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Nuevo huesped</h1>
            </div>
            ${datos.infoHuespedes
                .map(
                    (element) => `
            <div class="guest">
                <span>Nombre: ${element.nombre}</span>
            </div>`
                )
                .join('')}
        </div>
    </body>
    </html>`;
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Mensaje desde el programa" <mnunexaraujo@gmail.com>',
        to: 'mnunexaraujo@gmail.com',
        subject: num_huespedes + ' nuevos huespedes registrados',
        from: '"Front end developer en Nettside" <mnunexaraujo@gmail.com>',
        to: 'salgadocanga@gmail.com',
        subject: 'etc etc etc.',
        html: html,
    });

    console.log('Message sent: %s', info.messageId);
}

function emialPagoCompletado(datos) {
   let html = ""

    // send mail with defined transport object
  /*   const info = await transporter.sendMail({
        from: '"Mensaje desde el programa" <mnunexaraujo@gmail.com>',
        to: 'mnunexaraujo@gmail.com',
        subject: num_huespedes + 'pago completado de huespedes',
        from: '"Front end developer en Nettside" <mnunexaraujo@gmail.com>',
        to: 'salgadocanga@gmail.com',
        subject: 'etc etc etc.',
        html: html,
    }); */

    console.log('Información de huespedes pagados', datos);
}

module.exports = {
    emialHuespedRegistrado: emialHuespedRegistrado,
    emialPagoCompletado: emialPagoCompletado
};
