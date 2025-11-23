package com.Product.OrderService.service;


import java.util.List;

import com.Product.OrderService.dto.request.ProductRequestDTO;
import com.Product.OrderService.dto.response.ProductResponseDTO;

public interface ProductService {

    ProductResponseDTO createProduct(ProductRequestDTO requestDTO);

    ProductResponseDTO getProductById(Long id);
    List<ProductResponseDTO> getAllProducts();
    List<ProductResponseDTO> getActiveProducts();
    List<ProductResponseDTO> getProductsByCategory(Long categoryId);
    List<ProductResponseDTO> getProductsByStatus(String status);
    

    ProductResponseDTO updateProduct(Long id, ProductRequestDTO requestDTO);
    ProductResponseDTO updateStock(Long id, Integer stock);
    ProductResponseDTO updatePrice(Long id, java.math.BigDecimal price);

    void deleteProduct(Long id);

    ProductResponseDTO activateProduct(Long id);
    ProductResponseDTO deactivateProduct(Long id);

    ProductResponseDTO changeStatus(Long id, String status);

    boolean existsBySku(String sku);
    boolean hasStock(Long id);
}