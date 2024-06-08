const path = require("path")
const sqlite3 = require("sqlite3")

const db = new sqlite3.Database(path.join(__dirname, "/db", "data.db"))

/* const usuario = {
    usuario: "hotelMayluUser",
    password: "htelMayluPassword"
} */

function validarUsuario(db, usuario, callback) {
    const output = {}
    db.get('SELECT USUARIO.name FROM USUARIO WHERE USUARIO.name = ?', [usuario.usuario], (err, row) => {
        if (row === undefined) {
            console.log(row)
            output.usuario = "Usuario ingresado incorrectamente!"
        }
    })

    db.get('SELECT USUARIO.password FROM USUARIO WHERE USUARIO.password = ?', [usuario.password], (err, row2) => {
        if (row2 === undefined) {
            console.log(row2)
            output.password = "Contraseña ingresado incorrectamente!"
        }
        callback(output)
    })
}

/* mostrarHabitaciones(db,callback){

}
 */
module.exports = {
    validarUsuario: validarUsuario
}