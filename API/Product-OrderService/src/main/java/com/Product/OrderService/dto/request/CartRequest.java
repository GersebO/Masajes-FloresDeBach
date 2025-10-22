package com.Product.OrderService.dto.request;



import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartRequest {
    private Long productId;
    private Long customerId;
    private Integer quantity;
}
