package com.UserManagementService.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.UserManagementService.entity.User;
import com.UserManagementService.entity.UserRole;
import com.UserManagementService.entity.UserStatus;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Buscar usuario por email
    Optional<User> findByEmail(String email);
    
    // Buscar usuario por RUN
    Optional<User> findByRun(String run);
    
    // Verificar si existe un email
    boolean existsByEmail(String email);
    
    // Verificar si existe un RUN
    boolean existsByRun(String run);
    
    // Buscar usuarios por rol
    List<User> findByRole(UserRole role);
    
    // Buscar usuarios por estado
    List<User> findByStatus(UserStatus status);
    
    // Buscar usuarios por rol y estado
    List<User> findByRoleAndStatus(UserRole role, UserStatus status);
}
