package com.Product.OrderService.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private Long customerId;
    private List<OrderItemRequest> items;
    private BigDecimal total;
    private String address;
}
