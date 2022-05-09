const express = require('express'); //para hacer la conecciona  la base de datos
const router = express.Router(); // objeto para traer la info de este router
const Libro = require('../models/libro.model'); //guardando el modelo de Libro

//Registro
// http://localhost:3000/api/registrar-libro
router.post('/registrar-libro', (req, res) => {
    let nuevoLibro = new Libro({
        isbn: req.body.isbn,
        titulo: req.body.titulo,
        autor: req.body.autor,
        fechaPublicacion: req.body.fechaPublicacion,
        genero: req.body.genero,
        editorial: req.body.editorial,
        costo: req.body.costo,
        premios: req.body.premios,
        resenna: req.body.resenna,
        foto: req.body.foto,
        estado: req.body.estado,

    });

    nuevoLibro.save(error => {
        if (error) {
            res.json({
                msj: 'No se pudo registrar el Libro, ocurrió un error',
                error
            })
        } else {
            res.json({
                msj: 'Libro registrado correctamente.'
            });
        }
    });

});


// http://localhost:3000/api/listar-libro
router.get('/listar-libro', (req, res) => {
    Libro.find((error, lista) => {
        if (error) {
            res.json({
                msj: 'No se pudo listar los libros',
                error
            });
        } else {
            res.json({
                lista
            });
        }
    });
})

// http://localhost:3000/api/eliminar-libro
router.delete('/eliminar-libro', (req, res) => {
    Libro.deleteOne({
        '_id': req.body._id
    }, (error) => {
        if (error) {
            res.json({
                msj: 'No se pudo elimnar el libro seleccionado',
                error
            });
        } else {
            res.json({
                msj: 'Libro eliminado correctamente'
            });
        }
    });
});


// Consultas
//http://localhost:3000/api/buscar-libro
router.get('/buscar-libro', function(req, res) {
    let tituloLibro = req.query.titulo;

    Libro.find({ titulo: tituloLibro }, function(err, clienteBD) {
        if (err) {
            return res.json({
                success: false,
                msj: 'No se encontró ningún libro con ese titulo.',
                err
            });
        } else {
            return res.json({
                success: true,
                cliente: clienteBD
            });
        }
    })
});

module.exports = router;

/* JSON para pruebas

{
        "isbn": "658978521",
        "titulo": "Libros que no serán leidos",
        "autor": "Coco",
        "fechaPublicacion": "2022-01-01",
        "genero": "Terror",
        "editorial": "Salamandra",
        "costo": "3000",
        "premios": 10,
        "resenna": "libro",
        "foto": "https://res.cloudinary.com/csalazarg/image/upload/v1651538574/psubqvzolyvcynrzdsgv.jpg",
        "estado": true
}

*/