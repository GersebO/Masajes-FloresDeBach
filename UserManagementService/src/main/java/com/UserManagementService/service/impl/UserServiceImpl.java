package com.UserManagementService.service.impl;

import com.UserManagementService.dto.request.UserRequestDTO;
import com.UserManagementService.dto.response.UserResponseDTO;
import com.UserManagementService.entity.User;
import com.UserManagementService.entity.UserRole;
import com.UserManagementService.entity.UserStatus;
import com.UserManagementService.repository.UserRepository;
import com.UserManagementService.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserResponseDTO createUser(UserRequestDTO requestDTO) {
        // Validate if email already exists
        if (userRepository.existsByEmailIgnoreCase(requestDTO.getEmail())) {
            throw new RuntimeException("User with email '" + requestDTO.getEmail() + "' already exists");
        }

        User user = User.builder()
                .run(requestDTO.getRun())
                .firstName(requestDTO.getFirstName())
                .lastName(requestDTO.getLastName())
                .email(requestDTO.getEmail())
                .password(requestDTO.getPassword())
                .phone(requestDTO.getPhone())
                .address(requestDTO.getAddress())
                .region(requestDTO.getRegion())
                .commune(requestDTO.getCommune())
                .birthDate(requestDTO.getBirthDate() != null ? LocalDate.parse(requestDTO.getBirthDate()) : null)
                .role(UserRole.valueOf(requestDTO.getRole().toUpperCase()))
                .status(UserStatus.valueOf(requestDTO.getStatus().toUpperCase()))
                .isActive(true)
                .createdAt(LocalDateTime.now())
                .build();

        User savedUser = userRepository.save(user);
        return mapToResponseDTO(savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return mapToResponseDTO(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDTO> getActiveUsers() {
        return userRepository.findByIsActiveTrue()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO getUserByEmail(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        return mapToResponseDTO(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDTO> getUsersByRole(String role) {
        UserRole userRole = UserRole.valueOf(role.toUpperCase());
        return userRepository.findByRole(userRole)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDTO> getUsersByStatus(String status) {
        UserStatus userStatus = UserStatus.valueOf(status.toUpperCase());
        return userRepository.findByStatus(userStatus)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO updateUser(Long id, UserRequestDTO requestDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Check if new email conflicts with existing user
        if (!user.getEmail().equalsIgnoreCase(requestDTO.getEmail()) 
            && userRepository.existsByEmailIgnoreCase(requestDTO.getEmail())) {
            throw new RuntimeException("User with email '" + requestDTO.getEmail() + "' already exists");
        }

        user.setRun(requestDTO.getRun());
        user.setFirstName(requestDTO.getFirstName());
        user.setLastName(requestDTO.getLastName());
        user.setEmail(requestDTO.getEmail());
        user.setPhone(requestDTO.getPhone());
        user.setAddress(requestDTO.getAddress());
        user.setRegion(requestDTO.getRegion());
        user.setCommune(requestDTO.getCommune());
        user.setBirthDate(requestDTO.getBirthDate() != null ? LocalDate.parse(requestDTO.getBirthDate()) : null);
        user.setRole(UserRole.valueOf(requestDTO.getRole().toUpperCase()));
        user.setStatus(UserStatus.valueOf(requestDTO.getStatus().toUpperCase()));
        user.setUpdatedAt(LocalDateTime.now());

        User updatedUser = userRepository.save(user);
        return mapToResponseDTO(updatedUser);
    }

    @Override
    public UserResponseDTO updatePassword(Long id, String newPassword) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        user.setPassword(newPassword); // TODO: Hash password with BCrypt
        user.setUpdatedAt(LocalDateTime.now());
        
        User updatedUser = userRepository.save(user);
        return mapToResponseDTO(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        // Logical delete
        user.setIsActive(false);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    @Override
    public UserResponseDTO activateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        user.setIsActive(true);
        user.setUpdatedAt(LocalDateTime.now());
        
        User updatedUser = userRepository.save(user);
        return mapToResponseDTO(updatedUser);
    }

    @Override
    public UserResponseDTO deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        user.setIsActive(false);
        user.setUpdatedAt(LocalDateTime.now());
        
        User updatedUser = userRepository.save(user);
        return mapToResponseDTO(updatedUser);
    }

    @Override
    public UserResponseDTO changeStatus(Long id, String status) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        user.setStatus(UserStatus.valueOf(status.toUpperCase()));
        user.setUpdatedAt(LocalDateTime.now());
        
        User updatedUser = userRepository.save(user);
        return mapToResponseDTO(updatedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO authenticateUser(String email, String password) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        
        // TODO: Use BCrypt to compare passwords
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid credentials");
        }
        
        if (!user.getIsActive()) {
            throw new RuntimeException("User account is inactive");
        }
        
        return mapToResponseDTO(user);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmailIgnoreCase(email);
    }

    private UserResponseDTO mapToResponseDTO(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .run(user.getRun())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .region(user.getRegion())
                .commune(user.getCommune())
                .birthDate(user.getBirthDate())
                .role(user.getRole().name())
                .status(user.getStatus().name())
                .isActive(user.getIsActive())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}