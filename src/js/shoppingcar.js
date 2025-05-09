const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function renderCarrito() {
  const container = document.getElementById('carrito-container');
  const totalSpan = document.getElementById('cart_total');
  container.innerHTML = '';
  let total = 0;

  carrito.forEach(p => {
    total += p.precio * p.cantidad;
    const item = document.createElement('article');
    item.className = 'cart_item';
    item.innerHTML = `
      <div class="item_image">
        <img src="${p.imagen}" alt="${p.nombre}">
      </div>
      <div class="item_details">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <span class="item_price">$${p.precio}</span>
        <div class="item_actions">
          <label for="quantity_${p.id}">Cantidad:</label>
          <input type="number" id="quantity_${p.id}" name="quantity" value="${p.cantidad}" min="1" onchange="actualizarCantidad(${p.id}, this.value)">
          <button class="remove_btn" onclick="eliminarDelCarrito(${p.id})">Eliminar</button>
        </div>
      </div>
    `;
    container.appendChild(item);
  });

  totalSpan.textContent = `$${total}`;
}

function eliminarDelCarrito(id) {
  const index = carrito.findIndex(p => p.id === id);
  if (index > -1) carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderCarrito();
}

function actualizarCantidad(id, nuevaCantidad) {
  const producto = carrito.find(p => p.id === id);
  if (producto) {
    producto.cantidad = parseInt(nuevaCantidad);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
  }
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

  const ventaData = {
    total: total,
    estado: 'Pendiente',
    productos: carrito.map(p => ({
      id_producto: p.id,
      cantidad: p.cantidad,
      precio: p.precio
    }))
  };

  fetch('http://localhost:5000/api/ventas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ventaData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === "Venta registrada correctamente") {
      alert(`Compra realizada con éxito. ID de la venta: ${data.venta_id}`);
      localStorage.removeItem('carrito');
      renderCarrito();
      window.location.href = "/index.html"; // Ajusta esta ruta si tu archivo tiene otro nombre
    } else {
      alert("Hubo un error al realizar la compra.");
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert("Error al procesar la compra.");
  });
}

renderCarrito();
