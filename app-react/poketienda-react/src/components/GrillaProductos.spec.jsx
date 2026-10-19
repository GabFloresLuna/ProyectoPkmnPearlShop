import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SEMILLA_PRODUCTOS } from '../data/db.js';
import GrillaProductos from './GrillaProductos.jsx';

const montar = (productos) =>
  render(<MemoryRouter><GrillaProductos productos={productos} onAgregar={() => {}} /></MemoryRouter>);

describe('<GrillaProductos />', () => {
  afterEach(cleanup);

  it('RENDERIZADO DE LISTA: pinta una tarjeta por cada producto del conjunto de datos', () => {
    montar(SEMILLA_PRODUCTOS);
    expect(screen.getAllByRole('article').length).toBe(SEMILLA_PRODUCTOS.length);
  });

  it('RENDERIZADO CONDICIONAL: con la lista vacía solo muestra el mensaje', () => {
    montar([]);
    expect(screen.queryAllByRole('article').length).toBe(0);
    expect(screen.getByText('No hay productos para mostrar.')).toBeTruthy();
  });
});
