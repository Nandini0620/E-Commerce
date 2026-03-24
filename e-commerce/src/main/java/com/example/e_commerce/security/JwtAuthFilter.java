package com.example.e_commerce.security;

import com.example.e_commerce.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.CachingUserDetailsService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter
{

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException
    {
        String token=request.getHeader("Authorization");
        if(token != null && !token.isEmpty())
        {
            token = token.substring(7);
            if(token != null && !token.isEmpty())
            {
                String username=jwtUtil.extractUsername(token);
                if(username !=null && !username.isEmpty())
                {
                    UserDetails userDetails=customUserDetailsService.loadUserByUsername(username);
                    if(userDetails !=null)
                    {
                        UsernamePasswordAuthenticationToken user=
                                new UsernamePasswordAuthenticationToken(userDetails.getUsername(),
                                        userDetails.getPassword(),
                                        userDetails.getAuthorities());

                        SecurityContextHolder.getContext().setAuthentication(user);
                    }

                }
            }

        }
        filterChain.doFilter(request,response);
    }
}
