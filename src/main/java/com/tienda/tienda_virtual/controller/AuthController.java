package com.tienda.tienda_virtual.controller;

import com.tienda.tienda_virtual.model.User;
import com.tienda.tienda_virtual.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        // Depuración
        System.out.println("Intentando iniciar sesión con email: " + email);

        User user = userService.findByEmail(email);
        if (user == null) {
            System.out.println("Usuario no encontrado");
            throw new RuntimeException("Credenciales incorrectas");
        }

        if (!user.getPassword().equals(password)) {
            System.out.println("Contraseña incorrecta para el usuario: " + email);
            throw new RuntimeException("Credenciales incorrectas");
        }

        System.out.println("Inicio de sesión exitoso para el usuario: " + email);

        String token = "fake-jwt-token-for-user-" + user.getId();
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", user.getId());
        return ResponseEntity.ok(response);
    }

}
