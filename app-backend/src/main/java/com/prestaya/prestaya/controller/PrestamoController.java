package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.model.Prestamo;
import com.prestaya.prestaya.service.AuditoriaService;
import com.prestaya.prestaya.service.PrestamoService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prestamos")
@CrossOrigin("*")
public class PrestamoController {

    private final PrestamoService service;

    private final AuditoriaService auditoriaService;

    public PrestamoController(
            PrestamoService service,
            AuditoriaService auditoriaService) {

        this.service = service;
        this.auditoriaService = auditoriaService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Prestamo> listar() {
        return service.listar();
    }

    @GetMapping("/cliente/{clienteId}")
    @PreAuthorize(
        "@authorizationService.puedeAccederCliente(#clienteId, authentication)"
    )
    public List<Prestamo> listarPorCliente(
            @PathVariable Long clienteId) {

        return service.listarPorCliente(clienteId);
    }

    @PostMapping
    @PreAuthorize(
        "hasRole('CLIENTE') && "
        + "@authorizationService.puedeCrearPrestamo(#prestamo, authentication)"
    )
    public Prestamo guardar(
            @RequestBody Prestamo prestamo) {

        return service.guardar(prestamo);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Prestamo actualizar(
            @PathVariable Long id,
            @RequestBody Prestamo prestamo) {

        Prestamo actualizado =
                service.actualizar(id, prestamo);

        if (actualizado != null) {
            auditoriaService.registrarPrestamo(
                    actualizado,
                    actualizado.getEstado(),
                    "El comite de riesgos registro una decision sobre el prestamo."
            );
        }

        return actualizado;
    }

    @PutMapping("/{id}/firmar")
    @PreAuthorize(
        "hasRole('CLIENTE') && "
        + "@authorizationService.puedeAccederPrestamo(#id, authentication)"
    )
    public Prestamo firmarAcuerdo(
            @PathVariable Long id,
            @RequestBody Prestamo prestamo) {

        return service.firmarAcuerdo(id, prestamo);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void eliminar(@PathVariable Long id) {

        service.eliminar(id);
    }
}
