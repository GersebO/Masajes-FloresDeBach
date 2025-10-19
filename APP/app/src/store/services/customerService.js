// src/services/customerService.js

const API_URL = 'http://localhost:8081/api/customers';

const customerService = {
  // Crear nuevo cliente
  createCustomer: async (customerData) => {
    try {
      console.log('Datos a enviar:', customerData);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      // Debug: Mostrar el status de la respuesta
      console.log('Status de respuesta:', response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error del servidor:', errorData);
        throw new Error(errorData || 'Error al crear el cliente');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en createCustomer:', error);
      throw error;
    }
  },

  // Verificar si existe un email
  checkEmailExists: async (email) => {
    try {
      const response = await fetch(`${API_URL}/exists/${email}`);
      return await response.json();
    } catch (error) {
      console.error('Error en checkEmailExists:', error);
      return false;
    }
  },

  // Autenticar cliente (login)
  authenticate: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const data = await response.json();

      // Guarda el usuario autenticado en el localStorage
      localStorage.setItem('customer', JSON.stringify(data));

      return data;
    } catch (error) {
      console.error('Error en authenticate:', error);
      throw error;
    }
  },


  // Obtener todos los clientes
  getAllCustomers: async () => {
    try {
      const response = await fetch(API_URL);
      return await response.json();
    } catch (error) {
      console.error('Error en getAllCustomers:', error);
      throw error;
    }
  },

  // Obtener cliente por ID
  getCustomerById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Cliente no encontrado');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getCustomerById:', error);
      throw error;
    }
  },
};

export default customerService;