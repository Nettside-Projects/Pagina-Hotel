const path = require("path")
const sqlite3 = require("sqlite3")

const db = new sqlite3.Database(path.join(__dirname, "/db", "data.db"))

const usuario = {
    usuario: "admin",
    password: "admin"
}

function validarUsuario(db, usuario, callback) {
    const output = {}
    db.get('SELECT usuario.name FROM usuario WHERE usuario.name = ?', [usuario.usuario], (err, row) => {
       
        if (row === undefined) {
            console.log(row)
            output.usuario = "Usuario ingresado incorrectamente!"
        }
    })

    db.get('SELECT usuario.password FROM usuario WHERE usuario.password = ?', [usuario.password], (err, row2) => {
        if (row2 === undefined) {
            console.log(row2)
            output.password = "Contraseña ingresado incorrectamente!"
        }
        callback(output)
    })
}
/* 
mostrarHabitaciones(db,callback){

} */

validarUsuario(db,usuario,(lol)=>{
    console.log(lol)
})
module.exports = {
    validarUsuario: validarUsuario
}