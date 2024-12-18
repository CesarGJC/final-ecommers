package com.tienda.tienda_virtual.repository;

import com.tienda.tienda_virtual.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Método para obtener pedidos de un usuario específico
    List<Order> findByUserId(Long userId);
}
