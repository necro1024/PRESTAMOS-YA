package com.prestaya.prestaya.service;

import com.prestaya.prestaya.model.Usuario;
import com.prestaya.prestaya.model.Rol;
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

String nombre =
        usuario.getNombre() != null
        && !usuario.getNombre().isBlank()
            ? usuario.getNombre()
            : nombrePorDefecto(usuario);

return new LoginResponse(
        token,
        usuario.getUsername(),
        nombre,
        usuario.getRol().name()
);
    }

    public LoginResponse registrar(
            String nombre,
            String username,
            String password) {

        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setUsername(username);
        usuario.setPassword(
                encoder.encode(password));
        usuario.setRol(Rol.CLIENTE);

        Usuario guardado =
                repository.save(usuario);

        String token =
                jwtUtil.generarToken(
                        guardado.getUsername(),
                        guardado.getRol().name()
                );

        return new LoginResponse(
                token,
                guardado.getUsername(),
                guardado.getNombre(),
                guardado.getRol().name()
        );
    }

    private String nombrePorDefecto(
            Usuario usuario) {

        if (usuario.getRol() == Rol.ADMIN) {
            return "Administrador";
        }

        return "Cliente";
    }
}
