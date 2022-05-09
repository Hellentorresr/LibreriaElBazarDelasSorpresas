'use strict';
const mongoose = require('mongoose');

const schemaLibros = new mongoose.Schema({
    isbn: { type: Number, required: true, unique: true },
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    fechaPublicacion: { type: String },
    genero: { type: String, required: true },
    editorial: { type: String, required: true },
    costo: { type: String, required: true },
    premios: { type: String },
    resenna: { type: String, required: true },
    foto: { type: String },
    estado: { type: Boolean }

});

module.exports = mongoose.model('Libros', schemaLibros, 'libros');