import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

// Mock del CSS
vi.mock('./Button.css', () => ({}));

describe('Button', () => {
  it('debe renderizar el botón con texto', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('debe tener la clase btn-base', () => {
    const { container } = render(<Button>Test</Button>);
    expect(container.querySelector('.btn-base')).toBeInTheDocument();
  });

  it('debe aplicar variante primary por defecto', () => {
    const { container } = render(<Button>Test</Button>);
    expect(container.querySelector('.btn-primary')).toBeInTheDocument();
  });

  it('debe aplicar variante secundaria', () => {
    const { container } = render(<Button variant="secondary">Test</Button>);
    expect(container.querySelector('.btn-secondary')).toBeInTheDocument();
  });

  it('debe aplicar tamaño md por defecto', () => {
    const { container } = render(<Button>Test</Button>);
    expect(container.querySelector('.btn-md')).toBeInTheDocument();
  });

  it('debe renderizar como link cuando as="a"', () => {
    render(<Button as="a" href="/test">Link</Button>);
    const link = screen.getByText('Link');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('debe renderizar como botón por defecto', () => {
    const { container } = render(<Button>Click</Button>);
    expect(container.querySelector('button')).toBeInTheDocument();
  });
});
