const carrito = document.querySelector("#carrito");
const conetenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let carritoCompras = [];

cargarEventListeners();
function cargarEventListeners() {
  //Agregar curso cuando presionamos "Agregar al Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //Vaciar cursos del carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    carritoCompras = [];
    limpiarHTML(); //Elimina todo el html
  });
}

//  Funciones

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSel = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSel);
  }
}

//Elimina curso del carrito

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoID = e.target.getAttribute("data-id");

    //Elimina del arreglo de carritoCOmpras pro el data-id
    cursos = carritoCompras.map((curso) => {
      if (curso.id === cursoID) {
        if (curso.cantidad > 1) {
          curso.cantidad--;
          return curso;
        } else {
          return 'vacio';
        }
      } else {
        return curso;
      }
    });
    carritoCompras = cursos;
    
    carritoCompras = carritoCompras.filter((curso) => curso !== 'vacio');
    console.log(carritoCompras)
    carritoHTML();
  }
}

//Lee el contenido del html

function leerDatosCurso(curso) {
  // console.log(curso);

  //Creamos un objeto con el contenido del curso
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector("span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si ya existe en el carrito
  const exite = carritoCompras.some((curso) => curso.id === infoCurso.id);
  if (exite) {
    //Actualizamos el carrito
    const cursos = carritoCompras.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; ///Retorna el curso actualizado
      } else {
        return curso; ///retorna el curso que no coincide
      }
    });
    carritoCompras = [...cursos];
  } else {
    //Agrega elementos a la variable carrito
    carritoCompras = [...carritoCompras, infoCurso];
  }

  console.log(carritoCompras);
  carritoHTML();
}

//Muestra el carrito dfe compras en HTML

function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();

  if (carritoCompras.length >= 1) {
    //Recorre el carrito y geenra el html
    carritoCompras.forEach((curso) => {
      const { imagen, titulo, precio, cantidad, id } = curso;
      const row = document.createElement("tr");

      row.innerHTML = `
            <td>
              <img src="${imagen}" width="100"> 
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">x</a>
            </td>
        `;

      //Agrega el html del carrito en el tbody

      conetenedorCarrito.appendChild(row);
    });
  }
}

function limpiarHTML() {
  //Forma lenta
  // conetenedorCarrito.innerHTML= '';
  while (conetenedorCarrito.firstChild) {
    conetenedorCarrito.removeChild(conetenedorCarrito.firstChild);
  }
}
