package com.prestaya.prestaya.application.command.auth;

import com.prestaya.prestaya.dto.LoginResponse;
import com.prestaya.prestaya.service.AuthService;

import org.springframework.stereotype.Service;

@Service
public class RegistrarUsuarioCommandHandler {

    private final AuthService authService;

    public RegistrarUsuarioCommandHandler(
            AuthService authService) {

        this.authService = authService;
    }

    public LoginResponse handle(
            RegistrarUsuarioCommand command) {

        return authService.registrar(
                command.nombre(),
                command.username(),
                command.password());
    }
}
