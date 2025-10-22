package com.UserManagementService;

import com.UserManagementService.dto.response.UserResponseDTO;
import com.UserManagementService.dto.request.UserRequestDTO;
import com.UserManagementService.entity.User;
import com.UserManagementService.repository.UserRepository;
import com.UserManagementService.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        user = new User();
        user.setId(1L);
        user.setEmail("test@mail.com");
        user.setPassword("encoded123");
        user.setFirstName("German");
        user.setLastName("Ormeño");
    }

    // ✅ TEST 1: Obtener usuario por ID
    @Test
    void getUserById_ShouldReturnUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        UserResponseDTO result = userService.getUserById(1L);

        assertNotNull(result);
        assertEquals("German", result.getFirstName());
        verify(userRepository, times(1)).findById(1L);
    }

    // ✅ TEST 2: Crear usuario (verifica que encripta password)
    @Test
    void createUser_ShouldEncodePasswordAndSave() {
        UserRequestDTO dto = new UserRequestDTO();
        dto.setFirstName("German");
        dto.setLastName("Ormeño");
        dto.setEmail("test@mail.com");
        dto.setPassword("12345");

        when(passwordEncoder.encode("12345")).thenReturn("hashed123");
        when(userRepository.save(any(User.class))).thenReturn(user);

        UserResponseDTO result = userService.createUser(dto);

        assertNotNull(result);
        verify(passwordEncoder, times(1)).encode("12345");
        verify(userRepository, times(1)).save(any(User.class));
    }

    // ✅ TEST 3: Eliminar usuario
    @Test
    void deleteUser_ShouldCallRepositoryDelete() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        userService.deleteUser(1L);

        verify(userRepository, times(1)).delete(user);
    }
}
