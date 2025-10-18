package com.Product.OrderService.controller;

import com.Product.OrderService.dto.request.CategoryRequestDTO;
import com.Product.OrderService.dto.response.CategoryResponseDTO;
import com.Product.OrderService.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Permitir peticiones desde el frontend
public class CategoryController {

    private final CategoryService categoryService;

    // CREATE - Crear nueva categoría
    @PostMapping
    public ResponseEntity<CategoryResponseDTO> createCategory(@RequestBody CategoryRequestDTO requestDTO) {
        try {
            CategoryResponseDTO response = categoryService.createCategory(requestDTO);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // READ - Obtener todas las categorías
    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
        List<CategoryResponseDTO> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    // READ - Obtener solo categorías activas
    @GetMapping("/active")
    public ResponseEntity<List<CategoryResponseDTO>> getActiveCategories() {
        List<CategoryResponseDTO> categories = categoryService.getActiveCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    // READ - Obtener categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> getCategoryById(@PathVariable Long id) {
        try {
            CategoryResponseDTO category = categoryService.getCategoryById(id);
            return new ResponseEntity<>(category, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // UPDATE - Actualizar categoría
    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> updateCategory(
            @PathVariable Long id,
            @RequestBody CategoryRequestDTO requestDTO) {
        try {
            CategoryResponseDTO response = categoryService.updateCategory(id, requestDTO);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // DELETE - Eliminar categoría (lógico)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // PATCH - Activar categoría
    @PatchMapping("/{id}/activate")
    public ResponseEntity<CategoryResponseDTO> activateCategory(@PathVariable Long id) {
        try {
            CategoryResponseDTO response = categoryService.activateCategory(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // PATCH - Desactivar categoría
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<CategoryResponseDTO> deactivateCategory(@PathVariable Long id) {
        try {
            CategoryResponseDTO response = categoryService.deactivateCategory(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // CHECK - Verificar si existe categoría por nombre
    @GetMapping("/exists/{name}")
    public ResponseEntity<Boolean> existsByName(@PathVariable String name) {
        boolean exists = categoryService.existsByName(name);
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }
}