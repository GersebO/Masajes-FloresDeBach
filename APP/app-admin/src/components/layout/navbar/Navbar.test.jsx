import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuthStore } from '../../../store/hooks/useAuth';

// Mock del store
vi.mock('../../../store/hooks/useAuth', () => ({
  useAuthStore: vi.fn(),
}));

// Mock del CSS
vi.mock('./Navbar.css', () => ({}));

// Mock de useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('Navbar - App Admin', () => {
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock useAuthStore
    useAuthStore.mockReturnValue({
      user: { firstName: 'Admin', email: 'admin@example.com' },
      logout: mockLogout,
    });
  });

  describe('Renderizado de enlaces', () => {
    it('debe renderizar todos los enlaces del sidebar', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(screen.getByText(/🏠 Admin Home/)).toBeInTheDocument();
      expect(screen.getByText(/🛍️ Productos/)).toBeInTheDocument();
      expect(screen.getByText(/➕ Crear Producto/)).toBeInTheDocument();
      expect(screen.getByText(/📦 Categoría/)).toBeInTheDocument();
      expect(screen.getByText(/➕ Crear Categoría/)).toBeInTheDocument();
      expect(screen.getByText(/👥 Usuarios/)).toBeInTheDocument();
      expect(screen.getByText(/🧩 Crear Usuario/)).toBeInTheDocument();
      expect(screen.getByText(/👥 Clientes/)).toBeInTheDocument();
      expect(screen.getByText(/🧩 Crear Cliente/)).toBeInTheDocument();
    });

    it('debe renderizar el enlace de retorno a la tienda', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(screen.getByText(/🔙 Volver a la tienda/)).toBeInTheDocument();
    });

    it('debe renderizar el título del panel', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(screen.getByText(/🌸 Panel Admin/)).toBeInTheDocument();
    });

    it('debe renderizar el botón de menú móvil', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const menuToggle = screen.getByRole('button', { name: '☰' });
      expect(menuToggle).toBeInTheDocument();
    });
  });

  describe('Dirección correcta de enlaces', () => {
    it('Admin Home debe tener href correcto a "/home"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const homeLink = screen.getByText(/🏠 Admin Home/).closest('a');
      expect(homeLink).toHaveAttribute('href', '/home');
    });

    it('Productos debe tener href correcto a "/product"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const productLink = screen.getByText(/🛍️ Productos/).closest('a');
      expect(productLink).toHaveAttribute('href', '/product');
    });

    it('Crear Producto debe tener href correcto a "/product/create"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const createProductLink = screen.getByText(/➕ Crear Producto/).closest('a');
      expect(createProductLink).toHaveAttribute('href', '/product/create');
    });

    it('Categoría debe tener href correcto a "/categories"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const categoriesLink = screen.getByText(/📦 Categoría/).closest('a');
      expect(categoriesLink).toHaveAttribute('href', '/categories');
    });

    it('Crear Categoría debe tener href correcto a "/categories/create"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const createCategoryLink = screen.getByText(/➕ Crear Categoría/).closest('a');
      expect(createCategoryLink).toHaveAttribute('href', '/categories/create');
    });

    it('Usuarios debe tener href correcto a "/user"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const userLink = screen.getByText(/👥 Usuarios/).closest('a');
      expect(userLink).toHaveAttribute('href', '/user');
    });

    it('Crear Usuario debe tener href correcto a "/user/create"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const createUserLink = screen.getByText(/🧩 Crear Usuario/).closest('a');
      expect(createUserLink).toHaveAttribute('href', '/user/create');
    });

    it('Clientes debe tener href correcto a "/customer"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const customerLink = screen.getByText(/👥 Clientes/).closest('a');
      expect(customerLink).toHaveAttribute('href', '/customer');
    });

    it('Crear Cliente debe tener href correcto a "/customer/create"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const createCustomerLink = screen.getByText(/🧩 Crear Cliente/).closest('a');
      expect(createCustomerLink).toHaveAttribute('href', '/customer/create');
    });

    it('Volver a la tienda debe tener href correcto a "http://localhost:5174"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const returnLink = screen.getByText(/🔙 Volver a la tienda/).closest('a');
      expect(returnLink).toHaveAttribute('href', 'http://localhost:5174');
    });
  });

  describe('Información del usuario', () => {
    it('debe mostrar el nombre del usuario autenticado', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(screen.getByText('Admin')).toBeInTheDocument();
    });

    it('debe mostrar el email del usuario si no tiene firstName', () => {
      useAuthStore.mockReturnValue({
        user: { email: 'newadmin@example.com' },
        logout: mockLogout,
      });

      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(screen.getByText('newadmin@example.com')).toBeInTheDocument();
    });

    it('debe renderizar el icono de usuario', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const userIcon = screen.getByText(/👥 Clientes/).closest('li').parentElement.querySelector('.bi-person-circle');
      // Verificar que el icono está en el sidebar
      expect(document.querySelector('.sidebar-user-info .bi-person-circle')).toBeInTheDocument();
    });
  });

  describe('Funcionalidad del menú móvil', () => {
    it('debe abrir y cerrar el sidebar al hacer clic en el botón hamburguesa', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const menuToggle = screen.getByRole('button', { name: '☰' });
      const sidebar = document.querySelector('.sidebar');

      expect(sidebar).not.toHaveClass('open');

      fireEvent.click(menuToggle);
      expect(sidebar).toHaveClass('open');

      fireEvent.click(menuToggle);
      expect(sidebar).not.toHaveClass('open');
    });

    it('debe cerrar el sidebar al hacer clic en el overlay', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const menuToggle = screen.getByRole('button', { name: '☰' });
      fireEvent.click(menuToggle);

      const sidebar = document.querySelector('.sidebar');
      expect(sidebar).toHaveClass('open');

      const overlay = document.querySelector('.sidebar-overlay');
      fireEvent.click(overlay);

      expect(sidebar).not.toHaveClass('open');
    });

    it('debe mostrar el overlay cuando el sidebar está abierto', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      let overlay = document.querySelector('.sidebar-overlay');
      expect(overlay).not.toBeInTheDocument();

      const menuToggle = screen.getByRole('button', { name: '☰' });
      fireEvent.click(menuToggle);

      overlay = document.querySelector('.sidebar-overlay');
      expect(overlay).toBeInTheDocument();

      fireEvent.click(overlay);

      overlay = document.querySelector('.sidebar-overlay');
      expect(overlay).not.toBeInTheDocument();
    });
  });

  describe('Funcionalidad de Cerrar Sesión', () => {
    it('debe renderizar el botón de Cerrar Sesión', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument();
    });

    it('debe llamar a logout cuando se hace clic en Cerrar Sesión', () => {
      // Mock de window.confirm
      window.confirm = vi.fn(() => true);

      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const logoutBtn = screen.getByText('Cerrar Sesión');
      fireEvent.click(logoutBtn);

      expect(window.confirm).toHaveBeenCalledWith(
        '¿Estás seguro de que deseas cerrar sesión?'
      );
      expect(mockLogout).toHaveBeenCalled();
    });

    it('NO debe llamar a logout si cancela el confirm', () => {
      window.confirm = vi.fn(() => false);

      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const logoutBtn = screen.getByText('Cerrar Sesión');
      fireEvent.click(logoutBtn);

      expect(mockLogout).not.toHaveBeenCalled();
    });
  });
});
