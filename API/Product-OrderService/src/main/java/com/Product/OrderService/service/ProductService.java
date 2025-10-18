package com.Product.OrderService.service;


import java.util.List;

import com.Product.OrderService.dto.request.ProductRequestDTO;
import com.Product.OrderService.dto.response.ProductResponseDTO;

public interface ProductService {
    
    // Create
    ProductResponseDTO createProduct(ProductRequestDTO requestDTO);
    
    // Read
    ProductResponseDTO getProductById(Long id);
    List<ProductResponseDTO> getAllProducts();
    List<ProductResponseDTO> getActiveProducts();
    List<ProductResponseDTO> getProductsByCategory(Long categoryId);
    List<ProductResponseDTO> getProductsByStatus(String status);
    
    // Update
    ProductResponseDTO updateProduct(Long id, ProductRequestDTO requestDTO);
    ProductResponseDTO updateStock(Long id, Integer stock);
    ProductResponseDTO updatePrice(Long id, java.math.BigDecimal price);
    
    // Delete (logical)
    void deleteProduct(Long id);
    
    // Activate/Deactivate
    ProductResponseDTO activateProduct(Long id);
    ProductResponseDTO deactivateProduct(Long id);
    
    // Status Management
    ProductResponseDTO changeStatus(Long id, String status);
    
    // Validations
    boolean existsBySku(String sku);
    boolean hasStock(Long id);
}