package com.prestaya.prestaya.service;


import com.prestaya.prestaya.model.Prestamo;
import com.prestaya.prestaya.repository.PrestamoRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    public List<Prestamo> listarPorCliente(Long clienteId) {
        return repository.findByClienteId(clienteId);
    }

    public Prestamo guardar(Prestamo prestamo) {
        prepararPrestamo(prestamo);
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
        prestamo.setCuotas(actualizado.getCuotas());
        prestamo.setInteresAnual(actualizado.getInteresAnual());
        prestamo.setCuotaMensual(actualizado.getCuotaMensual());
        prestamo.setTotalPagar(actualizado.getTotalPagar());
        prestamo.setEstadoAcuerdo(actualizado.getEstadoAcuerdo());

        prepararPrestamo(prestamo);
        return repository.save(prestamo);
    }

    public Prestamo firmarAcuerdo(
            Long id,
            Prestamo acuerdo) {

        Prestamo prestamo =
                repository.findById(id).orElse(null);

        if (prestamo == null) {
            return null;
        }

        prestamo.setAcuerdoDigital(
                acuerdo.getAcuerdoDigital());
        prestamo.setEstadoAcuerdo("Firmado");
        prestamo.setFechaFirma(LocalDateTime.now());

        return repository.save(prestamo);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    private void prepararPrestamo(Prestamo prestamo) {

        if (prestamo.getEstado() == null
                || prestamo.getEstado().isBlank()) {
            prestamo.setEstado("Pendiente");
        }

        if (prestamo.getEstadoAcuerdo() == null
                || prestamo.getEstadoAcuerdo().isBlank()) {
            prestamo.setEstadoAcuerdo("Pendiente");
        }

        if (prestamo.getInteresAnual() == null) {
            prestamo.setInteresAnual(18.0);
        }

        if (prestamo.getCuotas() == null
                || prestamo.getCuotas() <= 0) {
            prestamo.setCuotas(12);
        }

        if (prestamo.getMonto() != null) {
            double total =
                    prestamo.getMonto()
                    + (prestamo.getMonto()
                    * (prestamo.getInteresAnual() / 100)
                    * (prestamo.getCuotas() / 12.0));

            prestamo.setTotalPagar(total);
            prestamo.setCuotaMensual(
                    total / prestamo.getCuotas());
        }
    }
}
