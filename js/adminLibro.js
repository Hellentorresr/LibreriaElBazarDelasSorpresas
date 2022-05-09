// Variables de la tabla
const cuerpoTabla = document.querySelector('#tbl-libros tbody');
let listaLibrosReg = [];

// Variables del formulario
const inputTitulo = document.getElementById('txt-libro-nombre');
const inputISBN = document.getElementById('txt-libro-isbn');
const inputAutor = document.getElementById('txt-libro-autor');
const inputEditorial = document.getElementById('txt-libro-editorial');
const inputCosto = document.getElementById('txt-libro-costo');
const inputPublicacion = document.getElementById('txt-libro-publicacion');
const listaGenero = document.getElementById('slt-libro-genero');
const inputResenna = document.getElementById('txt-libro-resenna');
const inputPremio = document.getElementById('txt-libro-premio');
const imgPortada = document.getElementById('image');
const boton_foto = document.getElementById('btn_foto');
const botonRegistrar = document.getElementById('conf-agregar-li');

// Variables generales
let totalGeneros = 0;
let totalLibros = 0;



//foto con cloudinary
let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'csalazarg',
    uploadPreset: 'csalazarg_verne'
}, (err, result) => {
    if (!err && result && result.event === 'success') {
        console.log('Imagen subida con exito', result.info);
        imgPortada.src = result.info.secure_url;
    }
});


boton_foto.addEventListener('click', () => {
    widget_cloudinary.open();
}, false);



// Mostrar datos del JSObject en la tabla
const mostrarDatos = () => {
    cuerpoTabla.innerHTML = '';
    let totalLibros = 0;
    let cantAut = 0;
    let librosActivos = 0;
    let totalValorLibros = 0;

    let filtro = document.getElementById('txt-filtro').value.toLowerCase();

    listaLibrosReg.forEach(libro => {
        if (libro.titulo.toLowerCase().includes(filtro) || libro.autor.toLowerCase().includes(filtro)) {

            let fila = cuerpoTabla.insertRow();

            /*----- Sección celda para img -----*/
            let celdaPortada = fila.insertCell();
            let imgPortada = document.createElement('img');
            imgPortada.classList.add('img-portada');
            imgPortada.type = 'img';
            imgPortada.src = libro.foto;
            celdaPortada.prepend(imgPortada);
            /*----- Sección celda para img -----*/

            fila.insertCell().textContent = libro.titulo;
            fila.insertCell().textContent = libro.isbn;
            fila.insertCell().textContent = libro.autor;
            fila.insertCell().textContent = libro.editorial;
            fila.insertCell().textContent = libro.fechaPublicacion;
            fila.insertCell().textContent = libro.genero;
            fila.insertCell().textContent = "₡" + libro.costo;


            /*----- Sección de estado -----*/
            if (libro.estado == true) {
                fila.insertCell().textContent = "Activo";

            } else {
                fila.insertCell().textContent = "Inhabilitado";
            }

            /*----- Sección de estado -----*/

            parseInt(totalLibros++);
            parseInt(cantAut[libro.autor] = (cantAut[libro.autor] || 0) + 1);

            /*----- Sección celda para butón de eliminar -----*/
            let celdaBotones = fila.insertCell();
            let botonEliminar = document.createElement('button');
            botonEliminar.classList.add('btn-eliminar');
            botonEliminar.type = 'button';
            botonEliminar.textContent = 'Eliminar';

            botonEliminar.addEventListener('click', () => {
                eliminarDatos('eliminar-libro', libro._id);
            });

            celdaBotones.appendChild(botonEliminar);
            /*----- Sección celda para butón de eliminar -----*/

            /*----- Sección celda para conteo -----*/
            if (libro.estado == true) {
                librosActivos++;
            }

            totalValorLibros += parseInt(libro.costo);

            /*----- Sección celda para conteo -----*/
        }


    });

    document.getElementById('libros-cantidad').textContent = totalLibros;
    document.getElementById('libros-activos').textContent = librosActivos;
    document.getElementById('libros-valor').textContent = "₡" + totalValorLibros;
};







//Inicializar
const inicializar = async() => {
    listaLibrosReg = await obtenerDatos('listar-libro');
    mostrarDatos();
};


/**validar */
const validar = () => {
    let hayError = false;
    console.log(imgPortada.src);
    if (inputTitulo.value == '') {
        hayError = true;
        inputTitulo.classList.add('input-error');

    } else {
        inputTitulo.classList.remove('input-error');
    }

    if (inputISBN.value == '') {
        hayError = true;
        inputISBN.classList.add('input-error');
    } else {
        inputISBN.classList.remove('input-error');
    }

    if (inputAutor.value == '') {
        hayError = true;
        inputAutor.classList.add('input-error');
    } else {
        inputAutor.classList.remove('input-error');
    }

    if (inputEditorial.value == '') {
        hayError = true;
        inputEditorial.classList.add('input-error');
    } else {
        inputEditorial.classList.remove('input-error');
    }
    if (inputPublicacion.value == '') {
        hayError = true;
        inputPublicacion.classList.add('input-error');
    } else {
        inputPublicacion.classList.remove('input-error');
    }

    if (listaGenero.value == '') {
        hayError = true;
        listaGenero.classList.add('input-error');
    } else {
        listaGenero.classList.remove('input-error');
    }
    if (inputResenna.value == '') {
        hayError = true;
        inputResenna.classList.add('input-error');
    } else {
        inputResenna.classList.remove('input-error');
    }
    if (inputPremio.value == '') {
        hayError = true;
        inputPremio.classList.add('input-error');
    } else {
        inputPremio.classList.remove('input-error');
    }


    // Validacion final
    if (hayError == true) {
        Swal.fire({
            'icon': 'warning',
            'title': 'Libro no registrado',
            'text': 'Favor llene los campos que contienen asterisco *'
        });
    } else {
        registrarLibro();
    }
}


const registrarLibro = () => {
    let data = {
        "isbn": inputISBN.value,
        "titulo": inputTitulo.value,
        "autor": inputAutor.value,
        "fechaPublicacion": inputPublicacion.value,
        "genero": listaGenero.value,
        "editorial": inputEditorial.value,
        "costo": inputCosto.value,
        "premios": inputPremio.value,
        "resenna": inputResenna.value,
        "foto": imgPortada.src,
        "estado": true
    };
    registrarDatos('registrar-libro', data, 'adminLibro.html')
};


botonRegistrar.addEventListener('click', () => {
    validar();
});



inicializar();
document.getElementById('txt-filtro').addEventListener('keyup', mostrarDatos);





//cerrar sesion
let usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
const elementA = document.getElementById('usuarioOk');


logOut = () => {
    localStorage.clear();
    console.log('hi');
    window.location.href = 'login.html';
};

elementA.addEventListener('click', logOut);















// Get the modal || Ventana de registro
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("agregar-genero");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

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