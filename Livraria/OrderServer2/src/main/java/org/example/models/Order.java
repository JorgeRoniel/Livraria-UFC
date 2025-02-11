package org.example.models;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

public class Order implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private int id;
    private String bookName;
    private BigDecimal price;
    private String status;
    private int userId;

    public Order(String bookName, BigDecimal price, String status, int userId) {
        this.bookName = bookName;
        this.price = price;
        this.status = status;
        this.userId = userId;
    }

    public Order(String bookName, BigDecimal price, int userId) {
        this.bookName = bookName;
        this.price = price;
        this.status = "Awaiting Payment";
        this.userId = userId;
    }

    public Order() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String nameBook) {
        this.bookName = nameBook;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
