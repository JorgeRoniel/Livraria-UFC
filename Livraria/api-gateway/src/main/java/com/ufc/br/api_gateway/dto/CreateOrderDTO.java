package com.ufc.br.api_gateway.dto;

import java.math.BigDecimal;

public record CreateOrderDTO(String bookName, BigDecimal price, int userId) {
}
