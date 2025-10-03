package com.UserManagementService.repository;

import com.UserManagementService.entity.User;
import com.UserManagementService.entity.UserRole;
import com.UserManagementService.entity.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Find by email (case insensitive)
    Optional<User> findByEmailIgnoreCase(String email);
    
    // Check if exists by email (case insensitive)
    boolean existsByEmailIgnoreCase(String email);
    
    // Find all active users
    List<User> findByIsActiveTrue();
    
    // Find all inactive users
    List<User> findByIsActiveFalse();
    
    // Find by role
    List<User> findByRole(UserRole role);
    
    // Find by role and active status
    List<User> findByRoleAndIsActiveTrue(UserRole role);
    
    // Find by status
    List<User> findByStatus(UserStatus status);
    
    // Find by status and active
    List<User> findByStatusAndIsActiveTrue(UserStatus status);
    
    // Find by name containing (search)
    List<User> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String firstName, String lastName);
    
    // Find by phone
    Optional<User> findByPhone(String phone);
}