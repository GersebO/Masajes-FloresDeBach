package com.Product.OrderService;

import com.Product.OrderService.dto.request.ProductRequestDTO;
import com.Product.OrderService.dto.response.ProductResponseDTO;
import com.Product.OrderService.entity.Category;
import com.Product.OrderService.entity.Product;
import com.Product.OrderService.entity.ProductStatus;
import com.Product.OrderService.exception.ResourceNotFoundException;
import com.Product.OrderService.repository.CategoryRepository;
import com.Product.OrderService.repository.ProductRepository;
import com.Product.OrderService.service.impl.ProductServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ProductServiceImplTest {

    @InjectMocks
    private ProductServiceImpl service;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateProduct_Success() {
        // === GIVEN ===
        ProductRequestDTO request = ProductRequestDTO.builder()
                .sku("RP-001")
                .name("Rosa Roja Premium")
                .description("Rosa roja importada de Ecuador")
                .price(BigDecimal.valueOf(2500.00))
                .stock(100)
                .imageUrl("https://ejemplo.com/rosa-roja.jpg")
                .status("AVAILABLE")
                .categoryId(1L)
                .build();

        Category category = new Category();
        category.setId(1L);
        category.setName("Flores");
        category.setIsActive(true);

        Product product = Product.builder()
                .id(1L)
                .sku(request.getSku())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock())
                .imageUrl(request.getImageUrl())
                .category(category)
                .status(ProductStatus.AVAILABLE)
                .isActive(true)
                .createdAt(LocalDateTime.now())
                .build();

        when(productRepository.existsBySkuIgnoreCase("RP-001")).thenReturn(false);
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(productRepository.save(any(Product.class))).thenReturn(product);

        // === WHEN ===
        ProductResponseDTO response = service.createProduct(request);

        // === THEN ===
        assertNotNull(response);
        assertEquals("Rosa Roja Premium", response.getName());
        assertEquals(BigDecimal.valueOf(2500.00), response.getPrice());
        assertEquals("AVAILABLE", response.getStatus());
        assertEquals("Flores", response.getCategoryName());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void testCreateProduct_FailsIfSkuExists() {
        // === GIVEN ===
        ProductRequestDTO request = ProductRequestDTO.builder()
                .sku("MD-001")
                .name("Masaje Deportivo")
                .description("Diseñado para deportistas y personas activas...")
                .price(BigDecimal.valueOf(25000))
                .stock(15)
                .categoryId(11L)
                .imageUrl("http://localhost:5174/img/MasajeDeportivo.png")
                .status("AVAILABLE")
                .build();

        when(productRepository.existsBySkuIgnoreCase("MD-001")).thenReturn(true);

        // === WHEN / THEN ===
        assertThrows(IllegalArgumentException.class, () -> service.createProduct(request));
        verify(productRepository, never()).save(any());
    }

    @Test
    void testCreateProduct_FailsIfCategoryInactive() {
        // === GIVEN ===
        ProductRequestDTO request = ProductRequestDTO.builder()
                .sku("TT-001")
                .name("Tulipán Rojo")
                .description("Flores importadas")
                .price(BigDecimal.valueOf(1000))
                .stock(10)
                .categoryId(1L)
                .imageUrl("https://ejemplo.com/tulipan.jpg")
                .status("AVAILABLE")
                .build();

        Category category = new Category();
        category.setId(1L);
        category.setName("Flores");
        category.setIsActive(false); // inactiva

        when(productRepository.existsBySkuIgnoreCase("TT-001")).thenReturn(false);
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));

        // === WHEN / THEN ===
        assertThrows(IllegalArgumentException.class, () -> service.createProduct(request));
        verify(productRepository, never()).save(any());
    }

    @Test
    void testCreateProduct_FailsIfCategoryNotFound() {
        // === GIVEN ===
        ProductRequestDTO request = ProductRequestDTO.builder()
                .sku("XX-001")
                .name("Producto sin categoría")
                .description("Prueba de categoría inexistente")
                .price(BigDecimal.valueOf(500))
                .stock(5)
                .categoryId(99L)
                .status("AVAILABLE")
                .build();

        when(productRepository.existsBySkuIgnoreCase("XX-001")).thenReturn(false);
        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        // === WHEN / THEN ===
        assertThrows(ResourceNotFoundException.class, () -> service.createProduct(request));
        verify(productRepository, never()).save(any());
    }
}
