package com.example.e_commerce.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse
{
    private Long id;
    private String name;
    private String email;
    private String role;
}
