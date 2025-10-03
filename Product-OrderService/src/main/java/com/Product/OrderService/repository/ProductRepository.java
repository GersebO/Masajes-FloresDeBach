package com.Product.OrderService.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Product.OrderService.entity.Category;
import com.Product.OrderService.entity.Product;
import com.Product.OrderService.entity.ProductStatus;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Buscar producto por SKU
    Optional<Product> findBySku(String sku);
    
    // Verificar si existe un producto con ese SKU
    boolean existsBySku(String sku);
    
    // Buscar productos por estado
    List<Product> findByStatus(ProductStatus status);
    
    // Buscar productos por categoría
    List<Product> findByCategory(Category category);
    
    // Buscar productos por categoría y estado
    List<Product> findByCategoryAndStatus(Category category, ProductStatus status);
    
    // Buscar productos por ID de categoría
    List<Product> findByCategoryId(Long categoryId);
    
    // Buscar productos activos por categoría
    List<Product> findByCategoryIdAndStatus(Long categoryId, ProductStatus status);
    
    // Buscar productos con stock bajo (crítico)
    @Query("SELECT p FROM Product p WHERE p.criticalStock IS NOT NULL AND p.stock <= p.criticalStock")
    List<Product> findProductsWithCriticalStock();
    
    // Buscar productos por nombre (búsqueda parcial)
    List<Product> findByNameContainingIgnoreCase(String name);
    
    // Buscar productos activos ordenados por nombre
    List<Product> findByStatusOrderByNameAsc(ProductStatus status);
}

