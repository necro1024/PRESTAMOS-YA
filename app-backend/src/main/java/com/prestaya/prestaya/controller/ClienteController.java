package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.application.command.cliente.ActualizarClienteCommand;
import com.prestaya.prestaya.application.command.cliente.ActualizarClienteCommandHandler;
import com.prestaya.prestaya.application.command.cliente.CrearClienteCommand;
import com.prestaya.prestaya.application.command.cliente.CrearClienteCommandHandler;
import com.prestaya.prestaya.application.command.cliente.EliminarClienteCommand;
import com.prestaya.prestaya.application.command.cliente.EliminarClienteCommandHandler;
import com.prestaya.prestaya.application.query.cliente.ListarClientesQuery;
import com.prestaya.prestaya.application.query.cliente.ListarClientesQueryHandler;
import com.prestaya.prestaya.application.query.cliente.ObtenerClienteQuery;
import com.prestaya.prestaya.application.query.cliente.ObtenerClienteQueryHandler;
import com.prestaya.prestaya.model.Cliente;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin("*")
public class ClienteController {

    private final ListarClientesQueryHandler
            listarClientesQueryHandler;

    private final ObtenerClienteQueryHandler
            obtenerClienteQueryHandler;

    private final CrearClienteCommandHandler
            crearClienteCommandHandler;

    private final ActualizarClienteCommandHandler
            actualizarClienteCommandHandler;

    private final EliminarClienteCommandHandler
            eliminarClienteCommandHandler;

    public ClienteController(
            ListarClientesQueryHandler
                    listarClientesQueryHandler,
            ObtenerClienteQueryHandler
                    obtenerClienteQueryHandler,
            CrearClienteCommandHandler
                    crearClienteCommandHandler,
            ActualizarClienteCommandHandler
                    actualizarClienteCommandHandler,
            EliminarClienteCommandHandler
                    eliminarClienteCommandHandler) {

        this.listarClientesQueryHandler =
                listarClientesQueryHandler;
        this.obtenerClienteQueryHandler =
                obtenerClienteQueryHandler;
        this.crearClienteCommandHandler =
                crearClienteCommandHandler;
        this.actualizarClienteCommandHandler =
                actualizarClienteCommandHandler;
        this.eliminarClienteCommandHandler =
                eliminarClienteCommandHandler;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Cliente> listar() {

        return listarClientesQueryHandler.handle(
                new ListarClientesQuery());
    }

    @PostMapping
    @PreAuthorize(
        "hasRole('CLIENTE') && "
        + "@authorizationService.puedeCrearCliente(#cliente, authentication)"
    )
    public Cliente guardar(
            @RequestBody Cliente cliente) {

        return crearClienteCommandHandler.handle(
                new CrearClienteCommand(cliente));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Cliente obtener(
            @PathVariable Long id) {

        return obtenerClienteQueryHandler.handle(
                new ObtenerClienteQuery(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void eliminar(
            @PathVariable Long id) {

        eliminarClienteCommandHandler.handle(
                new EliminarClienteCommand(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Cliente actualizar(
            @PathVariable Long id,
            @RequestBody Cliente cliente) {

        return actualizarClienteCommandHandler.handle(
                new ActualizarClienteCommand(id, cliente));
    }
}
