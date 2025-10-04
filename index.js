document.addEventListener('DOMContentLoaded', function() {
    // Base de datos de productos
    // Se define un array de productos con sus propiedades
    // Cada producto tiene un id, nombre, descripción, precio, imagen y categoría
    // Estos productos se utilizarán para la búsqueda y el carrito de compras
    // Se pueden agregar más productos según sea necesario
    const products = [
            { id: 1, name: "Jabón de Aloe Vera", description: "Hidratación profunda y regeneración", price: 8.00, image: "../img/jabon de aloe vera 01.png" },
            { id: 2, name: "Jabón de Arroz", description: "Limpieza suave y aclarado natural", price: 9.00, image: "../img/jabon de arroz 01.png" },
            { id: 3, name: "Jabón de Avena", description: "Suavidad para pieles sensibles", price: 8.00, image: "../img/jabon de avena 01.png" },
            { id: 4, name: "Jabón de Carbón Activado", description: "Ideal para pieles grasas y con acné", price: 12.00, image: "../img/jabon de carbon activado 01.png" },
            { id: 5, name: "Jabón de Manzanilla y Miel", description: "Calma y nutre la piel", price: 12.00, image: "../img/jabon de manzanilla y miel 01.png" },
            { id: 6, name: "Jabón de Cúrcuma", description: "Antioxidante y antiinflamatorio", price: 11.00, image: "../img/jabon de curcuma con miel 01.png" },
            { id: 7, name: "Jabón de Leche de Coco", description: "Hidratación profunda y suavidad", price: 10.00, image: "../img/jabon de leche de coco 01.png" },
            { id: 8, name: "Jabón Ecológico para Ropa", description: "Limpieza efectiva y biodegradable", price: 15.00, image: "../img/jabon ecologico para ropa 01.png" },
            { id: 9, name: "Jabón de Aloe Vera con Miel", description: "Hidratación y nutrición extra", price: 10.00, image: "../img/jabon de aloe vera con miel 01.png" },
            { id: 10, name: "Jabón de Arcilla Rosa", description: "Suavidad y luminosidad para la piel", price: 12.00, image: "../img/jabon de arcilla rosa 01.png" },
            { id: 11, name: "Jabón de Caléndula", description: "Calma y regenera pieles sensibles", price: 12.00, image: "../img/jabon de calendula 01.png" },
            { id: 12, name: "Jabón de Lavanda y Avena", description: "Relajación y exfoliación suave", price: 10.00, image: "../img/jabon de lavanda y avena 01.png" },
            { id: 13, name: "Jabón de Menta y Eucalipto", description: "Frescura y descongestión natural", price: 10.00, image: "../img/jabon de menta y eucalipto 01.png" },
            { id: 14, name: "Jabón de Romero y Cítricos", description: "Energía y frescura herbal", price: 10.00, image: "../img/jabon de romero y citricos 01.png" },
            { id: 15, name: "Jabón de Maracuyá", description: "Antioxidante y revitalizante", price: 10.00, image: "../img/jabon de maracuya 01.png" },
            { id: 16, name: "Jabón de Albahaca y Manzanilla", description: "Calma y frescura herbal", price: 11.00, image: "../img/jabon de albahaca y manzanilla 01.png" }
        ];

    // Carrito de compras
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Elementos del DOM
    // Se definen los elementos del DOM que se utilizarán para el carrito y la búsqueda
    // Estos elementos se utilizan para mostrar los productos en el carrito y los resultados de búsqueda
    // También se definen los botones y formularios necesarios para la interacción del usuario
    // Se utilizan para mostrar los productos en el carrito y los resultados de búsqueda
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
    // Se definen las funciones para manejar el carrito de compras
    // Estas funciones permiten agregar, eliminar y actualizar productos en el carrito
    // También se encarga de renderizar el carrito en el modal de carrito de compras
    // Se utiliza localStorage para guardar el estado del carrito entre sesiones
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
    // Eliminar un producto del carrito
    // Se define la función para eliminar un producto del carrito
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
        showNotification('Producto removido del carrito');
    }
    // Actualizar la cantidad de un producto en el carrito
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
    // Se define la función para renderizar el carrito en el modal de carrito de compras
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
            // Calcular el total del carrito
            // Se calcula el total del carrito y se muestra en el modal de carrito de compras
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            totalAmount.textContent = total.toFixed(2);
            cartTotal.style.display = 'block';
        }
    }

    // Funciones de búsqueda
    // Se define la función para buscar productos en la base de datos
    // Se busca por nombre, descripción o categoría
    // Se renderizan los resultados de búsqueda en el modal de búsqueda
    // Se utiliza un filtro para encontrar productos que coincidan con la consulta
    function searchProducts(query) {
        const results = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
        return results;
    }
    // Renderizar resultados de búsqueda
    // Se renderizan los resultados de búsqueda en el modal de búsqueda
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
    // Animación de notificación
    // Se crea una notificación que se muestra en la esquina superior derecha
    // Se utiliza para informar al usuario sobre acciones realizadas en el carrito
    // Se define la función para mostrar una notificación con un mensaje específico
    // Función de notificación
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
    // Animaciones de notificación
    // Se definen las animaciones para la notificación
    // Event listeners
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchModal.style.display = 'block';
        searchInput.focus();
    });
    // Se agregan event listeners para los botones de búsqueda y carrito
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.style.display = 'block';
        renderCart();
    });
    // Se muestran los modales de búsqueda y carrito al hacer clic en los botones correspondientes
    closeSearch.addEventListener('click', () => {
        searchModal.style.display = 'none';
        searchResults.innerHTML = '';
        searchInput.value = '';
    });
    // Cerrar el modal del carrito
    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
    // Procesar la búsqueda
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            const results = searchProducts(query);
            renderSearchResults(results);
        }
    });
    // Procesar el pago
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('¡Gracias por tu compra! Redirigiendo al proceso de pago...');
            cart = [];
            updateCart();
            cartModal.style.display = 'none';
        }
    });

    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.style.display = 'none';
        }
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Hacer funciones globales para los botones del carrito
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;

    // Inicializar carrito
    renderCart();

    // Lógica del Header que se oculta al hacer scroll
    // Se agrega un evento de scroll para ocultar el header al hacer scroll hacia abajo
    // Se muestra el header al hacer scroll hacia arriba
    // Se utiliza para mejorar la experiencia del usuario al navegar por la página
    // Se define el header y se agrega un evento de scroll
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

    // --- LÓGICA DEL CARRUSEL DE IMÁGENES ---
    // Se define el carrusel de imágenes en la sección del héroe
    // Se utiliza para mostrar imágenes destacadas de los productos
    // Se definen las variables necesarias para el carrusel
    // Se seleccionan los elementos del DOM necesarios para el carrusel
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;
    let slideInterval;
    // Si hay diapositivas, se crean los puntos de navegación y se configuran los eventos
    // Se crean los puntos de navegación para el carrusel
    if (slides.length > 0) {
        const dots = Array.from({ length: slides.length }, (_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.slide = i;
            dot.addEventListener('click', () => {
                setCurrentSlide(i);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
            return dot;
        });
        // Funciones del carrusel
        // Se definen las funciones para manejar el carrusel de imágenes
        function setCurrentSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }
        // Funciones para avanzar y retroceder en el carrusel
        function nextSlide() { setCurrentSlide((currentSlide + 1) % slides.length); }
        function prevSlide() { setCurrentSlide((currentSlide - 1 + slides.length) % slides.length); }
        // Configurar los eventos de los botones de navegación
        function resetInterval() {
            clearInterval(slideInterval);
            if (slides.length > 1) slideInterval = setInterval(nextSlide, 5000);
        }
        // Inicializar el carrusel
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => { prevSlide(); resetInterval(); });
            nextButton.addEventListener('click', () => { nextSlide(); resetInterval(); });
        }
        // Configurar el intervalo del carrusel
        // Se establece un intervalo para cambiar automáticamente las diapositivas
        if (slides.length > 1) slideInterval = setInterval(nextSlide, 5000);
    }

    // --- LÓGICA DEL MENÚ MÓVIL ---
    // Se agrega un event listener para el botón de menú móvil
    // Se alterna la clase 'active' en el menú y los iconos del header
    // Se utiliza para mostrar u ocultar el menú en pantallas pequeñas
    // Se define el botón de menú móvil y los elementos del menú
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const headerIcons = document.getElementById('header-icons');
    // Si existen los elementos del menú, se agrega el evento de clic
    // Se alterna la clase 'active' en el menú, los iconos del header y el botón de menú
    if (navToggle && mainNav && headerIcons) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            headerIcons.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});