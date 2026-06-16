package com.prestaya.prestaya.application.command.prestamo;

import com.prestaya.prestaya.service.PrestamoService;

import org.springframework.stereotype.Service;

@Service
public class EliminarPrestamoCommandHandler {

    private final PrestamoService prestamoService;

    public EliminarPrestamoCommandHandler(
            PrestamoService prestamoService) {

        this.prestamoService = prestamoService;
    }

    public void handle(
            EliminarPrestamoCommand command) {

        prestamoService.eliminar(command.id());
    }
}
