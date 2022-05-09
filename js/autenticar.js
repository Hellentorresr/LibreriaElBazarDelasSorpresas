'use strict'
const inputUsuario = document.getElementById('txt-correoIngresar');
const inputContrasenna = document.getElementById('txt-contrasennaaa');

let direccion = '';


let listaUsuarios = [];


const inicializar = async() => {
    listaUsuarios = await obtenerDatos('/listar-usuarios');
    autenticar();
};

const direccionar = (direccion) => {

    console.log(direccion);
    if (direccion == 'cliente') {
        window.location.href = 'index.html';
    }
    if (direccion == 'admin') {
        window.location.href = 'adminParametros.html';
    }
};


const autenticar = () => {

    let filtro = inputUsuario.value;
    let auth = false;


    listaUsuarios.forEach(usuario => {

        if ((inputUsuario.value == usuario.correo) && (inputContrasenna.value == usuario.contrasenna)) {

            auth = true;
            let validacion = [{
                'usuario': usuario.correo,
                'auth': auth,
                'tipo': usuario.tipoUsuario
            }];

            localStorage.setItem('usuarioConectado', auth);

            let direccion = usuario.tipoUsuario;
            console.log(direccion);
            Swal.fire({
                'icon': 'success',
                'title': 'Bienvenido',
                'text': 'Inicio de sesión exitoso'
            }).then(() => {

                direccionar(direccion);
                // window.location.href = 'index.html';
            });
        }
    });

};


// inicializar();
document.getElementById('btn-IngresarD').addEventListener('click', inicializar);

//comments test