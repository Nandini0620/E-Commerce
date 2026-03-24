package com.example.e_commerce.controller;

import com.example.e_commerce.dto.ProductRequest;
import com.example.e_commerce.dto.ProductResponse;
import com.example.e_commerce.service.ProductService;
import com.example.e_commerce.serviceImpl.ProductServiceImpl;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductServiceImpl productService) {
        this.productService = productService;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<String> addProduct(@Valid @RequestBody ProductRequest request) {

        String response = productService.addProduct(request);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    @GetMapping("/get")
    public ResponseEntity<Page<ProductResponse>> getAllProducts
            (@PageableDefault(size=5) Pageable pageable)
    {
        return ResponseEntity.ok(productService.getAllProducts(pageable));
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    @GetMapping("/getById/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id)
    {
         return ResponseEntity.ok(productService.getProductById(id));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id,
                                                 @RequestBody ProductRequest request)
    {
        ProductResponse updatedProduct = productService.updateProduct(id, request);
        return ResponseEntity.ok(updatedProduct);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id)
    {
        productService.deleteProduct(id);
        return ResponseEntity.ok("PRODUCT REMOVED");
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/search")
    public ResponseEntity<Page<ProductResponse>> searchProducts(
            @RequestParam String name,
            @PageableDefault(size = 5) Pageable pageable)
    {
        return ResponseEntity.ok(productService.searchProducts(name, pageable));
    }
}