package com.UserManagementService.repository;

import com.UserManagementService.entity.Customer;
import com.UserManagementService.entity.CustomerStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    
    // Find by email (case insensitive)
    Optional<Customer> findByEmailIgnoreCase(String email);
    
    // Check if exists by email (case insensitive)
    boolean existsByEmailIgnoreCase(String email);
    
    // Find all active customers
    List<Customer> findByIsActiveTrue();
    
    // Find all inactive customers
    List<Customer> findByIsActiveFalse();
    
    // Find by status
    List<Customer> findByStatus(CustomerStatus status);
    
    // Find by status and active
    List<Customer> findByStatusAndIsActiveTrue(CustomerStatus status);
    
    // Find by name containing (search)
    List<Customer> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String firstName, String lastName);
    
    // Find by phone
    Optional<Customer> findByPhone(String phone);
    
    // Find by address containing
    List<Customer> findByAddressContainingIgnoreCase(String address);
}