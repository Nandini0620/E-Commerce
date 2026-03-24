package com.example.e_commerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse
{
    private String token;
    private Long id;
    private String name;
    private String email;
    private String role;
}
