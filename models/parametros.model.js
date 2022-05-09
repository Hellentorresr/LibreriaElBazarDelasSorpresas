'use strict';
const mongoose = require('mongoose');

const schemaParametros = new mongoose.Schema({
    agregarNombre : { type: String, required: true },
    costo: { type: String, required: true },
    
});

module.exports = mongoose.model('Parametros', schemaParametros, 'parametros');