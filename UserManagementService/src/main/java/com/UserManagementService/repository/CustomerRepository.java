package com.UserManagementService.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.UserManagementService.entity.Customer;
import com.UserManagementService.entity.CustomerStatus;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    
    // Buscar cliente por email
    Optional<Customer> findByEmail(String email);
    
    // Buscar cliente por RUN
    Optional<Customer> findByRun(String run);
    
    // Verificar si existe un email
    boolean existsByEmail(String email);
    
    // Verificar si existe un RUN
    boolean existsByRun(String run);
    
    // Buscar clientes por estado
    List<Customer> findByStatus(CustomerStatus status);
    
    // Buscar clientes por región
    List<Customer> findByRegion(String region);
    
    // Buscar clientes por región y comuna
    List<Customer> findByRegionAndCommune(String region, String commune);
}
