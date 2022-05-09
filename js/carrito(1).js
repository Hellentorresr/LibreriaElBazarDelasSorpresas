// Actualizado: Abril 9, 2022 v2

// Aplicación de descuento
const botonDescuento = document.getElementById('ing-cup');
const inputCupon = document.getElementById('cupon');

const imprimir = () => {
    let cupon = inputCupon.value;


    //Console logs
    console.log(cupon);
};

// Validacipon de errores 

const validar = () => {
    let hayError = false;

    if (inputCupon.value == '') {
        hayError = true;
        inputCupon.classList.add('input-error');
    } else {
        inputCupon.classList.remove('input-error');
    }

    //Validación Final
    if (hayError == true) {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se ha ingresado un cupón.',
            'text': 'Por favor verifique la información brindada.'
        });
    } else {
        Swal.fire({
            'icon': 'success',
            'title': 'Cupón ingresado.',
            'text': 'Descuento será aplicado.'
        })
    }
}


botonDescuento.addEventListener('click', validar);
botonDescuento.addEventListener('click', imprimir);


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