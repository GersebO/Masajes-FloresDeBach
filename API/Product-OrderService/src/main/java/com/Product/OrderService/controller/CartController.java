package com.Product.OrderService.controller;

import com.Product.OrderService.dto.request.CartRequest;
import com.Product.OrderService.dto.response.CartResponse;
import com.Product.OrderService.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(@RequestBody CartRequest request) {
        return ResponseEntity.ok(cartService.addToCart(request));
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<List<CartResponse>> getCartByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(cartService.getCartByCustomer(customerId));
    }
}
