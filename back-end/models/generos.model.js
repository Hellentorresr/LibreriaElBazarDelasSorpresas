const mongoose = require('mongoose');

const schemaGeneros = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true, unique: true }
});

module.exports = new mongoose.model('Genero', schemaGeneros, 'generos');