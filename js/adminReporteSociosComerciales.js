// Variables de la tabla
const cuerpoTabla = document.querySelector('#tbl-socios tbody');

// Variables del formulario
const inputNombre = document.getElementById('txt-soc-com-nombre');
const boton_foto = document.getElementById('btn_foto');
const imgSocio = document.getElementById('image');
const inputFecha = document.getElementById('txt-soc-com-fecha');
const botonRegistrar = document.getElementById('conf-agregar-socio');

//foto con cloudinary
let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'csalazarg',
    uploadPreset: 'csalazarg_verne'
}, (err, result) => {
    if (!err && result && result.event === 'success') {
        console.log('Imagen subida con exito', result.info);
        imgSocio.src = result.info.secure_url;
    }
});


boton_foto.addEventListener('click', () => {
    widget_cloudinary.open();
}, false);


// Mostrar datos del JSObject en la tabla
const mostrarDatos = () => {
    cuerpoTabla.innerHTML = '';
    let totalSocios = 0;

    let filtro = document.getElementById('txt-filtro').value.toLowerCase();

    listaSocios.forEach(socio => {
        if (socio.nombre.toLowerCase().includes(filtro) || socio.fechaSocio.toLowerCase().includes(filtro)) {

            let fila = cuerpoTabla.insertRow();

            /*----- Sección celda para img -----*/
            let celdaPortada = fila.insertCell();
            let imgLogo = document.createElement('img');
            imgLogo.classList.add('img-portada');
            imgLogo.type = 'img';
            imgLogo.src = socio.logo;
            celdaPortada.prepend(imgLogo);
            /*----- Sección celda para img -----*/

            fila.insertCell().textContent = socio.nombre;
            fila.insertCell().textContent = socio.fechaSocio;

            //Celda para botones de opciones
          /*   let CeldaBotones = fila.insertCell();
            let botonEliminar = document.createElement('button');
            botonEliminar.classList.add('btn-eliminar');
            botonEliminar.type = 'button';
            botonEliminar.textContent = 'Eliminar';

            //Función para eliminar
            botonEliminar.addEventListener('click', () => {
                eliminarDatos('eliminar-socio', socio._id);
            });
            CeldaBotones.appendChild(botonEliminar);
            */
        } 

        totalSocios++;


    })
    document.getElementById('socios-cantidad').textContent = totalSocios;

};

//Inicializar
const inicializar = async () => {
    listaSocios = await obtenerDatos('listar-socio');
    mostrarDatos();
};

const registrarSocio = () => {
    let data = {
        "nombre": inputNombre.value,
        "logo": imgSocio.src,
        "fechaSocio": inputFecha.value
    };
    registrarDatos('registrar-socio', data, 'adminSocioComer.html')
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

    if (inputFecha.value == '') {
        hayError = true;
        inputFecha.classList.add('input-error');
    } else {
        inputFecha.classList.remove('input-error');
    }

    // Validacion final
    if (hayError == true) {
        Swal.fire({
            'icon': 'warning',
            'title': 'Socio no registrado',
            'text': 'Favor llene los campos que contienen asterisco *'
        });
    } else {
        registrarSocio();
    }
}


inicializar();
document.getElementById('txt-filtro').addEventListener('keyup', mostrarDatos);





// Get the modal || Ventana de registro
/* let modal = document.getElementById("myModal"); */

// Get the button that opens the modal
/* let btn = document.getElementById("agregar-soc-comer"); */

// Get the <span> element that closes the modal
/* let span = document.getElementsByClassName("close")[0]; */

// When the user clicks on the button, open the modal
/* btn.onclick = function () {
    modal.style.display = "block";
}
 */
// When the user clicks on <span> (x), close the modal
/* span.onclick = function () {
    modal.style.display = "none";
} */

// When the user clicks anywhere outside of the modal, close it
/* window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
} */



//cerrar sesion
let usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
const elementA = document.getElementById('usuarioOk');


logOut = () => {
    localStorage.clear();
    console.log('hi');
    window.location.href = 'login.html';
};

elementA.addEventListener('click', logOut);