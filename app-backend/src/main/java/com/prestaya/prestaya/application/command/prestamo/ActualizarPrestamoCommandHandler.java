package com.prestaya.prestaya.application.command.prestamo;

import com.prestaya.prestaya.model.Prestamo;
import com.prestaya.prestaya.service.AuditoriaService;
import com.prestaya.prestaya.service.PrestamoService;

import org.springframework.stereotype.Service;

@Service
public class ActualizarPrestamoCommandHandler {

    private final PrestamoService prestamoService;

    private final AuditoriaService auditoriaService;

    public ActualizarPrestamoCommandHandler(
            PrestamoService prestamoService,
            AuditoriaService auditoriaService) {

        this.prestamoService = prestamoService;
        this.auditoriaService = auditoriaService;
    }

    public Prestamo handle(
            ActualizarPrestamoCommand command) {

        Prestamo actualizado =
                prestamoService.actualizar(
                        command.id(),
                        command.prestamo());

        if (actualizado != null) {
            auditoriaService.registrarPrestamo(
                    actualizado,
                    actualizado.getEstado(),
                    "El comite de riesgos registro una decision sobre el prestamo."
            );
        }

        return actualizado;
    }
}
