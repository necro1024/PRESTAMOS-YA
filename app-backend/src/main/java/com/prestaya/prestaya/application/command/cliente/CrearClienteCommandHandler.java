package com.prestaya.prestaya.application.command.cliente;

import com.prestaya.prestaya.model.Cliente;
import com.prestaya.prestaya.service.ClienteService;

import org.springframework.stereotype.Service;

@Service
public class CrearClienteCommandHandler {

    private final ClienteService clienteService;

    public CrearClienteCommandHandler(
            ClienteService clienteService) {

        this.clienteService = clienteService;
    }

    public Cliente handle(
            CrearClienteCommand command) {

        return clienteService.guardar(
                command.cliente());
    }
}
