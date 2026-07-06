package com.prestaya.prestaya.service;


import com.prestaya.prestaya.model.Prestamo;
import com.prestaya.prestaya.repository.PrestamoRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PrestamoService {

    public static final double INTERES_BASE_ANUAL = 15.0;
    public static final double DESCUENTO_MAXIMO_SEGURIDAD = 5.0;
    public static final int PUNTAJE_MINIMO_RECOMPENSA = 80;

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
        prestamo.setInteresAnual(INTERES_BASE_ANUAL);
        prepararPrestamo(prestamo);
        return repository.save(prestamo);
    }

    public Prestamo aplicarRecompensaSeguridad(
            Prestamo prestamo,
            Integer puntuacionSeguridad) {

        if (prestamo == null) {
            return null;
        }

        prestamo.setInteresAnual(
                calcularInteresConRecompensa(
                        puntuacionSeguridad));

        prepararPrestamo(prestamo);
        return repository.save(prestamo);
    }

    public double calcularInteresConRecompensa(
            Integer puntuacionSeguridad) {

        return INTERES_BASE_ANUAL
                - calcularDescuentoPorSeguridad(
                        puntuacionSeguridad);
    }

    public double calcularDescuentoPorSeguridad(
            Integer puntuacionSeguridad) {

        if (puntuacionSeguridad == null
                || puntuacionSeguridad <= PUNTAJE_MINIMO_RECOMPENSA) {
            return 0.0;
        }

        double descuento =
                (puntuacionSeguridad - PUNTAJE_MINIMO_RECOMPENSA)
                * (DESCUENTO_MAXIMO_SEGURIDAD
                / (100.0 - PUNTAJE_MINIMO_RECOMPENSA));

        return Math.min(
                DESCUENTO_MAXIMO_SEGURIDAD,
                descuento);
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
        prestamo.setMoneda(actualizado.getMoneda());
        prestamo.setTipoCambioUsdPen(actualizado.getTipoCambioUsdPen());
        prestamo.setMontoEnSoles(actualizado.getMontoEnSoles());
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

        if (prestamo.getMoneda() == null
                || prestamo.getMoneda().isBlank()) {
            prestamo.setMoneda("PEN");
        } else {
            prestamo.setMoneda(
                    prestamo.getMoneda().trim().toUpperCase());
        }

        if (prestamo.getMonto() != null) {
            if ("USD".equals(prestamo.getMoneda())) {
                double tipoCambio =
                        prestamo.getTipoCambioUsdPen() != null
                        && prestamo.getTipoCambioUsdPen() > 0
                                ? prestamo.getTipoCambioUsdPen()
                                : 3.75;

                prestamo.setTipoCambioUsdPen(tipoCambio);
                prestamo.setMontoEnSoles(
                        prestamo.getMonto() * tipoCambio);
            } else {
                prestamo.setTipoCambioUsdPen(
                        prestamo.getTipoCambioUsdPen() != null
                        && prestamo.getTipoCambioUsdPen() > 0
                                ? prestamo.getTipoCambioUsdPen()
                                : 1.0);
                prestamo.setMontoEnSoles(prestamo.getMonto());
            }
        }

        if (prestamo.getEstado() == null
                || prestamo.getEstado().isBlank()) {
            prestamo.setEstado("Pendiente");
        }

        if (prestamo.getEstadoAcuerdo() == null
                || prestamo.getEstadoAcuerdo().isBlank()) {
            prestamo.setEstadoAcuerdo("Pendiente");
        }

        if (prestamo.getInteresAnual() == null) {
            prestamo.setInteresAnual(INTERES_BASE_ANUAL);
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
