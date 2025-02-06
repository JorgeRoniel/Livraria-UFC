package com.ufc.br.api_gateway.services;

import com.ufc.br.api_gateway.domain.User;
import com.ufc.br.api_gateway.dto.CreateUserDTO;
import com.ufc.br.api_gateway.dto.EditUserDTO;

public interface UserServices {

    User createUser(CreateUserDTO data);
    User updateUser(int id, EditUserDTO data);
    User findUser (int id);
    void deleteUser(int id);
}
