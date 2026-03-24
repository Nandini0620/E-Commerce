package com.example.e_commerce.service;

import com.example.e_commerce.dto.CategoryRequest;
import com.example.e_commerce.dto.CategoryResponse;

import java.util.List;

public interface CategoryService
{
    String addCategory(CategoryRequest request);

    List<CategoryResponse> getAllCategories();
}
