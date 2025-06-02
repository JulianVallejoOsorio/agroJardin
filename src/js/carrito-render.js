let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const container = document.getElementById("carrito-container");
const totalSpan = document.getElementById("cart_total");

function mostrarCarrito() {
    container.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        const precioNumerico = parseFloat(item.precio.replace("$", "").replace(/\./g, "").replace(",", "."));

        const itemHTML = `
        <div class="cart_item">
            <div class="item_image"><img src="${item.imagen}" alt="producto"></div>
            <div class="item_details">
                <h3>${item.descripcion}</h3>
                <span class="item_price">$${precioNumerico.toLocaleString("es-CO")}</span>
                <div class="item_actions">
                    <input type="number" min="1" value="${item.cantidad}" onchange="cambiarCantidad(${index}, this.value)">
                    <button class="remove_btn" onclick="eliminarItem(${index})">Eliminar</button>
                </div>
            </div>
        </div>`;

        container.innerHTML += itemHTML;
        total += precioNumerico * item.cantidad;
    });

    totalSpan.textContent = `$${total.toLocaleString("es-CO")}`;
}

function cambiarCantidad(index, nuevaCantidad) {
    carrito[index].cantidad = parseInt(nuevaCantidad);
    guardarCarrito();
    mostrarCarrito();
}

function eliminarItem(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    mostrarCarrito();
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function finalizarCompra() {
   // alert("Gracias por tu compra!");//
    localStorage.removeItem("carrito");
    location.reload();
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
