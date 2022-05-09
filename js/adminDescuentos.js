// Variables de la tabla
const cuerpoTabla = document.querySelector('#tbl-descuentos tbody');
let listaDescuentos = [];

// Variables del formulario
const nombreDescuento = document.getElementById('txt-descuento-nombre');
const porcenDescuento = document.getElementById('txt-descuento-porcen');
const inicioDescuento = document.getElementById('txt-descuento-inicio');
const finalDescuento = document.getElementById('txt-descuento-final');
const botonRegistrar = document.getElementById('conf-agregar-desc');

// Variables generales
let totalGeneros = 0;
let totalLibros = 0;

//Mostrar datos del JSObject en la tabla
const mostrarDatos = () => {
    cuerpoTabla.innerHTML = '';

    let cantDesc = 0;
    let descAct = 0;
    let descExp = 0;

    let filtro = document.getElementById('txt-filtro').value.toLowerCase();

    listaDescuentos.forEach(descuento => {
        if (descuento.nombreDescuento.toLowerCase().includes(filtro) || descuento.fechaInicio.toLowerCase().includes(filtro)) {
            let fila = cuerpoTabla.insertRow();

            fila.insertCell().textContent = descuento.nombreDescuento;
            fila.insertCell().textContent = descuento.porcentaje + "%";
            fila.insertCell().textContent = descuento.fechaInicio;
            fila.insertCell().textContent = descuento.fechaExp;

            /*----- Sección celda para butón de eliminar -----*/
            let celdaBotones = fila.insertCell();
            let botonEliminar = document.createElement('button');
            botonEliminar.classList.add('btn-eliminar');
            botonEliminar.type = 'button';
            botonEliminar.textContent = 'Eliminar';

            botonEliminar.addEventListener('click', () => {
                eliminarDatos('eliminar-descuentos', descuento._id);
            });

            celdaBotones.appendChild(botonEliminar);
            /*----- Sección celda para butón de eliminar -----*/

            cantDesc++;

        }

        document.getElementById('descuentos-cantidad').textContent = cantDesc;

    });


};



//Inicializar
const inicializar = async() => {
    listaDescuentos = await obtenerDatos('listar-descuentos');
    mostrarDatos();
};



// Validación de entrada
const validar = () => {
    let hayError = false;

    if (nombreDescuento.value == '') {
        hayError = true;
        nombreDescuento.classList.add('input-error');

    } else {
        nombreDescuento.classList.remove('input-error');
    }

    if (porcenDescuento.value == '') {
        hayError = true;
        porcenDescuento.classList.add('input-error');
    } else {
        porcenDescuento.classList.remove('input-error');
    }

    if (inicioDescuento.value == '') {
        hayError = true;
        inicioDescuento.classList.add('input-error');
    } else {
        inicioDescuento.classList.remove('input-error');
    }

    if (finalDescuento.value == '') {
        hayError = true;
        finalDescuento.classList.add('input-error');
    } else {
        finalDescuento.classList.remove('input-error');
    }

    // Validacion final
    if (hayError == true) {
        Swal.fire({
            'icon': 'warning',
            'title': 'Descuento no registrado',
            'text': 'Favor llene los campos que contienen asterisco *'
        });
    } else {
        registrarDescuento();
    }
}


const registrarDescuento = () => {
    let data = {
        "nombreDescuento": nombreDescuento.value,
        "fechaInicio": inicioDescuento.value,
        "fechaExp": finalDescuento.value,
        "porcentaje": porcenDescuento.value
    };
    registrarDatos('registrar-descuentos', data, 'adminDescuento.html')
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
let btn = document.getElementById("agregar-descuento");

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