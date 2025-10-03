package com.Product.OrderService.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Product.OrderService.dto.request.ProductRequestDTO;
import com.Product.OrderService.dto.response.ProductResponseDTO;
import com.Product.OrderService.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Permitir peticiones desde el frontend
public class ProductController {

    private final ProductService productService;

    // CREATE - Crear nuevo producto
    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(@RequestBody ProductRequestDTO requestDTO) {
        try {
            ProductResponseDTO response = productService.createProduct(requestDTO);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // READ - Obtener todos los productos
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        List<ProductResponseDTO> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // READ - Obtener solo productos activos
    @GetMapping("/active")
    public ResponseEntity<List<ProductResponseDTO>> getActiveProducts() {
        List<ProductResponseDTO> products = productService.getActiveProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // READ - Obtener producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) {
        try {
            ProductResponseDTO product = productService.getProductById(id);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // READ - Obtener productos por categoría
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByCategory(@PathVariable Long categoryId) {
        List<ProductResponseDTO> products = productService.getProductsByCategory(categoryId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // READ - Obtener productos por estado
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByStatus(@PathVariable String status) {
        try {
            List<ProductResponseDTO> products = productService.getProductsByStatus(status);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // UPDATE - Actualizar producto completo
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductRequestDTO requestDTO) {
        try {
            ProductResponseDTO response = productService.updateProduct(id, requestDTO);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // PATCH - Actualizar solo el stock
    @PatchMapping("/{id}/stock")
    public ResponseEntity<ProductResponseDTO> updateStock(
            @PathVariable Long id,
            @RequestParam Integer stock) {
        try {
            ProductResponseDTO response = productService.updateStock(id, stock);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/price")
    public ResponseEntity<ProductResponseDTO> updatePrice(
            @PathVariable Long id,
            @RequestParam java.math.BigDecimal price) {  // ✅ CORRECTO
        try {
            ProductResponseDTO response = productService.updatePrice(id, price);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // DELETE - Eliminar producto (lógico)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // PATCH - Activar producto
    @PatchMapping("/{id}/activate")
    public ResponseEntity<ProductResponseDTO> activateProduct(@PathVariable Long id) {
        try {
            ProductResponseDTO response = productService.activateProduct(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // PATCH - Desactivar producto
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<ProductResponseDTO> deactivateProduct(@PathVariable Long id) {
        try {
            ProductResponseDTO response = productService.deactivateProduct(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // PATCH - Cambiar estado del producto
    @PatchMapping("/{id}/status")
    public ResponseEntity<ProductResponseDTO> changeStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        try {
            ProductResponseDTO response = productService.changeStatus(id, status);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // CHECK - Verificar si existe producto por SKU
    @GetMapping("/exists/{sku}")
    public ResponseEntity<Boolean> existsBySku(@PathVariable String sku) {
        boolean exists = productService.existsBySku(sku);
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }

    // CHECK - Verificar si el producto tiene stock
    @GetMapping("/{id}/has-stock")
    public ResponseEntity<Boolean> hasStock(@PathVariable Long id) {
        try {
            boolean hasStock = productService.hasStock(id);
            return new ResponseEntity<>(hasStock, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }
}