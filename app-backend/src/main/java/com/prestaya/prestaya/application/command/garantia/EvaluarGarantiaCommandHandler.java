package com.prestaya.prestaya.application.command.garantia;

import com.prestaya.prestaya.model.Garantia;
import com.prestaya.prestaya.service.AuditoriaService;
import com.prestaya.prestaya.service.GarantiaService;

import org.springframework.stereotype.Service;

@Service
public class EvaluarGarantiaCommandHandler {

    private final GarantiaService garantiaService;

    private final AuditoriaService auditoriaService;

    public EvaluarGarantiaCommandHandler(
            GarantiaService garantiaService,
            AuditoriaService auditoriaService) {

        this.garantiaService = garantiaService;
        this.auditoriaService = auditoriaService;
    }

    public Garantia handle(
            EvaluarGarantiaCommand command) {

        Garantia evaluada =
                garantiaService.evaluarActivo(
                        command.id());

        if (evaluada != null) {
            auditoriaService.registrarGarantia(
                    evaluada,
                    "EVALUACION_GARANTIA",
                    evaluada.getRecomendacion(),
                    evaluada.getResultadoEvaluacion()
            );
        }

        return evaluada;
    }
}
