// Variables de la tabla
const cuerpoTabla = document.querySelector('#tbl-autores tbody');
let listaAutor = [];

// Variables del formulario
const botonRegistrar = document.getElementById('conf-agregar-autor');
const inputNombre = document.getElementById('txt-autor-nombre');
const inputApellido = document.getElementById('txt-autor-apellido');
const inputLibros = document.getElementById('txt-autor-libros');
const listaPais = document.getElementById('lst-autor-pais');
const listaGenero = document.getElementById('lst-autor-genero');
const inputPremios = document.getElementById('txt-autor-premios');
const inputNacimiento = document.getElementById('txt-autor-nacimiento');
const inputDefuncion = document.getElementById('txt-autor-defuncion');
const listaNobel = document.getElementById('lst-autor-nobel');
const inputFechaNobel = document.getElementById('txt-autor-nobel-fecha');
const inputResenna = document.getElementById('txt-autor-resenna');
const imgFoto = document.getElementById('img-autor-foto');

// Variables generales
let totalGeneros = 0;
let totalLibros = 0;



const imagenRetrato = document.getElementById('image');
const boton_foto = document.getElementById('btn_foto');

//foto con cloudinary
let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'csalazarg',
    uploadPreset: 'csalazarg_verne'
}, (err, result) => {
    if (!err && result && result.event === 'success') {
        console.log('Imagen subida con exito', result.info);
        imagenRetrato.src = result.info.secure_url;
    }
});


boton_foto.addEventListener('click', () => {
    widget_cloudinary.open();
}, false);



// Mostrar datos del JSObject en la tabla
const mostrarDatos = () => {
    cuerpoTabla.innerHTML = '';
    let totalAutores = 0;
    let totalAutoresMuertos = 0;
    let totalNobels = 0;
    let filtro = document.getElementById('txt-filtro').value.toLowerCase();


    listaAutor.forEach(autor => {

        if (autor.nombre.toLowerCase().includes(filtro) || autor.pais.toLowerCase().includes(filtro)) {
            let fila = cuerpoTabla.insertRow();

            /*----- Sección celda para img -----*/
            let celdaPortada = fila.insertCell();
            let imgPortada = document.createElement('img');
            imgPortada.classList.add('img-portada');
            imgPortada.type = 'img';
            imgPortada.src = autor.foto;
            celdaPortada.prepend(imgPortada);
            /*----- Sección celda para img -----*/

            fila.insertCell().textContent = autor.nombre + " " + autor.apellido;
            fila.insertCell().textContent = autor.pais;
            fila.insertCell().textContent = autor.libros;
            fila.insertCell().textContent = autor.genero;
            fila.insertCell().textContent = autor.premios;
            fila.insertCell().textContent = autor.nacimiento;

            /*----- Sección celda para butón de eliminar -----*/
            let celdaBotones = fila.insertCell();
            let botonEliminar = document.createElement('button');
            botonEliminar.classList.add('btn-eliminar');
            botonEliminar.type = 'button';
            botonEliminar.textContent = 'Eliminar';

            botonEliminar.addEventListener('click', () => {
                eliminarDatos('eliminar-autor', autor._id);
            });

            celdaBotones.appendChild(botonEliminar);
            /*----- Sección celda para butón de eliminar -----*/

            /*----- Sección celda para conteo -----*/
            if (!autor.defuncion == "") {
                totalAutoresMuertos++
            }

            if (autor.nobel == true) {
                totalNobels++
            }

            /*----- Sección celda para conteo -----*/

            parseInt(totalAutores++);

        }
    });
    document.getElementById('autores-cantidad').textContent = totalAutores;
    document.getElementById('autores-muertos').textContent = totalAutoresMuertos;
    document.getElementById('autores-nobel').textContent = totalNobels;


};

