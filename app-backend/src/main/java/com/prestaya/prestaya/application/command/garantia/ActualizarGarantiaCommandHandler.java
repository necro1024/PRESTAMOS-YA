package com.prestaya.prestaya.application.command.garantia;

import com.prestaya.prestaya.model.Garantia;
import com.prestaya.prestaya.service.AuditoriaService;
import com.prestaya.prestaya.service.GarantiaService;

import org.springframework.stereotype.Service;

@Service
public class ActualizarGarantiaCommandHandler {

    private final GarantiaService garantiaService;

    private final AuditoriaService auditoriaService;

    public ActualizarGarantiaCommandHandler(
            GarantiaService garantiaService,
            AuditoriaService auditoriaService) {

        this.garantiaService = garantiaService;
        this.auditoriaService = auditoriaService;
    }

    public Garantia handle(
            ActualizarGarantiaCommand command) {

        Garantia actualizada =
                garantiaService.actualizar(
                        command.id(),
                        command.garantia());

        if (actualizada != null) {
            auditoriaService.registrarGarantia(
                    actualizada,
                    "DECISION_GARANTIA",
                    actualizada.getRecomendacion() != null
                    ? actualizada.getRecomendacion()
                    : actualizada.getEstado(),
                    "El administrador actualizo la decision de la garantia."
            );
        }

        return actualizada;
    }
}
