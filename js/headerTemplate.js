class MyHeader extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
        <header class="headerTemplate">

        <div class="logo_div">
            <a href="/index.html"><img src="/img/LogoLibreria.png" alt="Logo" class="logo"></a>

        </div>
        <div class="header-right">
            <p class="tituloHeader">El bazar de las sorpresas</p>
            <div class="menu">
                <div class="searchEnclosure">
                    <div class="searchBox">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <input type="text" placeholder="Buscar por autor,título,género,ISBN" id="searchBox">
                    </div>
                </div>
                
                
                <div id="menuSeleccionNoLog">
                <a href="login.html">Iniciar Sesión</a>
                <a href="registro.html">Registrarse</a>
                <a href="contact-us.html">Contacto</a>
                <a href="sobre-nosotros.html">Sobre nosotros</a>
                </div>
                <div id="menuSeleccionLog">
                <a href="perfilUsuario.html">Mi Cuenta</a>
                <a href="" id="prueba">Cerrar Sesión</a>
                <a href="carrito.html">Carrito</a>
                
                </div>
            </div>
        </div>
    </header>  
        `
    }

}

customElements.define('my-header', MyHeader)

class MyFooter extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
        <footer>
        <div class="footer">
            <button type="button"><a href="sobre-nosotros.html">Sobre Nosotros</a></button>
            <h3>Copyright © 2022 Librería El bazar de las sorpresas. <br> Todos los derechos reservados</h3>
        </div>
    </footer>
                
        `
    }

}

customElements.define('my-footer', MyFooter);


//cerrar sesion
let usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
const crearCuenta = document.getElementById('crearCuenta');
const elementA = document.getElementById('prueba');
/* if (usuarioConectado) {
    elementA.textContent = "Cerrar Sesión";
    crearCuenta.style.visibility = "hidden"
} */

logOut = () => {
    localStorage.clear();
};

elementA.addEventListener('click', logOut);