
package com.example.e_commerce.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

    public class CartTest
    {
        Cart cart;
        User user;
        Product product;

        @BeforeEach
        void setUp()
        {
            cart = new Cart();
            user=new User();
            product=new Product();
            cart.setId(1L);
            cart.setUser(user);
            cart.setQuantity(10);
            cart.setProduct(product);
        }

        @Test
        void testCartId()
        {
            assertEquals(1L,cart.getId());
        }

        @Test
        void testCartUser()
        {
            assertNotNull(cart.getUser());
        }

        @Test
        void testCartProduct()
        {
            assertNotNull(cart.getProduct());
        }

        @Test
        void testCartQuantity()
        {
            assertEquals(10,cart.getQuantity());
        }
    }


