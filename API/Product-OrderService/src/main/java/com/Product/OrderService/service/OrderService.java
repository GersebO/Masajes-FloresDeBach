package com.Product.OrderService.service;

import com.Product.OrderService.dto.request.OrderRequest;
import com.Product.OrderService.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);
    List<OrderResponse> getOrdersByCustomer(Long customerId);
    OrderResponse getOrderById(Long id);
}
