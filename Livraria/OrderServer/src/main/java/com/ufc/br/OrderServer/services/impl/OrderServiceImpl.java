package com.ufc.br.OrderServer.services.impl;

import com.ufc.br.OrderServer.domain.Order;
import com.ufc.br.OrderServer.repositories.OrderRepository;
import org.example.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

@Service
public class OrderServiceImpl extends UnicastRemoteObject implements OrderServices {

    @Autowired
    private OrderRepository repository;

    public OrderServiceImpl() throws RemoteException {
        super();
    }

    @Override
    public String createOrder(String s, BigDecimal bigDecimal, int i) throws RemoteException {
        Order order = new Order(s, bigDecimal, i);
        this.repository.save(order);
        return "Order Created!";
    }
}
