package com.Product.OrderService.service;

import com.Product.OrderService.dto.request.CartRequest;
import com.Product.OrderService.dto.response.CartResponse;
import java.util.List;

public interface CartService {
    CartResponse addToCart(CartRequest request);
    List<CartResponse> getCartByCustomer(Long customerId);
}
