import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

// Mock del CSS
vi.mock('./Footer.css', () => ({}));

describe('Footer', () => {
  it('debe renderizar el footer', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('debe mostrar el título MarafloresdeBach', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByText('MarafloresdeBach')).toBeInTheDocument();
  });

  it('debe mostrar el texto de derechos reservados', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByText(/Todos los derechos reservados/)).toBeInTheDocument();
  });

  it('debe renderizar el enlace a Nosotros', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const nosotrosLink = screen.getByText('Nosotros');
    expect(nosotrosLink).toHaveAttribute('href', '/aboutUs');
  });

  it('debe renderizar el enlace a Contacto', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const contactoLink = screen.getByText('Contacto');
    expect(contactoLink).toHaveAttribute('href', '/contact');
  });

  it('debe renderizar el enlace a Productos', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const productosLink = screen.getByText('Productos');
    expect(productosLink).toHaveAttribute('href', '/product');
  });

  it('debe tener la clase site-footer', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(container.querySelector('.site-footer')).toBeInTheDocument();
  });
});
