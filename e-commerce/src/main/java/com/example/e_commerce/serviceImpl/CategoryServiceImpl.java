package com.example.e_commerce.serviceImpl;

import com.example.e_commerce.dto.CategoryRequest;
import com.example.e_commerce.dto.CategoryResponse;
import com.example.e_commerce.entity.Category;
import com.example.e_commerce.repository.CategoryRepository;
import com.example.e_commerce.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService
{

        private final CategoryRepository categoryRepository;

        public CategoryServiceImpl(CategoryRepository categoryRepository) {
            this.categoryRepository = categoryRepository;
        }

        @Override
        public String addCategory(CategoryRequest request) {

            boolean exists = categoryRepository.existsByNameIgnoreCase(request.getName());
            if (exists) {
                throw new RuntimeException("Category '" + request.getName() + "' already exists!");
            }

            Category category = new Category();
            category.setName(request.getName());
            categoryRepository.save(category);

            return "Category added successfully";
        }

        @Override
        public List<CategoryResponse> getAllCategories() {

            List<Category> categories = categoryRepository.findAll();

            return categories.stream().map(category -> {

                CategoryResponse response = new CategoryResponse();
                response.setId(category.getId());
                response.setName(category.getName());

                return response;

            }).collect(Collectors.toList());
        }
}

