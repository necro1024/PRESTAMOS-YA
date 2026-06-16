package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.application.command.garantia.ActualizarGarantiaCommand;
import com.prestaya.prestaya.application.command.garantia.ActualizarGarantiaCommandHandler;
import com.prestaya.prestaya.application.command.garantia.CrearGarantiaCommand;
import com.prestaya.prestaya.application.command.garantia.CrearGarantiaCommandHandler;
import com.prestaya.prestaya.application.command.garantia.EliminarGarantiaCommand;
import com.prestaya.prestaya.application.command.garantia.EliminarGarantiaCommandHandler;
import com.prestaya.prestaya.application.command.garantia.EvaluarGarantiaCommand;
import com.prestaya.prestaya.application.command.garantia.EvaluarGarantiaCommandHandler;
import com.prestaya.prestaya.application.query.garantia.ListarGarantiasPorPrestamoQuery;
import com.prestaya.prestaya.application.query.garantia.ListarGarantiasPorPrestamoQueryHandler;
import com.prestaya.prestaya.application.query.garantia.ListarGarantiasQuery;
import com.prestaya.prestaya.application.query.garantia.ListarGarantiasQueryHandler;
import com.prestaya.prestaya.model.Garantia;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/garantias")
@CrossOrigin("*")
public class GarantiaController {

    private final ListarGarantiasQueryHandler
            listarGarantiasQueryHandler;

    private final ListarGarantiasPorPrestamoQueryHandler
            listarGarantiasPorPrestamoQueryHandler;

    private final CrearGarantiaCommandHandler
            crearGarantiaCommandHandler;

    private final ActualizarGarantiaCommandHandler
            actualizarGarantiaCommandHandler;

    private final EvaluarGarantiaCommandHandler
            evaluarGarantiaCommandHandler;

    private final EliminarGarantiaCommandHandler
            eliminarGarantiaCommandHandler;

    public GarantiaController(
            ListarGarantiasQueryHandler
                    listarGarantiasQueryHandler,
            ListarGarantiasPorPrestamoQueryHandler
                    listarGarantiasPorPrestamoQueryHandler,
            CrearGarantiaCommandHandler
                    crearGarantiaCommandHandler,
            ActualizarGarantiaCommandHandler
                    actualizarGarantiaCommandHandler,
            EvaluarGarantiaCommandHandler
                    evaluarGarantiaCommandHandler,
            EliminarGarantiaCommandHandler
                    eliminarGarantiaCommandHandler) {

        this.listarGarantiasQueryHandler =
                listarGarantiasQueryHandler;
        this.listarGarantiasPorPrestamoQueryHandler =
                listarGarantiasPorPrestamoQueryHandler;
        this.crearGarantiaCommandHandler =
                crearGarantiaCommandHandler;
        this.actualizarGarantiaCommandHandler =
                actualizarGarantiaCommandHandler;
        this.evaluarGarantiaCommandHandler =
                evaluarGarantiaCommandHandler;
        this.eliminarGarantiaCommandHandler =
                eliminarGarantiaCommandHandler;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Garantia> listar() {

        return listarGarantiasQueryHandler.handle(
                new ListarGarantiasQuery());
    }

    @GetMapping("/prestamo/{prestamoId}")
    @PreAuthorize(
        "@authorizationService.puedeAccederPrestamo(#prestamoId, authentication)"
    )
    public List<Garantia> listarPorPrestamo(
            @PathVariable Long prestamoId) {

        return listarGarantiasPorPrestamoQueryHandler.handle(
                new ListarGarantiasPorPrestamoQuery(prestamoId));
    }

    @PostMapping
    @PreAuthorize(
        "hasRole('CLIENTE') && "
        + "@authorizationService.puedeRegistrarGarantia(#garantia, authentication)"
    )
    public Garantia guardar(
            @RequestBody Garantia garantia) {

        return crearGarantiaCommandHandler.handle(
                new CrearGarantiaCommand(garantia));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Garantia actualizar(
            @PathVariable Long id,
            @RequestBody Garantia garantia) {

        return actualizarGarantiaCommandHandler.handle(
                new ActualizarGarantiaCommand(id, garantia));
    }

    @PutMapping("/{id}/evaluar")
    @PreAuthorize("hasRole('ADMIN')")
    public Garantia evaluar(
            @PathVariable Long id) {

        return evaluarGarantiaCommandHandler.handle(
                new EvaluarGarantiaCommand(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void eliminar(
            @PathVariable Long id) {

        eliminarGarantiaCommandHandler.handle(
                new EliminarGarantiaCommand(id));
    }
}
