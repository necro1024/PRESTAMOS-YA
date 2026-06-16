package com.prestaya.prestaya.application.command.prestamo;

import com.prestaya.prestaya.model.Prestamo;

public record FirmarAcuerdoCommand(
        Long id,
        Prestamo prestamo) {
}
