package com.UserManagementService.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
    private String phone;
    private String address;
    private String region;
    private String commune;
    private LocalDate birthDate;
    private String status;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}