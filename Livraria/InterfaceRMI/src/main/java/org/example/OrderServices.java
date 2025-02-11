package org.example;
import org.example.models.Order;

import java.math.BigDecimal;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.List;

public interface OrderServices extends Remote {
    String createOrder(String bookName, BigDecimal price, int userId) throws RemoteException;
    ArrayList<Order> listOrders(int userId) throws RemoteException;
    String deleteOrder(int id) throws RemoteException;
}