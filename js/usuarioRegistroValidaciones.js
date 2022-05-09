'use strict';
const botonRegistrar = document.getElementById('btn-registrar');
const usuarioNombre = document.getElementById('txt-nombre');
const usurioSegNombre = document.getElementById('txt-nombreDos');
const usuarioApellido = document.getElementById('txt-apellidoUno');
const usuarioSegApell = document.getElementById('txt-apellidoDos');
const usuarioGenero = document.getElementById('slt-genero');
const usuarioEmail = document.getElementById('txt-correo');
const usuarioIdentificaion = document.getElementById('slt-tipoIdentificacion');
const usuarioNumCedu = document.getElementById('txtNumCedula');
const usuarioProvincia = document.getElementById('slt_provincia');
const usuarioCanto = document.getElementById('slt_canton');
const usuarioDistrito = document.getElementById('slt_distrito');
const usuarioSennasExactas = document.getElementById('txt-sennasExactas');
const inputContrasenna = document.getElementById('txt-contrasenna');
const inputConfirmacion = document.getElementById('txt-confirmacion');
// const parrafoNombre = document.getElementById('warningNombre');
const parrafoImail = document.getElementById('warnings');
const parrafoContrasenna = document.getElementById('warningContrasenna');
const usuarioPrefeGenero = document.getElementById('slt-generoLiterario');
const usuarioPreAutor = document.getElementById('slt-autor');

//Mapa
const latitudCli = document.getElementById('latitud');
const longitudCli = document.getElementById('longitud');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        Swal.fire({
            'icon': 'success',
            'title': 'Agregando su Ubicacion'
        });
    } else {
        alert('no es compatible');
    }
}

function showPosition(position) {
    latitudCli.innerHTML = "Latitud: " + position.coords.latitude;
    longitudCli.innerHTML = "Longitud: " + position.coords.longitude;
}

const imagenPerfil = document.getElementById('image');
const boton_foto = document.getElementById('btn_foto');

//foto con cloudinary
let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'hellentorres',
    uploadPreset: 'proyecto'
}, (err, result) => {
    if (!err && result && result.event === 'success') {
        console.log('Imagen subida con exito', result.info);
        imagenPerfil.src = result.info.secure_url;
    }
});

boton_foto.addEventListener('click', () => {
    widget_cloudinary.open();
}, false);

//backEnd

const registrarUsuario = () => {
    let data = {
        "primerNombre": usuarioNombre.value,
        "segundoNombre": usurioSegNombre.value,
        "apellido": usuarioApellido.value,
        "segundoApellido": usuarioSegApell.value,
        "genero": usuarioGenero.value,
        "correo": usuarioEmail.value,
        "tipoIdentificacion": usuarioIdentificaion.value,
        "numeroIdentificacion": usuarioNumCedu.value,
        "provincia": usuarioProvincia.value,
        "canton": usuarioCanto.value,
        "distrito": usuarioDistrito.value,
        "sennasExactas": usuarioSennasExactas.value,
        "latitud": latitudCli.value,
        "longitud": longitudCli.value,
        "prefeGeneroLite": usuarioPrefeGenero.value,
        "autorFavorito": usuarioPreAutor.value,
        "contrasenna": inputContrasenna.value,
        "confimacionContrase": inputConfirmacion.value,
        "foto": imagenPerfil.src
    };

    registrarDatos('registrar-usuario', data, 'login.html'); // Q no vaya a listar si no su perfil
};

