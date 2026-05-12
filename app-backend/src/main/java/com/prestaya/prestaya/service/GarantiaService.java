package com.prestaya.prestaya.service;

import com.prestaya.prestaya.model.Garantia;

import com.prestaya.prestaya.repository.GarantiaRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GarantiaService {

    private final GarantiaRepository repository;

    public GarantiaService(
            GarantiaRepository repository) {

        this.repository = repository;
    }

    public List<Garantia> listar() {
        return repository.findAll();
    }

    public Garantia guardar(
            Garantia garantia) {

        return repository.save(garantia);
    }

    public Garantia actualizar(
            Long id,
            Garantia actualizada) {

        Garantia garantia =
                repository.findById(id).orElse(null);

        if (garantia == null) {
            return null;
        }

        garantia.setTipo(actualizada.getTipo());

        garantia.setIdentificador(
                actualizada.getIdentificador());

        garantia.setValorEstimado(
                actualizada.getValorEstimado());

        garantia.setEstado(
                actualizada.getEstado());

        return repository.save(garantia);
    }

    public void eliminar(Long id) {

        repository.deleteById(id);
    }
}
