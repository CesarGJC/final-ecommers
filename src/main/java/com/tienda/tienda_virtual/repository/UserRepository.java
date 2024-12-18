package com.tienda.tienda_virtual.repository;

import com.tienda.tienda_virtual.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
