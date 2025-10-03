package com.Product.OrderService.service.impl;



import com.Product.OrderService.dto.request.ProductRequestDTO;
import com.Product.OrderService.dto.response.ProductResponseDTO;
import com.Product.OrderService.entity.Category;
import com.Product.OrderService.entity.Product;
import com.Product.OrderService.entity.ProductStatus;
import com.Product.OrderService.repository.CategoryRepository;
import com.Product.OrderService.repository.ProductRepository;
import com.Product.OrderService.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ProductResponseDTO createProduct(ProductRequestDTO requestDTO) {
        // Validate if SKU already exists
        if (productRepository.existsBySkuIgnoreCase(requestDTO.getSku())) {
            throw new RuntimeException("Product with SKU '" + requestDTO.getSku() + "' already exists");
        }

        // Validate if category exists
        Category category = categoryRepository.findById(requestDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + requestDTO.getCategoryId()));

        // Validate category is active
        if (!category.getIsActive()) {
            throw new RuntimeException("Cannot create product with inactive category");
        }

        Product product = Product.builder()
                .name(requestDTO.getName())
                .sku(requestDTO.getSku())
                .description(requestDTO.getDescription())
                .price(requestDTO.getPrice())
                .stock(requestDTO.getStock())
                .imageUrl(requestDTO.getImageUrl())
                .category(category)
                .status(ProductStatus.valueOf(requestDTO.getStatus().toUpperCase()))
                .isActive(true)
                .createdAt(LocalDateTime.now())
                .build();

        Product savedProduct = productRepository.save(product);
        return mapToResponseDTO(savedProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return mapToResponseDTO(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> getActiveProducts() {
        return productRepository.findByIsActiveTrue()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> getProductsByStatus(String status) {
        ProductStatus productStatus = ProductStatus.valueOf(status.toUpperCase());
        return productRepository.findByStatus(productStatus)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO requestDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Check if new SKU conflicts with existing product
        if (!product.getSku().equalsIgnoreCase(requestDTO.getSku()) 
            && productRepository.existsBySkuIgnoreCase(requestDTO.getSku())) {
            throw new RuntimeException("Product with SKU '" + requestDTO.getSku() + "' already exists");
        }

        // Validate if category exists
        Category category = categoryRepository.findById(requestDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + requestDTO.getCategoryId()));

        product.setName(requestDTO.getName());
        product.setSku(requestDTO.getSku());
        product.setDescription(requestDTO.getDescription());
        product.setPrice(requestDTO.getPrice());
        product.setStock(requestDTO.getStock());
        product.setImageUrl(requestDTO.getImageUrl());
        product.setCategory(category);
        product.setStatus(ProductStatus.valueOf(requestDTO.getStatus().toUpperCase()));
        product.setUpdatedAt(LocalDateTime.now());

        Product updatedProduct = productRepository.save(product);
        return mapToResponseDTO(updatedProduct);
    }

    @Override
    public ProductResponseDTO updateStock(Long id, Integer stock) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        product.setStock(stock);
        product.setUpdatedAt(LocalDateTime.now());
        
        Product updatedProduct = productRepository.save(product);
        return mapToResponseDTO(updatedProduct);
    }

    @Override
    public ProductResponseDTO updatePrice(Long id, java.math.BigDecimal price) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        product.setPrice(price);
        product.setUpdatedAt(LocalDateTime.now());
        
        Product updatedProduct = productRepository.save(product);
        return mapToResponseDTO(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        // Logical delete
        product.setIsActive(false);
        product.setUpdatedAt(LocalDateTime.now());
        productRepository.save(product);
    }

    @Override
    public ProductResponseDTO activateProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        product.setIsActive(true);
        product.setUpdatedAt(LocalDateTime.now());
        
        Product updatedProduct = productRepository.save(product);
        return mapToResponseDTO(updatedProduct);
    }

    @Override
    public ProductResponseDTO deactivateProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        product.setIsActive(false);
        product.setUpdatedAt(LocalDateTime.now());
        
        Product updatedProduct = productRepository.save(product);
        return mapToResponseDTO(updatedProduct);
    }

    @Override
    public ProductResponseDTO changeStatus(Long id, String status) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        product.setStatus(ProductStatus.valueOf(status.toUpperCase()));
        product.setUpdatedAt(LocalDateTime.now());
        
        Product updatedProduct = productRepository.save(product);
        return mapToResponseDTO(updatedProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsBySku(String sku) {
        return productRepository.existsBySkuIgnoreCase(sku);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean hasStock(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return product.getStock() > 0;
    }

    // Helper method to map Entity to DTO
    private ProductResponseDTO mapToResponseDTO(Product product) {
        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .sku(product.getSku())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .imageUrl(product.getImageUrl())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .status(product.getStatus().name())
                .isActive(product.getIsActive())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }
}