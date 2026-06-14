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
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

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
                    authService.registrar(
                            dto.getNombre(),
                            dto.getUsername(),
                            dto.getPassword()
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

        return ResponseEntity
                .status(exception.getStatusCode())
                .body(Map.of(
                        "status", exception.getStatusCode().value(),
                        "message", message
                ));
    }
}
