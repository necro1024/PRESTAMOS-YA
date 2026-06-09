package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.application.command.auth.LoginCommand;
import com.prestaya.prestaya.application.command.auth.LoginCommandHandler;
import com.prestaya.prestaya.dto.LoginDTO;

import com.prestaya.prestaya.dto.LoginResponse;
import com.prestaya.prestaya.dto.RegisterDTO;
import com.prestaya.prestaya.service.AuthService;
import org.springframework.web.bind.annotation.*;

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
    public Map<String, String> login(
            @RequestBody LoginDTO dto) {

        LoginCommand command =
        new LoginCommand(
                dto.getUsername(),
                dto.getPassword()
        );

LoginResponse responseLogin =
        handler.handle(command);

        Map<String, String> response =
                new HashMap<>();

        if (responseLogin == null) {

            response.put(
                "error",
                "Credenciales inválidas"
            );

            return response;
        }

        response.put(
        "token",
        responseLogin.getToken()
);

response.put(
        "username",
        responseLogin.getUsername()
);

response.put(
        "nombre",
        responseLogin.getNombre()
);

response.put(
        "rol",
        responseLogin.getRol()
);

return response;
    }

    @PostMapping("/register")
    public Map<String, String> register(
            @RequestBody RegisterDTO dto) {

        LoginResponse responseRegister =
                authService.registrar(
                        dto.getNombre(),
                        dto.getUsername(),
                        dto.getPassword()
                );

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "token",
                responseRegister.getToken()
        );

        response.put(
                "username",
                responseRegister.getUsername()
        );

        response.put(
                "nombre",
                responseRegister.getNombre()
        );

        response.put(
                "rol",
                responseRegister.getRol()
        );

        return response;
    }
}
