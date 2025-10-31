package com.Product.OrderService.service.impl;

import com.Product.OrderService.dto.request.CartRequest;
import com.Product.OrderService.dto.response.CartResponse;
import com.Product.OrderService.entity.CartItem;
import com.Product.OrderService.entity.Product;
import com.Product.OrderService.repository.CartRepository;
import com.Product.OrderService.repository.ProductRepository;
import com.Product.OrderService.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    @Override
    public CartResponse addToCart(CartRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (product.getStock() < request.getQuantity()) {
            throw new RuntimeException("Stock insuficiente");
        }

        // Descontar stock
        product.setStock(product.getStock() - request.getQuantity());
        productRepository.save(product);

        // Guardar item en carrito
        CartItem cartItem = CartItem.builder()
                .productId(request.getProductId())
                .customerId(request.getCustomerId())
                .quantity(request.getQuantity())
                .build();

        cartRepository.save(cartItem);

        return CartResponse.builder()
                .id(cartItem.getId())
                .productId(cartItem.getProductId())
                .customerId(cartItem.getCustomerId())
                .quantity(cartItem.getQuantity())
                .message("Producto agregado al carrito y stock actualizado")
                .build();
    }

    @Override
    public List<CartResponse> getCartByCustomer(Long customerId) {
        return cartRepository.findAll()
                .stream()
                .filter(c -> c.getCustomerId().equals(customerId))
                .map(c -> CartResponse.builder()
                        .id(c.getId())
                        .productId(c.getProductId())
                        .customerId(c.getCustomerId())
                        .quantity(c.getQuantity())
                        .build())
                .collect(Collectors.toList());
    }
    @Override
public void removeFromCart(CartRequest request) {
    // Buscar el item del carrito
    CartItem cartItem = cartRepository.findAll()
            .stream()
            .filter(c -> c.getCustomerId().equals(request.getCustomerId()) 
                      && c.getProductId().equals(request.getProductId()))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Item no encontrado en el carrito"));

    // Devolver stock al producto
    Product product = productRepository.findById(cartItem.getProductId())
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    
    product.setStock(product.getStock() + cartItem.getQuantity());
    productRepository.save(product);

    // Eliminar el item del carrito
    cartRepository.delete(cartItem);
}

@Override
public CartResponse updateCart(CartRequest request) {
    // Buscar el item del carrito
    CartItem cartItem = cartRepository.findAll()
            .stream()
            .filter(c -> c.getCustomerId().equals(request.getCustomerId()) 
                      && c.getProductId().equals(request.getProductId()))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Item no encontrado en el carrito"));

    // Obtener el producto para verificar stock
    Product product = productRepository.findById(cartItem.getProductId())
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

    // Calcular diferencia de cantidad
    int oldQuantity = cartItem.getQuantity();
    int newQuantity = request.getQuantity();
    int difference = newQuantity - oldQuantity;

    // Verificar stock disponible si se aumenta la cantidad
    if (difference > 0 && product.getStock() < difference) {
        throw new RuntimeException("Stock insuficiente");
    }

    // Actualizar stock del producto
    product.setStock(product.getStock() - difference);
    productRepository.save(product);

    // Actualizar cantidad en el carrito
    cartItem.setQuantity(newQuantity);
    CartItem updated = cartRepository.save(cartItem);

    return CartResponse.builder()
            .id(updated.getId())
            .productId(updated.getProductId())
            .customerId(updated.getCustomerId())
            .quantity(updated.getQuantity())
            .message("Cantidad actualizada correctamente")
            .build();
}
}
