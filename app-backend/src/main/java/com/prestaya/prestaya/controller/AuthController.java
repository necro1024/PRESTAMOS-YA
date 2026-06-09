package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.application.command.auth.LoginCommand;
import com.prestaya.prestaya.application.command.auth.LoginCommandHandler;
import com.prestaya.prestaya.dto.LoginDTO;

import com.prestaya.prestaya.dto.LoginResponse;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final LoginCommandHandler handler;

    public AuthController(
        LoginCommandHandler handler) {

    this.handler = handler;
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
        "rol",
        responseLogin.getRol()
);

return response;
    }
}