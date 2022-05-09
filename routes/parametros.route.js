const express = require('express');
const router = express.Router();

const Parametros = require('../models/parametros.model');

// http://localhost:3000/api/registrar-parametrosGenerales
router.post('/registrar-parametrosGenerales', (req, res) => {
    let nuevoParametroGeneral = new Parametros({
        agregarNombre: req.body.agregarNombre,
        costo: req.body.costo,
    });

    nuevoParametroGeneral.save(error => {
        if (error) {
            res.json({
                msj: 'No se pudo registrar los cambios, ocurrio un error',
                error
            });
        } else {
            res.json({
                msj: "Registro realizados correctamente"
            });
        }
    });
});

// http://localhost:3000/api/listar-parametrosGenerales
router.get('/listar-parametrosGenerales', (req, res) => {
    Parametros.find((error, lista) => {
        if (error) {
            res.json('No se pudo listar los parametros generales', error);
        } else {
            res.json({
                lista
            });
        }
    });
});

// http://localhost:3000/api/eliminar-parametrosGenerales
router.delete('/eliminar-parametrosGenerales', (req, res) => {
    Parametros.deleteOne({
        '_id': req.body._id
    }, (error) => {
        if (error) {
            res.json({
                msj: 'No se pudo eliminar el campo seleccionado',
                error
            });
        } else {
            res.json({
                msj: 'Campo eliminado correctamente'
            });
        }
    });
});

module.exports = router;

//pr