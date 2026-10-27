import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext.jsx';
import { productosDB } from '../data/db.js';
import { formatoCLP } from '../utils.js';
import Carrito from './Carrito.jsx';

const ITEMS = [
  { id: 'P001', nombre: 'Figura Palkia Legendaria', img: '/x.jpg', precio: 24990, cantidad: 2 },
  { id: 'P003', nombre: 'Set de Cartas Sinnoh', img: '/y.jpg', precio: 6990, cantidad: 1 },
];
const montar = (items = ITEMS) => {
  localStorage.setItem('poketienda-carrito', JSON.stringify(items));
  return render(<MemoryRouter><AppProvider><Carrito /></AppProvider></MemoryRouter>);
};
const completar = () => {
  fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Ana Pérez' } });
  fireEvent.change(screen.getByLabelText('Dirección de entrega'), { target: { value: 'Calle 1' } });
};

describe('<Carrito />', () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it('RENDERIZADO DE LISTA: muestra una fila por cada producto del carrito', () => {
    montar();
    expect(screen.getByText(/Figura Palkia Legendaria/)).toBeTruthy();
    expect(screen.getByText(/Set de Cartas Sinnoh/)).toBeTruthy();
  });

  it('RENDERIZADO CONDICIONAL: con el carrito vacío muestra el mensaje y no el formulario de pago', () => {
    montar([]);
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Pagar/ })).toBeNull();
  });

  it('EVENTOS + ESTADO: el botón + aumenta la cantidad y actualiza el total', () => {
    montar();
    expect(screen.getByRole('button', { name: /Pagar/ }).textContent).toContain(formatoCLP(24990 * 2 + 6990));
    fireEvent.click(screen.getByRole('button', { name: 'Aumentar Figura Palkia Legendaria' }));
    expect(screen.getByRole('button', { name: /Pagar/ }).textContent).toContain(formatoCLP(24990 * 3 + 6990));
  });

  it('RENDERIZADO CONDICIONAL: pagar sin datos muestra errores y no registra el pedido', () => {
    montar();
    fireEvent.click(screen.getByRole('button', { name: /Pagar/ }));
    expect(screen.getByText('El nombre es obligatorio.')).toBeTruthy();
    expect(screen.queryByText('¡Compra realizada!')).toBeNull();
  });

  it('EVENTOS: pago aprobado confirma la compra, descuenta stock y vacía el carrito', () => {
    montar();
    completar();
    fireEvent.click(screen.getByRole('button', { name: /Pagar/ }));
    expect(screen.getByText('¡Compra realizada!')).toBeTruthy();
    expect(productosDB.obtener('P001').stock).toBe(6); // 8 - 2
    expect(JSON.parse(localStorage.getItem('poketienda-carrito')).length).toBe(0);
  });

  it('EVENTOS: pago rechazado muestra el error y conserva el carrito y el stock', () => {
    montar();
    completar();
    fireEvent.change(screen.getByLabelText('Resultado simulado del pago'), { target: { value: 'rechazado' } });
    fireEvent.click(screen.getByRole('button', { name: /Pagar/ }));
    expect(screen.getByText('No se pudo realizar el pago')).toBeTruthy();
    expect(productosDB.obtener('P001').stock).toBe(8);
    expect(JSON.parse(localStorage.getItem('poketienda-carrito')).length).toBe(2);
  });
});
