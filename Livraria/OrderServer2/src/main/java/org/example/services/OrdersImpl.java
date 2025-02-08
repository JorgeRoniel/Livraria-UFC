package org.example.services;

import org.example.OrderServices;

import java.math.BigDecimal;
import java.rmi.RemoteException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class OrdersImpl implements OrderServices {

    private static String DB_URL = "jdbc:postgresql://localhost:5433/livraria_ufc";
    private static String DB_USER = "postgres";
    private static String DB_PASS = "Password123#@!";

    private Connection conn(){
        Connection conect = null;
        try {
            conect = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return conect;
    }

    private Statement statement(){
        Statement s = null;
        try {
            Connection c = conn();
            s = c.createStatement();
        } catch (Exception e) {
            throw new RuntimeException();
        }

        return s;
    }

    public OrdersImpl(){}

    @Override
    public String createOrder(String s, BigDecimal bigDecimal, int i) throws RemoteException {
        try {
            Connection c = conn();
            Statement st = statement();

            String sql = "INSERT INTO tb_order (book_name, price, status, user_id) VALUES ('"+s+"',"+bigDecimal+", 'Awaiting Payment', "+i+" );";
            st.executeUpdate(sql);

            c.close();
            return "Order Created!";
        } catch (Exception e) {
            return "Error!";
        }
    }
}
