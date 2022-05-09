const botonRegistrar = document.getElementById('btn-registrar');
const numeroTarjeta = document.getElementById('txt-numeroTarjeta');
const nombreTarjeta = document.getElementById('txt-nombreTarjeta');
const inputMes = document.getElementById('txt-expireMM');
const inputAnno = document.getElementById('txt-expireYY');
const inputCvc = document.getElementById('txt-cvc');


// Validación de los datos ingresados
const validar = () => {
    let hayError = false;

    // Validación del número de la tarjeta
    let cardno = /^(?:3[47][0-9]{13})$/;
    if (numeroTarjeta.value.match(cardno) || numeroTarjeta.value == '') {
        hayError = true;
        numeroTarjeta.classList.add('input-error');
    } else {
        numeroTarjeta.classList.remove('input-error');
    }

    // Validación del nombre
    let soloAlfabeto = /^[A-Za-z]+$/;
    if (nombreTarjeta.value.match(soloAlfabeto) || nombreTarjeta.value == '') {
        hayError = true;
        nombreTarjeta.classList.add('input-error');
    } else {
        nombreTarjeta.classList.remove('input-error');
    }

    // Validación del mes
    if (inputMes.value == '') {
        hayError = true;
        inputMes.classList.add('input-error');
    } else {
        inputMes.classList.remove('input-error');
    }

    // Validación del Año
    if (inputAnno.value == '') {
        hayError = true;
        inputAnno.classList.add('input-error');
    } else {
        inputAnno.classList.remove('input-error');
    }

    // En la validación usar letras como código cvc
    let cvvCheck3 = /^([0-9]{3})$/;
    if (inputCvc.value.match(cvvCheck3) || inputCvc.value == '') {
        hayError = true;
        inputCvc.classList.add('input-error');
    } else {
        inputCvc.classList.remove('input-error');
    }

    //Validación Final
    if (hayError == true) {
        Swal.fire({
            'icon': 'warning',
            'title': 'Tarjeta no registrada',
            'text': 'Por favor revise los campos resaltados'
        });
    } else {
        Swal.fire({
            'icon': 'success',
            'title': 'Tarjeta registrada correctamente.',
            'text': 'Pulse Ok para continuar'
        }).then(() => {
            //Redireccionar a la página.html
            //window.location.href = 'index.html';
        });
    }

};



botonRegistrar.addEventListener('click', validar);