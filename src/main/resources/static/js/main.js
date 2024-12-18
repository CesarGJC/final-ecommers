document.addEventListener("DOMContentLoaded", () => {
    loadFeaturedProducts();
});

// Cargar productos destacados desde la API
function loadFeaturedProducts() {
    fetch("http://localhost:8080/api/products") // URL de tu backend
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById("products-container");
            container.innerHTML = ""; // Limpiar contenido previo

            products.slice(0, 4).forEach(product => {
                const productCard = document.createElement("div");
                productCard.className = "product-card";

                productCard.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>Precio:</strong> $${product.price}</p>
                    <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
                `;

                container.appendChild(productCard);
            });
        })
        .catch(error => console.error("Error al cargar productos:", error));
}

// Agregar producto al carrito
function addToCart(productId) {
    alert(`Producto ${productId} agregado al carrito (Implementar lógica)`);
}
// Verificar si el usuario está autenticado antes de cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Debes iniciar sesión para acceder a esta página.");
        window.location.href = "login.html";
    } else {
        // Continuar con la lógica de la página
    }
});
