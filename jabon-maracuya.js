
document.addEventListener('DOMContentLoaded', function() {
        // --- BASE DE DATOS DE PRODUCTOS (COMPLETA) ---
        const products = [
            { id: 1, name: "Jabón de Aloe Vera", description: "Hidratación profunda y regeneración", price: 8.00, image: "../img/jabon de aloe vera 01.png", category: "facial" },
            { id: 2, name: "Jabón de Arroz", description: "Limpieza suave y aclarado natural", price: 9.00, image: "../img/jabon de arroz 01.png", category: "facial" },
            { id: 3, name: "Jabón de Avena", description: "Suavidad para pieles sensibles", price: 8.00, image: "../img/jabon de avena 01.png", category: "tocador" },
            { id: 4, name: "Jabón de Carbón Activado", description: "Ideal para pieles grasas y con acné", price: 12.00, image: "../img/jabon de carbon activado 01.png", category: "facial" },
            { id: 5, name: "Jabón de Manzanilla y Miel", description: "Calma y nutre la piel", price: 12.00, image: "../img/jabon de manzanilla y miel 01.png", category: "facial" },
            { id: 6, name: "Jabón de Cúrcuma con Miel", description: "Antioxidante y antiinflamatorio", price: 11.00, image: "../img/jabon de curcuma con miel 01.png", category: "facial" },
            { id: 7, name: "Jabón de Leche de Coco", description: "Hidratación profunda y suavidad", price: 10.00, image: "../img/jabon de leche de coco 01.png", category: "tocador" },
            { id: 8, name: "Jabón Ecológico para Ropa", description: "Limpieza efectiva y biodegradable", price: 15.00, image: "../img/jabon ecologico para ropa 01.png", category: "ecologico" },
            { id: 9, name: "Jabón de Aloe Vera con Miel", description: "Hidratación y nutrición extra", price: 10.00, image: "../img/jabon de aloe vera con miel 01.png", category: "facial" },
            { id: 10, name: "Jabón de Arcilla Rosa", description: "Suavidad y luminosidad para la piel", price: 12.00, image: "../img/jabon de arcilla rosa 01.png", category: "facial" },
            { id: 11, name: "Jabón de Caléndula", description: "Calma y regenera pieles sensibles", price: 12.00, image: "../img/jabon de calendula 01.png", category: "facial" },
            { id: 12, name: "Jabón de Lavanda y Avena", description: "Relajación y exfoliación suave", price: 10.00, image: "../img/jabon de lavanda y avena 01.png", category: "tocador" },
            { id: 13, name: "Jabón de Menta y Eucalipto", description: "Frescura y descongestión natural", price: 10.00, image: "../img/jabon de menta y eucalipto 01.png", category: "tocador" },
            { id: 14, name: "Jabón de Romero y Cítricos", description: "Energía y frescura herbal", price: 10.00, image: "../img/jabon de romero y citricos 01.png", category: "tocador" },
            { id: 15, name: "Jabón de Maracuyá", description: "Antioxidante y revitalizante", price: 10.00, image: "../img/jabon de maracuya 01.png", category: "facial" }
        ];

        // --- INFO DEL PRODUCTO ACTUAL ---
        const currentProduct = { id: 15, name: "Jabón de Maracuyá", price: 10.00, image: "../img/jabon de maracuya 01.png" };
        
        // --- LÓGICA DEL CARRITO, BÚSQUEDA Y MENÚ (Común para todas las páginas) ---
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const searchModal = document.getElementById('searchModal');
        const cartModal = document.getElementById('cartModal');
        const searchBtnIcon = document.querySelector('.search-btn-icon');
        const cartBtnIcon = document.querySelector('.cart-btn-icon');
        const closeSearch = document.getElementById('closeSearch');
        const closeCart = document.getElementById('closeCart');
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const totalAmount = document.getElementById('totalAmount');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        const quantityInput = document.getElementById('quantity');

        function updateCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }

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

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }

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

        function renderCart() {
            if (cart.length === 0) {
                cartItems.innerHTML = `<div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>Tu carrito está vacío</p></div>`;
                cartTotal.style.display = 'none';
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-info"><h4>${item.name}</h4></div>
                        <div class="cart-item-price">S/. ${item.price.toFixed(2)}</div>
                        <div class="cart-item-actions">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>`).join('');
                const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                totalAmount.textContent = total.toFixed(2);
                cartTotal.style.display = 'block';
            }
        }

        function searchProducts(query) {
            return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));
        }

        function renderSearchResults(results) {
            searchResults.innerHTML = results.length === 0 ? '<p style="text-align: center; color: var(--text-light);">No se encontraron productos</p>' : results.map(product => `
                <div class="search-result-item" onclick='addToCart(${JSON.stringify(product).replace(/'/g, "&apos;")})'>
                    <img src="${product.image}" alt="${product.name}">
                    <div class="search-result-info">
                        <h4>${product.name}</h4>
                        <p>${product.description} - S/. ${product.price.toFixed(2)}</p>
                    </div>
                </div>`).join('');
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
        // Lógica del Header
        const header = document.querySelector('.main-header');
        if (header) {
            let lastScrollTop = 0;
            window.addEventListener('scroll', () => {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                header.classList.toggle('hidden', scrollTop > lastScrollTop && scrollTop > 200);
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            });
        }
        
        // Lógica del menú móvil
        const navToggle = document.getElementById('nav-toggle');
        const mainNav = document.getElementById('main-nav');
        const headerIcons = document.getElementById('header-icons');
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                mainNav.classList.toggle('active');
                headerIcons.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Lógica de galería de imágenes del producto
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail-image');
        if(mainImage && thumbnails) {
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    mainImage.src = this.src;
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }

        // Lógica de pestañas (tabs)
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        if(tabButtons && tabContents){
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const tabId = this.dataset.tab;
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    tabContents.forEach(content => content.classList.toggle('active', content.id === tabId));
                });
            });
        }
    });