package com.ufc.br.api_gateway.services;

import org.example.OrderServices;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

@Service
public class OrderServiceRMI {

    public String crateOrderRMI(String book_name, BigDecimal price, int userId){
        try {
            Registry registry = LocateRegistry.getRegistry("localhost", 1099);

            OrderServices stub = (OrderServices) registry.lookup("OrderServices");

            String response = stub.createOrder(book_name, price, userId);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return "Fail";
        }
    }
}
