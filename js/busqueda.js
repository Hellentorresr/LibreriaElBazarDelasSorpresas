const cuerpoTabla = document.querySelector('#tbl-libros tbody');
let listaLibros = [];

console.log('algo');


const inicializar = async () => {
    listaLibros = await obtenerDatos('listar-libro');
    mostrarDatos();
};

const mostrarDatos = () => {
    let datoBuscar = localStorage.getItem('varBusqueda');


    cuerpoTabla.innerHTML = '';

    listaLibros.forEach(libro => {
        if (libro.titulo.toLowerCase().includes(datoBuscar) ||
            libro.autor.toLowerCase().includes(datoBuscar) ||
            libro.isbn == datoBuscar ||
            libro.genero.toLowerCase().includes(datoBuscar)) {

            let fila = cuerpoTabla.insertRow();


            /*----- Sección celda para img -----*/
            let celdaPortada = fila.insertCell();
            let imgPortada = document.createElement('img');
            imgPortada.classList.add('img-portada');
            imgPortada.type = 'img';
            imgPortada.src = libro.foto;
            celdaPortada.prepend(imgPortada);
            /*----- Sección celda para img -----*/



            //-----link para libro
            libroLink = fila.insertCell();
            var a = document.createElement('a');
            var linkText = document.createTextNode(libro.titulo);
            a.appendChild(linkText);
            a.title = "autor";
            a.href = 'perfil_libro.html';
            a.setAttribute('onclick', 'creacionObjeto()');
            a.classList.add = ('vinculos');
            libroLink.prepend(a);
            const creacionObjeto = () => {
                let infoLibro = {
                    'titulo': libro.titulo,
                    'autor': libro.autor,
                    'isbn': libro.isbn
                };
                localStorage.setItem('infoLibro', JSON.stringify(infoLibro));
            };
            libroLink.addEventListener('click', creacionObjeto);
            //----final link libro


            fila.insertCell().textContent = libro.isbn;

            //-----link para autor
            autorLink = fila.insertCell();
            var a = document.createElement('a');
            var linkText = document.createTextNode(libro.autor);
            a.appendChild(linkText);
            /*  a.title = "autor";
             a.href = '#'; */
            a.href = 'perfil_autor_sk.html';
            a.setAttribute('onclick', 'prob()');
            a.classList.add = ('vinculos');
            autorLink.prepend(a);

            const prob = () => {
                let infoLibro = {
                    'titulo': libro.titulo,
                    'autor': libro.autor,
                    'isbn': libro.isbn
                };
                localStorage.setItem('infoAutor', JSON.stringify(infoAutor));
            };

            autorLink.addEventListener('click', prob);
            //----final link autor


            fila.insertCell().textContent = libro.editorial;
            fila.insertCell().textContent = libro.fechaPublicacion;
            fila.insertCell().textContent = libro.genero;
            fila.insertCell().textContent = "₡" + libro.costo;
        }
    });

};




const paginaBusqueda = () => {
    let buscar = document.getElementById('searchBox').value.toLowerCase();
    localStorage.setItem('varBusqueda', buscar);

    let fileName = location.href.split("/").slice(-1);
    if (fileName != 'busqueda2.html') {
        console.log('si');
        window.location.href = 'busqueda2.html';
        inicializar();
    }

    inicializar();

};




document.getElementById('searchBox').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') { // key code of the keybord key
        event.preventDefault();
        console.log('entro');
        paginaBusqueda();
    }
});