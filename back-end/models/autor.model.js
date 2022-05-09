'use strict';
const mongoose = require('mongoose');

const schemaAutor = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    pais: { type: String, required: true },
    libros: { type: String, required: true },
    genero: { type: String, required: true },
    premios: { type: String },
    nacimiento: { type: String, required: true },
    defuncion: { type: String },
    nobel: { type: Boolean, required: true },
    nobelFecha: { type: String },
    resenna: { type: String, required: true },
    foto: { type: String, required: true }


});

module.exports = mongoose.model('Autor', schemaAutor, 'autor');