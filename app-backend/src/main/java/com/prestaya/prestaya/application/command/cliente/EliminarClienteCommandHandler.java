package com.prestaya.prestaya.application.command.cliente;

import com.prestaya.prestaya.service.ClienteService;

import org.springframework.stereotype.Service;

@Service
public class EliminarClienteCommandHandler {

    private final ClienteService clienteService;

    public EliminarClienteCommandHandler(
            ClienteService clienteService) {

        this.clienteService = clienteService;
    }

    public void handle(
            EliminarClienteCommand command) {

        clienteService.eliminar(command.id());
    }
}
