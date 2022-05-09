const express = require('express'); //para hacer la conecciona  la base de datos
const router = express.Router(); // objeto para traer la info de este router
const Genero = require('../models/generos.model'); //guardando el modelo de género


// http://localhost:3000/api/registrar-genero
router.post('/registrar-genero', (req, res) => {
    let nuevoGenero = new Genero({
        codigo: req.body.codigo,
        nombre: req.body.nombre
    });

    nuevoGenero.save(error => {
        if (error) {
            res.json({
                msj: 'No se pudo registrar el Género, ocurrió un error',
                error
            })
        } else {
            res.json({
                msj: 'Género registrado correctamente.'
            });
        }
    });

});

// http://localhost:3000/api/listar-genero
router.get('/listar-genero', (req, res) => {
    Genero.find((error, lista) => {
        if (error) {
            res.json({
                msj: 'No se pudo listar los géneros literarios',
                error
            });
        } else {
            res.json({
                lista
            });
        }
    });
})


// http://localhost:3000/api/eliminar-genero
router.delete('/eliminar-genero', (req, res) => {
    Genero.deleteOne({
        '_id': req.body._id
    }, (error) => {
        if (error) {
            res.json({
                msj: 'No se pudo elimnar el género seleccionado',
                error
            });
        } else {
            res.json({
                msj: 'Género eliminado correctamente'
            });
        }
    });
});


module.exports = router;

/* JSON para pruebas

{
    "codigo":"985-HR",
    "nombre":"Horror"
}

*/