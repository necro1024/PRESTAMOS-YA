package com.prestaya.prestaya.service;

import com.prestaya.prestaya.model.Usuario;
import com.prestaya.prestaya.repository.UsuarioRepository;
import com.prestaya.prestaya.security.JwtUtil;
import com.prestaya.prestaya.dto.LoginResponse;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository repository;

    private final PasswordEncoder encoder;

    private final JwtUtil jwtUtil;

    public AuthService(
            UsuarioRepository repository,
            PasswordEncoder encoder,
            JwtUtil jwtUtil) {

        this.repository = repository;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse login(
        String username,
        String password) {

        Usuario usuario =
                repository
                .findByUsername(username)
                .orElse(null);

        if (usuario == null) {
            return null;
        }

        boolean valido =
                encoder.matches(
                    password,
                    usuario.getPassword()
                );

        if (!valido) {
            return null;
        }

        String token =
jwtUtil.generarToken(
        username,
        usuario.getRol().name()
);

return new LoginResponse(
        token,
        usuario.getUsername(),
        usuario.getRol().name()
);
    }
}
