package com.UserManagementService.service;

import com.UserManagementService.config.JwtTokenProvider;
import com.UserManagementService.dto.request.LoginRequestDTO;
import com.UserManagementService.dto.request.RegisterCustomerRequestDTO;
import com.UserManagementService.dto.request.RegisterUserRequest;
import com.UserManagementService.dto.response.AuthResponse;
import com.UserManagementService.entity.*;
import com.UserManagementService.repository.CustomerRepository;
import com.UserManagementService.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public AuthResponse registerUser(RegisterUserRequest request) {
        // Validar que las contraseñas coincidan
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Las contraseñas no coinciden");
        }

        // Validar que el email no esté en uso
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        // Validar que el RUN no esté en uso
        if (userRepository.existsByRun(request.getRun())) {
            throw new RuntimeException("El RUN ya está registrado");
        }

        // Crear nuevo usuario
        User user = User.builder()
                .run(request.getRun())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .address(request.getAddress())
                .region(request.getRegion())
                .commune(request.getCommune())
                .birthDate(request.getBirthDate())
                .role(UserRole.valueOf(request.getRole()))
                .status(UserStatus.ACTIVE)
                .isActive(true)
                .build();

        user = userRepository.save(user);

        // Generar token JWT
        String token = jwtTokenProvider.generateToken(
                user.getEmail(),
                user.getRole().name(),
                user.getId()
        );

        return AuthResponse.builder()
                .token(token)
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .build();
    }

    @Transactional
    public AuthResponse registerCustomer(RegisterCustomerRequestDTO request) {
        // Validar que las contraseñas coincidan
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Las contraseñas no coinciden");
        }

        // Validar que el email no esté en uso
        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        // Validar que el RUN no esté en uso (si se proporciona)
        if (request.getRun() != null && customerRepository.existsByRun(request.getRun())) {
            throw new RuntimeException("El RUN ya está registrado");
        }

        // Crear nuevo cliente
        Customer customer = Customer.builder()
                .run(request.getRun())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .address(request.getAddress())
                .region(request.getRegion())
                .commune(request.getCommune())
                .status(CustomerStatus.ACTIVE)
                .isActive(true)
                .build();

        customer = customerRepository.save(customer);

        // Generar token JWT
        String token = jwtTokenProvider.generateToken(
                customer.getEmail(),
                "CUSTOMER",
                customer.getId()
        );

        return AuthResponse.builder()
                .token(token)
                .id(customer.getId())
                .email(customer.getEmail())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .role("CUSTOMER")
                .build();
    }

    public AuthResponse login(LoginRequestDTO request) {
        // Intentar autenticar como usuario
        var userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new RuntimeException("Credenciales inválidas");
            }

            if (!user.getIsActive()) {
                throw new RuntimeException("Usuario inactivo");
            }

            String token = jwtTokenProvider.generateToken(
                    user.getEmail(),
                    user.getRole().name(),
                    user.getId()
            );

            return AuthResponse.builder()
                    .token(token)
                    .id(user.getId())
                    .email(user.getEmail())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .role(user.getRole().name())
                    .build();
        }

        // Intentar autenticar como cliente
        var customerOpt = customerRepository.findByEmail(request.getEmail());
        if (customerOpt.isPresent()) {
            Customer customer = customerOpt.get();
            
            if (!passwordEncoder.matches(request.getPassword(), customer.getPassword())) {
                throw new RuntimeException("Credenciales inválidas");
            }

            if (!customer.getIsActive()) {
                throw new RuntimeException("Cliente inactivo");
            }

            String token = jwtTokenProvider.generateToken(
                    customer.getEmail(),
                    "CUSTOMER",
                    customer.getId()
            );

            return AuthResponse.builder()
                    .token(token)
                    .id(customer.getId())
                    .email(customer.getEmail())
                    .firstName(customer.getFirstName())
                    .lastName(customer.getLastName())
                    .role("CUSTOMER")
                    .build();
        }

        throw new RuntimeException("Credenciales inválidas");
    }
}
