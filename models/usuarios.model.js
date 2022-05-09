'use strict';
const mongoose = require('mongoose');


//estructura de nuestra aplicacion
const schemaUsuarios = new mongoose.Schema({
    primerNombre: { type: String, required: true },
    segundoNombre: { type: String },
    apellido: { type: String, required: true },
    segundoApellido: { type: String },
    genero: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    tipoIdentificacion: { type: String, required: true },
    numeroIdentificacion: { type: Number, required: true, unique: true },
    provincia: { type: String, required: true },
    canton: { type: String, required: true },
    distrito: { type: String, required: true },
    sennasExactas: { type: String, required: true },
    latitud: { type: String, required: false },
    longitud: { type: String, required: false },
    prefeGeneroLite: { type: String, required: false },
    autorFavorito: { type: String, required: false },
    contrasenna: { type: String, required: true },
    confimacionContrase: { type: String, required: true },
    foto: { type: String, required: false, unique: false },
    tipoUsuario: { type: String, required: false }
});

module.exports = new mongoose.model('Usuario', schemaUsuarios, 'usuarios');


/*   tarjetas: [{
        numeroTarjeta: { type: Number, unique: true },
        tipoTarjeta: { type: String },
        mesExp: { type: String },
        annoExp: { type: String },
        cvc: { type: Number }
    }],
    historial: [{
        libro: { type: String },
        cantidad: { type: Number },
        fechaCompra: { type: String },
        pagado: { type: String }
    }],
    libroFan: [{
        miembro: { type: Boolean },
        montoAcum: { type: Number }
    }] */