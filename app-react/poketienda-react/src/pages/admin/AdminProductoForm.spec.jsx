import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { productosDB } from '../../data/db.js';
import AdminProductoForm from './AdminProductoForm.jsx';

const montar = () => render(
  <MemoryRouter initialEntries={['/admin/productos/nuevo']}>
    <Routes><Route path="/admin/productos/nuevo" element={<AdminProductoForm />} /></Routes>
  </MemoryRouter>
);
const poner = (contenedor, id, value) =>
  fireEvent.change(contenedor.querySelector('#' + id), { target: { name: id, value } });

describe('<AdminProductoForm /> — CRUD desde la interfaz', () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it('CREAR: un formulario válido agrega el producto a la base de datos', () => {
    const { container } = montar();
    poner(container, 'id', 'P099');
    poner(container, 'nombre', 'Producto de prueba');
    poner(container, 'precio', '15000');
    poner(container, 'stock', '5');
    poner(container, 'categoria', 'Figuras');
    fireEvent.click(screen.getByRole('button', { name: 'Crear producto' }));
    expect(screen.getByText('Producto creado.')).toBeTruthy();
    expect(productosDB.obtener('P099').precio).toBe(15000);
  });

  it('RENDERIZADO CONDICIONAL: el formulario vacío no crea nada y marca los errores', () => {
    const { container } = montar();
    fireEvent.click(screen.getByRole('button', { name: 'Crear producto' }));
    expect(screen.getByText('Corrige los campos marcados.')).toBeTruthy();
    expect(container.querySelectorAll('.campo--error').length).toBeGreaterThan(0);
    expect(productosDB.listar().length).toBe(8);
  });

  it('RENDERIZADO CONDICIONAL: alerta cuando el stock llega al nivel crítico', () => {
    const { container } = montar();
    expect(screen.queryByText(/nivel crítico/)).toBeNull();
    poner(container, 'stock', '2');
    poner(container, 'stockCritico', '3');
    expect(screen.getByText(/nivel crítico/)).toBeTruthy();
  });
});
