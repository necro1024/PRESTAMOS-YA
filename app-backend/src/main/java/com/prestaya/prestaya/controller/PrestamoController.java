package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.application.command.prestamo.ActualizarPrestamoCommand;
import com.prestaya.prestaya.application.command.prestamo.ActualizarPrestamoCommandHandler;
import com.prestaya.prestaya.application.command.prestamo.CrearPrestamoCommand;
import com.prestaya.prestaya.application.command.prestamo.CrearPrestamoCommandHandler;
import com.prestaya.prestaya.application.command.prestamo.EliminarPrestamoCommand;
import com.prestaya.prestaya.application.command.prestamo.EliminarPrestamoCommandHandler;
import com.prestaya.prestaya.application.command.prestamo.FirmarAcuerdoCommand;
import com.prestaya.prestaya.application.command.prestamo.FirmarAcuerdoCommandHandler;
import com.prestaya.prestaya.application.query.prestamo.ListarPrestamosPorClienteQuery;
import com.prestaya.prestaya.application.query.prestamo.ListarPrestamosPorClienteQueryHandler;
import com.prestaya.prestaya.application.query.prestamo.ListarPrestamosQuery;
import com.prestaya.prestaya.application.query.prestamo.ListarPrestamosQueryHandler;
import com.prestaya.prestaya.model.Prestamo;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prestamos")
@CrossOrigin("*")
public class PrestamoController {

    private final ListarPrestamosQueryHandler listarPrestamosQueryHandler;

    private final ListarPrestamosPorClienteQueryHandler
            listarPrestamosPorClienteQueryHandler;

    private final CrearPrestamoCommandHandler crearPrestamoCommandHandler;

    private final ActualizarPrestamoCommandHandler
            actualizarPrestamoCommandHandler;

    private final FirmarAcuerdoCommandHandler firmarAcuerdoCommandHandler;

    private final EliminarPrestamoCommandHandler
            eliminarPrestamoCommandHandler;

    public PrestamoController(
            ListarPrestamosQueryHandler listarPrestamosQueryHandler,
            ListarPrestamosPorClienteQueryHandler
                    listarPrestamosPorClienteQueryHandler,
            CrearPrestamoCommandHandler crearPrestamoCommandHandler,
            ActualizarPrestamoCommandHandler
                    actualizarPrestamoCommandHandler,
            FirmarAcuerdoCommandHandler firmarAcuerdoCommandHandler,
            EliminarPrestamoCommandHandler
                    eliminarPrestamoCommandHandler) {

        this.listarPrestamosQueryHandler =
                listarPrestamosQueryHandler;
        this.listarPrestamosPorClienteQueryHandler =
                listarPrestamosPorClienteQueryHandler;
        this.crearPrestamoCommandHandler =
                crearPrestamoCommandHandler;
        this.actualizarPrestamoCommandHandler =
                actualizarPrestamoCommandHandler;
        this.firmarAcuerdoCommandHandler =
                firmarAcuerdoCommandHandler;
        this.eliminarPrestamoCommandHandler =
                eliminarPrestamoCommandHandler;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Prestamo> listar() {
        return listarPrestamosQueryHandler.handle(
                new ListarPrestamosQuery());
    }

    @GetMapping("/cliente/{clienteId}")
    @PreAuthorize(
        "@authorizationService.puedeAccederCliente(#clienteId, authentication)"
    )
    public List<Prestamo> listarPorCliente(
            @PathVariable Long clienteId) {

        return listarPrestamosPorClienteQueryHandler.handle(
                new ListarPrestamosPorClienteQuery(clienteId));
    }

    @PostMapping
    @PreAuthorize(
        "hasRole('CLIENTE') && "
        + "@authorizationService.puedeCrearPrestamo(#prestamo, authentication)"
    )
    public Prestamo guardar(
            @RequestBody Prestamo prestamo) {

        return crearPrestamoCommandHandler.handle(
                new CrearPrestamoCommand(prestamo));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Prestamo actualizar(
            @PathVariable Long id,
            @RequestBody Prestamo prestamo) {

        return actualizarPrestamoCommandHandler.handle(
                new ActualizarPrestamoCommand(id, prestamo));
    }

    @PutMapping("/{id}/firmar")
    @PreAuthorize(
        "hasRole('CLIENTE') && "
        + "@authorizationService.puedeAccederPrestamo(#id, authentication)"
    )
    public Prestamo firmarAcuerdo(
            @PathVariable Long id,
            @RequestBody Prestamo prestamo) {

        return firmarAcuerdoCommandHandler.handle(
                new FirmarAcuerdoCommand(id, prestamo));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void eliminar(@PathVariable Long id) {

        eliminarPrestamoCommandHandler.handle(
                new EliminarPrestamoCommand(id));
    }
}
