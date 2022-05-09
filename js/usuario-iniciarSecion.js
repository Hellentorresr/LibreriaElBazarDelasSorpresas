// varlidar si el usuario existe
const inputUsuarioForm = document.getElementById('txt-correoIngresar');
const inputUsuarioContrasennaForm = document.getElementById('txt-contrasennaaa');

const validarCredenciales = () => {
    let ingresoCorrecto = false;
    listaUsuarios.forEach(usuario => {
        if ((usuario.correo == inputUsuarioForm.value) && (usuario.contrasenna == inputUsuarioContrasennaForm.value)) {
            ingresoCorrecto = true;
            localStorage.setItem('usuarioConectado', JSON.stringify(usuario)); //creando la variable en el localStorage
        }
    });

    if (ingresoCorrecto == true) {
        Swal.fire({
            'icon': 'success',
            'title': 'Inicio de sesion Correcto',
            'text': 'Presione el boton continuar'
        }).then(() => {
            //redireccionando
            window.location.href = "/perfilUsuario.html";
        });
    } else {
        Swal.fire({
            'icon': 'error',
            'title': 'Inicio de sesion incorrecto',
            'text': 'Usuario o contraseña incorrecto'
        });
    }
}; // fin de validarCredenciales



//boton sin guardar en una variable
document.getElementById('btn-IngresarD').addEventListener('click', validarCredenciales);