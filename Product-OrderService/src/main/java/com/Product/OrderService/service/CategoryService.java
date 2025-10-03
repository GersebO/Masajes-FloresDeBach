package com.Product.OrderService.service;

import java.util.List;

import com.Product.OrderService.dto.request.CategoryRequestDTO;
import com.Product.OrderService.dto.response.CategoryResponseDTO;

public interface CategoryService {
    
    // Create
    CategoryResponseDTO createCategory(CategoryRequestDTO requestDTO);
    
    // Read
    CategoryResponseDTO getCategoryById(Long id);
    List<CategoryResponseDTO> getAllCategories();
    List<CategoryResponseDTO> getActiveCategories();
    
    // Update
    CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO requestDTO);
    
    // Delete (logical)
    void deleteCategory(Long id);
    
    // Activate/Deactivate
    CategoryResponseDTO activateCategory(Long id);
    CategoryResponseDTO deactivateCategory(Long id);
    
    // Validations
    boolean existsByName(String name);
}