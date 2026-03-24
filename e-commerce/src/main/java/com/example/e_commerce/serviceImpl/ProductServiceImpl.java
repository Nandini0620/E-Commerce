package com.example.e_commerce.serviceImpl;

import com.example.e_commerce.dto.ProductRequest;
import com.example.e_commerce.dto.ProductResponse;
import com.example.e_commerce.entity.Category;
import com.example.e_commerce.entity.Product;
import com.example.e_commerce.exception.ResourceNotFoundException;
import com.example.e_commerce.repository.CategoryRepository;
import com.example.e_commerce.repository.ProductRepository;
import com.example.e_commerce.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService
{
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository,CategoryRepository categoryRepository)
    {
        this.productRepository = productRepository;
        this.categoryRepository= categoryRepository;
    }

    @Override
    public String addProduct(ProductRequest request)
    {
        Product product =new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        Category category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        product.setCategory(category);

        productRepository.save(product);
        return "PRODUCT ADDED SUCCESSFULLY";
    }

    @Override
    public List<ProductResponse> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ProductResponse getProductById(Long id)
    {
        Product product= productRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Product not Found with Id : "+id));

        return mapToResponse(product);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request)
    {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found with id: " + id));

        // update fields
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        Category category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));


        product.setCategory(category);

        Product updatedProduct = productRepository.save(product);
        return mapToResponse(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found with id: " + id));

        productRepository.delete(product);
    }

    private ProductResponse mapToResponse(Product product) {

        ProductResponse response = new ProductResponse();

        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setStockQuantity(product.getStockQuantity());
        response.setCreatedAt(product.getCreatedAt());
        if (product.getCategory() != null) {
            response.setCategoryName(product.getCategory().getName());
        } else {
            response.setCategoryName("Uncategorized");
        }

        return response;
    }

    @Override
    public Page<ProductResponse> getAllProducts(Pageable pageable)
    {
        Page<Product> productPage=productRepository.findAll(pageable);

        return productPage.map(this::mapToResponse);
    }

    @Override
    public Page<ProductResponse> searchProducts(String name, Pageable pageable)
    {
        Page<Product> products= productRepository.findByNameContainingIgnoreCase(name,pageable);
        return products.map(this::mapToResponse);
    }
}
