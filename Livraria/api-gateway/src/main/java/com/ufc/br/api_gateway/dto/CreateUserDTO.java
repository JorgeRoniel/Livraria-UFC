package com.ufc.br.api_gateway.dto;

import java.math.BigDecimal;

public record CreateUserDTO(String name, String email, String password, BigDecimal balance) {
}
