'use strict';
const express = require('express'); //para hacer la conecciona  la base de datos
const router = express.Router(); // objeto para traer la info de este router
const Usuario = require('../models/usuarios.model');


// http://localhost:3000/api/registrar-usuario
router.post('/registrar-usuario', (req, res) => {


    let nuevoUsuario = new Usuario({
        primerNombre: req.body.primerNombre,
        segundoNombre: req.body.segundoNombre,
        apellido: req.body.apellido,
        segundoApellido: req.body.segundoApellido,
        genero: req.body.genero,
        correo: req.body.correo,
        tipoIdentificacion: req.body.tipoIdentificacion,
        numeroIdentificacion: req.body.numeroIdentificacion,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        sennasExactas: req.body.sennasExactas,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        prefeGeneroLite: req.body.prefeGeneroLite,
        autorFavorito: req.body.actorFavorito,
        contrasenna: req.body.contrasenna,
        confimacionContrase: req.body.confimacionContrase,
        foto: req.body.foto,
        tipoUsuario: 'cliente'
    });

    nuevoUsuario.save(error => {

        if (error) {
            res.json({
                mej: 'no se pudo registrar el usuario, ocurrio un error',
                error
            });
        } else {
            res.json({
                mej: 'Usuario registrado correctamente'
            });
        }
    });
});



//Agregar data a libro fan
//http://localhost:3000/api/agregar-librofan
router.post('/agregar-librofan', (req, res) => {

    Usuario.updateOne({ _id: req.body._id }, {
            $push: {
                'libroFan': {
                    miembro: req.body.miembro,
                    montoAcum: req.body.montoAcum
                }
            }
        },
        function(error) {
            if (error) {
                return res.json({
                    success: false,
                    msj: 'No se pudo agregar libro fan',
                    err
                });
            } else {
                return res.json({
                    success: true,
                    msj: 'Se agregó la infroamción'
                });
            }
        }
    )

});


// http://localhost:3000/api/listar-usuarios
router.get('/listar-usuarios', (req, res) => {
    Usuario.find((error, lista) => {
        if (error) {
            res.json('No se pudo listar los usuarios', error);
        } else {
            res.json({
                lista
            });
        }
    });
});

// http://localhost:3000/api/eliminar-usuario
router.delete('/eliminar-usuario', (req, res) => {
    Usuario.deleteOne({
        '_id': req.body._id
    }, (error) => {
        if (error) {
            res.json({
                msj: 'No se pudo elimnar el usuario',
                error
            });
        } else {
            res.json({
                msj: 'Usuario eliminado correctamente'
            });
        }
    });
});


/*---------------------------- Sección de tarjeta de crédito ----------------------------*/

//http://localhost:3000/api/agregar-tarjeta
/* router.post('/agregar-tarjeta', function(req, res) {
    let body = req.body;
    let error;
    let tarjetas = JSON.parse(body.tarjeta);

    tarjetas.forEach(tarjeta => {
        Usuario.updateOne({ _id: body._id }, {
                $push: {
                    'tarjetas': {
                        numeroTarjeta: numeroTarjeta,
                        tipoTarjeta: tipoTarjeta,
                        mesExp: mesExp,
                        annoExp: annoExp,
                        cvc: cvc
                    }
                }
            },
            (error) => {
                if (error) {
                    error = error
                }
            }
        )
    });

    if (error) {
        return res.json({
            success: false,
            msj: 'No se puso agregar la tarjeta'
        });
    } else {
        return res.json({
            success: true,
            msj: 'Se agregó la tarjeta correctamente'
        })
    }
});


// http://localhost:3000/api/listar-tarjeta
router.get('/listar-tarjeta', (req, res) => {
    Usuario.find((error, lista) => {
        if (error) {
            res.json('No se pudo listar la tarjeta', error);
        } else {
            res.json({
                lista
            });
        }
    });
});

 */











module.exports = router;


// JSON Prueba Crear usuario
/*
{
    "primerNombre": "Cristian",
    "segundoNombre": "",
    "apellido": "Salazar",
    "segundoApellido": "Gómez",
    "genero": "Masculino",
    "correo": "csalazarg@ucenfotec.ac.cr",
    "tipoIdentificacion": "Cédula",
    "numeroIdentificacion": "111111111",
    "provincia": "San José",
    "canton": "Alajuelita",
    "distrito": "San Felipe",
    "sennasExactas": "63",
    "latitud": "0.0.36",
    "longitud": "59.69.15",
    "prefeGeneroLite": "Manga",
    "autorFavorito": "JRR Tolkien",
    "contrasenna": "123",
    "confimacionContrase": "123",
    "foto": "path",
    "tipoUsuario": "cliente"
}
*/

// JSON prueba crear tarjeta

/*
{
    "numeroTarjeta": 154796532159,
        "tipoTarjeta": "Visa",
        "mesExp": "02",
        "annoExp": "2023",
        "cvc": "569"
}

*/

// JSON prueba crear libro fan

/*
{
    "miembro": true,
    "montoAcum": "150000"
}

*/

/* Código de Pablo (no funciona)

//http://localhost:3000/api/agregar-tarjeta
router.post('/agregar-tarjeta', (req, res) => {
    let body = req.body;
    let error;

    let tarjetaReg = JSON.parse(body.tarjetaReg);

    tarjetaReg.forEach(tarjeta => {
        Usuario.update({ _id: body._id }, {
            $push: {
                'tarjetas': {
                    tarjeta: tarjeta // No sé como va a esto o si así está bien
                }
            }
        }, (error) => {
            if (error) {
                error = err
            }
        })
    });
    if (error) {
        res.json({
            mej: 'No se pudo registrar la Tarjeta, ocurrio un error',
            error
        });
    } else {
        res.json({
            mej: 'Tarjeta registrado correctamente'
        });
    }

});

*/