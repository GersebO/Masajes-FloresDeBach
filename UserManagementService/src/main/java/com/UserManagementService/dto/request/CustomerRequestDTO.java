package com.UserManagementService.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequestDTO {
    
    private String run;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String region;
    private String commune;
    private String birthDate;  // formato: "YYYY-MM-DD"
    private String status;
}