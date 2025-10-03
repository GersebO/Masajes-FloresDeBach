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
    
    // Find methods
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);
    List<User> findByIsActiveTrue();
    List<User> findByRole(UserRole role);
    List<User> findByStatus(UserStatus status);
    
    // Exists methods
    boolean existsByEmail(String email);
    boolean existsByRun(String run);
}