package com.example.e_commerce.service;

import com.example.e_commerce.dto.UserRequest;
import com.example.e_commerce.dto.UserResponse;

public interface UserService
{
    UserResponse registerUser(UserRequest userRequest);
}
