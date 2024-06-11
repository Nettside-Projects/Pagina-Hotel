const path = require('path');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(path.join(__dirname, '/db', 'data.db'));

const usuario = {
    usuario: 'admin',
    password: 'admin',
};

function validarUsuario(db, usuario, callback) {
    const output = {};
    db.get(
        'SELECT usuario.name FROM usuario WHERE usuario.name = ?',
        [usuario.usuario],
        (err, row) => {
            if (row === undefined) {
                console.log(row);
                output.usuario = 'Usuario ingresado incorrectamente!';
            }
        }
    );

    db.get(
        'SELECT usuario.password FROM usuario WHERE usuario.password = ?',
        [usuario.password],
        (err, row2) => {
            if (row2 === undefined) {
                console.log(row2);
                output.password = 'Contraseña ingresado incorrectamente!';
            }
            callback(output);
        }
    );
}

function mostrarHabitaciones(db,callback){
    
    let html = ""
    db.all('SELECT habitacion.numero,estado.estado,tipo.tipo_habitacion FROM habitacion INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado',(err,rows) => {
        rows.forEach(element => {
            html += `<div class="rectangle-1 ${element.estado !== 'Fuera de servicio' ? element.estado.toLowerCase() : 'fuera_servicio'}">
          <button class="button ${element.estado !== 'Fuera de servicio' ? element.estado.toLowerCase() : 'fuera_servicio'}_encabezado">
            <span class="text-2">${element.estado.toLowerCase()}</span>
          </button>
          <div class="flex-row-dbc">
            <span class="text-3">${element.numero}</span>
            <div class="icon_${element.estado !== 'Fuera de servicio' ? element.estado.toLowerCase() : 'fuera_servicio'}">
          
            </div>
            <span class="h"></span><span class="simple">${element.tipo_habitacion}</span>
          </div>
          <div class="arrow"></div>
        </div>`
        })
        callback(err,html)
    })
}

mostrarHabitaciones(db,(err,element)=>{
console.log(element)
})

module.exports = {
    validarUsuario: validarUsuario,
    mostrarHabitaciones: mostrarHabitaciones
};
