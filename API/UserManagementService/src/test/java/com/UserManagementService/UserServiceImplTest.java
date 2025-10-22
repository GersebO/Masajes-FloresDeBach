package com.UserManagementService;


import com.UserManagementService.dto.request.UserRequestDTO;
import com.UserManagementService.dto.response.UserResponseDTO;
import com.UserManagementService.entity.User;
import com.UserManagementService.entity.UserRole;
import com.UserManagementService.entity.UserStatus;
import com.UserManagementService.repository.UserRepository;
import com.UserManagementService.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private User user;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);

        user = new User();
        user.setId(1L);
        user.setFirstName("German");
        user.setLastName("Ormeño");
        user.setEmail("test@mail.com");
        user.setPassword("encoded123");
        user.setRole(UserRole.ADMIN);
        user.setStatus(UserStatus.ACTIVE);
        user.setIsActive(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    void getUserById_ShouldReturnUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        UserResponseDTO response = userService.getUserById(1L);

        assertNotNull(response);
        assertEquals("German", response.getFirstName());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void createUser_ShouldEncodePasswordAndSave() {
        UserRequestDTO request = new UserRequestDTO();
        request.setFirstName("German");
        request.setLastName("Ormeño");
        request.setEmail("person.one@inbox.cl");
        request.setPassword("1234");
        request.setPhone("667488254");
        request.setAddress("string");
        request.setRegion("string");
        request.setCommune("string");
        request.setBirthDate(LocalDate.of(2025, 10, 16));
        request.setRun("12345678-9");
        request.setRole("ADMIN"); // 🔥 agregado
        request.setStatus("ACTIVE");

        when(passwordEncoder.encode(any())).thenReturn("encoded123");
        when(userRepository.save(any(User.class))).thenReturn(user);

        UserResponseDTO response = userService.createUser(request);

        assertNotNull(response);
        assertEquals("German", response.getFirstName());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void deleteUser_ShouldCallRepositorySaveInsteadOfDelete() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        userService.deleteUser(1L);

        // 🔥 El servicio cambia estado y guarda, no elimina
        verify(userRepository, times(1)).save(any(User.class));
        verify(userRepository, never()).delete(any(User.class));
    }
}
