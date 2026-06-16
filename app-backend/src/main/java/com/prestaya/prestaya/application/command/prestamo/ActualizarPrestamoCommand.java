package com.prestaya.prestaya.application.command.prestamo;

import com.prestaya.prestaya.model.Prestamo;

public record ActualizarPrestamoCommand(
        Long id,
        Prestamo prestamo) {
}
