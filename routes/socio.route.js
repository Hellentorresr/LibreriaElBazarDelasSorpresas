const express = require('express'); //para hacer la conecciona  la base de datos
const router = express.Router(); // objeto para traer la info de este router
const Socios = require('../models/socio.model'); //guardando el modelo de género


// http://localhost:3000/api/registrar-socio
router.post('/registrar-socio', (req, res) => {
    let nuevoSocio = new Socios({
        nombre: req.body.nombre,
        logo: req.body.logo,
        fechaSocio: req.body.fechaSocio
    });

    nuevoSocio.save(error => {
        if (error) {
            res.json({
                msj: 'No se pudo registrar el Socio Comercial, ocurrió un error',
                error
            })
        } else {
            res.json({
                msj: 'Socio Comercial registrado correctamente.'
            });
        }
    });

});

// http://localhost:3000/api/listar-socio
router.get('/listar-socio', (req, res) => {
    Socios.find((error, lista) => {
        if (error) {
            res.json({
                msj: 'No se pudo listar los Socios comerciales',
                error
            });
        } else {
            res.json({
                lista
            });
        }
    });
})


// http://localhost:3000/api/eliminar-socio
router.delete('/eliminar-socio', (req, res) => {
    Socios.deleteOne({
        '_id': req.body._id
    }, (error) => {
        if (error) {
            res.json({
                msj: 'No se pudo elimnar el socio comercial seleccionado',
                error
            });
        } else {
            res.json({
                msj: 'Socio comercial eliminado correctamente'
            });
        }
    });
});


module.exports = router;

/* JSON para pruebas

{
    "nombre": "Walmart",
    "logo":"String",
    "fechaSocio":"2002-01-09"
}

*/