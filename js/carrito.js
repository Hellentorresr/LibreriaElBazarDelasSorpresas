/*------------------------------------- Variables ------------------------------------- */

// Variables de la tabla
const cuerpoTablaCart = document.querySelector('#tbl-libros-cart tbody');
const pagarTabla = document.querySelector('#tbl-pagar tbody');

// Aplicación de descuento
const botonDescuento = document.getElementById('ing-cup');
const inputCupon = document.getElementById('cupon');

// variables de uso
const cantLibros = document.getElementsByClassName('cant-libros');
const descuentoAplicado = 0;
let subtotalCart = 0;
let test;

// Variables localStorate
let prueba = JSON.parse(window.localStorage.getItem('descuentoAplic'));
let impuestoGen = JSON.parse(window.localStorage.getItem('impuestos'));



/*------------------------------------- Verificación de datos ingresados ------------------------------------- */





// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("pago");

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

// Factura
let confirmacion = document.getElementById("conf-pago").onclick = function() {
    location.href = "confirmacion-compra.html";
}





/*------------------------------------- Mostrar datos en el carrito ------------------------------------- */

const mostrarDatosCart = () => {
    cuerpoTablaCart.innerHTML = '';
    let totalDescCalc = 0;
    let impuestoDisplay;
    let totalImpuestos = 0;
    let totalPagar = 0;


    listaLibrosReg.forEach(libro => {
        let fila = cuerpoTablaCart.insertRow();


        //Celda para img de opciones
        let celdaPortada = fila.insertCell();
        let imgPortada = document.createElement('img');
        imgPortada.classList.add('img-portada');
        imgPortada.type = 'img';
        imgPortada.src = libro.foto;
        celdaPortada.prepend(imgPortada);

        fila.insertCell().textContent = libro.titulo;
        fila.insertCell().textContent = "₡" + libro.costo;

        //Celda para cantidad
        let celdaCant = fila.insertCell();
        let cantidad = document.createElement('input');
        cantidad.classList.add('cant-libros');
        cantidad.type = 'number';
        cantidad.min = "1";
        cantidad.defaultValue = "1";
        celdaCant.append(cantidad);

        //Celda para impuesto
        let celdaImp = fila.insertCell();
        let impuestosApl = document.createElement('label');
        impuestosApl.classList.add('iva');
        impuestosApl = parseInt(13);
        celdaImp.append(impuestosApl + '%');



        //Celda para subtotal
        let celdaSub = fila.insertCell();
        let subtotal = document.createElement('label');
        subtotal.classList.add('subtotal');
        subtotal = parseInt(cantidad.value * libro.costo);
        parseInt(subtotalCart += parseInt(libro.costo));
        celdaSub.append(subtotal);


        // Celda para los botones
        let celdaBotones = fila.insertCell();
        let botonEliminar = document.createElement('button');
        botonEliminar.classList.add('btn-eliminar'); //btn-eliminar debe ser una clase del css
        botonEliminar.type = 'button';
        botonEliminar.textContent = 'Eliminar';
        celdaBotones.append(botonEliminar);
        botonEliminar.addEventListener('click', () => {
            eliminarDatos('eliminar-libro', libro._id);

        });

        /*-------------- Tabla para información de pago --------------*/
        pagarTabla.innerHTML = '';
        let filaP = pagarTabla.insertRow();

        //Celda para subtotal de pago
        let celda = filaP.insertCell();
        let subtotalP = document.createElement('label');
        subtotalP.classList.add('subtotal');
        subtotalP = subtotalCart;
        celda.append("₡" + subtotalP);


        //Celda para descuento aplicado
        celda = filaP.insertCell();
        let totalDesc = document.createElement('label');
        totalDesc.classList.add('totalDesc');
        parseInt(totalDescCalc += (subtotal * prueba.porcentaje));
        totalDesc = totalDescCalc;
        celda.append("₡" + totalDesc);

        //Celda para coste envio
        celda = filaP.insertCell();
        let costoEnvio = document.createElement('label');
        costoEnvio.classList.add('costoEnvio');
        costoEnvio = envioGAM;
        celda.append("₡" + costoEnvio);

        //Celda para impuestos aplicado
        celda = filaP.insertCell();
        let totalImp = document.createElement('label');
        totalImp.classList.add('totalImp');
        parseInt(totalImpuestos += (subtotal * 0.13));
        totalImp = totalImpuestos;
        celda.append("₡" + totalImp);


        //Celda para total a pagar
        celda = filaP.insertCell();
        let total = document.createElement('label');
        total.classList.add('total');
        parseInt(totalPagar = subtotalCart - totalDescCalc + costoEnvio + totalImpuestos);
        total = totalPagar;
        celda.append("₡" + total);


        // Creación de LocalStorage de Libros
        let libroComprado = {
            'titulo': libro.titulo,
            'cantidad': cantidad,
            'costo': libro.costo,
            'impuesto': totalImp,
            'descuento': totalDesc,
            'subtotal': subtotalP
        };

        localStorage.setItem('libroComprado', JSON.stringify(libroComprado));


    })

};

// Inicializar visualización del carrito
const actualizarCart = async() => {
    listaLibrosReg = await obtenerDatos('listar-libro');
    mostrarDatosCart();
};

const inicializarDesc = async() => {
    listaDescuento = await obtenerDatos('listar-descuentos');
};

const inicializarParam = async() => {
    listaParametros = await obtenerDatos('listar-parametrosGenerales');
    llamarParam();
};

/*------------------------------------- Validar descuento ------------------------------------- */

const verificar = () => {

    let descExis = false;
    let hayError = false;

    if (inputCupon.value == '') {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se ingresó ningún cupón',
            'text': 'Ingrese un cupón válido'
        });
    } else {
        listaDescuento.forEach(descuento => {
            if (inputCupon.value.toUpperCase() == descuento.nombreDescuento.toUpperCase()) {
                descExis = true;
                let descuentoAplicado = {
                    'nombre': descuento.nombreDescuento,
                    'descExis': descExis,
                    'porcentaje': parseFloat(descuento.porcentaje / 100)

                };

                localStorage.setItem('descuentoAplic', JSON.stringify(descuentoAplicado));
                let prueba = descuento.fechaInicio;

                //Validación Final
                Swal.fire({
                    'icon': 'success',
                    'title': 'Cupón ingresado.',
                    'text': 'Descuento será aplicado.'
                });

            }
        });
    }

};

/*------------------------------------- Llamado Parámetros ------------------------------------- */
const llamarParam = () => {

    let imp = "iva";
    //let pto = ptoEng;

    listaParametros.forEach(param => {
        if (imp = param.agregarNombre) {
            let parametrosServ = {
                'agregarNombre': param.agregarNombre,
                'costo': parseFloat(param.costo / 100)
            }
            localStorage.setItem('impuestos', JSON.stringify(parametrosServ));
        };
    })
}

/*------------------------------------- Llamado a funciones ------------------------------------- */


function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    mostrarDatosCart()
}

/*------------------------------------- Llamado a funciones ------------------------------------- */
actualizarCart();
inicializarDesc();
inicializarParam();

botonDescuento.addEventListener('click', verificar);