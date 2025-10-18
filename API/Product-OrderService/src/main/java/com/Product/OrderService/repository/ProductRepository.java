package com.Product.OrderService.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Product.OrderService.entity.Product;
import com.Product.OrderService.entity.ProductStatus;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Find by SKU (case insensitive)
    Optional<Product> findBySkuIgnoreCase(String sku);
    
    // Check if exists by SKU (case insensitive)
    boolean existsBySkuIgnoreCase(String sku);
    
    // Find all active products
    List<Product> findByIsActiveTrue();
    
    // Find all inactive products
    List<Product> findByIsActiveFalse();
    
    // Find by category ID
    List<Product> findByCategoryId(Long categoryId);
    
    // Find by category ID and active status
    List<Product> findByCategoryIdAndIsActiveTrue(Long categoryId);
    
    // Find by status
    List<Product> findByStatus(ProductStatus status);
    
    // Find by status and active
    List<Product> findByStatusAndIsActiveTrue(ProductStatus status);
    
    // Find by name containing (search)
    List<Product> findByNameContainingIgnoreCase(String name);
    
    // Find by name containing and active
    List<Product> findByNameContainingIgnoreCaseAndIsActiveTrue(String name);
    
    // Find products with stock greater than 0
    List<Product> findByStockGreaterThan(Integer stock);
    
    // Find products with stock equals 0
    List<Product> findByStockEquals(Integer stock);
    
    // Find by price range
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);
    
    // Find by category and price range
    List<Product> findByCategoryIdAndPriceBetween(Long categoryId, Double minPrice, Double maxPrice);
}