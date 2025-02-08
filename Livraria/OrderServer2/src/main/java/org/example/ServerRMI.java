package org.example;

import org.example.services.OrdersImpl;

import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class ServerRMI {

    public static void main(String[] args) {
        try {

            OrdersImpl server = new OrdersImpl();

            // Exportando o objeto remoto
            OrderServices stub = (OrderServices) UnicastRemoteObject.exportObject(server, 0);

            // Criando e registrando no RMI Registry
            Registry registry = LocateRegistry.createRegistry(1099);
            registry.rebind("OrderServices", stub);

            System.out.println("RMI Server is running...");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}