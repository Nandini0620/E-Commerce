package com.example.e_commerce.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface CustomUserDetailsService extends UserDetailsService
{
    @Override
    UserDetails loadUserByUsername(String email);

}
