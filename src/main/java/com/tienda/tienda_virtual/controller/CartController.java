package com.tienda.tienda_virtual.controller;

import com.tienda.tienda_virtual.model.Cart;
import com.tienda.tienda_virtual.model.Order;
import com.tienda.tienda_virtual.model.OrderItem;
import com.tienda.tienda_virtual.service.OrderService;
import com.tienda.tienda_virtual.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@SessionAttributes("cart")
public class CartController {

    @Autowired
    private ProductService productService;
    @Autowired
    private OrderService orderService;

    @ModelAttribute("cart")
    public Cart cart() {
        return new Cart();
    }

    @GetMapping
    public Cart getCart(@ModelAttribute("cart") Cart cart) {
        return cart;
    }

    @PostMapping("/add")
    public Cart addToCart(
            @RequestParam Long productId,
            @RequestParam int quantity,
            @ModelAttribute("cart") Cart cart
    ) {
        var product = productService.getProductById(productId);
        if (product == null) {
            throw new RuntimeException("Producto no encontrado");
        }

        Cart.CartItem item = cart.getItems().getOrDefault(productId, new Cart.CartItem());
        item.setName(product.getName());
        item.setPrice(product.getPrice().doubleValue());
        item.setQuantity(item.getQuantity() + quantity);
        item.setSubtotal(item.getQuantity() * item.getPrice());
        cart.addItem(productId, item);

        return cart;
    }

    @PostMapping("/remove")
    public Cart removeFromCart(@RequestParam Long productId, @ModelAttribute("cart") Cart cart) {
        cart.removeItem(productId);
        return cart;
    }

    @PostMapping("/clear")
    public void clearCart(@ModelAttribute("cart") Cart cart) {
        cart.clear();
    }
    @PostMapping("/confirm")
    public Order confirmCart(@ModelAttribute("cart") Cart cart, @RequestParam Long userId) {
        Order order = new Order();
        BigDecimal total = BigDecimal.ZERO;

        for (Map.Entry<Long, Cart.CartItem> entry : cart.getItems().entrySet()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(productService.getProductById(entry.getKey()));
            orderItem.setQuantity(entry.getValue().getQuantity());
            orderItem.setSubtotal(BigDecimal.valueOf(entry.getValue().getSubtotal()));
            order.addItem(orderItem);
            total = total.add(orderItem.getSubtotal());
        }

        order.setTotal(total);
        orderService.saveOrder(order);
        cart.clear(); // Vaciar el carrito tras confirmar el pedido

        return order;
    }
}
