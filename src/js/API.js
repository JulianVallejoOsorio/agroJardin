const apiUrl = 'http://127.0.0.1:5000/api/products'; // Asegúrate de que esta URL esté correcta

// Inicialización de variables
let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para cargar los productos desde el backend
async function cargarProductos() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    productos = await response.json();
    renderProductos();
  } catch (error) {
    console.error('Error en la carga de productos:', error);
  }
}

// Función para renderizar los productos en el HTML
function renderProductos() {
  const container = document.getElementById('productos-container');
  container.innerHTML = ''; // Limpiar el contenedor antes de agregar los productos
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
        <button class="car-btn" onclick="agregarAlCarrito(${p.id})"><i class="fas fa-shopping-cart"></i></button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Función para agregar un producto al carrito
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

// Función para guardar el carrito en el LocalStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde el LocalStorage
function cargarCarrito() {
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];
}

// Ejecutar la función de carga de productos al cargar la página
cargarProductos();
