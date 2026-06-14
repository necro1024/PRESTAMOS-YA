package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.model.Garantia;

import com.prestaya.prestaya.service.GarantiaService;
import com.prestaya.prestaya.service.AuditoriaService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/garantias")
@CrossOrigin("*")
public class GarantiaController {

    private final GarantiaService service;

    private final AuditoriaService auditoriaService;

    public GarantiaController(
            GarantiaService service,
            AuditoriaService auditoriaService) {

        this.service = service;
        this.auditoriaService = auditoriaService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Garantia> listar() {

        return service.listar();
    }

    @GetMapping("/prestamo/{prestamoId}")
    @PreAuthorize(
        "@authorizationService.puedeAccederPrestamo(#prestamoId, authentication)"
    )
    public List<Garantia> listarPorPrestamo(
            @PathVariable Long prestamoId) {

        return service.listarPorPrestamo(
                prestamoId);
    }

    @PostMapping
    @PreAuthorize(
        "hasRole('CLIENTE') && "
        + "@authorizationService.puedeRegistrarGarantia(#garantia, authentication)"
    )
    public Garantia guardar(
            @RequestBody Garantia garantia) {

        return service.guardar(garantia);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Garantia actualizar(
            @PathVariable Long id,
            @RequestBody Garantia garantia) {

        Garantia actualizada =
                service.actualizar(id, garantia);

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

    @PutMapping("/{id}/evaluar")
    @PreAuthorize("hasRole('ADMIN')")
    public Garantia evaluar(
            @PathVariable Long id) {

        Garantia evaluada =
                service.evaluarActivo(id);

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

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void eliminar(
            @PathVariable Long id) {

        service.eliminar(id);
    }
}
