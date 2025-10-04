document.addEventListener('DOMContentLoaded', function() {
            // Base de datos de productos
            const products = [
                {
                    id: 1,
                    name: "Jabón de Aloe Vera",
                    description: "Hidratación profunda y regeneración celular",
                    price: 8.00,
                    image: "img/jabon de aloe vera 01.png",
                    category: "facial"
                },
                {
                    id: 2,
                    name: "Jabón de Arroz",
                    description: "Limpieza suave y aclarado natural",
                    price: 8.00,
                    image: "img/jabon de arroz 01.png",
                    category: "facial"
                },
                {
                    id: 3,
                    name: "Jabón de Avena",
                    description: "Suavidad para pieles sensibles",
                    price: 8.00,
                    image: "img/jabon de avena 01.png",
                    category: "tocador"
                },
                {
                    id: 4,
                    name: "Jabón de Carbón Activado",
                    description: "Ideal para pieles grasas y con tendencia al acné",
                    price: 12.00,
                    image: "img/jabon de carbon activado 01.png",
                    category: "facial"
                },
                {
                    id: 5,
                    name: "Jabón de Manzanilla y Miel",
                    description: "Calma y nutre la piel",
                    price: 12.00,
                    image: "img/jabon de manzanilla y miel 01.png",
                    category: "facial"
                },
                {
                    id: 6,
                    name: "Jabón de Cúrcuma con Miel",
                    description: "Antioxidante natural y propiedades antiinflamatorias",
                    price: 12.00,
                    image: "img/jabon de curcuma con miel 01.png",
                    category: "facial"
                },
                {
                    id: 7,
                    name: "Jabón de Leche de Coco",
                    description: "Hidratación profunda y suavidad extrema",
                    price: 12.00,
                    image: "img/jabon de leche de coco 01.png",
                    category: "tocador"
                },
                {
                    id: 8,
                    name: "Jabón Ecológico Renacer",
                    description: "Hecho con aceite de cocina reciclado",
                    price: 15.00,
                    image: "https://images.pexels.com/photos/16263605/pexels-photo-16263605.jpeg",
                    category: "ecologico"
                }
            ];

            // Carrito de compras
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Elementos del DOM
            // Modales y botones
            // Modales de búsqueda y carrito
            // Se utilizan para mostrar los resultados de búsqueda y los productos en el carrito
            // Se definen los elementos del DOM que se utilizarán para interactuar con el carrito y la búsqueda
            // Se definen los botones para abrir y cerrar los modales de búsqueda y carrito
            // Se definen los formularios y campos de entrada para la búsqueda
            // Se definen los contenedores para mostrar los resultados de búsqueda y los productos del carrito
            const searchModal = document.getElementById('searchModal');
            const cartModal = document.getElementById('cartModal');
            const searchBtn = document.querySelector('.header-icons a[aria-label="Buscar"]');
            const cartBtn = document.querySelector('.header-icons a[aria-label="Carrito de compras"]');
            const closeSearch = document.getElementById('closeSearch');
            const closeCart = document.getElementById('closeCart');
            const searchForm = document.getElementById('searchForm');
            const searchInput = document.getElementById('searchInput');
            const searchResults = document.getElementById('searchResults');
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            const totalAmount = document.getElementById('totalAmount');
            const checkoutBtn = document.getElementById('checkoutBtn');

            // Funciones del carrito
            function updateCart() {
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
            // Agregar, eliminar y actualizar productos en el carrito
            // Se definen las funciones para agregar, eliminar y actualizar productos en el carrito
            function addToCart(product, quantity = 1) {
                const existingItem = cart.find(item => item.id === product.id);
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cart.push({ ...product, quantity });
                }
                updateCart();
                showNotification('Producto agregado al carrito');
            }
            // Se define la función para eliminar un producto del carrito
            // Se actualiza el carrito y se muestra una notificación al usuario
            function removeFromCart(productId) {
                cart = cart.filter(item => item.id !== productId);
                updateCart();
                showNotification('Producto removido del carrito');
            }
            // Se define la función para actualizar la cantidad de un producto en el carrito
            // Si la nueva cantidad es menor o igual a cero, se elimina el producto del carrito
            function updateQuantity(productId, newQuantity) {
                const item = cart.find(item => item.id === productId);
                if (item) {
                    if (newQuantity <= 0) {
                        removeFromCart(productId);
                    } else {
                        item.quantity = newQuantity;
                        updateCart();
                    }
                }
            }
            // Renderizar el carrito
            // Se define la función para renderizar el contenido del carrito
            function renderCart() {
                if (cart.length === 0) {
                    cartItems.innerHTML = `
                        <div class="empty-cart">
                            <i class="fas fa-shopping-cart"></i>
                            <p>Tu carrito está vacío</p>
                        </div>
                    `;
                    cartTotal.style.display = 'none';
                } else {
                    cartItems.innerHTML = cart.map(item => `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="cart-item-info">
                                <h4>${item.name}</h4>
                                <p>${item.description}</p>
                            </div>
                            <div class="cart-item-price">S/. ${item.price.toFixed(2)}</div>
                            <div class="cart-item-actions">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                <span class="quantity-display">${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                <button class="remove-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
                            </div>
                        </div>
                    `).join('');
                    
                    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    totalAmount.textContent = total.toFixed(2);
                    cartTotal.style.display = 'block';
                }
            }

            // Funciones de búsqueda
            // Se define la función para buscar productos en la base de datos
            // Se filtran los productos que coinciden con la consulta de búsqueda
            // Se renderizan los resultados de búsqueda en el modal de búsqueda
            function searchProducts(query) {
                const results = products.filter(product => 
                    product.name.toLowerCase().includes(query.toLowerCase()) ||
                    product.description.toLowerCase().includes(query.toLowerCase()) ||
                    product.category.toLowerCase().includes(query.toLowerCase())
                );
                return results;
            }
            // Renderizar resultados de búsqueda
            // Se define la función para renderizar los resultados de búsqueda
            function renderSearchResults(results) {
                if (results.length === 0) {
                    searchResults.innerHTML = '<p style="text-align: center; color: var(--text-light);">No se encontraron productos</p>';
                } else {
                    searchResults.innerHTML = results.map(product => `
                        <div class="search-result-item" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="search-result-info">
                                <h4>${product.name}</h4>
                                <p>${product.description} - S/. ${product.price.toFixed(2)}</p>
                            </div>
                        </div>
                    `).join('');
                }
            }

            // Función de notificación
            // Se define la función para mostrar notificaciones al usuario
            function showNotification(message) {
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--primary-color);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 25px;
                    z-index: 3000;
                    animation: slideIn 0.3s ease-out;
                `;
                notification.textContent = message;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideOut 0.3s ease-out';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            }

            // Inicializar el carrito al cargar la página
            // Se renderiza el carrito al cargar la página para mostrar los productos guardados
            // Event listeners
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                searchModal.style.display = 'block';
                searchInput.focus();
            });

            cartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                cartModal.style.display = 'block';
                renderCart();
            });

            closeSearch.addEventListener('click', () => {
                searchModal.style.display = 'none';
                searchResults.innerHTML = '';
                searchInput.value = '';
            });

            closeCart.addEventListener('click', () => {
                cartModal.style.display = 'none';
            });

            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = searchInput.value.trim();
                if (query) {
                    const results = searchProducts(query);
                    renderSearchResults(results);
                }
            });

            checkoutBtn.addEventListener('click', () => {
                if (cart.length > 0) {
                    alert('¡Gracias por tu compra! Redirigiendo al proceso de pago...');
                    cart = [];
                    updateCart();
                    cartModal.style.display = 'none';
                }
            });

            // Cerrar modales al hacer clic fuera
            // Se agrega un event listener para cerrar los modales al hacer clic fuera de ellos
            window.addEventListener('click', (e) => {
                if (e.target === searchModal) {
                    searchModal.style.display = 'none';
                }
                if (e.target === cartModal) {
                    cartModal.style.display = 'none';
                }
            });

            // Hacer funciones globales para los botones del carrito
            // Se definen las funciones globales para agregar, eliminar y actualizar productos en el carrito
            window.addToCart = addToCart;
            window.removeFromCart = removeFromCart;
            window.updateQuantity = updateQuantity;

            // Inicializar carrito
            renderCart();

            // Lógica del Header que se oculta al hacer scroll
            // Se agrega un event listener para ocultar el header al hacer scroll hacia abajo
            // Se muestra el header al hacer scroll hacia arriba
            // Se agrega una clase 'scrolled' al header cuando se hace scroll hacia abajo
            // Se agrega una clase 'hidden' al header cuando se hace scroll hacia abajo y se supera los 200px
            const header = document.querySelector('.main-header');
            if (header) {
                let lastScrollTop = 0;
                window.addEventListener('scroll', function() {
                    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrollTop > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                    if (scrollTop > lastScrollTop && scrollTop > 200) {
                        header.classList.add('hidden');
                    } else {
                        header.classList.remove('hidden');
                    }
                    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
                });
            }

            // Lógica del menú móvil
            // Se agrega un event listener para el botón de menú móvil
            // Se alterna la clase 'active' en el menú y los iconos del header
            // Se utiliza para mostrar u ocultar el menú en pantallas pequeñas
            // Se define el botón de menú móvil y los elementos del menú    
            const navToggle = document.getElementById('nav-toggle');
            const mainNav = document.getElementById('main-nav');
            const headerIcons = document.getElementById('header-icons');

            if (navToggle && mainNav && headerIcons) {
                navToggle.addEventListener('click', function() {
                    mainNav.classList.toggle('active');
                    headerIcons.classList.toggle('active');
                    navToggle.classList.toggle('active');
                });
            }

            // Animación al hacer scroll para las tarjetas de beneficios
            // Se utiliza IntersectionObserver para detectar cuando las tarjetas de beneficios entran en el viewport
            // Se agrega una clase 'is-visible' a las tarjetas cuando entran en el viewport
            // Se utiliza para animar las tarjetas de beneficios al hacer scroll
            // Se define el observer para las tarjetas de beneficios
            const scrollObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.benefit-card').forEach((card, index) => {
                card.style.transitionDelay = `${index * 100}ms`;
                scrollObserver.observe(card);
            });
        });