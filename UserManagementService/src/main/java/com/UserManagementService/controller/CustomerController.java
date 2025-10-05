package com.UserManagementService.controller;

import com.UserManagementService.dto.request.CustomerRequestDTO;
import com.UserManagementService.dto.response.CustomerResponseDTO;
import com.UserManagementService.service.CustomerService;

import jakarta.validation.Valid;
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

    @PostMapping
    public ResponseEntity<CustomerResponseDTO> createCustomer(@Valid @RequestBody CustomerRequestDTO requestDTO) {
        System.out.println("EMAIL RECIBIDO: " + requestDTO.getEmail());
        System.out.println("FIRSTNAME RECIBIDO: " + requestDTO.getFirstName());
        CustomerResponseDTO response = customerService.createCustomer(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CustomerResponseDTO>> getAllCustomers() {
        List<CustomerResponseDTO> customers = customerService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/active")
    public ResponseEntity<List<CustomerResponseDTO>> getActiveCustomers() {
        List<CustomerResponseDTO> customers = customerService.getActiveCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> getCustomerById(@PathVariable Long id) {
        CustomerResponseDTO customer = customerService.getCustomerById(id);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<CustomerResponseDTO> getCustomerByEmail(@PathVariable String email) {
        CustomerResponseDTO customer = customerService.getCustomerByEmail(email);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<CustomerResponseDTO>> getCustomersByStatus(@PathVariable String status) {
        List<CustomerResponseDTO> customers = customerService.getCustomersByStatus(status);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody CustomerRequestDTO requestDTO) {
        CustomerResponseDTO response = customerService.updateCustomer(id, requestDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{id}/password")
    public ResponseEntity<CustomerResponseDTO> updatePassword(
            @PathVariable Long id,
            @RequestParam String newPassword) {
        CustomerResponseDTO response = customerService.updatePassword(id, newPassword);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<CustomerResponseDTO> activateCustomer(@PathVariable Long id) {
        CustomerResponseDTO response = customerService.activateCustomer(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<CustomerResponseDTO> deactivateCustomer(@PathVariable Long id) {
        CustomerResponseDTO response = customerService.deactivateCustomer(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<CustomerResponseDTO> changeStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        CustomerResponseDTO response = customerService.changeStatus(id, status);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<CustomerResponseDTO> authenticateCustomer(
            @RequestParam String email,
            @RequestParam String password) {
        return ResponseEntity.ok(customerService.authenticateCustomer(email, password));
    }

    @GetMapping("/exists/{email}")
    public ResponseEntity<Boolean> existsByEmail(@PathVariable String email) {
        boolean exists = customerService.existsByEmail(email);
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }
}