package com.prestaya.prestaya.service;

import com.prestaya.prestaya.model.Usuario;
import com.prestaya.prestaya.model.Rol;
import com.prestaya.prestaya.repository.UsuarioRepository;
import com.prestaya.prestaya.repository.ClienteRepository;
import com.prestaya.prestaya.security.JwtUtil;
import com.prestaya.prestaya.dto.LoginResponse;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private static final int MAX_INTENTOS = 5;

    private static final int MINUTOS_BLOQUEO = 15;

    private final UsuarioRepository repository;

    private final PasswordEncoder encoder;

    private final JwtUtil jwtUtil;

    private final ClienteRepository clienteRepository;

    public AuthService(
            UsuarioRepository repository,
            PasswordEncoder encoder,
            JwtUtil jwtUtil,
            ClienteRepository clienteRepository) {

        this.repository = repository;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
        this.clienteRepository = clienteRepository;
    }

    public LoginResponse login(
        String username,
        String password) {

        Usuario usuario =
                repository
                .findByUsername(username)
                .orElse(null);

        if (usuario == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Credenciales invalidas"
            );
        }

        if (estaBloqueado(usuario)) {
            throw new ResponseStatusException(
                    HttpStatus.LOCKED,
                    "Cuenta bloqueada temporalmente. Intenta nuevamente despues."
            );
        }

        boolean valido =
                encoder.matches(
                    password,
                    usuario.getPassword()
                );

        if (!valido) {
            registrarIntentoFallido(usuario);

            int restantes =
                    Math.max(
                            0,
                            MAX_INTENTOS
                            - usuario.getIntentosFallidos()
                    );

            if (restantes == 0) {
                throw new ResponseStatusException(
                        HttpStatus.LOCKED,
                        "Cuenta bloqueada por 15 minutos."
                );
            }

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Credenciales invalidas. Intentos restantes: "
                    + restantes
            );
        }

        usuario.setIntentosFallidos(0);
        usuario.setBloqueadoHasta(null);
        repository.save(usuario);

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
        usuario.getRol().name(),
        clienteRepository
        .findByCorreo(usuario.getUsername())
        .map(cliente -> cliente.getId())
        .orElse(null)
);
    }

    public LoginResponse registrar(
            String nombre,
            String username,
            String password) {

        if (repository.findByUsername(username).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "El usuario ya se encuentra registrado"
            );
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setUsername(username);
        usuario.setPassword(
                encoder.encode(password));
        usuario.setRol(Rol.CLIENTE);
        usuario.setIntentosFallidos(0);

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
                guardado.getRol().name(),
                null
        );
    }

    private String nombrePorDefecto(
            Usuario usuario) {

        if (usuario.getRol() == Rol.ADMIN) {
            return "Administrador";
        }

        return "Cliente";
    }

    private boolean estaBloqueado(
            Usuario usuario) {

        LocalDateTime bloqueadoHasta =
                usuario.getBloqueadoHasta();

        if (bloqueadoHasta == null) {
            return false;
        }

        if (bloqueadoHasta.isAfter(
                LocalDateTime.now())) {
            return true;
        }

        usuario.setBloqueadoHasta(null);
        usuario.setIntentosFallidos(0);
        repository.save(usuario);

        return false;
    }

    private void registrarIntentoFallido(
            Usuario usuario) {

        int intentos =
                usuario.getIntentosFallidos() == null
                ? 1
                : usuario.getIntentosFallidos() + 1;

        usuario.setIntentosFallidos(intentos);

        if (intentos >= MAX_INTENTOS) {
            usuario.setBloqueadoHasta(
                    LocalDateTime.now()
                    .plusMinutes(MINUTOS_BLOQUEO)
            );
        }

        repository.save(usuario);
    }
}
