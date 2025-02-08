package org.example;
import java.math.BigDecimal;
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface OrderServices extends Remote {
    String createOrder(String bookName, BigDecimal price, int userId) throws RemoteException;

}