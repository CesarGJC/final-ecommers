package com.tienda.tienda_virtual.repository;

import com.tienda.tienda_virtual.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}