const validar = () => {
    let hayError = false;
    // let warningNombre = '';
    let warning = '';
    let warningContrasenna = '';
    let validacionEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    let entrar = false;
    parrafoImail.innerHTML = '';

    if (usuarioNombre.value.length < 4) {
        hayError = true;
        usuarioNombre.classList.add('input-error');
        // warningNombre += `El nombre no es valido <br>`
        entrar = true;
    } else {
        usuarioNombre.classList.remove('input-error');
    }

    if (usuarioApellido.value == '') {
        hayError = true;
        usuarioApellido.classList.add('input-error');
    } else {
        usuarioApellido.classList.remove('input-error');
    }

    if (usuarioGenero.value == '') {
        hayError = true;
        usuarioGenero.classList.add('input-error');
    } else {
        usuarioGenero.classList.remove('input-error');
    }

    if (!validacionEmail.test(usuarioEmail.value)) {
        hayError = true;
        usuarioEmail.classList.add('input-error');
        warning += `El email no es valido <br>`
        entrar = true;
    } else {
        usuarioEmail.classList.remove('input-error');
    }

    if (usuarioIdentificaion.value == '') {
        hayError = true;
        usuarioIdentificaion.classList.add('input-error');
    } else {
        usuarioIdentificaion.classList.remove('input-error');
    }

    if (usuarioNumCedu.value == '') {
        hayError = true;
        usuarioNumCedu.classList.add('input-error');
    } else {
        usuarioNumCedu.classList.remove('input-error');
    }

    if (usuarioProvincia.value == '') {
        hayError = true;
        usuarioProvincia.classList.add('input-error');
    } else {
        usuarioProvincia.classList.remove('input-error');
    }

    if (usuarioCanto.value == '') {
        hayError = true;
        usuarioCanto.classList.add('input-error');
    } else {
        usuarioCanto.classList.remove('input-error');
    }

    if (usuarioDistrito.value == '') {
        hayError = true;
        usuarioDistrito.classList.add('input-error');
    } else {
        usuarioDistrito.classList.remove('input-error');
    }

    if (usuarioSennasExactas.value == '') {
        hayError = true;
        usuarioSennasExactas.classList.add('input-error');
    } else {
        usuarioSennasExactas.classList.remove('input-error');
    }

    if (inputContrasenna.value !== inputConfirmacion.value) {
        hayError = true;
        inputContrasenna.classList.add('input-error');
        inputConfirmacion.classList.add('input-error');
        warningContrasenna += `La confirmación de contraseña no coincide <br>`
        entrar = true;
    } else {
        inputContrasenna.classList.remove('input-error');
        inputConfirmacion.classList.remove('input-error');
    }

    let texto = inputContrasenna.value;
    let expresion = /^[a-zA-Z]+[1-9]{1}[!\@\#\$\&]$/;

    if (expresion.test(texto) == false) {
        hayError = true;
        inputContrasenna.classList.add('input-error');
    } else {

        inputContrasenna.classList.remove('input-error');
    }

    if (inputContrasenna.value.length < 8 || inputContrasenna.value.length > 12) {
        hayError = true;
        inputContrasenna.classList.add('input-error');
    } else {

        inputContrasenna.classList.remove('input-error');
    }

    if (entrar) {
        parrafoImail.innerHTML = warning;
        // parrafoNombre.innerHTML = warningNombre;
        parrafoContrasenna.innerHTML = warningContrasenna;
    }


    // Validacion final
    if (hayError == true) {
        Swal.fire({
            'icon': 'warning',
            'title': 'Usuario no registrado',
            'text': 'Favor llene los campos que contienen asterisco *'
        });
    } else {
        registrarUsuario();
    }
};




botonRegistrar.addEventListener('click', () => {
    validar();
});




//Para la direccion provincia, canton distrito
const listaProvincias = document.getElementById('slt_provincia');
const listaCantones = document.getElementById('slt_canton');
const listaDistritos = document.getElementById('slt_distrito');

let provinciaSeleccionada;
let cantonSeleccionado;
const mostrarProvincias = () => {
    distribucion.provincias.forEach(provincia => {
        listaProvincias.options.add(new Option(provincia.title));
    });
};

const mostrarCantones = (nombreProvincia) => {
    listaCantones.innerHTML = '';
    listaCantones.options.add(new Option('-- Seleccione un cantón --'));
    distribucion.provincias.forEach(provincia => {
        if (provinciaSeleccionada == provincia.title) {
            provincia.cantones.forEach(canton => {
                listaCantones.options.add(new Option(canton.title));
            });
        }

    });
};

const mostrarDistritos = (nombreCanton) => {
    listaDistritos.innerHTML = '';
    listaDistritos.options.add(new Option('-- Seleccione un distrito --'));
    distribucion.provincias.forEach(provincia => {
        if (provinciaSeleccionada == provincia.title) {
            provincia.cantones.forEach(canton => {
                if (cantonSeleccionado == canton.title) {
                    canton.distritos.forEach(distrito => {
                        listaDistritos.options.add(new Option(distrito.title));
                    });

                }

            });
        }

    });
};

mostrarProvincias();

listaProvincias.addEventListener('change', () => {
    provinciaSeleccionada = listaProvincias.value;

    mostrarCantones(provinciaSeleccionada);
});

listaCantones.addEventListener('change', () => {
    cantonSeleccionado = listaCantones.value;

    mostrarDistritos(cantonSeleccionado);
});



//validar la cedula con solo colores
function validate() {
    let contrasenna = document.getElementById('txt-contrasenna');
    let upper = document.getElementById('upper');
    let lower = document.getElementById('lower');
    let specialChar = document.getElementById('special_char');
    let leng = document.getElementById('length');
    let number = document.getElementById('number');

    //check if pass value contain a number
    if (contrasenna.value.match(/[0 - 12]/)) {
        number.style.color = 'green'
    } else {
        number.style.color = 'red'
    }

    if (contrasenna.value.match(/[A-Z]/)) {
        upper.style.color = 'green'
    } else {
        upper.style.color = 'red'
    }

    if (contrasenna.value.match(/[a-z]/)) {
        lower.style.color = 'green'
    } else {
        lower.style.color = 'red'
    }

    if (contrasenna.value.match(/[!\@\#\$\&]/)) {
        specialChar.style.color = 'green'
    } else {
        specialChar.style.color = 'red'
    }

    if (contrasenna.value.length >= 8 && contrasenna.value.length <= 12) {
        leng.style.color = 'green'
    } else {
        leng.style.color = 'red'
    }
    return validate();
}