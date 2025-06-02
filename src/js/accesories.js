let mostrador = document.getElementById("mostrador");
let seleccion = document.getElementById("seleccion");
let imgSeleccionada = document.getElementById("img");
let modeloSeleccionado = document.getElementById("modelo");
let descripSeleccionada = document.getElementById("descripcion");
let precioSeleccionado = document.getElementById("precio");

function cargar(item){
    quitarBordes();
    mostrador.style.width = "60%";
    seleccion.style.width = "40%";
    seleccion.style.opacity = "1";
    item.style.border = "2px solid red";

    imgSeleccionada.src = item.getElementsByTagName("img")[0].src;

    modeloSeleccionado.innerHTML =  item.getElementsByTagName("p")[0].innerHTML;

    descripSeleccionada.innerHTML = "Descripción del modelo ";

    precioSeleccionado.innerHTML =  item.getElementsByTagName("span")[0].innerHTML;


}
function cerrar(){
    mostrador.style.width = "100%";
    seleccion.style.width = "0%";
    seleccion.style.opacity = "0";
    quitarBordes();
}
function quitarBordes(){
    var items = document.getElementsByClassName("item");
    for(i=0;i <items.length; i++){
        items[i].style.border = "none";
    }
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Variables para almacenar producto actual
let productoSeleccionado = {
    imagen: "",
    descripcion: "",
    precio: "",
    cantidad: 1
};

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargar(elemento) {
    const imagen = elemento.querySelector("img").src;
    const descripcion = elemento.querySelector(".descripcion").textContent;
    const precio = elemento.querySelector(".precio").textContent;

    productoSeleccionado = {
        imagen,
        descripcion,
        precio,
        cantidad: 1
    };

    // Mostrar en el panel derecho
    document.getElementById("img").src = imagen;
    document.getElementById("modelo").textContent = descripcion;
    document.getElementById("descripcion").textContent = descripcion;
    document.getElementById("precio").textContent = precio;

    // Resetear selector de cantidad a 1
    const selectCantidad = document.getElementById("cantidadProducto");
    if (selectCantidad) selectCantidad.value = "1";

    // Mostrar panel
    const panel = document.getElementById("seleccion");
    panel.style.opacity = 1;
    panel.style.width = "50%";
}

function cerrar() {
    const seleccion = document.getElementById("seleccion");
    seleccion.style.opacity = 0;
    seleccion.style.width = "0%";
}

function agregarProductoAlCarrito() {
    const cantidadSelect = document.getElementById("cantidadProducto");
    const cantidadSeleccionada = parseInt(cantidadSelect.value) || 1;
    
    productoSeleccionado.cantidad = cantidadSeleccionada;

    const index = carrito.findIndex(p => p.descripcion === productoSeleccionado.descripcion);
    if (index !== -1) {
        carrito[index].cantidad += cantidadSeleccionada;
    } else {
        carrito.push({ ...productoSeleccionado });
    }

    guardarCarrito();
    //alert("Producto agregado al carrito.");
    
    // Actualizar el contador visible en la navbar
    actualizarContadorCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    const botonAgregar = document.getElementById("btnAgregarCarrito");
    if (botonAgregar) {
        botonAgregar.addEventListener("click", agregarProductoAlCarrito);
    }
});

function actualizarContadorCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const contador = document.getElementById("cart-count");
    
    if (contador) {
        if (totalCantidad > 0) {
            contador.style.display = "inline-block";
            contador.textContent = totalCantidad;
        } else {
            contador.style.display = "none";
        }
    }
}

// Llama a esta función cada vez que la página carga
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
});

