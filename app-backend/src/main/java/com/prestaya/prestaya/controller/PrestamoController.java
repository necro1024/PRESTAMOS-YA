package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.model.Prestamo;
import com.prestaya.prestaya.service.PrestamoService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prestamos")
@CrossOrigin("*")
public class PrestamoController {

    private final PrestamoService service;

    public PrestamoController(
            PrestamoService service) {

        this.service = service;
    }

    @GetMapping
    public List<Prestamo> listar() {
        return service.listar();
    }

    @PostMapping
    public Prestamo guardar(
            @RequestBody Prestamo prestamo) {

        return service.guardar(prestamo);
    }

    @PutMapping("/{id}")
    public Prestamo actualizar(
            @PathVariable Long id,
            @RequestBody Prestamo prestamo) {

        return service.actualizar(id, prestamo);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {

        service.eliminar(id);
    }
}