/*
// Cargar lista de países
document.addEventListener('DOMContentLoaded', () => {
    const listaPais = document.getElementById('lst-autor-pais');
    fetch('https://restcountries.com/v3.1/all').then(res => {
        return res.json();
    }).then(data => {
        let output = "";
        data.forEach(country => {
            output += `<option value="${country.name.common}">${country.name.common}</option>`;
        })

        listaPais.innerHTML = output;
    }).catch(err => {
        console.log(err);
    })
});

*/

const inicializar = async() => {
    listaAutor = await obtenerDatos('listar-autor');
    mostrarDatos();
};

// Validación de entrada
const validar = () => {

    let hayError = false;
    let soloAlfabeto = /^[a-zA-Z]+$/;
    console.log(imagenRetrato.src);
    console.log(inputNombre.value);
    console.log(inputApellido.value);
    console.log(listaPais.value);
    console.log(inputNacimiento.value);
    console.log(inputDefuncion.value);
    console.log(listaNobel.value);
    console.log(inputFechaNobel.value);
    console.log(inputResenna.value);
    console.log(listaGenero.value);

    //Validación del nombre
    if (inputNombre.value == '') {
        hayError = true;
        inputNombre.classList.add('input-error');
    } else {
        inputNombre.classList.remove('input-error');
    }

    //Validación del apellido
    if (inputApellido.value == '') {
        hayError = true;
        inputApellido.classList.add('input-error');
    } else {
        inputApellido.classList.remove('input-error');
    }

    //Validación del país
    if (listaPais.value == '') {
        hayError = true;
        listaPais.classList.add('input-error');
    } else {
        listaPais.classList.remove('input-error');
    }


    //Validación de género
    if (listaGenero.value == '') {
        hayError = true;
        listaGenero.classList.add('input-error');
    } else {
        listaGenero.classList.remove('input-error');
    }

    //Validación de premios
    if (inputPremios.value == '') {
        hayError = true;
        inputPremios.classList.add('input-error');
    } else {
        inputPremios.classList.remove('input-error');
    }

    //Validación de fecha nacimiento
    if (inputNacimiento.value == '') {
        hayError = true;
        inputNacimiento.classList.add('input-error');
    } else {
        inputNacimiento.classList.remove('input-error');
    }




    // Validacion final
    if (hayError == true) {
        Swal.fire({
            'icon': 'warning',
            'title': 'Autor no registrado',
            'text': 'Favor llene los campos que contienen asterisco *'
        });
    } else {
        registrarAutor();
    }
};


let registrarAutor = () => {
    let data = {
        "nombre": inputNombre.value,
        "apellido": inputApellido.value,
        "pais": listaPais.value,
        "libros": inputLibros.value,
        "genero": listaGenero.value,
        "premios": inputPremios.value,
        "nacimiento": inputNacimiento.value,
        "defuncion": inputDefuncion.value,
        "nobel": listaNobel.value,
        "nobelFecha": inputFechaNobel.value,
        "resenna": inputResenna.value,
        "foto": imagenRetrato.src
    };
    registrarDatos('/registrar-autor', data, 'adminAutor.html');
};


// Acción del botón de registro
botonRegistrar.addEventListener('click', () => {
    validar();
});


// Inicialización de la tabla
inicializar();
document.getElementById('txt-filtro').addEventListener('keyup', mostrarDatos);





// Formulario en pantalla

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("agregar-autor");

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

//cerrar sesion
let usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
const elementA = document.getElementById('usuarioOk');


logOut = () => {
    localStorage.clear();
    console.log('hi');
    window.location.href = 'login.html';
};

elementA.addEventListener('click', logOut);


const mostrarPais = () => {
    listaPais.innerHTML = '';
    let output;
    listaPais.options.add(new Option('-- Seleccione un País --'));
    listaTodosPaises.pais.forEach(lista => {
        output += `<option value="${lista.name}">${lista.name}</option>`;
    });
    listaPais.innerHTML = output;
};


mostrarPais();