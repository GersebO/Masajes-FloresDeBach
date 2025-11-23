package com.UserManagementService.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUserRequest {
    
    @NotBlank(message = "El RUN es obligatorio")
    @Size(max = 20, message = "El RUN no puede exceder 20 caracteres")
    private String run;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
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
    @Size(min = 8, max = 14, message = "La contraseña debe tener entre 8 y 14 caracteres")
    private String password;

    @NotBlank(message = "La confirmación de la contraseña es obligatoria")
    private String confirmPassword;

    private String phone;
    private String address;
    private String region;
    private String commune;
    private LocalDate birthDate;
    
    @NotBlank(message = "El rol es obligatorio")
    @Pattern(regexp = "ADMIN|EMPLOYEE|THERAPIST", message = "El rol debe ser ADMIN, EMPLOYEE o THERAPIST")
    private String role;
}
