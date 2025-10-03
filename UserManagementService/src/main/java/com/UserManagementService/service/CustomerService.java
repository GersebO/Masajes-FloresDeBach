package com.UserManagementService.service;

import com.UserManagementService.dto.request.CustomerRequestDTO;
import com.UserManagementService.dto.response.CustomerResponseDTO;

import java.util.List;

public interface CustomerService {
    
    // Create
    CustomerResponseDTO createCustomer(CustomerRequestDTO requestDTO);
    
    // Read
    CustomerResponseDTO getCustomerById(Long id);
    List<CustomerResponseDTO> getAllCustomers();
    List<CustomerResponseDTO> getActiveCustomers();
    CustomerResponseDTO getCustomerByEmail(String email);
    List<CustomerResponseDTO> getCustomersByStatus(String status);
    
    // Update
    CustomerResponseDTO updateCustomer(Long id, CustomerRequestDTO requestDTO);  // ← DEBE SER CustomerRequestDTO
    CustomerResponseDTO updatePassword(Long id, String newPassword);
    
    // Delete (logical)
    void deleteCustomer(Long id);
    
    // Activate/Deactivate
    CustomerResponseDTO activateCustomer(Long id);
    CustomerResponseDTO deactivateCustomer(Long id);
    
    // Status Management
    CustomerResponseDTO changeStatus(Long id, String status);
    
    // Authentication
    CustomerResponseDTO authenticateCustomer(String email, String password);
    
    // Validations
    boolean existsByEmail(String email);
}