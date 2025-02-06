package com.ufc.br.api_gateway.controllers;

import com.ufc.br.api_gateway.domain.User;
import com.ufc.br.api_gateway.dto.EditUserDTO;
import com.ufc.br.api_gateway.services.UserServices;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserServices services;

    @PutMapping("/{id}/update")
    public ResponseEntity updateUser(@PathVariable("id") int id, @RequestBody EditUserDTO data){
        User u = this.services.updateUser(id, data);

        if(u == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok("Updated!");
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity deleteUser(@PathVariable("id") int id){
        this.services.deleteUser(id);
        return ResponseEntity.ok("Deleted!");
    }
}
