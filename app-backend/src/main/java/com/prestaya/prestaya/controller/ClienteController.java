package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.model.Cliente;
import com.prestaya.prestaya.service.ClienteService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin("*")
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Cliente> listar() {
        return service.listar();
    }

    @PostMapping
    public Cliente guardar(@RequestBody Cliente cliente) {
        return service.guardar(cliente);
    }

    @GetMapping("/{id}")
    public Cliente obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
    @PutMapping("/{id}")
    public Cliente actualizar(
        @PathVariable Long id,
        @RequestBody Cliente cliente) {

    return service.actualizar(id, cliente);
    }
}

