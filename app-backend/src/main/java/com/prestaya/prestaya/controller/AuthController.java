package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.application.command.auth.LoginCommand;
import com.prestaya.prestaya.application.command.auth.LoginCommandHandler;
import com.prestaya.prestaya.dto.LoginDTO;
import com.prestaya.prestaya.dto.LoginResponse;
import com.prestaya.prestaya.dto.RegisterDTO;
import com.prestaya.prestaya.service.AuthService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final LoginCommandHandler handler;

    private final AuthService authService;

    public AuthController(
            LoginCommandHandler handler,
            AuthService authService) {

        this.handler = handler;
        this.authService = authService;
    }

    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestBody LoginDTO dto) {

        LoginResponse response =
                handler.handle(
                        new LoginCommand(
                                dto.getUsername(),
                                dto.getPassword()
                        )
                );

        return crearRespuesta(response);
    }

    @PostMapping("/register")
    public Map<String, Object> register(
            @RequestBody RegisterDTO dto) {

        LoginResponse response =
                authService.registrar(
                        dto.getNombre(),
                        dto.getUsername(),
                        dto.getPassword()
                );

        return crearRespuesta(response);
    }

    private Map<String, Object> crearRespuesta(
            LoginResponse loginResponse) {

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "token",
                loginResponse.getToken());
        response.put(
                "username",
                loginResponse.getUsername());
        response.put(
                "nombre",
                loginResponse.getNombre());
        response.put(
                "rol",
                loginResponse.getRol());
        response.put(
                "clienteId",
                loginResponse.getClienteId());

        return response;
    }
}
