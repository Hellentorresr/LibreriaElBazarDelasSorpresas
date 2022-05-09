'use strict';
const mongoose = require('mongoose');

const schemaDescuentos = new mongoose.Schema({
    nombreDescuento: { type: String, required: true, unique: true },
    fechaInicio: { type: String, required: true },
    fechaExp: { type: String, required: true },
    porcentaje: { type: Number, required: true }
});

module.exports = mongoose.model('Descuentos', schemaDescuentos, 'descuentos');