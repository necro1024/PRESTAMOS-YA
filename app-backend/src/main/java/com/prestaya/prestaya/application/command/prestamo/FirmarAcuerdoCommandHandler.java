package com.prestaya.prestaya.application.command.prestamo;

import com.prestaya.prestaya.model.Prestamo;
import com.prestaya.prestaya.service.PrestamoService;

import org.springframework.stereotype.Service;

@Service
public class FirmarAcuerdoCommandHandler {

    private final PrestamoService prestamoService;

    public FirmarAcuerdoCommandHandler(
            PrestamoService prestamoService) {

        this.prestamoService = prestamoService;
    }

    public Prestamo handle(
            FirmarAcuerdoCommand command) {

        return prestamoService.firmarAcuerdo(
                command.id(),
                command.prestamo());
    }
}
