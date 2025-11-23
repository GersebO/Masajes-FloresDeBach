package com.Product.OrderService.service;

import java.util.List;

import com.Product.OrderService.dto.request.CategoryRequestDTO;
import com.Product.OrderService.dto.response.CategoryResponseDTO;

public interface CategoryService {

    CategoryResponseDTO createCategory(CategoryRequestDTO requestDTO);

    CategoryResponseDTO getCategoryById(Long id);
    List<CategoryResponseDTO> getAllCategories();
    List<CategoryResponseDTO> getActiveCategories();
    

    CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO requestDTO);

    void deleteCategory(Long id);

    CategoryResponseDTO activateCategory(Long id);
    CategoryResponseDTO deactivateCategory(Long id);

    boolean existsByName(String name);
}