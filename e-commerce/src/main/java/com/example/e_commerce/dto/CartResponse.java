package com.example.e_commerce.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CartResponse {
    private Long id;
    private Long userId;
    private Long productId;
    private String productName;
    private Double price;
    private String categoryName;
    private int quantity;
}
