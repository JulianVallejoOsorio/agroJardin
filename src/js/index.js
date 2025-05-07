const productos = [
  { id: 1, nombre: 'Abono Orgánico', descripcion: 'Mejora el suelo.', precio: 25000, imagen: 'https://github.com/JulianVallejoOsorio/agroJardin/blob/main/src/images/carrousel_images/pala.png?raw=true' },
  { id: 2, nombre: 'Pala Jardín', descripcion: 'Herramienta resistente.', precio: 50000, imagen: 'https://github.com/JulianVallejoOsorio/agroJardin/blob/main/src/images/carrousel_images/pala.png?raw=true' },
  { id: 3, nombre: 'Fertilizante Líquido', descripcion: 'Nutre tus plantas.', precio: 30000, imagen: 'https://github.com/JulianVallejoOsorio/agroJardin/blob/main/src/images/carrousel_images/pala.png?raw=true' }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  // Volver a cargar el carrito actualizado del localStorage
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const existe = carrito.find(p => p.id === id);
  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
}


function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function renderProductos() {
  const container = document.getElementById('productos-container');
  container.innerHTML = '';
  productos.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-img">
        <img src="${p.imagen}" alt="${p.nombre}">
      </div>
      <div class="card-detail">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
      </div>
      <div class="card-button">
        <span class="price">$${p.precio}</span>
        <button class="car-btn" onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);
  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  guardarCarrito();
  alert(`${producto.nombre} añadido al carrito`);
}

renderProductos();
