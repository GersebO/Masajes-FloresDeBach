package com.UserManagementService.repository;

import com.UserManagementService.entity.Customer;
import com.UserManagementService.entity.CustomerStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    
    // Find methods
    Optional<Customer> findByEmail(String email);
    Optional<Customer> findByEmailAndPassword(String email, String password);
    List<Customer> findByIsActiveTrue();
    List<Customer> findByStatus(CustomerStatus status);
    
    // Exists methods
    boolean existsByEmail(String email);
    boolean existsByRun(String run);
}