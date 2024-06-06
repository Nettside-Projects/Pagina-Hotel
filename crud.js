const path = require("path")
const sqlite3 = require("sqlite3")

const db = new sqlite3.Database(path.join(__dirname, "/db", "data.db"))



function validarUsuario(db, usuario, callback) {
    const output = []
    db.get('SELECT USUARIO.name FROM USUARIO WHERE USUARIO.name = ?', [usuario.usuario], (err, row) => {
        let n1 = row !== undefined ? Object.keys(row) : 0
        if (n1.length >= 1) {
            output.push("Usuario ingresado correctamente!")
        }
    })

    db.get('SELECT USUARIO.password FROM USUARIO WHERE USUARIO.password = ?', [usuario.password], (err, row2) => {
        let n2 = row2 !== undefined ? Object.keys(row2) : 0
        if (n2.length >= 1) {
            output.push("Contraeña ingresado correctamente!")
        }
        callback(output)
    })



}

module.exports = {

    validarUsuario: validarUsuario

}