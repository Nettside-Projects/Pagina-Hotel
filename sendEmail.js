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
                <span>Nombre: ${element.nombre}</span><br></br>
                <span>Numero de documento: ${element.documento}</span><br></br>
                <span>Valor diaria: ${element.estado_pago}</span><br></br>
                <span>Procedencia: ${element.procedencia}</span><br></br>
                <span>Habitacion en la que se hospeda: ${element.id_habitacion}</span><br></br>
                <span>Pago adelantado: ${element.pago_adelantado}</span><br></br><br></br>
                <span>Fecha de entrada: ${element.fecha_entrada}</span><br></br>
                <span>Fecha de salida: ${element.fecha_salida}</span><br></br>
                <span>Cuenta total: ${datos.cuentaTotal  == 0 ? "Indeterminado" : datos.cuentaTotal}</span>
                <span>Desconto: ${ datos.descuento != 0 ? datos.descuento * 100 : "No se aplico descuento"}</span>
            </div>`
                )
                .join('')}
        </div>
    </body>
    </html>`;
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Mensaje desde el programa" <salgadocanga@gmail.com>',
        to: 'ocampixx@gmail.com',
        subject: 'nuevos huespedes registrados',
        html: html,
    });
}

async function emialPagoCompletado(datos) {
    let html = `
        <html>
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
            .guest, .payment {
                padding: 10px;
                border-bottom: 1px solid #ddd;
            }
            .guest:last-child, .payment:last-child {
                border-bottom: none;
            }
            .guest span, .payment span {
                font-size: 12px;
                color: #333;
                margin-bottom: 5px;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
                <h1>Información de Huéspedes</h1>
            </div>`;

    // Iterate over each guest
    datos.informacionDeHuespedes.forEach((huesped) => {
        html += `
        <div class="guest">
            <span>Nombre Completo: ${huesped.nombre_completo}</span><br>
            <span>Número de Documento: ${huesped.numero_documento}</span><br>
            <span>Nacionalidad: ${huesped.nacionalidad}</span><br>
            <span>Procedencia: ${huesped.procedencia}</span><br>
            <span>Número de Habitación: ${huesped.id_habitacion}</span><br>
        </div>`;

        // Find and iterate over payment records for this guest
        const pagosHuesped = datos.registros_pagos.filter(pago => pago.fk_numero_documento === huesped.numero_documento);

        pagosHuesped.forEach((pago) => {
            html += `
            <div class="payment">
                <span>Pago Cliente: ${pago.registro_pago}</span><br>
                <span>Formato de Pago: ${pago.metodo_pago}</span><br>
                <span>Costo Extra: ${pago.extra}</span><br>
                <span>Precio Restante: ${pago.cuenta_actual}</span><br>
                <span>Precio Total: ${huesped.cuenta_total}</span><br>
                <span>Caixa: ${datos.fecha_registro_historial}</span><br>
            </div>`;
        });
    });

    html += `
        </div>
        </body>
        </html>`;

    const info = await transporter.sendMail({
        from: '"Front end developer en Nettside" <mnunexaraujo@gmail.com>',
        to: 'ocampixx@gmail.com',
        subject: 'Pago completado en la habitación',
        html: html,
    });
}


module.exports = {
    emialHuespedRegistrado: emialHuespedRegistrado,
    emialPagoCompletado: emialPagoCompletado
};
