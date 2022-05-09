const agregarNombre = document.getElementById('txt-parametro-nombre');
const costo = document.getElementById('txt-parametro-monto');
const botonRegistrar = document.getElementById('conf-agregar-param');



// Acción del botón de registro
// Validación de los datos ingresados
const validar = () => {
    let hayError = false;
    // Validación del nombre del género literario.
    let soloAlfabeto = /^[A-Z]+$/;
    if (agregarNombre.value.match(soloAlfabeto) || agregarNombre.value == '') {
        hayError = true;
        agregarNombre.classList.add('input-error');
    } else {
        agregarNombre.classList.remove('input-error');
    }

    /* let numero = /^[0-9]+$/; */
    let numero = /^[0-9]+[!\@\#\$\&\%\₡]$/;
    if (!costo.value.match(numero) || costo.value == '') {
        hayError = true;
        costo.classList.add('input-error');
    } else {
        costo.classList.remove('input-error');
    }

    // Validacion final
    if (hayError == true) {
        Swal.fire({
            'icon': 'warning',
            'title': 'Parametro no registrado',
            'text': 'Favor llene los campos que contienen asterisco *'
        });
    } else {
        registroParametros();
    }
}

botonRegistrar.addEventListener('click', () => {
    validar();
});

let registroParametros = () => {
    let data = {
        "agregarNombre": agregarNombre.value,
        "costo": costo.value
    }
    registrarDatos('registrar-parametrosGenerales', data, 'adminParametros.html');
}


//para las tablas
const cuerpoTabla = document.querySelector('#tbl-parametros tbody');
let listaParametros = [];

const inicializar = async() => {
    listaParametros = await obtenerDatos('listar-parametrosGenerales');
    mostrarDatos();
}
const mostrarDatos = () => {
    cuerpoTabla.innerHTML = '';
    let cantParam = 0;
    let filtro = document.getElementById('txt-filtro').value.toLowerCase();
    listaParametros.forEach(parametro => {
        if (parametro.agregarNombre.toLowerCase().includes(filtro)) {
            let fila = cuerpoTabla.insertRow();
            fila.insertCell().textContent = parametro.agregarNombre;
            fila.insertCell().textContent = parametro.costo + '';

            // Celda para los botones
            let celdaBotones = fila.insertCell();
            let botonEliminar = document.createElement('button');
            botonEliminar.classList.add('btn-eliminar'); //btn-eliminar debe ser una clase del css
            botonEliminar.type = 'button';
            botonEliminar.textContent = 'Eliminar';

            botonEliminar.addEventListener('click', () => {
                eliminarDatos('eliminar-parametrosGenerales', parametro._id);

            });
            parseInt(cantParam++);
            celdaBotones.appendChild(botonEliminar);
        }
        document.getElementById('parametros-cantidad').textContent = cantParam;
    });

};

inicializar();
document.getElementById('txt-filtro').addEventListener('keyup', mostrarDatos);






//para abrir la ventana
// Get the modal || Ventana de registro
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("agregar-param");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
/* btn.onclick = function() {
    modal.style.display = "block";
} */

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