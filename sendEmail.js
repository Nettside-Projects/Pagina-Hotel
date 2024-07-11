//uulp xfxn nmri ffug
const nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "mnunexaraujo@gmail.com",
        pass: "uulp xfxn nmri ffug",
    },
    tls: {
        rejectUnauthorized: false,
    },
});

async function emialHuespedRegistrado(datos) {
    let html = "";
    datos.infoHuespedes.forEach((element) => {
        html += `Nombre: ${element.nombre}<br>`;
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <mnunexaraujo@gmail.com>',
        to: "mnunexaraujo@gmail.com",
        subject: "Huespedes Registrados",
        html: html,
    });

    console.log("Message sent: %s", info.messageId);
}



module.exports = {
    emialHuespedRegistrado: emialHuespedRegistrado
}