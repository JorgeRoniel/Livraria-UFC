package com.ufc.br.api_gateway.controllers;

import com.ufc.br.api_gateway.dto.CreateOrderDTO;
import com.ufc.br.api_gateway.services.OrderServiceRMI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        return ResponseEntity.badRequest().build();
    }
}
