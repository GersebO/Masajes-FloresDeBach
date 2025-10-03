package com.Product.OrderService.dto.request;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDTO {
    
    private String sku;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private Integer criticalStock;
    private String imageUrl;
    private String status; // "ACTIVE" o "INACTIVE"
    private Long categoryId;
}