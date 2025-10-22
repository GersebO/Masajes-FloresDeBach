package com.Product.OrderService.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponse {
    private Long id;
    private Long productId;
    private Long customerId;
    private Integer quantity;
    private String message;
}
