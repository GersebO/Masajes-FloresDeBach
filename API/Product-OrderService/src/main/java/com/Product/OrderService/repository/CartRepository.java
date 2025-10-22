package com.Product.OrderService.repository;

import com.Product.OrderService.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<CartItem, Long> { }