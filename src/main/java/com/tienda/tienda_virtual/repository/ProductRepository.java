package com.tienda.tienda_virtual.repository;

import com.tienda.tienda_virtual.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {}