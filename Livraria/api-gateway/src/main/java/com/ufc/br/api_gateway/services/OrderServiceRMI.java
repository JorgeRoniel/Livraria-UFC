package com.ufc.br.api_gateway.services;

import org.example.OrderServices;
import org.example.models.Order;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.ArrayList;
import java.util.List;

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

    public ArrayList<Order> listOrders(int userId){
        try {
            Registry registry = LocateRegistry.getRegistry("localhost", 1099);

            OrderServices stub = (OrderServices) registry.lookup("OrderServices");

            ArrayList<Order> response = stub.listOrders(userId);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String deleteOrder(int id){
        try {
            Registry registry = LocateRegistry.getRegistry("localhost", 1099);

            OrderServices stub = (OrderServices) registry.lookup("OrderServices");

            String response = stub.deleteOrder(id);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return "Fail!";
        }
    }
}
