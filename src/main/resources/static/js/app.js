document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const logoutButton = document.getElementById("logout-button");
    const productsContainer = document.getElementById("products-container");
    const cartContainer = document.getElementById("cart-container");
    const checkoutButton = document.getElementById("checkout-button");

    // Manejar inicio de sesión
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    // Manejar cierre de sesión
    if (logoutButton) {
        logoutButton.addEventListener("click", handleLogout);
    }

    // Cargar productos solo si está autenticado
    if (productsContainer) {
        checkAuthentication() ? loadProducts() : redirectToLogin();
    }

    // Cargar el carrito de compras
    if (cartContainer) {
        loadCart();
    }

    // Manejar el checkout
    if (checkoutButton) {
        checkoutButton.addEventListener("click", handleCheckout);
    }
});

// **Verificar autenticación**
function checkAuthentication() {
    return localStorage.getItem("authToken") !== null;
}

// **Redirigir al login si no está autenticado**
function redirectToLogin() {
    alert("Por favor, inicie sesión para acceder a esta página.");
    window.location.href = "login.html";
}

// **Inicio de sesión**
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:8089/ecommers/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
        .then(response => {
            if (!response.ok) throw new Error("Credenciales incorrectas");
            return response.json();
        })
        .then(data => {
            localStorage.setItem("authToken", data.token); // Guardar el token en localStorage
            localStorage.setItem("userId", data.userId); // Guardar el ID de usuario
            alert("Inicio de sesión exitoso");
            window.location.href = "index.html";
        })
        .catch(error => {
            alert("Error al iniciar sesión: " + error.message);
        });
}


// **Cerrar sesión**
function handleLogout() {
    localStorage.clear();
    alert("Sesión cerrada");
    window.location.href = "login.html";
}

// **Cargar productos**
function loadProducts() {
    fetch("http://localhost:8089/ecommers/api/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(products => {
            const productsContainer = document.getElementById("products-container");
            productsContainer.innerHTML = ""; // Limpiar productos anteriores

            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");

                // Crear el HTML de la tarjeta de producto
                productCard.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Precio: ${product.price.toFixed(2)} USD</p>
                    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Agregar al Carrito</button>
                `;

                productsContainer.appendChild(productCard); // Agregar tarjeta al contenedor
            });
        })
        .catch(() => alert("Error al cargar los productos"));
}

// **Agregar productos al carrito**
function addToCart(productId, productName, productPrice) {
    if (!checkAuthentication()) {
        redirectToLogin();
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Buscar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1; // Incrementar cantidad
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Guardar el carrito en localStorage
    alert("Producto agregado al carrito");
}

// **Cargar carrito**
function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");
    const totalAmountElement = document.getElementById("total-amount");

    cartContainer.innerHTML = "";
    let totalAmount = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>El carrito de compras está vacío.</p>";
        return;
    }

    cart.forEach(item => {
        totalAmount += item.quantity * item.price;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Precio: ${item.price.toFixed(2)} USD</p>
            <p>Cantidad: ${item.quantity}</p>
            <p>Subtotal: ${(item.quantity * item.price).toFixed(2)} USD</p>
        `;
        cartContainer.appendChild(cartItem);
    });

    totalAmountElement.innerText = totalAmount.toFixed(2);
}

// **Checkout**
function handleCheckout() {
    alert("Pedido completado con éxito");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}
