import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider, useApp } from '../context/AppContext.jsx';
import Header from './Header.jsx';

const montar = (ui) => render(<MemoryRouter><AppProvider>{ui}</AppProvider></MemoryRouter>);

function BotonAgregar() {
  const { agregar } = useApp();
  return <button type="button" onClick={() => agregar({ id: 'P001', nombre: 'Figura', precio: 1000, img: '' })}>agregar-de-prueba</button>;
}

describe('<Header />', () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it('RENDERIZADO DE LISTA: pinta un enlace por cada ítem del menú', () => {
    montar(<Header />);
    ['Inicio', 'Productos', 'Nosotros', 'Blogs', 'Contacto'].forEach((t) => {
      expect(screen.getByRole('link', { name: t })).toBeTruthy();
    });
  });

  it('ESTADO: el botón hamburguesa abre y cierra el menú', () => {
    const { container } = montar(<Header />);
    const boton = screen.getByRole('button', { name: 'Abrir menú de navegación' });
    const menu = container.querySelector('.navbar-collapse');
    expect(menu.classList.contains('show')).toBe(false);
    fireEvent.click(boton);
    expect(menu.classList.contains('show')).toBe(true);
    expect(boton.getAttribute('aria-expanded')).toBe('true');
  });

  it('ESTADO COMPARTIDO: el contador del carrito sube al agregar desde otro componente', () => {
    const { container } = montar(<><Header /><BotonAgregar /></>);
    const contador = () => container.querySelector('#carrito-contador').textContent;
    expect(contador()).toBe('0');
    fireEvent.click(screen.getByText('agregar-de-prueba'));
    fireEvent.click(screen.getByText('agregar-de-prueba'));
    expect(contador()).toBe('2');
  });

  it('RENDERIZADO CONDICIONAL: sin sesión muestra "Iniciar sesión" y no el panel admin', () => {
    montar(<Header />);
    expect(screen.getByRole('link', { name: 'Iniciar sesión' })).toBeTruthy();
    expect(screen.queryByRole('link', { name: 'Admin' })).toBeNull();
  });

  it('RENDERIZADO CONDICIONAL: un administrador ve "Admin" y "Cerrar sesión"', () => {
    localStorage.setItem('poketienda-sesion', JSON.stringify({ id: 'U001', nombre: 'Admin', correo: 'admin@duoc.cl', tipo: 'Administrador' }));
    montar(<Header />);
    expect(screen.getByRole('link', { name: 'Admin' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Cerrar sesión' })).toBeTruthy();
  });
});
