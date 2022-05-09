// Actualizado: Abril 9, 2022 v3

const botonCorreo = document.getElementById('btn-correo').onclick = function() {
    window.open("factura.html", "_blank");
}

const botonListo = document.getElementById('btn-listo').onclick = function() {
    location.href = "index_logged.html";
}