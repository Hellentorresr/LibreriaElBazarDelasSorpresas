const menuDisplayLog = document.querySelector('#menuSeleccionLog');
const menuDisplayNoLog = document.querySelector('#menuSeleccionNoLog');

const mostrarMenu = () => {

    let auth = localStorage.getItem('usuarioConectado');
    console.log(auth);

    if (auth) {
        menuDisplayLog.classList.add('menuItems');
        menuDisplayNoLog.classList.add('menuHidden');

    } else {
        menuDisplayNoLog.classList.add('menuItems');
        menuDisplayLog.classList.add('menuHidden');
    }




};

mostrarMenu();

//class="menuItems"