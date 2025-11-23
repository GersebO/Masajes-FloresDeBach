import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Content from './Content';

// Mock del CSS
vi.mock('./Content.css', () => ({}));

describe('Content', () => {
  it('debe renderizar el contenido', () => {
    const { container } = render(
      <Content>
        <p>Test content</p>
      </Content>
    );
    expect(container.querySelector('.content-container')).toBeInTheDocument();
  });

  it('debe renderizar título cuando se proporciona', () => {
    render(
      <Content title="Test Title">
        <p>Content</p>
      </Content>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('debe renderizar subtítulo cuando se proporciona', () => {
    render(
      <Content subtitle="Test Subtitle">
        <p>Content</p>
      </Content>
    );
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('debe renderizar título y subtítulo', () => {
    render(
      <Content title="Title" subtitle="Subtitle">
        <p>Content</p>
      </Content>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });

  it('debe renderizar el children', () => {
    render(
      <Content>
        <p>Test children content</p>
      </Content>
    );
    expect(screen.getByText('Test children content')).toBeInTheDocument();
  });

  it('debe tener la clase content-body', () => {
    const { container } = render(
      <Content>
        <p>Content</p>
      </Content>
    );
    expect(container.querySelector('.content-body')).toBeInTheDocument();
  });

  it('NO debe renderizar header si no hay título ni subtítulo', () => {
    const { container } = render(
      <Content>
        <p>Content</p>
      </Content>
    );
    expect(container.querySelector('.content-header')).not.toBeInTheDocument();
  });
});
