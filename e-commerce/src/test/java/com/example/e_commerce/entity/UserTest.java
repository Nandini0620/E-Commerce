package com.example.e_commerce.entity;

import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {
    
    @Test
    void testUserSettersAndGetters() 
    {
        User user = new User();
        user.setName("Nandini");
        user.setEmail("nandini@gmail.com");
        user.setPassword("encoded123");
        user.setRole("ROLE_USER");

        assertEquals("Nandini", user.getName());
        assertEquals("nandini@gmail.com", user.getEmail());
        assertEquals("encoded123", user.getPassword());
        assertEquals("ROLE_USER", user.getRole());
    }

    @Test
    void testUserId() 
    {
        User user = new User();
        user.setId(1L);
        assertEquals(1L, user.getId());
    }

    @Test
    void testCreatedAt() 
    {
        User user = new User();
        LocalDateTime now = LocalDateTime.now();
        user.setCreatedAt(now);
        assertEquals(now, user.getCreatedAt());
    }

    @Test
    void testDefaultConstructor() 
    {
        User user = new User();
        assertNotNull(user);
    }
}
