'use strict';
const mongoose = require('mongoose');

const schemaMetodoPago = new mongoose.Schema({
    correo: { type: String, required: true },
    numeroTarjeta: { type: String, required: true, unique: true },
    vencimiento: { type: Date, required: true },
    cvc: { type: Number, required: true }

});

module.exports = mongoose.model('MetodoPago', schemaMetodoPago, 'metodosPago');