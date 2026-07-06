package com.prestaya.prestaya.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prestaya.prestaya.dto.TipoCambioResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;

@Service
public class TipoCambioService {

    private static final double TASA_REFERENCIAL_USD_PEN = 3.75;

    private final HttpClient httpClient;

    private final ObjectMapper objectMapper;

    @Value("${exchange.api.key:}")
    private String apiKey;

    @Value("${exchange.api.base-url:https://v6.exchangerate-api.com/v6}")
    private String baseUrl;

    public TipoCambioService() {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    public TipoCambioResponse obtenerUsdPen() {
        return convertir("USD", "PEN", 1.0);
    }

    public TipoCambioResponse convertir(
            String origen,
            String destino,
            Double monto) {

        String monedaOrigen =
                normalizarMoneda(origen, "USD");
        String monedaDestino =
                normalizarMoneda(destino, "PEN");
        double montoSeguro =
                monto == null || monto <= 0 ? 1.0 : monto;

        if (monedaOrigen.equals(monedaDestino)) {
            return new TipoCambioResponse(
                    monedaOrigen,
                    monedaDestino,
                    montoSeguro,
                    1.0,
                    montoSeguro,
                    "Conversion local",
                    LocalDateTime.now().toString(),
                    true,
                    "Monedas iguales");
        }

        if (apiKey == null || apiKey.isBlank()) {
            return respuestaReferencial(
                    monedaOrigen,
                    monedaDestino,
                    montoSeguro,
                    "Configura EXCHANGE_API_KEY para consumir la API externa.");
        }

        try {
            String url =
                    baseUrl
                    + "/"
                    + apiKey
                    + "/pair/"
                    + monedaOrigen
                    + "/"
                    + monedaDestino
                    + "/"
                    + montoSeguro;

            HttpRequest request =
                    HttpRequest.newBuilder()
                            .uri(URI.create(url))
                            .GET()
                            .build();

            HttpResponse<String> response =
                    httpClient.send(
                            request,
                            HttpResponse.BodyHandlers.ofString());

            JsonNode json =
                    objectMapper.readTree(response.body());

            if (!"success".equals(json.path("result").asText())) {
                return respuestaReferencial(
                        monedaOrigen,
                        monedaDestino,
                        montoSeguro,
                        "La API externa no devolvio una respuesta valida.");
            }

            double tasa =
                    json.path("conversion_rate").asDouble();
            double resultado =
                    json.path("conversion_result").asDouble();

            return new TipoCambioResponse(
                    monedaOrigen,
                    monedaDestino,
                    montoSeguro,
                    tasa,
                    resultado,
                    "ExchangeRate-API",
                    json.path("time_last_update_utc").asText(
                            LocalDateTime.now().toString()),
                    true,
                    "Tipo de cambio obtenido correctamente.");

        } catch (Exception exception) {
            return respuestaReferencial(
                    monedaOrigen,
                    monedaDestino,
                    montoSeguro,
                    "No se pudo conectar con la API externa.");
        }
    }

    private TipoCambioResponse respuestaReferencial(
            String origen,
            String destino,
            double monto,
            String mensaje) {

        double tasa = obtenerTasaReferencial(origen, destino);

        return new TipoCambioResponse(
                origen,
                destino,
                monto,
                tasa,
                monto * tasa,
                "Tasa referencial local",
                LocalDateTime.now().toString(),
                false,
                mensaje);
    }

    private double obtenerTasaReferencial(
            String origen,
            String destino) {

        if ("USD".equals(origen) && "PEN".equals(destino)) {
            return TASA_REFERENCIAL_USD_PEN;
        }

        if ("PEN".equals(origen) && "USD".equals(destino)) {
            return 1 / TASA_REFERENCIAL_USD_PEN;
        }

        return 1.0;
    }

    private String normalizarMoneda(
            String moneda,
            String valorPorDefecto) {

        if (moneda == null || moneda.isBlank()) {
            return valorPorDefecto;
        }

        return moneda.trim().toUpperCase();
    }
}
