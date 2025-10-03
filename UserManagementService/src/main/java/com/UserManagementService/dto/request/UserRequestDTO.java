package com.UserManagementService.dto.request;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
    
    private String run;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String address;
    private String region;
    private String commune;
    private LocalDate birthDate;
    private String role; // "ADMIN" o "SELLER"
    private String status; // "ACTIVE" o "INACTIVE"
}
