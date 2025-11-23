import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { useCustomerStore } from '../../../store/zustand/user.store';

// Mock del store
vi.mock('../../../store/zustand/user.store', () => ({
  useCustomerStore: vi.fn(),
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

describe('Navbar - App', () => {
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock useCustomerStore cuando NO está autenticado
    useCustomerStore.mockReturnValue({
      customer: null,
      isAuthenticated: false,
      logout: mockLogout,
    });
  });

  describe('Renderizado de enlaces públicos', () => {
    it('debe renderizar todos los enlaces públicos', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(screen.getByText(/🏠 Home/)).toBeInTheDocument();
      expect(screen.getByText(/🌿 Productos/)).toBeInTheDocument();
      expect(screen.getByText(/📅 Agendar/)).toBeInTheDocument();
      expect(screen.getByText(/🌸 Nosotros/)).toBeInTheDocument();
      expect(screen.getByText(/☀️ Contacto/)).toBeInTheDocument();
      expect(screen.getByText(/🪷 Blogs/)).toBeInTheDocument();
      expect(screen.getByText(/🛒 Carrito/)).toBeInTheDocument();
    });

    it('debe renderizar el enlace de Login cuando NO está autenticado', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(screen.getByText(/🔑 Iniciar Sesión/)).toBeInTheDocument();
    });

    it('debe renderizar el enlace de Registro cuando NO está autenticado', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(screen.getByText(/📝 Registrar Usuario/)).toBeInTheDocument();
    });

    it('debe renderizar el logo', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const logo = screen.getByAltText('Logo MarafloresdeBach');
      expect(logo).toBeInTheDocument();
      expect(screen.getByText('MarafloresdeBach')).toBeInTheDocument();
    });
  });

  describe('Dirección correcta de enlaces públicos', () => {
    it('Home debe tener href correcto a "/"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const homeLink = screen.getByText(/🏠 Home/).closest('a');
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('Productos debe tener href correcto a "/product"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const productLink = screen.getByText(/🌿 Productos/).closest('a');
      expect(productLink).toHaveAttribute('href', '/product');
    });

    it('Agendar debe tener href correcto a "/appointment"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const appointmentLink = screen.getByText(/📅 Agendar/).closest('a');
      expect(appointmentLink).toHaveAttribute('href', '/appointment');
    });

    it('Nosotros debe tener href correcto a "/aboutUs"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const aboutLink = screen.getByText(/🌸 Nosotros/).closest('a');
      expect(aboutLink).toHaveAttribute('href', '/aboutUs');
    });

    it('Contacto debe tener href correcto a "/contact"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const contactLink = screen.getByText(/☀️ Contacto/).closest('a');
      expect(contactLink).toHaveAttribute('href', '/contact');
    });

    it('Blogs debe tener href correcto a "/blogs"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const blogsLink = screen.getByText(/🪷 Blogs/).closest('a');
      expect(blogsLink).toHaveAttribute('href', '/blogs');
    });

    it('Carrito debe tener href correcto a "/cart"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const cartLink = screen.getByText(/🛒 Carrito/).closest('a');
      expect(cartLink).toHaveAttribute('href', '/cart');
    });

    it('Login debe tener href correcto a "/login"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const loginLink = screen.getByText(/🔑 Iniciar Sesión/).closest('a');
      expect(loginLink).toHaveAttribute('href', '/login');
    });

    it('Registro debe tener href correcto a "/register"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const registerLink = screen.getByText(/📝 Registrar Usuario/).closest('a');
      expect(registerLink).toHaveAttribute('href', '/register');
    });
  });

  describe('Enlaces autenticados', () => {
    beforeEach(() => {
      useCustomerStore.mockReturnValue({
        customer: { firstName: 'Juan', email: 'juan@example.com' },
        isAuthenticated: true,
        logout: mockLogout,
      });
    });

    it('debe renderizar el enlace "Mis Boletas" cuando está autenticado', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(screen.getByText(/📄 Mis Boletas/)).toBeInTheDocument();
    });

    it('Mis Boletas debe tener href correcto a "/invoices"', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const invoicesLink = screen.getByText(/📄 Mis Boletas/).closest('a');
      expect(invoicesLink).toHaveAttribute('href', '/invoices');
    });

    it('NO debe renderizar Login y Registro cuando está autenticado', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(screen.queryByText(/🔑 Iniciar Sesión/)).not.toBeInTheDocument();
      expect(screen.queryByText(/📝 Registrar Usuario/)).not.toBeInTheDocument();
    });

    it('debe mostrar el saludo con el nombre del cliente', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(screen.getByText('Hola, Juan')).toBeInTheDocument();
    });

    it('debe mostrar el email del cliente si no tiene firstName', () => {
      useCustomerStore.mockReturnValue({
        customer: { email: 'cliente@example.com' },
        isAuthenticated: true,
        logout: mockLogout,
      });

      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(screen.getByText('Hola, cliente@example.com')).toBeInTheDocument();
    });

    it('debe renderizar el botón de Cerrar sesión', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
    });
  });

  describe('Funcionalidad del menú móvil', () => {
    it('debe renderizar el botón hamburguesa', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const menuToggle = screen.getByRole('button', { name: /Abrir menú/i });
      expect(menuToggle).toBeInTheDocument();
    });

    it('debe abrir y cerrar el menú al hacer clic en el botón hamburguesa', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const menuToggle = screen.getByRole('button', { name: /Abrir menú/i });
      const navbarLinks = screen.getByText(/🏠 Home/).closest('ul');

      expect(navbarLinks).not.toHaveClass('open');

      fireEvent.click(menuToggle);
      expect(navbarLinks).toHaveClass('open');

      fireEvent.click(menuToggle);
      expect(navbarLinks).not.toHaveClass('open');
    });

    it('debe cerrar el menú al hacer clic en un enlace', () => {
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      );

      const menuToggle = screen.getByRole('button', { name: /Abrir menú/i });
      fireEvent.click(menuToggle);

      const navbarLinks = screen.getByText(/🏠 Home/).closest('ul');
      expect(navbarLinks).toHaveClass('open');

      const homeLink = screen.getByText(/🏠 Home/);
      fireEvent.click(homeLink);

      expect(navbarLinks).not.toHaveClass('open');
    });
  });
});
