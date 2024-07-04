const path = require('path');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(path.join(__dirname, '/db', 'data.db'));

const data = {
    infoHuespedes: [
        {
            nombre: 'Mateus Nunes Araujo',
            estado_pago: false,
            id_habitacion: 1,
            fecha_entrada: '25/06/2024 5:41:20 PM',
            fecha_salida: '2024-06-28T17:41',
            pasaporte: '',
            documento: '1121197946',
            profesion: 'programador',
            procedencia: 'Leticia',
            fecha_nacimiento: '2004-12-10',
            destino: 'Manaus',
            naturalidad: '',
            telefono: '3212330542',
            email: 'mnunexaraujo@gmail.com',
            pago_adelantado: ''
        },
        {
            nombre: 'Luan Gabriel Nunes Araujo',
            estado_pago: false,
            id_habitacion: 1,
            fecha_entrada: '25/06/2024 5:41:20 PM',
            fecha_salida: '2024-06-28T17:41',
            pasaporte: '',
            documento: '1121190980',
            profesion: 'Estudiante',
            procedencia: 'Leticia',
            fecha_nacimiento: '2012-02-23',
            destino: 'Manaus',
            naturalidad: '',
            telefono: '',
            email: 'luantronix@gmail.com'
        }
    ],
    cuentaTotal: 420
}

