package com.prestaya.prestaya.application.query.cliente;

import com.prestaya.prestaya.model.Cliente;
import com.prestaya.prestaya.service.ClienteService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListarClientesQueryHandler {

    private final ClienteService clienteService;

    public ListarClientesQueryHandler(
            ClienteService clienteService) {

        this.clienteService = clienteService;
    }

    public List<Cliente> handle(
            ListarClientesQuery query) {

        return clienteService.listar();
    }
}
