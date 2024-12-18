document.addEventListener("DOMContentLoaded", () => {
    loadOrders();
});

// Cargar las órdenes del usuario desde la API
function loadOrders() {
    const userId = 1; // Cambiar según el usuario autenticado
    fetch(`http://localhost:8080/api/orders/user/${userId}`) // URL de tu backend
        .then(response => response.json())
        .then(orders => {
            const container = document.getElementById("orders-container");
            container.innerHTML = ""; // Limpiar contenido previo

            if (orders.length === 0) {
                container.innerHTML = "<p>No tienes ordenes aún.</p>";
                return;
            }

            orders.forEach(order => {
                const orderCard = document.createElement("div");
                orderCard.className = "order-card";

                let itemsHtml = "";
                order.items.forEach(item => {
                    itemsHtml += `
                        <li>
                            ${item.product.name} - Cantidad: ${item.quantity} - Subtotal: $${item.subtotal}
                        </li>
                    `;
                });

                orderCard.innerHTML = `
                    <h3>Pedido #${order.id}</h3>
                    <p><strong>Fecha:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                    <p><strong>Total:</strong> $${order.total}</p>
                    <ul>
                        ${itemsHtml}
                    </ul>
                `;

                container.appendChild(orderCard);
            });
        })
        .catch(error => console.error("Error al cargar las ordenes:", error));
}
