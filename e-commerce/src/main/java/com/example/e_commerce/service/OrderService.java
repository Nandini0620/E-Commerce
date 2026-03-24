package com.example.e_commerce.service;

import com.example.e_commerce.entity.Orders;

import java.util.List;

public interface OrderService
{
    String placeOrder(Long userId);
    List<Orders> getOrders(Long userId);
}
