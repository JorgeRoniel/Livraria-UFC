package com.ufc.br.api_gateway.controllers;

import com.ufc.br.api_gateway.dto.CreateOrderDTO;
import com.ufc.br.api_gateway.services.OrderServiceRMI;
import org.example.models.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/order")
public class OrderController {

    @Autowired
    private OrderServiceRMI serviceRMI;

    @PostMapping
    public ResponseEntity newOrder(@RequestBody CreateOrderDTO data){
        String response = this.serviceRMI.crateOrderRMI(data.bookName(), data.price(), data.userId());

        if(response.equals("Order Created!")){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().body(response);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<ArrayList<Order>> listOrders(@PathVariable("id") int userId){
        if(this.serviceRMI.listOrders(userId) == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(this.serviceRMI.listOrders(userId));
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity deleteOrder(@PathVariable("id") int id){
        String response = this.serviceRMI.deleteOrder(id);
        if(response.equals("Order Deleted!")) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }
}
