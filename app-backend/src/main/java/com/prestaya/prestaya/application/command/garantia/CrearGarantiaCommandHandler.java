package com.prestaya.prestaya.application.command.garantia;

import com.prestaya.prestaya.model.Garantia;
import com.prestaya.prestaya.service.GarantiaService;

import org.springframework.stereotype.Service;

@Service
public class CrearGarantiaCommandHandler {

    private final GarantiaService garantiaService;

    public CrearGarantiaCommandHandler(
            GarantiaService garantiaService) {

        this.garantiaService = garantiaService;
    }

    public Garantia handle(
            CrearGarantiaCommand command) {

        return garantiaService.guardar(
                command.garantia());
    }
}
