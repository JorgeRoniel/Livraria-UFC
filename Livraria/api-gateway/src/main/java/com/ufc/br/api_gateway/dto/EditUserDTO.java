package com.ufc.br.api_gateway.dto;

import java.math.BigDecimal;

public record EditUserDTO(String name, String email, BigDecimal balance) {
}
