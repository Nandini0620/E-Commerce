package com.example.e_commerce.serviceImpl;

import com.example.e_commerce.dto.CartResponse;
import com.example.e_commerce.entity.Cart;
import com.example.e_commerce.entity.Product;
import com.example.e_commerce.entity.User;
import com.example.e_commerce.repository.CartRepository;
import com.example.e_commerce.repository.ProductRepository;
import com.example.e_commerce.repository.UserRepository;
import com.example.e_commerce.service.CartService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartServiceImpl(CartRepository cartRepository,
                           UserRepository userRepository,
                           ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Override
    public String addToCart(Long userId, Long productId, int quantity) {

        User user = userRepository.findById(userId).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(quantity);

        cartRepository.save(cart);

        return "Added to cart";
    }

    @Override
    public List<CartResponse> getCartItems(Long userId)
    {
        List<Cart> cartItems = cartRepository.findByUserId(userId);

        return cartItems.stream().map(cart -> new CartResponse(
                cart.getId(),
                cart.getUser().getId(),
                cart.getProduct().getId(),
                cart.getProduct().getName(),
                cart.getProduct().getPrice().doubleValue(),
                cart.getProduct().getCategory().getName(),
                cart.getQuantity()
        )).collect(Collectors.toList());
    }
}
