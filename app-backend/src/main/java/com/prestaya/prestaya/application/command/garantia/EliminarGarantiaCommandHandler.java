package com.prestaya.prestaya.application.command.garantia;

import com.prestaya.prestaya.service.GarantiaService;

import org.springframework.stereotype.Service;

@Service
public class EliminarGarantiaCommandHandler {

    private final GarantiaService garantiaService;

    public EliminarGarantiaCommandHandler(
            GarantiaService garantiaService) {

        this.garantiaService = garantiaService;
    }

    public void handle(
            EliminarGarantiaCommand command) {

        garantiaService.eliminar(command.id());
    }
}
