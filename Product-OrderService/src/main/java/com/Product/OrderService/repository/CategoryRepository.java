package com.Product.OrderService.repository;

import com.Product.OrderService.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    // Find by name (case insensitive)
    Optional<Category> findByNameIgnoreCase(String name);
    
    // Check if exists by name (case insensitive)
    boolean existsByNameIgnoreCase(String name);
    
    // Find all active categories
    List<Category> findByIsActiveTrue();
    
    // Find all inactive categories
    List<Category> findByIsActiveFalse();
    
    // Find by name containing (search)
    List<Category> findByNameContainingIgnoreCase(String name);
}
