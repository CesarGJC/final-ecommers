package com.tienda.tienda_virtual.controller;

import com.tienda.tienda_virtual.model.Order;
import com.tienda.tienda_virtual.model.OrderItem;
import com.tienda.tienda_virtual.model.User;
import com.tienda.tienda_virtual.service.OrderService;
import com.tienda.tienda_virtual.service.ProductService;
import com.tienda.tienda_virtual.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    /**
     * Crear un nuevo pedido.
     * Este método procesa los ítems de un pedido, calcula los subtotales y el total,
     * y guarda el pedido en la base de datos.
     */
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        // Inicializa el total del pedido
        BigDecimal total = BigDecimal.ZERO;

        // Procesa cada ítem del pedido
        for (OrderItem item : order.getItems()) {
            // Busca el producto correspondiente
            var product = productService.getProductById(item.getProduct().getId());

            if (product == null) {
                throw new RuntimeException("Producto no encontrado: " + item.getProduct().getId());
            }

            // Calcula el subtotal del ítem
            BigDecimal subtotal = BigDecimal.valueOf(item.getQuantity()).multiply(product.getPrice());
            item.setSubtotal(subtotal);
            item.setOrder(order); // Asocia el ítem al pedido

            // Suma el subtotal al total del pedido
            total = total.add(subtotal);
        }

        // Asigna el total calculado al pedido
        order.setTotal(total);

        // Busca el usuario asociado al pedido
        User user = userService.getUserById(order.getUser().getId());
        if (user == null) {
            throw new RuntimeException("Usuario no encontrado: " + order.getUser().getId());
        }
        order.setUser(user);

        // Guarda el pedido en la base de datos
        return orderService.saveOrder(order);
    }

    /**
     * Obtener pedidos por usuario.
     */
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        return orderService.getOrdersByUser(userId);
    }
}
