package com.UserManagementService.controller;

import com.UserManagementService.dto.request.CustomerRequestDTO;
import com.UserManagementService.dto.response.CustomerResponseDTO;
import com.UserManagementService.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CustomerController {

    private final CustomerService customerService;

    // CREATE - Crear nuevo cliente
    @PostMapping
    public ResponseEntity<CustomerResponseDTO> createCustomer(@RequestBody CustomerRequestDTO requestDTO) {
        try {
            CustomerResponseDTO response = customerService.createCustomer(requestDTO);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // READ - Obtener todos los clientes
    @GetMapping
    public ResponseEntity<List<CustomerResponseDTO>> getAllCustomers() {
        List<CustomerResponseDTO> customers = customerService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    // READ - Obtener solo clientes activos
    @GetMapping("/active")
    public ResponseEntity<List<CustomerResponseDTO>> getActiveCustomers() {
        List<CustomerResponseDTO> customers = customerService.getActiveCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    // READ - Obtener cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> getCustomerById(@PathVariable Long id) {
        try {
            CustomerResponseDTO customer = customerService.getCustomerById(id);
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // READ - Obtener cliente por email
    @GetMapping("/email/{email}")
    public ResponseEntity<CustomerResponseDTO> getCustomerByEmail(@PathVariable String email) {
        try {
            CustomerResponseDTO customer = customerService.getCustomerByEmail(email);
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // READ - Obtener clientes por estado
    @GetMapping("/status/{status}")
    public ResponseEntity<List<CustomerResponseDTO>> getCustomersByStatus(@PathVariable String status) {
        try {
            List<CustomerResponseDTO> customers = customerService.getCustomersByStatus(status);
            return new ResponseEntity<>(customers, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // UPDATE - Actualizar cliente completo
    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> updateCustomer(
            @PathVariable Long id,
            @RequestBody CustomerRequestDTO requestDTO) {
        try {
            CustomerResponseDTO response = customerService.updateCustomer(id, requestDTO);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // PATCH - Actualizar solo la contraseña
    @PatchMapping("/{id}/password")
    public ResponseEntity<CustomerResponseDTO> updatePassword(
            @PathVariable Long id,
            @RequestParam String newPassword) {
        try {
            CustomerResponseDTO response = customerService.updatePassword(id, newPassword);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // DELETE - Eliminar cliente (lógico)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        try {
            customerService.deleteCustomer(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // PATCH - Activar cliente
    @PatchMapping("/{id}/activate")
    public ResponseEntity<CustomerResponseDTO> activateCustomer(@PathVariable Long id) {
        try {
            CustomerResponseDTO response = customerService.activateCustomer(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // PATCH - Desactivar cliente
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<CustomerResponseDTO> deactivateCustomer(@PathVariable Long id) {
        try {
            CustomerResponseDTO response = customerService.deactivateCustomer(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // PATCH - Cambiar estado del cliente
    @PatchMapping("/{id}/status")
    public ResponseEntity<CustomerResponseDTO> changeStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        try {
            CustomerResponseDTO response = customerService.changeStatus(id, status);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // POST - Autenticar cliente (login)
    @PostMapping("/authenticate")
    public ResponseEntity<CustomerResponseDTO> authenticateCustomer(
            @RequestParam String email,
            @RequestParam String password) {
        return ResponseEntity.ok(customerService.authenticateCustomer(email, password));
    }

    // CHECK - Verificar si existe cliente por email
    @GetMapping("/exists/{email}")
    public ResponseEntity<Boolean> existsByEmail(@PathVariable String email) {
        boolean exists = customerService.existsByEmail(email);
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }
}