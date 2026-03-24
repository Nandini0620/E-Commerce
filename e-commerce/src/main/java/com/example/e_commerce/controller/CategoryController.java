package com.example.e_commerce.controller;

import com.example.e_commerce.dto.CategoryRequest;
import com.example.e_commerce.dto.CategoryResponse;
import com.example.e_commerce.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

        private final CategoryService categoryService;

        public CategoryController(CategoryService categoryService) {
            this.categoryService = categoryService;
        }

        @PreAuthorize("hasAuthority('ROLE_ADMIN')")
        @PostMapping("/create")
        public ResponseEntity<String> addCategory(@RequestBody CategoryRequest request) {

            return ResponseEntity.ok(categoryService.addCategory(request));
        }
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
        @GetMapping("/get")
        public ResponseEntity<List<CategoryResponse>> getAllCategories() {

            return ResponseEntity.ok(categoryService.getAllCategories());
        }
}

