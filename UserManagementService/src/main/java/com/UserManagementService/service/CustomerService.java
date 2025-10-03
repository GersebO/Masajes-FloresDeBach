package com.UserManagementService.service;

import com.UserManagementService.dto.request.CustomerRequestDTO;
import com.UserManagementService.dto.response.CustomerResponseDTO;

import java.util.List;

public interface CustomerService {
    
    // Create
    CustomerResponseDTO createCustomer(CustomerRequestDTO requestDTO);
    
    // Read
    List<CustomerResponseDTO> getAllCustomers();
    List<CustomerResponseDTO> getActiveCustomers();
    CustomerResponseDTO getCustomerById(Long id);
    CustomerResponseDTO getCustomerByEmail(String email);
    List<CustomerResponseDTO> getCustomersByStatus(String status);
    
    // Update
    CustomerResponseDTO updateCustomer(Long id, CustomerRequestDTO requestDTO);
    CustomerResponseDTO updatePassword(Long id, String newPassword);
    CustomerResponseDTO changeStatus(Long id, String status);
    
    // Delete
    void deleteCustomer(Long id);
    
    // Activate/Deactivate
    CustomerResponseDTO activateCustomer(Long id);
    CustomerResponseDTO deactivateCustomer(Long id);
    
    // Authentication
    CustomerResponseDTO authenticateCustomer(String email, String password);
    
    // Validation
    boolean existsByEmail(String email);
}