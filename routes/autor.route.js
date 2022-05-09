const express = require('express'); //para hacer la conecciona  la base de datos
const router = express.Router(); // objeto para traer la info de este router

//guardando el modelo de usuarios
const Autor = require('../models/autor.model');


// http://localhost:3000/api/registrar-autor

router.post('/registrar-autor', (req, res) => {
    let nuevoAutor = new Autor({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        pais: req.body.pais,
        libros: req.body.libros,
        genero: req.body.genero,
        premios: req.body.premios,
        nacimiento: req.body.nacimiento,
        defuncion: req.body.defuncion,
        nobel: req.body.nobel,
        nobelFecha: req.body.nobelFecha,
        resenna: req.body.resenna,
        foto: req.body.foto
    });

    nuevoAutor.save(error => {

        if (error) {
            res.json({
                mej: 'no se pudo registrar el autor, ocurrio un error',
                error
            });
        } else {
            res.json({
                mej: 'Autor registrado correctamente'
            });
        }
    });
});


// http://localhost:3000/api/listar-autor
router.get('/listar-autor', (req, res) => {
    Autor.find((error, lista) => {
        if (error) {
            res.json('No se pudo listar los autores', error);
        } else {
            res.json({
                lista
            });
        }
    });
});


// http://localhost:3000/api/eliminar-autor
router.delete('/eliminar-autor', (req, res) => {
    Autor.deleteOne({
        '_id': req.body._id
    }, (error) => {
        if (error) {
            res.json({
                msj: 'No se pudo elimnar el autor',
                error
            });
        } else {
            res.json({
                msj: 'Autor eliminado correctamente'
            });
        }
    });
});

module.exports = router;


/* JSON para pruebas
{
        "nombre": "Juan",
        "apellido": "Perez",
        "pais": "Costa Rica",
        "libros": 3,
        "genero": "Masculino",
        "premios": "Ninguno",
        "nacimiento": "1960-04-01",
        "defuncion": null,
        "nobel": false,
        "nobelFecha": null,
        "resenna": "Vida tumultosa",
        "foto": "path"
}
*/