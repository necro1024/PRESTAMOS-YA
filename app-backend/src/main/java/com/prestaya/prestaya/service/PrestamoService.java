package com.prestaya.prestaya.service;


import com.prestaya.prestaya.model.Prestamo;
import com.prestaya.prestaya.repository.PrestamoRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrestamoService {

    private final PrestamoRepository repository;

    public PrestamoService(PrestamoRepository repository) {
        this.repository = repository;
    }

    public List<Prestamo> listar() {
        return repository.findAll();
    }

    public Prestamo guardar(Prestamo prestamo) {
        return repository.save(prestamo);
    }

    public Prestamo actualizar(
            Long id,
            Prestamo actualizado) {

        Prestamo prestamo =
                repository.findById(id).orElse(null);

        if (prestamo == null) {
            return null;
        }

        prestamo.setMonto(actualizado.getMonto());
        prestamo.setGarantia(actualizado.getGarantia());
        prestamo.setEstado(actualizado.getEstado());

        return repository.save(prestamo);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}