document.addEventListener("DOMContentLoaded", () => {
    loadCatalogProducts();
});

// Cargar todos los productos desde la API
function loadCatalogProducts() {
    fetch("http://localhost:8080/api/products") // URL de tu backend
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById("products-container");
            container.innerHTML = ""; // Limpiar contenido previo

            products.forEach(product => {
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
