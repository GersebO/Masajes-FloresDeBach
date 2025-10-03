package com.UserManagementService.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponseDTO {
    
    private Long id;
    private String run;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String region;
    private String commune;
    private LocalDate birthDate;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String phone;
    private boolean isActive;
    
}

