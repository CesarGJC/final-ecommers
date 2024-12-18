package com.tienda.tienda_virtual.service;

import com.tienda.tienda_virtual.model.User;
import com.tienda.tienda_virtual.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hashear contraseña
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
