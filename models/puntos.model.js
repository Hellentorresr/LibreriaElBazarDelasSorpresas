'use strict';
const mongoose = require('mongoose');

const schemaPto = new mongoose.Schema({

    imagen: { type: String, required: true },
    nombre: { type: String, required: true },
    socio: { type: String, required: true },
    provincia: { type: String, required: true },
    canton: { type: String, required: true },
    distrito: { type: String, required: true },
    sennas: { type: String, required: true }

});

module.exports = mongoose.model('Punto', schemaPto, 'punto');