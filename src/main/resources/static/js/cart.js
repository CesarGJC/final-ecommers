let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    updateCartView();
});

// Cargar el carrito desde el almacenamiento local
function loadCart() {
    const storedCart = localStorage.getItem("cart");
    cart = storedCart ? JSON.parse(storedCart) : [];
}

// Guardar el carrito en el almacenamiento local
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Actualizar la vista del carrito
function updateCartView() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = ""; // Limpiar contenido previo
    let total = 0;

    cart.forEach(item => {
        const row = document.createElement("tr");

        const subtotal = item.price * item.quantity;
        total += subtotal;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${subtotal.toFixed(2)}</td>
            <td><button onclick="removeFromCart(${item.id})">Eliminar</button></td>
        `;

        cartItems.appendChild(row);
    });

    cartTotal.textContent = total.toFixed(2);
}

// Actualizar cantidad de un producto
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity, 10);
        saveCart();
        updateCartView();
    }
}

// Eliminar un producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartView();
}

// Confirmar el pedido
function confirmOrder() {
    fetch("http://localhost:8080/api/cart/confirm", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: 1, // Cambiar según el usuario autenticado
            items: cart
        })
    })
        .then(response => response.json())
        .then(data => {
            alert("Pedido confirmado con éxito!");
            cart = [];
            saveCart();
            updateCartView();
        })
        .catch(error => console.error("Error al confirmar el pedido:", error));
}
