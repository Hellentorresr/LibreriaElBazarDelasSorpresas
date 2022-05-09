const express = require('express'); //para hacer la conecciona  la base de datos
const router = express.Router(); // objeto para traer la info de este router
const Punto = require('../models/puntos.model'); //guardando el modelo de género


// http://localhost:3000/api/registrar-punto
router.post('/registrar-punto', (req, res) => {
    let nuevoPunto = new Punto({
        imagen: req.body.imagen,
        nombre: req.body.nombre,
        socio: req.body.socio,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        sennas: req.body.sennas
    });

    nuevoPunto.save(error => {
        if (error) {
            res.json({
                msj: 'No se pudo registrar el Punto de retiro, ocurrió un error',
                error
            })
        } else {
            res.json({
                msj: 'Punto de retiro registrado correctamente.'
            });
        }
    });

});

// http://localhost:3000/api/listar-punto
router.get('/listar-punto', (req, res) => {
    Punto.find((error, lista) => {
        if (error) {
            res.json({
                msj: 'No se pudo listar los Puntos de retiro',
                error
            });
        } else {
            res.json({
                lista
            });
        }
    });
})


// http://localhost:3000/api/eliminar-punto
router.delete('/eliminar-punto', (req, res) => {
    Punto.deleteOne({
        '_id': req.body._id
    }, (error) => {
        if (error) {
            res.json({
                msj: 'No se pudo elimnar el Puntos de retiro seleccionado',
                error
            });
        } else {
            res.json({
                msj: 'Puntos de retiro eliminado correctamente'
            });
        }
    });
});


module.exports = router;

/* JSON para pruebas

{
        "imagen": "https://res.cloudinary.com/csalazarg/image/upload/v1651733454/Walmart_San_Sebastian_ylscck.jpg",
        "nombre": "Walmart San Sebastian",
        "socio": "Walmart",
        "provincia": "San José",
        "canton": "San José",
        "distrito": "San Sebastian",
        "sennas": "Frente a la, Rotonda de San Sebastián 214, San José"
}

*/