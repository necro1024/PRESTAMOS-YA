package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.application.command.auth.LoginCommand;
import com.prestaya.prestaya.application.command.auth.LoginCommandHandler;
import com.prestaya.prestaya.application.command.auth.RegistrarUsuarioCommand;
import com.prestaya.prestaya.application.command.auth.RegistrarUsuarioCommandHandler;
import com.prestaya.prestaya.dto.LoginDTO;
import com.prestaya.prestaya.dto.LoginResponse;
import com.prestaya.prestaya.dto.RegisterDTO;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private static final Pattern INTENTOS_RESTANTES =
            Pattern.compile("Intentos restantes: (\\d+)");

    private final LoginCommandHandler handler;

    private final RegistrarUsuarioCommandHandler
            registrarUsuarioCommandHandler;

    public AuthController(
            LoginCommandHandler handler,
            RegistrarUsuarioCommandHandler
                    registrarUsuarioCommandHandler) {

        this.handler = handler;
        this.registrarUsuarioCommandHandler =
                registrarUsuarioCommandHandler;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody LoginDTO dto) {

        try {
            LoginResponse response =
                    handler.handle(
                            new LoginCommand(
                                    dto.getUsername(),
                                    dto.getPassword()
                            )
                    );

            return ResponseEntity.ok(
                    crearRespuesta(response));
        } catch (ResponseStatusException exception) {
            return crearRespuestaError(exception);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(
            @RequestBody RegisterDTO dto) {

        try {
            LoginResponse response =
                    registrarUsuarioCommandHandler.handle(
                            new RegistrarUsuarioCommand(
                                    dto.getNombre(),
                                    dto.getUsername(),
                                    dto.getPassword()
                            )
                    );

            return ResponseEntity.ok(
                    crearRespuesta(response));
        } catch (ResponseStatusException exception) {
            return crearRespuestaError(exception);
        }
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

    private ResponseEntity<Map<String, Object>> crearRespuestaError(
            ResponseStatusException exception) {

        String message = exception.getReason() != null
                ? exception.getReason()
                : "No se pudo procesar la solicitud";

        int status = exception.getStatusCode().value();
        Map<String, Object> body = new HashMap<>();

        body.put("status", status);
        body.put("message", message);
        body.put("bloqueado", status == 423);

        Matcher matcher =
                INTENTOS_RESTANTES.matcher(message);

        if (matcher.find()) {
            body.put(
                    "intentosRestantes",
                    Integer.parseInt(matcher.group(1))
            );
        } else if (status == 423) {
            body.put("intentosRestantes", 0);
        }

        return ResponseEntity
                .status(exception.getStatusCode())
                .body(body);
    }
}
