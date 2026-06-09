package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.model.Garantia;

import com.prestaya.prestaya.service.GarantiaService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/garantias")
@CrossOrigin("*")
public class GarantiaController {

    private final GarantiaService service;

    public GarantiaController(
            GarantiaService service) {

        this.service = service;
    }

    @GetMapping
    public List<Garantia> listar() {

        return service.listar();
    }

    @GetMapping("/prestamo/{prestamoId}")
    public List<Garantia> listarPorPrestamo(
            @PathVariable Long prestamoId) {

        return service.listarPorPrestamo(
                prestamoId);
    }

    @PostMapping
    public Garantia guardar(
            @RequestBody Garantia garantia) {

        return service.guardar(garantia);
    }

    @PutMapping("/{id}")
    public Garantia actualizar(
            @PathVariable Long id,
            @RequestBody Garantia garantia) {

        return service.actualizar(id, garantia);
    }

    @PutMapping("/{id}/evaluar")
    public Garantia evaluar(
            @PathVariable Long id) {

        return service.evaluarActivo(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(
            @PathVariable Long id) {

        service.eliminar(id);
    }
}