function generarTarjetasHabitacionesHTML(info) {
    let html = ""
    info.forEach((element) => {
        html += `<div id_habitacion="${element.id_habitacion}" class="rectangle-1 ${element.estado !== 'Fuera de servicio'
            ? element.estado.toLowerCase()
            : 'fuera_servicio'
            }">
  <button class="button ${element.estado !== 'Fuera de servicio'
                ? element.estado.toLowerCase()
                : 'fuera_servicio'
            }_encabezado">
    <span class="text-2">${element.estado.toLowerCase()}</span>
  </button>
  <div class="flex-row-dbc">
    <span class="text-3">${element.numero}</span>
    <div class="icon_${element.estado !== 'Fuera de servicio'
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
    return html
}


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
    db.all(
        'SELECT habitacion.id_habitacion,habitacion.numero,estado.estado,tipo.tipo_habitacion FROM habitacion INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado',
        (err, rows) => {
            let html = generarTarjetasHabitacionesHTML(rows)
            callback(err, html);
        }
    );
}

function infoGeneral(db, callback) {
    const info = {
        total_habitaciones: 0,
        habitaciones_libres: 0,
        habitaciones_ocupadas: 0,
        reserva: 0,
    };

    // Promesa para obtener el total de habitaciones
    const getTotalHabitaciones = () => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT COUNT(*) AS total_habitaciones FROM habitacion;`, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    info.total_habitaciones = row.total_habitaciones;
                    resolve();
                }
            });
        });
    };

    // Promesa para obtener habitaciones libres
    const getHabitacionesLibres = () => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT COUNT(*) AS habitaciones_libres FROM habitacion INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado WHERE estado.id_estado = 1;`, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    info.habitaciones_libres = row.habitaciones_libres;
                    resolve();
                }
            });
        });
    };

    const getHabitacionesOcupadas = () => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT COUNT(*) AS ocupadas FROM habitacion INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado WHERE estado.id_estado = 2;`, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    info.habitaciones_ocupadas = row.ocupadas;
                    resolve();
                }
            });
        });
    };

    const getHabitacionesReservadas = () => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT COUNT(*) AS reserva FROM habitacion INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado WHERE estado.id_estado = 3;`, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    info.reserva = row.reserva;
                    resolve();
                }
            });
        });
    };

    // ... Repite el mismo patrón para las otras consultas ...

    // Ejecuta todas las promesas en paralelo
    Promise.all([getTotalHabitaciones(), getHabitacionesLibres(), getHabitacionesOcupadas(),getHabitacionesReservadas()])
        .then(() => {
            callback(info); // Llama al callback con el objeto info completo
        })
        .catch((error) => {
            console.error('Error al obtener información:', error);
            callback(info); // Llama al callback incluso si hay errores
        });
}

function infoHabitacion(db, idHabitacion, callback) {
    db.get(`SELECT habitacion.id_habitacion,habitacion.numero, habitacion.descripcion,estado.estado,tipo.tipo_habitacion,nivel.nivel FROM habitacion INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN nivel ON nivel.id_nivel = habitacion.fk_id_nivel WHERE habitacion.id_habitacion = ?`, [idHabitacion], (err, row) => {
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

function agregarHuespedes(db, data) {
    // Insertar la cuenta en la tabla 'cuentas'
    db.run(`INSERT INTO cuentas (cuenta_total) VALUES (?);`, [data.cuentaTotal], function (err) {
        if (err) {
            console.error("Error al insertar en cuentas:", err);
            return;
        }

        // Obtener el id_cuenta recién insertado
        db.get(`SELECT MAX(id_cuenta) AS max_id FROM cuentas;`, function (err, row) {
            if (err) {
                console.error("Error al obtener el id_cuenta:", err);
                return;
            }

            const idCuenta = row.max_id || 0; // Si no hay registros, asigna 0

            // Insertar registros de huéspedes en la tabla 'huesped'
            data.infoHuespedes.forEach((e, index) => {
                db.run(`
                    INSERT INTO huesped (
                        numero_documento, nombre_completo, nacionalidad, procedencia,
                        fecha_entrada, fecha_salida, pasaporte, fecha_nacimiento,
                        profesion, naturalidade, pago_adelantado, estado_pago,
                        fk_id_habitacion, fk_id_cuenta, fk_id_rol
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                `, [
                    e.documento, e.nombre, e.nacionalidad, e.procedencia,
                    e.fecha_entrada, e.fecha_salida, e.pasaporte, e.fecha_nacimiento,
                    e.profesion, e.naturalidad, e.pago_adelantado || "",
                    e.estado_pago, e.id_habitacion, idCuenta,
                    index === 0 ? 1 : 2
                ], function (err) {
                    if (err) {
                        console.error("Error al insertar en huesped:", err);
                    }
                });
            });
        });
    });
    cambiarEstadoHabitacion(db, 2, data.infoHuespedes[0].id_habitacion)
}


function cambiarEstadoHabitacion(db, estado, id_habitacion) {
    db.run(`UPDATE habitacion SET fk_id_estado = ${estado} WHERE id_habitacion = ${id_habitacion}`)
}


function buscarHabitacion(db, info, callback) {
    let query = '';
    if (info.nivel == "0") {
        if (info.valor) {
            query = 'SELECT habitacion.id_habitacion, habitacion.numero, estado.estado, tipo.tipo_habitacion FROM habitacion INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado INNER JOIN nivel ON nivel.id_nivel = habitacion.fk_id_nivel WHERE habitacion.numero LIKE ?';
            db.all(query, [`%${info.valor}%`], (err, rows) => {
                if (err) {
                    console.error(err);
                    return;
                }
                let html = generarTarjetasHabitacionesHTML(rows)
                callback(html);
            });
        } else {
            query = 'SELECT habitacion.id_habitacion, habitacion.numero, estado.estado, tipo.tipo_habitacion FROM habitacion INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado INNER JOIN nivel ON nivel.id_nivel = habitacion.fk_id_nivel'; // Sin filtro si la búsqueda está vacía
            db.all(query, (err, rows) => {
                if (err) {
                    console.error(err);
                    return;
                }
                let html = generarTarjetasHabitacionesHTML(rows)
                callback(html);
            });
        }
    } else {
        if (info.valor) {
            query = 'SELECT habitacion.id_habitacion, habitacion.numero, estado.estado, tipo.tipo_habitacion FROM habitacion INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado INNER JOIN nivel ON nivel.id_nivel = habitacion.fk_id_nivel WHERE habitacion.numero LIKE ? AND nivel.id_nivel = ?';
            db.all(query, [`%${info.valor}%`, info.nivel], (err, rows) => {
                if (err) {
                    console.error(err);
                    return;
                }
                let html = generarTarjetasHabitacionesHTML(rows)
                callback(html);
            });
        } else {
            query = 'SELECT habitacion.id_habitacion, habitacion.numero, estado.estado, tipo.tipo_habitacion FROM habitacion INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado INNER JOIN nivel ON nivel.id_nivel = habitacion.fk_id_nivel AND nivel.id_nivel = ?'; // Sin filtro si la búsqueda está vacía
            db.all(query, [info.nivel], (err, rows) => {
                if (err) {
                    console.error(err);
                    return;
                }
                let html = generarTarjetasHabitacionesHTML(rows)
                callback(html);
            });
        }
    }
}
function filtrarPorNivelSend(db, info, callback) {
    if (info.estado != "") {
        db.all(`SELECT habitacion.id_habitacion,habitacion.numero, habitacion.descripcion,estado.estado,tipo.tipo_habitacion,nivel.nivel FROM habitacion INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN nivel ON nivel.id_nivel = habitacion.fk_id_nivel WHERE nivel.nivel LIKE ? AND estado.estado LIKE ?`, [info.nivel, info.estado], (err, row) => {
            let html = generarTarjetasHabitacionesHTML(row)
            if (err) {
                console.error(err);
                return;
            }
            callback(html);
        })
    } else {
        db.all(`SELECT habitacion.id_habitacion,habitacion.numero, habitacion.descripcion,estado.estado,tipo.tipo_habitacion,nivel.nivel FROM habitacion INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN nivel ON nivel.id_nivel = habitacion.fk_id_nivel WHERE nivel.nivel LIKE ?`, [info.nivel], (err, row) => {
            let html = generarTarjetasHabitacionesHTML(row)
            if (err) {
                console.error(err);
                return;
            }
            callback(html);
        })
    }

}

function mostrarHabitacionesPorEstado(db, estado, callback) {
    db.all(`SELECT habitacion.id_habitacion,habitacion.numero, habitacion.descripcion,estado.estado,tipo.tipo_habitacion,nivel.nivel FROM habitacion INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN nivel ON nivel.id_nivel = habitacion.fk_id_nivel WHERE estado.estado LIKE ?`, [estado], (err, row) => {
        if (err) {
            console.error(err);
            return;
        }
        let html = generarTarjetasHabitacionesHTML(row)
        callback(html)

    })
}

function buscarHabitacionPorEstado(db, info, callback) {
    let query = '';
    if (info.nivel == "0") {
        if (info.valor) {
            query = 'SELECT habitacion.id_habitacion, habitacion.numero, estado.estado, tipo.tipo_habitacion FROM habitacion INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado INNER JOIN nivel ON nivel.id_nivel = habitacion.fk_id_nivel WHERE habitacion.numero LIKE ? AND estado.estado LIKE ?';
            db.all(query, [`%${info.valor}%`, info.estado], (err, rows) => {
                if (err) {
                    console.error(err);
                    return;
                }
                let html = generarTarjetasHabitacionesHTML(rows)
                callback(html);
            });
        } else {
            query = 'SELECT habitacion.id_habitacion, habitacion.numero, estado.estado, tipo.tipo_habitacion FROM habitacion INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado INNER JOIN nivel ON nivel.id_nivel = habitacion.fk_id_nivel WHERE estado.estado LIKE ?'; // Sin filtro si la búsqueda está vacía
            db.all(query, [info.estado], (err, rows) => {
                if (err) {
                    console.error(err);
                    return;
                }
                let html = generarTarjetasHabitacionesHTML(rows)
                callback(html);
            });
        }
    } else {
        if (info.valor) {
            query = 'SELECT habitacion.id_habitacion, habitacion.numero, estado.estado, tipo.tipo_habitacion FROM habitacion INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado INNER JOIN nivel ON nivel.id_nivel = habitacion.fk_id_nivel WHERE habitacion.numero LIKE ? AND nivel.id_nivel = ? AND estado.estado LIKE ? ';
            db.all(query, [`%${info.valor}%`, info.nivel, info.estado], (err, rows) => {
                if (err) {
                    console.error(err);
                    return;
                }
                let html = generarTarjetasHabitacionesHTML(rows)
                callback(html);
            });
        } else {
            query = 'SELECT habitacion.id_habitacion, habitacion.numero, estado.estado, tipo.tipo_habitacion FROM habitacion INNER JOIN tipo ON tipo.id_tipo = habitacion.fk_id_tipo INNER JOIN estado ON estado.id_estado = habitacion.fk_id_estado INNER JOIN nivel ON nivel.id_nivel = habitacion.fk_id_nivel AND nivel.id_nivel = ? AND estado.estado LIKE ? '; // Sin filtro si la búsqueda está vacía
            db.all(query, [info.nivel, info.estado], (err, rows) => {
                if (err) {
                    console.error(err);
                    return;
                }
                let html = generarTarjetasHabitacionesHTML(rows)
                callback(html);
            });
        }
    }
}

const info = {
    valor: "",
    nivel: "0"
}

infoGeneral(db,(info)=>{
    console.log(info)
})

module.exports = {
    validarUsuario: validarUsuario,
    infoGeneral: infoGeneral,
    mostrarHabitaciones: mostrarHabitaciones,
    infoHabitacion: infoHabitacion,
    agregarHuespedes: agregarHuespedes,
    buscarHabitacion: buscarHabitacion,
    filtrarPorNivelSend: filtrarPorNivelSend,
    mostrarHabitacionesPorEstado: mostrarHabitacionesPorEstado,
    buscarHabitacionPorEstado: buscarHabitacionPorEstado

};
