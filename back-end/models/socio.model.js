'use strict';
const mongoose = require('mongoose');

const schemaSocios = new mongoose.Schema({

    nombre: { type: String, required: true, unique: true },
    logo: { type: String },
    fechaSocio: { type: String, required: true }

});

module.exports = mongoose.model('Socios', schemaSocios, 'socios');