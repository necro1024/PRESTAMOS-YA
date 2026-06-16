package com.prestaya.prestaya.application.command.prestamo;

import com.prestaya.prestaya.model.Prestamo;
import com.prestaya.prestaya.service.PrestamoService;

import org.springframework.stereotype.Service;

@Service
public class CrearPrestamoCommandHandler {

    private final PrestamoService prestamoService;

    public CrearPrestamoCommandHandler(
            PrestamoService prestamoService) {

        this.prestamoService = prestamoService;
    }

    public Prestamo handle(
            CrearPrestamoCommand command) {

        return prestamoService.guardar(
                command.prestamo());
    }
}
