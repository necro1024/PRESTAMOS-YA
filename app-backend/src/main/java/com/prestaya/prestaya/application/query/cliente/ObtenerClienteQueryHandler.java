package com.prestaya.prestaya.application.query.cliente;

import com.prestaya.prestaya.model.Cliente;
import com.prestaya.prestaya.service.ClienteService;

import org.springframework.stereotype.Service;

@Service
public class ObtenerClienteQueryHandler {

    private final ClienteService clienteService;

    public ObtenerClienteQueryHandler(
            ClienteService clienteService) {

        this.clienteService = clienteService;
    }

    public Cliente handle(
            ObtenerClienteQuery query) {

        return clienteService.obtener(query.id());
    }
}
