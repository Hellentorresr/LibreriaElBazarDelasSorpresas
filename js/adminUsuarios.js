//para las tablas
const cuerpoTabla = document.querySelector('#tbl-usuarios tbody');
let listaUsuarios = [];

const inicializar = async() => {
    listaUsuarios = await obtenerDatos('listar-usuarios');
    mostrarDatos();
}
const mostrarDatos = () => {
    cuerpoTabla.innerHTML = '';
    let filtro = document.getElementById('txt-filtro').value.toLowerCase();
    let cantUsuarios = 0;
    let cantAdmin = 0;

    listaUsuarios.forEach(usuario => {
        if (usuario.primerNombre.toLowerCase().includes(filtro)) {
            let fila = cuerpoTabla.insertRow();

            /*     fila.insertCell().innerText = obtenerTipoUsuario(usuario.tipoUsuario); */
            fila.insertCell().innerText = usuario.primerNombre + " " + usuario.apellido + " " + usuario.segundoApellido;
            /*  fila.insertCell().innerText = usuario.segundoNombre; 
            fila.insertCell().innerText = usuario.apellido;*/
            fila.insertCell().innerText = usuario.correo;

            /*----- Sección de Usuario -----*/
            if (usuario.tipoUsuario == "admin") {
                fila.insertCell().textContent = "Administrador";
            } else {
                fila.insertCell().textContent = "Cliente";
            }
            /*----- Sección de estado -----*/
            console.log(usuario.contrasenna);

            // Celda para los botones
            let celdaBotones = fila.insertCell();
            let botonEliminar = document.createElement('button');
            botonEliminar.classList.add('btn-eliminar'); //btn-eliminar debe ser una clase del css
            botonEliminar.type = 'button';
            botonEliminar.textContent = 'Eliminar';

            botonEliminar.addEventListener('click', () => {
                eliminarDatos('eliminar-usuario', usuario._id);

            });

            celdaBotones.appendChild(botonEliminar);

            /*----- Sección celda para conteo -----*/
            parseInt(cantUsuarios++);

            if (usuario.tipoUsuario == "admin") {
                parseInt(cantAdmin++);
            }
        }
        document.getElementById('usuarios-registrados').textContent = cantUsuarios;
        document.getElementById('usuarios-admin').textContent = cantAdmin;
        document.getElementById('usuarios-activos').textContent = cantUsuarios;


    });

};

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