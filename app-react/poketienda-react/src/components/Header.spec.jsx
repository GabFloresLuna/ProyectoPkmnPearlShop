import { cleanup, fireEvent, screen } from '@testing-library/react';
import { PRODUCTO, renderApp } from '../test/render.jsx';
import { useCarrito } from '../context/CarritoContext.jsx';
import Header from './Header.jsx';

function BotonAgregar() {
  const { agregar } = useCarrito();
  return <button type="button" onClick={() => agregar(PRODUCTO)}>agregar-de-prueba</button>;
}

describe('<Header />', () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it('ESTADO: el botón hamburguesa abre y cierra el menú', () => {
    renderApp(<Header />);
    const boton = screen.getByRole('button', { name: 'Abrir menú de navegación' });
    expect(boton.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(boton);
    expect(boton.getAttribute('aria-expanded')).toBe('true');
    expect(boton.getAttribute('aria-label')).toBe('Cerrar menú de navegación');
    fireEvent.click(boton);
    expect(boton.getAttribute('aria-expanded')).toBe('false');
  });

  it('ESTADO COMPARTIDO: el contador del carrito se actualiza al agregar desde otro componente', () => {
    const { container } = renderApp(<><Header /><BotonAgregar /></>);
    const contador = () => container.querySelector('#carrito-contador').textContent;
    expect(contador()).toBe('0');
    fireEvent.click(screen.getByText('agregar-de-prueba'));
    fireEvent.click(screen.getByText('agregar-de-prueba'));
    expect(contador()).toBe('2');
  });

  it('RENDERIZADO CONDICIONAL: sin sesión muestra "Iniciar sesión" y no el panel admin', () => {
    renderApp(<Header />);
    expect(screen.getByRole('link', { name: 'Iniciar sesión' })).toBeTruthy();
    expect(screen.queryByRole('link', { name: 'Panel admin' })).toBeNull();
  });

  it('RENDERIZADO CONDICIONAL: un administrador ve "Panel admin" y "Cerrar sesión"', () => {
    localStorage.setItem('poketienda:sesion', 'U001');
    renderApp(<Header />);
    expect(screen.getByRole('link', { name: 'Panel admin' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Cerrar sesión' })).toBeTruthy();
  });
});
