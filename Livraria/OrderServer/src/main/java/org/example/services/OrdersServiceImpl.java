package org.example.services;

import org.example.OrderServices;
import org.example.models.Order;

import java.math.BigDecimal;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OrdersServiceImpl implements OrderServices {

    private static final String DB_URL = "jdbc:postgresql://postgres:5432/livraria_ufc";
    private static final String DB_USER = "postgres";
    private static final String DB_PASS = "Password123#@!";

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

    public OrdersServiceImpl() {
    }

    @Override
    public String createOrder(String s, BigDecimal bigDecimal, int i) throws RemoteException {
        try {
            Connection c = conn();
            Statement st = statement();

            Order order = new Order(s, bigDecimal, i);

            String sql = "INSERT INTO orders (book_name, price, status, user_id) VALUES ('"+order.getBookName()+"',"+order.getPrice()+", '"+order.getStatus()+"', "+order.getUserId()+" );";
            st.executeUpdate(sql);

            c.close();
            return "Order Created!";
        } catch (SQLException e) {
            return "Error while creating order!";
        }
    }

    @Override
    public ArrayList<Order> listOrders(int i) throws RemoteException{
        try {
            Connection c = conn();
            Statement st = statement();

            String sql = "SELECT o.id, o.book_name, o.price, o.status, o.user_id FROM orders o INNER JOIN users u ON o.user_id = "+i+";";
            st.execute(sql);

            ResultSet rs = st.getResultSet();

            ArrayList<Order> orderList = new ArrayList<>();
            while (rs.next()){
                Order order = new Order();
                order.setId(rs.getInt("id"));
                order.setBookName(rs.getString("book_name"));
                order.setPrice(rs.getBigDecimal("price"));
                order.setStatus(rs.getString("status"));
                order.setUserId(rs.getInt("user_id"));

                orderList.add(order);
            }

            c.close();
            return orderList;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public String deleteOrder(int i) throws RemoteException{
        try {
            Connection c = conn();
            Statement st = statement();

            String sql = "DELETE FROM orders WHERE id = "+i+";";
            st.executeUpdate(sql);

            c.close();
            return "Order Deleted!";
        } catch (Exception e) {
            return "Error while deleting order!";
        }
    }
}
