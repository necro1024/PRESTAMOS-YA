package com.prestaya.prestaya.application.command.auth;

public record RegistrarUsuarioCommand(
        String nombre,
        String username,
        String password) {
}
