package com.tienda.tienda_virtual.repository;

import com.tienda.tienda_virtual.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    // Método para obtener los ítems de un pedido específico
    List<OrderItem> findByOrderId(Long orderId);
}
