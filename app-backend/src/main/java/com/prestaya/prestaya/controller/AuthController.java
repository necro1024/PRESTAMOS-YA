package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.dto.LoginDTO;
import com.prestaya.prestaya.service.AuthService;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService service;

    public AuthController(
            AuthService service) {

        this.service = service;
    }

    @PostMapping("/login")
    public Map<String, String> login(
            @RequestBody LoginDTO dto) {

        String token =
                service.login(
                    dto.getUsername(),
                    dto.getPassword()
                );

        Map<String, String> response =
                new HashMap<>();

        if (token == null) {

            response.put(
                "error",
                "Credenciales inválidas"
            );

            return response;
        }

        response.put("token", token);

        return response;
    }
}