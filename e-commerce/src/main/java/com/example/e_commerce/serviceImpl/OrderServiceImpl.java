package com.example.e_commerce.serviceImpl;

import com.example.e_commerce.entity.Cart;
import com.example.e_commerce.entity.Orders;
import com.example.e_commerce.repository.CartRepository;
import com.example.e_commerce.repository.OrderRepository;
import com.example.e_commerce.repository.UserRepository;
import com.example.e_commerce.service.OrderService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    public OrderServiceImpl(OrderRepository orderRepository,
                            CartRepository cartRepository,
                            UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }

    @Override
    public String placeOrder(Long userId) {

        List<Cart> cartItems = cartRepository.findByUserId(userId);

        double total = cartItems.stream()
                .mapToDouble(item ->
                        item.getProduct().getPrice()
                                .multiply(BigDecimal.valueOf(item.getQuantity()))
                                .doubleValue()
                )
                .sum();

        Orders order = new Orders();
        order.setUser(userRepository.findById(userId).orElseThrow());
        order.setTotalAmount(total);
        order.setStatus("PLACED");

        orderRepository.save(order);

        // IMPORTANT 👉 cart clear karo
        cartRepository.deleteAll(cartItems);

        return "Order placed successfully";
    }

    @Override
    public List<Orders> getOrders(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
