// Variables de la tabla
const cuerpoTabla = document.querySelector('#tbl-puntos tbody');

// Variables del formulario
const imgPunto = document.getElementById('image');
const inputNombre = document.getElementById('txt-pto-nombre');
const inputSocio = document.getElementById('txt-pto-nombreSocio');
const inputProvincia = document.getElementById('txt-pto-provincia');
const inputCanton = document.getElementById('txt-pto-canton');
const inputDistrito = document.getElementById('txt-pto-distrito');
const inputSennas = document.getElementById('txt-pto-sennas');
const boton_foto = document.getElementById('btn_foto');
const botonRegistrar = document.getElementById('conf-agregar-pto');


let provinciaSeleccionada;
let cantonSeleccionado;


//foto con cloudinary
let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'csalazarg',
    uploadPreset: 'csalazarg_verne'
}, (err, result) => {
    if (!err && result && result.event === 'success') {
        console.log('Imagen subida con exito', result.info);
        imgPunto.src = result.info.secure_url;
    }
});


boton_foto.addEventListener('click', () => {
    widget_cloudinary.open();
}, false);

// Mostrar datos del JSObject en la tabla
const mostrarDatos = () => {
    cuerpoTabla.innerHTML = '';
    let totalPuntos = 0;

    let filtro = document.getElementById('txt-filtro').value.toLowerCase();

    listaPuntos.forEach(punto => {
        if (punto.nombre.toLowerCase().includes(filtro) || punto.provincia.toLowerCase().includes(filtro)) {

            let fila = cuerpoTabla.insertRow();

            /*----- Sección celda para img -----*/
            let celdaPortada = fila.insertCell();
            let imgLogo = document.createElement('img');
            imgLogo.classList.add('img-portada');
            imgLogo.type = 'img';
            imgLogo.src = punto.imagen;
            celdaPortada.prepend(imgLogo);
            /*----- Sección celda para img -----*/

            fila.insertCell().textContent = punto.nombre;
            fila.insertCell().textContent = punto.socio;
            fila.insertCell().textContent = punto.provincia;
            fila.insertCell().textContent = punto.canton;
            fila.insertCell().textContent = punto.distrito;
            fila.insertCell().textContent = punto.sennas;

            //Celda para botones de opciones
            let CeldaBotones = fila.insertCell();
            let botonEliminar = document.createElement('button');
            botonEliminar.classList.add('btn-eliminar');
            botonEliminar.type = 'button';
            botonEliminar.textContent = 'Eliminar';

            //Función para eliminar
            botonEliminar.addEventListener('click', () => {
                eliminarDatos('eliminar-punto', punto._id);
            });
            CeldaBotones.appendChild(botonEliminar);

        }

        totalPuntos++;


    })
    document.getElementById('pts-cantidad').textContent = totalPuntos;

};

//Inicializar
const inicializar = async() => {
    listaPuntos = await obtenerDatos('listar-punto');
    mostrarDatos();
};



inicializar();
document.getElementById('txt-filtro').addEventListener('keyup', mostrarDatos);

const registrarPunto = () => {
    let data = {
        "imagen": imgPunto.src,
        "nombre": inputNombre.value,
        "socio": inputSocio.value,
        "provincia": inputProvincia.value,
        "canton": inputCanton.value,
        "distrito": inputDistrito.value,
        "sennas": inputSennas.value
    };
    registrarDatos('registrar-punto', data, 'adminPuntosRetiro.html')
};


botonRegistrar.addEventListener('click', () => {
    validar();
});


// Validación de entrada
const validar = () => {
    let hayError = false;

    if (inputNombre.value == '') {
        hayError = true;
        inputNombre.classList.add('input-error');

    } else {
        inputNombre.classList.remove('input-error');
    }

    if (inputProvincia.value == '') {
        hayError = true;
        inputProvincia.classList.add('input-error');
    } else {
        inputProvincia.classList.remove('input-error');
    }

    // Validacion final
    if (hayError == true) {
        Swal.fire({
            'icon': 'warning',
            'title': 'Socio no registrado',
            'text': 'Favor llene los campos que contienen asterisco *'
        });
    } else {
        registrarPunto();
    }
}

//cerrar sesion
let usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
const elementA = document.getElementById('usuarioOk');


logOut = () => {
    localStorage.clear();
    console.log('hi');
    window.location.href = 'login.html';
};

elementA.addEventListener('click', logOut);





const mostrarProvincias = () => {
    distribucion.provincias.forEach(provincia => {
        inputProvincia.options.add(new Option(provincia.title));
    });
};

const mostrarCantones = (nombreProvincia) => {
    inputCanton.innerHTML = '';
    inputCanton.options.add(new Option('-- Seleccione un cantón --'));
    distribucion.provincias.forEach(provincia => {
        if (provinciaSeleccionada == provincia.title) {
            provincia.cantones.forEach(canton => {
                inputCanton.options.add(new Option(canton.title));
            });
        }

    });
};

const mostrarDistritos = (nombreCanton) => {
    inputDistrito.innerHTML = '';
    inputDistrito.options.add(new Option('-- Seleccione un distrito --'));
    distribucion.provincias.forEach(provincia => {
        if (provinciaSeleccionada == provincia.title) {
            provincia.cantones.forEach(canton => {
                if (cantonSeleccionado == canton.title) {
                    canton.distritos.forEach(distrito => {
                        inputDistrito.options.add(new Option(distrito.title));
                    });

                }

            });
        }

    });
};

mostrarProvincias();

inputProvincia.addEventListener('change', () => {
    provinciaSeleccionada = inputProvincia.value;

    mostrarCantones(provinciaSeleccionada);
});

inputCanton.addEventListener('change', () => {
    cantonSeleccionado = inputCanton.value;

    mostrarDistritos(cantonSeleccionado);
});





















































































































// Get the modal || Ventana de registro
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("agregar-pto");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}