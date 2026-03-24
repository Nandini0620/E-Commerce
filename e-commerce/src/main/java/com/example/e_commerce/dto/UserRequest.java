package com.example.e_commerce.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest
{
    private String name;
    private String email;
    private String password;
    private String role;

}
