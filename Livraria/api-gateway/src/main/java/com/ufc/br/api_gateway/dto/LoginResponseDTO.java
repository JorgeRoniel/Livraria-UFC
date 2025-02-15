package com.ufc.br.api_gateway.dto;

import java.math.BigDecimal;

public record LoginResponseDTO(int id, String name, BigDecimal balance) {
}
