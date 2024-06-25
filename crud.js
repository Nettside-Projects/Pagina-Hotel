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

function mostrarHabitaciones(db, callback) {
    let html = '';
    db.all(
        'SELECT habitacion.id_habitacion,habitacion.numero,estado.estado,tipo.tipo_habitacion FROM habitacion INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado',
        (err, rows) => {
            rows.forEach((element) => {
                html += `<div id_habitacion="${element.id_habitacion}" class="rectangle-1 ${
                    element.estado !== 'Fuera de servicio'
                        ? element.estado.toLowerCase()
                        : 'fuera_servicio'
                }">
          <button class="button ${
              element.estado !== 'Fuera de servicio'
                  ? element.estado.toLowerCase()
                  : 'fuera_servicio'
          }_encabezado">
            <span class="text-2">${element.estado.toLowerCase()}</span>
          </button>
          <div class="flex-row-dbc">
            <span class="text-3">${element.numero}</span>
            <div class="icon_${
                element.estado !== 'Fuera de servicio'
                    ? element.estado.toLowerCase()
                    : 'fuera_servicio'
            }">
            </div>
            <span class="simple">${element.tipo_habitacion}</span>
          </div>
          <svg class='arrow' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M360-200v-80h264L160-744l56-56 464 464v-264h80v400H360Z"/>
            </svg>
        </div>`;
            });
            callback(err, html);
        }
    );
}

function infoHabitacion(db,idHabitacion,callback){
    db.get(`SELECT habitacion.id_habitacion,habitacion.numero, habitacion.descripcion,estado.estado,tipo.tipo_habitacion,nivel.nivel FROM habitacion INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN nivel ON nivel.id_nivel = habitacion.fk_id_nivel WHERE habitacion.id_habitacion = ?`,[idHabitacion],(err,row)=>{
        /* Procede a extraer la información de la habitacion como el estado en la que se encuentra, una descripción general, el numero y el tipo.
        
        Esta información se enviará en un formato JSON al frontend

        Pero antes de esto, actualizar la DB con el campo de descripción.
        */
       const infoHabitacion = {
        id_habitacion: row.id_habitacion,
        numero: row.numero,
        descripcion: row.descripcion,
        estado: row.estado,
        tipo: row.tipo_habitacion,
        nivel: row.nivel

       }

       callback(infoHabitacion)

    })
}


infoHabitacion(db,1,(infoHabitacion)=>{
    console.log(infoHabitacion)
})

module.exports = {
    validarUsuario: validarUsuario,
    mostrarHabitaciones: mostrarHabitaciones,
    infoHabitacion: infoHabitacion
    
};
