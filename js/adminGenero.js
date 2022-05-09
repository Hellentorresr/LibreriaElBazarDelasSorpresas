// Variables de la tabla
const cuerpoTabla = document.querySelector('#tbl-generos tbody');
let listaGenerosLit = [];

// Variables del formulario
const inputNombre = document.getElementById('txt-genero-nombre');
const inputCodigo = document.getElementById('txt-genero-codigo');
const botonRegistrar = document.getElementById('conf-agregar');

// Variables generales
let totalGeneros = 0;
let totalLibros = 0;


const mostrarDatos = () => {
    cuerpoTabla.innerHTML = '';
    let totalGeneros = 0;
    let filtro = document.getElementById('txt-filtro').value.toLowerCase();

    listaGenerosLit.forEach(genero => {
        if (genero.nombre.toLowerCase().includes(filtro) || genero.codigo.toLowerCase().includes(filtro)) {
            let fila = cuerpoTabla.insertRow();
            fila.insertCell().textContent = genero.codigo;
            fila.insertCell().textContent = genero.nombre;
            parseInt(totalGeneros++);

            // Celda para los botones
            let celdaBotones = fila.insertCell();
            let botonEliminar = document.createElement('button');
            botonEliminar.classList.add('btn-eliminar');
            botonEliminar.type = 'button';
            botonEliminar.textContent = 'Eliminar';

            botonEliminar.addEventListener('click', () => {
                eliminarDatos('eliminar-genero', genero._id);

            });

            celdaBotones.appendChild(botonEliminar);

        }

    });
    document.getElementById('generos-cantidad').textContent = totalGeneros;
};

/*
const contarLibros = () => {
    totalGeneros = listaGeneros.length;

    for (let i = 0; i < listaGeneros.length; i++) {
        totalLibros += parseInt(listaGeneros[i].cantidad);
    }
}

mostrarDatos();
contarLibros();

// Cajas

document.getElementById('libros-cantidad').textContent = totalLibros;

*/



//Inicializar

const inicializar = async() => {
    listaGenerosLit = await obtenerDatos('listar-genero');
    mostrarDatos();
};


// Validación de los datos ingresados
const validar = () => {
    let hayError = false;

    // Validación del nombre del género literario.
    let soloAlfabeto = /^[A-Z]+$/;
    if (inputNombre.value.match(soloAlfabeto) || inputNombre.value == '') {
        hayError = true;
        inputNombre.classList.add('input-error');
    } else {
        inputNombre.classList.remove('input-error');
    }

    let alphaNumeric = /^[0-9a-zA-Z]+$/;
    if (inputCodigo.value.match(alphaNumeric) || inputCodigo.value == '') {
        hayError = true;
        inputCodigo.classList.add('input-error');
    } else {
        inputCodigo.classList.remove('input-error');
    }

    //Validación Final
    if (hayError == true) {
        Swal.fire({
            'icon': 'warning',
            'title': 'Género no registrado',
            'text': 'Por favor revise los campos resaltados'
        });
    } else {
        registrarGeneroLit();
    }

};


const registrarGeneroLit = () => {
    let data = {
        "codigo": inputCodigo.value,
        "nombre": inputNombre.value
    };
    registrarDatos('registrar-genero', data, 'adminGenero.html')
};




// Acción del botón de registro
botonRegistrar.addEventListener('click', () => {
    validar();
});


// Inicialización de la tabla
inicializar();
document.getElementById('txt-filtro').addEventListener('keyup', mostrarDatos);










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


//cerrar sesion
let usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
const elementA = document.getElementById('usuarioOk');


logOut = () => {
    localStorage.clear();
    console.log('hi');
    window.location.href = 'login.html';
};

elementA.addEventListener('click', logOut);