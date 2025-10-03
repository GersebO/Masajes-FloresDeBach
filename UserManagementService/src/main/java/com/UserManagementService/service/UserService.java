package com.UserManagementService.service;

import java.util.List;

import com.UserManagementService.dto.request.UserRequestDTO;
import com.UserManagementService.dto.response.UserResponseDTO;

public interface UserService {
    
    // Create
    UserResponseDTO createUser(UserRequestDTO requestDTO);
    
    // Read
    UserResponseDTO getUserById(Long id);
    List<UserResponseDTO> getAllUsers();
    List<UserResponseDTO> getActiveUsers();
    UserResponseDTO getUserByEmail(String email);
    List<UserResponseDTO> getUsersByRole(String role);
    List<UserResponseDTO> getUsersByStatus(String status);
    
    // Update
    UserResponseDTO updateUser(Long id, UserRequestDTO requestDTO);
    UserResponseDTO updatePassword(Long id, String newPassword);
    
    // Delete (logical)
    void deleteUser(Long id);
    
    // Activate/Deactivate
    UserResponseDTO activateUser(Long id);
    UserResponseDTO deactivateUser(Long id);
    
    // Status Management
    UserResponseDTO changeStatus(Long id, String status);
    
    // Authentication
    UserResponseDTO authenticateUser(String email, String password);
    
    // Validations
    boolean existsByEmail(String email);
}