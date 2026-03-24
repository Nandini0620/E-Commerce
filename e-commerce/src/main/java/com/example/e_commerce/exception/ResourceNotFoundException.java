package com.example.e_commerce.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;


public class ResourceNotFoundException extends RuntimeException
{
    public ResourceNotFoundException(String message)
    {
        super(message);
    }
}
