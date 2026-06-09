package com.prestaya.prestaya.application.command.auth;

import com.prestaya.prestaya.service.AuthService;

import org.springframework.stereotype.Service;

import com.prestaya.prestaya.dto.LoginResponse;

@Service
public class LoginCommandHandler {

    private final AuthService authService;

    public LoginCommandHandler(
            AuthService authService) {

        this.authService = authService;
    }

    public LoginResponse handle(
        LoginCommand command) {

        return authService.login(
                command.getUsername(),
                command.getPassword()
        );
    }
}