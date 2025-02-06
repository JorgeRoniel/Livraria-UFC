package com.ufc.br.api_gateway.services.impl;

import com.ufc.br.api_gateway.domain.User;
import com.ufc.br.api_gateway.dto.CreateUserDTO;
import com.ufc.br.api_gateway.dto.EditUserDTO;
import com.ufc.br.api_gateway.repositories.UserRepository;
import com.ufc.br.api_gateway.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServicesImpl implements UserServices {
    @Autowired
    private UserRepository repository;

    @Override
    public User createUser(CreateUserDTO data) {
        User u = new User(data.name(), data.email(), data.password(), data.balance());
        return this.repository.save(u);
    }

    @Override
    public User updateUser(int id, EditUserDTO data) {
        User u = this.repository.findById(id).orElse(null);
        if(u != null){
            u.setName(data.name());
            u.setEmail(data.email());
            u.setBalance(data.balance());

            return this.repository.save(u);
        }
        return null;
    }

    @Override
    public User findUser(int id) {
        User user = this.repository.findById(id).orElse(null);
        return user;
    }

    @Override
    public void deleteUser(int id) {
        this.repository.deleteById(id);
    }
}
