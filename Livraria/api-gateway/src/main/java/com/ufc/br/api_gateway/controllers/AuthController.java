package com.ufc.br.api_gateway.controllers;

import com.ufc.br.api_gateway.domain.User;
import com.ufc.br.api_gateway.dto.CreateUserDTO;
import com.ufc.br.api_gateway.dto.LoginDTO;
import com.ufc.br.api_gateway.dto.LoginResponseDTO;
import com.ufc.br.api_gateway.infra.TokenService;
import com.ufc.br.api_gateway.repositories.UserRepository;
import com.ufc.br.api_gateway.services.UserServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository repository;
    private final UserServices services;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDTO data){
        User u = repository.findByEmail(data.email()).orElseThrow(() -> new RuntimeException("User not Found!"));
        if(u.getPass().equals(data.password())){
            String token = tokenService.generateToken(u);
            return ResponseEntity.ok(new LoginResponseDTO(token, u.getName()));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody CreateUserDTO data){
        User u = this.services.createUser(data);
        if(u == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok().build();
    }
}
