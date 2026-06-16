package com.prestaya.prestaya.application.command.cliente;

import com.prestaya.prestaya.model.Cliente;

public record ActualizarClienteCommand(
        Long id,
        Cliente cliente) {
}
