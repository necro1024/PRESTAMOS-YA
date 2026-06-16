package com.prestaya.prestaya.application.command.cliente;

import com.prestaya.prestaya.model.Cliente;
import com.prestaya.prestaya.service.ClienteService;

import org.springframework.stereotype.Service;

@Service
public class ActualizarClienteCommandHandler {

    private final ClienteService clienteService;

    public ActualizarClienteCommandHandler(
            ClienteService clienteService) {

        this.clienteService = clienteService;
    }

    public Cliente handle(
            ActualizarClienteCommand command) {

        return clienteService.actualizar(
                command.id(),
                command.cliente());
    }
}
