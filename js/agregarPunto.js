'use strict'
const inputFoto = document.querySelector('#txt-fotoPunto');
const inputNombre = document.querySelector('#txt-nombrePunto');
const inputSocio = document.querySelector('#txt-nombreSocio');
const inputProvincia = document.querySelector('#txt-provincia');
const inputCanton = document.querySelector('#txt-canton');
const inputDistrito = document.querySelector('#txt-distrito');
const inputDireccion = document.querySelector('#txt-direccion');

const botonRegistrar = document.querySelector('#conf-agregar-punto');


const validar = () => {
    let error = false;

    if (inputNombre.value == '') {
        error = true;
        inputNombre.classList.add('input-error');
    } else {
        inputNombre.classList.remove('input-error');
    }

    if (inputSocio.value == '') {
        error = true;
        inputSocio.classList.add('input-error');
    } else {
        inputSocio.classList.remove('input-error');
    }

    if (inputProvincia.value == '') {
        error = true;
        inputProvincia.classList.add('input-error');
    } else {
        inputProvincia.classList.remove('input-error');
    }
    if (inputCanton.value == '') {
        error = true;
        inputCanton.classList.add('input-error');
    } else {
        inputCanton.classList.remove('input-error');
    }
    if (inputDistrito.value == '') {
        error = true;
        inputDistrito.classList.add('input-error');
    } else {
        inputDistrito.classList.remove('input-error');
    }
    if (inputDireccion.value == '') {
        error = true;
        inputDireccion.classList.add('input-error');
    } else {
        inputDireccion.classList.remove('input-error');
    }

    if (error == true) {
        Swal.fire({
            'icon': 'warning',
            'title': 'El usuario no se puede registrar',
            'text': 'Por favor revise los campos resaltados'
        });

    } else {
        let punto = {
            nombrePunto: inputNombre.value,
            nombreSocio: inputSocio.value,

            fotoPunto: inputFoto.value,
            provincia: inputProvincia.value,
            canton: inputCanton.value,
            distrito: inputDistrito.value,
            direccion: inputDireccion.value
        };

        registrarDatos('registrar-puntosRetiro', punto, 'adminPuntosRetiro.html');

    };

};


botonRegistrar.addEventListener('click', validar);