package com.ufc.br.OrderServer.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "tb_order")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String bookName;
    @Column
    private BigDecimal price;
    @Column
    private String status;
    @Column
    private int userId;

    public Order(String bookName, BigDecimal price, int userId) {
        this.bookName = bookName;
        this.price = price;
        this.status = "Awaiting Payment";
        this.userId = userId;
    }
}
