package com.ufc.br.OrderServer;

import com.ufc.br.OrderServer.services.impl.OrderServiceImpl;
import org.example.OrderServices;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

@SpringBootApplication
public class OrderServerApplication {

	public static void main(String[] args) {
		try {
			OrderServiceImpl server = new OrderServiceImpl();

			OrderServices stub = (OrderServices) UnicastRemoteObject.exportObject(server, 0);

			Registry registry = LocateRegistry.createRegistry(1099);
			registry.rebind("OrderServices", stub);

			System.out.println("Server is running...");
		} catch (Exception e){
			e.printStackTrace();
		}
		SpringApplication.run(OrderServerApplication.class, args);
	}

}
