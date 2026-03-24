package com.example.e_commerce.service;

import com.example.e_commerce.dto.CartResponse;
import com.example.e_commerce.entity.Cart;

import java.util.List;

public interface CartService
{
    String addToCart(Long userId, Long productId, int quantity);
    List<CartResponse> getCartItems(Long userId);
}
