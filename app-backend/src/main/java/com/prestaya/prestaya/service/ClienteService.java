package com.prestaya.prestaya.service;

import com.prestaya.prestaya.model.Cliente;
import com.prestaya.prestaya.repository.ClienteRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    public List<Cliente> listar() {
        return repository.findAll();
    }

    public Cliente guardar(Cliente cliente) {
        return repository.save(cliente);
    }

    public Cliente obtener(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    public Cliente actualizar(Long id, Cliente clienteActualizado) {

    Cliente cliente = repository.findById(id).orElse(null);

    if (cliente == null) {
        return null;
    }

    cliente.setNombre(clienteActualizado.getNombre());
    cliente.setDni(clienteActualizado.getDni());
    cliente.setCorreo(clienteActualizado.getCorreo());
    cliente.setTelefono(clienteActualizado.getTelefono());
    cliente.setEstado(clienteActualizado.getEstado());

    return repository.save(cliente);
}
}