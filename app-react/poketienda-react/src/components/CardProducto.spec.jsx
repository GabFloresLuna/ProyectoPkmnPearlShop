import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PRODUCTO } from '../test/render.jsx';
import { formatoCLP } from '../utils/formato.js';
import CardProducto from './CardProducto.jsx';

const montar = (producto = PRODUCTO, onAgregar = () => {}) =>
  render(<MemoryRouter><CardProducto producto={producto} onAgregar={onAgregar} /></MemoryRouter>);

describe('<CardProducto />', () => {
  afterEach(cleanup);

  it('RENDERIZADO: muestra nombre, categoría y precio', () => {
    montar();
    expect(screen.getByText('Figura Palkia Legendaria')).toBeTruthy();
    expect(screen.getByText('Figuras')).toBeTruthy();
    expect(screen.getByText(formatoCLP(24990))).toBeTruthy();
  });

  it('PROPS: el botón recibe la etiqueta y llama a onAgregar con el producto', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    montar(PRODUCTO, onAgregar);
    fireEvent.click(screen.getByRole('button', { name: 'Añadir al carrito' }));
    expect(onAgregar).toHaveBeenCalledWith(PRODUCTO);
  });

  it('ESTADO: tras el clic el botón cambia a "✓ Añadido"', () => {
    montar();
    const boton = screen.getByRole('button');
    fireEvent.click(boton);
    expect(boton.textContent).toContain('Añadido');
  });

  it('RENDERIZADO CONDICIONAL: sin stock el botón se deshabilita', () => {
    montar({ ...PRODUCTO, stock: 0 });
    const boton = screen.getByRole('button', { name: 'Sin stock' });
    expect(boton.disabled).toBe(true);
  });

  it('RENDERIZADO CONDICIONAL: en oferta muestra el precio anterior y el % de descuento', () => {
    montar({ ...PRODUCTO, oferta: true, precioOferta: 19990 });
    expect(screen.getByText('-20%')).toBeTruthy();
    expect(screen.getByText(formatoCLP(24990)).tagName).toBe('S'); // precio tachado
  });
});
