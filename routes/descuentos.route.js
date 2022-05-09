const express = require('express'); //para hacer la conecciona  la base de datos
const router = express.Router(); // objeto para traer la info de este router
const Descuentos = require('../models/descuentos.model'); //guardando el modelo de Descuentos


// http://localhost:3000/api/registrar-autor
router.post('/registrar-descuentos', (req, res) => {
    let nuevoDescuento = new Descuentos({
        nombreDescuento: req.body.nombreDescuento,
        fechaInicio: req.body.fechaInicio,
        fechaExp: req.body.fechaExp,
        porcentaje: req.body.porcentaje
    });

    nuevoDescuento.save(error => {

        if (error) {
            res.json({
                mej: 'no se pudo registrar el descuento, ocurrio un error',
                error
            });
        } else {
            res.json({
                mej: 'Descuento registrado correctamente'
            });
        }
    });
});


// http://localhost:3000/api/listar-descuentos
router.get('/listar-descuentos', (req, res) => {
    Descuentos.find((error, lista) => {
        if (error) {
            res.json('No se pudo listar los autores', error);
        } else {
            res.json({
                lista
            });
        }
    });
});


// http://localhost:3000/api/eliminar-descuentos
router.delete('/eliminar-descuentos', (req, res) => {
    Descuentos.deleteOne({
        '_id': req.body._id
    }, (error) => {
        if (error) {
            res.json({
                msj: 'No se pudo elimnar el descuento',
                error
            });
        } else {
            res.json({
                msj: 'Descuento eliminado correctamente'
            });
        }
    });
});

module.exports = router;


/* JSON para pruebas
{
        "nombreDescuento": "Feb2022",
        "fechaInicio": "2022-02-01",
        "fechaExp": "2022-02-28",
        "porcentaje": "15"
}
*/