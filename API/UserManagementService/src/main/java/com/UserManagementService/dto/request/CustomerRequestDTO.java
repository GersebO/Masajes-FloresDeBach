package com.UserManagementService.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequestDTO {
    
    @NotBlank(message = "El RUN es obligatorio")
    private String run;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 2, max = 50, message = "El nombre debe tener entre 2 y 50 caracteres")
    private String firstName;

    @NotBlank(message = "Los apellidos son obligatorios")
    @Size(min = 2, max = 100, message = "Los apellidos deben tener entre 2 y 100 caracteres")
    private String lastName;
    
    @NotBlank(message = "El email es obligatorio")
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$", 
            message = "El formato del email no es válido")
    @Size(max = 100, message = "El email no puede exceder 100 caracteres")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 4, max = 10, message = "La contraseña debe tener entre 4 y 10 caracteres")
    private String password;

    @Pattern(regexp = "^\\+?[0-9]{9,15}$", message = "El teléfono debe tener entre 9 y 15 dígitos")
    private String phone;

    @NotBlank(message = "La dirección es obligatoria")
    @Size(max = 300, message = "La dirección no puede exceder 300 caracteres")
    private String address;

    @NotBlank(message = "La región es obligatoria")
    private String region;

    @NotBlank(message = "La comuna es obligatoria")
    private String commune;

    @Past(message = "La fecha de nacimiento debe ser una fecha pasada")
    private LocalDate birthDate;  // formato: "YYYY-MM-DD"
    private String status;
}