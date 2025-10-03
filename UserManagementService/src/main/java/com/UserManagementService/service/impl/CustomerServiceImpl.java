package com.UserManagementService.service.impl;

import com.UserManagementService.dto.request.CustomerRequestDTO;
import com.UserManagementService.dto.response.CustomerResponseDTO;
import com.UserManagementService.entity.Customer;
import com.UserManagementService.entity.CustomerStatus;
import com.UserManagementService.exception.ResourceNotFoundException;
import com.UserManagementService.repository.CustomerRepository;
import com.UserManagementService.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public CustomerResponseDTO createCustomer(CustomerRequestDTO requestDTO) {
        if (customerRepository.existsByEmail(requestDTO.getEmail())) {
            throw new IllegalArgumentException("Cliente con email '" + requestDTO.getEmail() + "' ya existe");
        }

        if (customerRepository.existsByRun(requestDTO.getRun())) {
            throw new IllegalArgumentException("Cliente con RUN '" + requestDTO.getRun() + "' ya existe");
        }

        Customer customer = new Customer();
        customer.setRun(requestDTO.getRun());
        customer.setFirstName(requestDTO.getFirstName());
        customer.setLastName(requestDTO.getLastName());
        customer.setEmail(requestDTO.getEmail());
        customer.setPassword(requestDTO.getPassword());
        customer.setPhone(requestDTO.getPhone());
        customer.setAddress(requestDTO.getAddress());
        customer.setRegion(requestDTO.getRegion());
        customer.setCommune(requestDTO.getCommune());
        customer.setBirthDate(requestDTO.getBirthDate());
        customer.setStatus(CustomerStatus.ACTIVE);
        customer.setIsActive(true);
        customer.setCreatedAt(LocalDateTime.now());

        Customer savedCustomer = customerRepository.save(customer);
        return mapToResponseDTO(savedCustomer);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CustomerResponseDTO> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CustomerResponseDTO> getActiveCustomers() {
        return customerRepository.findByIsActiveTrue()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CustomerResponseDTO getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con ID: " + id));
        return mapToResponseDTO(customer);
    }

    @Override
    @Transactional(readOnly = true)
    public CustomerResponseDTO getCustomerByEmail(String email) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con email: " + email));
        return mapToResponseDTO(customer);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CustomerResponseDTO> getCustomersByStatus(String status) {
        CustomerStatus customerStatus = CustomerStatus.valueOf(status.toUpperCase());
        return customerRepository.findByStatus(customerStatus)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerResponseDTO updateCustomer(Long id, CustomerRequestDTO requestDTO) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con ID: " + id));

        if (!customer.getEmail().equalsIgnoreCase(requestDTO.getEmail()) 
            && customerRepository.existsByEmail(requestDTO.getEmail())) {
            throw new IllegalArgumentException("Cliente con email '" + requestDTO.getEmail() + "' ya existe");
        }

        if (!customer.getRun().equalsIgnoreCase(requestDTO.getRun()) 
            && customerRepository.existsByRun(requestDTO.getRun())) {
            throw new IllegalArgumentException("Cliente con RUN '" + requestDTO.getRun() + "' ya existe");
        }

        customer.setRun(requestDTO.getRun());
        customer.setFirstName(requestDTO.getFirstName());
        customer.setLastName(requestDTO.getLastName());
        customer.setEmail(requestDTO.getEmail());
        customer.setPassword(requestDTO.getPassword());
        customer.setPhone(requestDTO.getPhone());
        customer.setAddress(requestDTO.getAddress());
        customer.setRegion(requestDTO.getRegion());
        customer.setCommune(requestDTO.getCommune());
        customer.setBirthDate(requestDTO.getBirthDate());
        customer.setUpdatedAt(LocalDateTime.now());

        Customer updatedCustomer = customerRepository.save(customer);
        return mapToResponseDTO(updatedCustomer);
    }

    @Override
    public CustomerResponseDTO updatePassword(Long id, String newPassword) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con ID: " + id));

        customer.setPassword(newPassword);
        customer.setUpdatedAt(LocalDateTime.now());

        Customer updatedCustomer = customerRepository.save(customer);
        return mapToResponseDTO(updatedCustomer);
    }

    @Override
    public CustomerResponseDTO changeStatus(Long id, String status) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con ID: " + id));

        customer.setStatus(CustomerStatus.valueOf(status.toUpperCase()));
        customer.setUpdatedAt(LocalDateTime.now());

        Customer updatedCustomer = customerRepository.save(customer);
        return mapToResponseDTO(updatedCustomer);
    }

    @Override
    public void deleteCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con ID: " + id));

        customer.setIsActive(false);
        customer.setUpdatedAt(LocalDateTime.now());
        customerRepository.save(customer);
    }

    @Override
    public CustomerResponseDTO activateCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con ID: " + id));

        customer.setIsActive(true);
        customer.setStatus(CustomerStatus.ACTIVE);
        customer.setUpdatedAt(LocalDateTime.now());

        Customer updatedCustomer = customerRepository.save(customer);
        return mapToResponseDTO(updatedCustomer);
    }

    @Override
    public CustomerResponseDTO deactivateCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con ID: " + id));

        customer.setIsActive(false);
        customer.setStatus(CustomerStatus.INACTIVE);
        customer.setUpdatedAt(LocalDateTime.now());

        Customer updatedCustomer = customerRepository.save(customer);
        return mapToResponseDTO(updatedCustomer);
    }

    @Override
    @Transactional(readOnly = true)
    public CustomerResponseDTO authenticateCustomer(String email, String password) {
        Customer customer = customerRepository.findByEmailAndPassword(email, password)
                .orElseThrow(() -> new IllegalArgumentException("Email o contraseña incorrectos"));

        if (!customer.getIsActive()) {
            throw new IllegalArgumentException("Cliente inactivo");
        }

        if (customer.getStatus() == CustomerStatus.BLOCKED) {
            throw new IllegalArgumentException("Cliente bloqueado. Contacte al administrador");
        }

        return mapToResponseDTO(customer);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return customerRepository.existsByEmail(email);
    }

    private CustomerResponseDTO mapToResponseDTO(Customer customer) {
        CustomerResponseDTO dto = new CustomerResponseDTO();
        dto.setId(customer.getId());
        dto.setRun(customer.getRun());
        dto.setFirstName(customer.getFirstName());
        dto.setLastName(customer.getLastName());
        dto.setEmail(customer.getEmail());
        dto.setPhone(customer.getPhone());
        dto.setAddress(customer.getAddress());
        dto.setRegion(customer.getRegion());
        dto.setCommune(customer.getCommune());
        dto.setBirthDate(customer.getBirthDate());
        dto.setStatus(customer.getStatus().name());
        dto.setIsActive(customer.getIsActive());
        dto.setCreatedAt(customer.getCreatedAt());
        dto.setUpdatedAt(customer.getUpdatedAt());
        return dto;
    }
}