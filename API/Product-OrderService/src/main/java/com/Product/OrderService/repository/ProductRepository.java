package com.Product.OrderService.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Product.OrderService.entity.Product;
import com.Product.OrderService.entity.ProductStatus;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    Optional<Product> findBySkuIgnoreCase(String sku);
    
    boolean existsBySkuIgnoreCase(String sku);

    List<Product> findByIsActiveTrue();
    

    List<Product> findByIsActiveFalse();

    List<Product> findByCategoryId(Long categoryId);
    

    List<Product> findByCategoryIdAndIsActiveTrue(Long categoryId);
    

    List<Product> findByStatus(ProductStatus status);
    
    
    List<Product> findByStatusAndIsActiveTrue(ProductStatus status);
    

    List<Product> findByNameContainingIgnoreCase(String name);
  
    List<Product> findByNameContainingIgnoreCaseAndIsActiveTrue(String name);

    List<Product> findByStockGreaterThan(Integer stock);

    List<Product> findByStockEquals(Integer stock);

    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);
    
 
    List<Product> findByCategoryIdAndPriceBetween(Long categoryId, Double minPrice, Double maxPrice);
}