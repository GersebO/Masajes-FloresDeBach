package com.UserManagementService.service;

import com.UserManagementService.dto.request.UserRequestDTO;
import com.UserManagementService.dto.response.UserResponseDTO;

import java.util.List;

public interface UserService {
    
    // Create
    UserResponseDTO createUser(UserRequestDTO requestDTO);
    
    // Read
    List<UserResponseDTO> getAllUsers();
    List<UserResponseDTO> getActiveUsers();
    UserResponseDTO getUserById(Long id);
    UserResponseDTO getUserByEmail(String email);
    List<UserResponseDTO> getUsersByRole(String role);
    List<UserResponseDTO> getUsersByStatus(String status);
    
    // Update
    UserResponseDTO updateUser(Long id, UserRequestDTO requestDTO);
    UserResponseDTO updatePassword(Long id, String newPassword);
    UserResponseDTO changeStatus(Long id, String status);
    
    // Delete
    void deleteUser(Long id);
    
    // Activate/Deactivate
    UserResponseDTO activateUser(Long id);
    UserResponseDTO deactivateUser(Long id);
    
    // Authentication
    UserResponseDTO authenticateUser(String email, String password);
    
    // Validation
    boolean existsByEmail(String email);
}