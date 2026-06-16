package com.prestaya.prestaya.application.command.garantia;

import com.prestaya.prestaya.model.Garantia;

public record ActualizarGarantiaCommand(
        Long id,
        Garantia garantia) {
}
