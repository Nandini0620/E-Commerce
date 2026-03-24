package com.example.e_commerce.controller;

import com.example.e_commerce.dto.CartResponse;
import com.example.e_commerce.entity.Cart;
import com.example.e_commerce.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController
{
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestParam Long userId,
                                            @RequestParam Long productId,
                                            @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.addToCart(userId, productId, quantity));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CartResponse>> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }
}
