package com.Product.OrderService.service.impl;

import com.Product.OrderService.dto.request.OrderItemRequest;
import com.Product.OrderService.dto.request.OrderRequest;
import com.Product.OrderService.dto.response.OrderItemResponse;
import com.Product.OrderService.dto.response.OrderResponse;
import com.Product.OrderService.entity.Order;
import com.Product.OrderService.entity.OrderItem;
import com.Product.OrderService.entity.Product;
import com.Product.OrderService.repository.CartRepository;
import com.Product.OrderService.repository.OrderRepository;
import com.Product.OrderService.repository.ProductRepository;
import com.Product.OrderService.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        // Validate stock for all items first
        for (OrderItemRequest item : request.getItems()) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
            if (product.getStock() < item.getQuantity()) {
                throw new RuntimeException("Stock insuficiente para: " + product.getName());
            }
        }

        // Deduct stock and build order
        Order order = new Order();
        order.setCustomerId(request.getCustomerId());
        order.setStatus("CREATED");

        BigDecimal total = BigDecimal.ZERO;

        List<OrderItem> items = request.getItems().stream().map(i -> {
            Product product = productRepository.findById(i.getProductId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            // decrement stock
            int newStock = product.getStock() - i.getQuantity();
            product.setStock(newStock);
            productRepository.save(product);

            BigDecimal unitPrice = product.getPrice();
            BigDecimal subtotal = unitPrice.multiply(BigDecimal.valueOf(i.getQuantity()));

            OrderItem oi = new OrderItem();
            oi.setProductId(product.getId());
            oi.setProductName(product.getName());
            oi.setUnitPrice(unitPrice);
            oi.setQuantity(i.getQuantity());
            oi.setSubtotal(subtotal);
            oi.setOrder(order);

            return oi;
        }).collect(Collectors.toList());

        for (OrderItem oi : items) {
            total = total.add(oi.getSubtotal());
        }

        order.setItems(items);
        order.setTotal(total);

        Order saved = orderRepository.save(order);

        // Remove related items from cart
        cartRepository.findAll().stream()
                .filter(c -> c.getCustomerId().equals(request.getCustomerId()))
                .filter(c -> request.getItems().stream().anyMatch(i -> i.getProductId().equals(c.getProductId())))
                .forEach(cartRepository::delete);

        return toResponse(saved);
    }

    @Override
    public List<OrderResponse> getOrdersByCustomer(Long customerId) {
        return orderRepository.findByCustomerId(customerId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
        return toResponse(order);
    }

    private OrderResponse toResponse(Order order) {
        List<OrderItemResponse> items = order.getItems().stream().map(i -> OrderItemResponse.builder()
                .id(i.getId())
                .productId(i.getProductId())
                .name(i.getProductName())
                .quantity(i.getQuantity())
                .unitPrice(i.getUnitPrice())
                .subtotal(i.getSubtotal())
                .build()).collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .customerId(order.getCustomerId())
                .createdAt(order.getCreatedAt())
                .total(order.getTotal())
                .status(order.getStatus())
                .items(items)
                .build();
    }
}
