import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navegacion from './Navegacion.jsx';

const ENLACES = [
  { to: '/', texto: 'Inicio', fin: true },
  { to: '/productos', texto: 'Productos' },
  { to: '/contacto', texto: 'Contacto' },
];
const montar = (props = {}, ruta = '/') =>
  render(<MemoryRouter initialEntries={[ruta]}><Navegacion enlaces={ENLACES} {...props} /></MemoryRouter>);

describe('<Navegacion />', () => {
  afterEach(cleanup);

  it('RENDERIZADO DE LISTA: crea un <li> por cada enlace del arreglo', () => {
    montar();
    expect(screen.getAllByRole('listitem').length).toBe(3);
    expect(screen.getByRole('link', { name: 'Productos' })).toBeTruthy();
  });

  it('RENDERIZADO CONDICIONAL: solo la ruta activa lleva aria-current="page"', () => {
    montar({}, '/productos');
    expect(screen.getByRole('link', { name: 'Productos' }).getAttribute('aria-current')).toBe('page');
    expect(screen.getByRole('link', { name: 'Inicio' }).getAttribute('aria-current')).toBeNull();
  });

  it('PROPS: abierto controla el atributo data-abierto del menú móvil', () => {
    const { container, rerender } = montar({ abierto: false });
    const nav = container.querySelector('nav');
    expect(nav.getAttribute('data-abierto')).toBe('false');
    rerender(<MemoryRouter><Navegacion enlaces={ENLACES} abierto /></MemoryRouter>);
    expect(container.querySelector('nav').getAttribute('data-abierto')).toBe('true');
  });

  it('EVENTOS: una acción con onClick se pinta como botón y se ejecuta al hacer clic', () => {
    const salir = jasmine.createSpy('salir');
    montar({ enlaces: [...ENLACES, { texto: 'Cerrar sesión', onClick: salir }] });
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }));
    expect(salir).toHaveBeenCalledTimes(1);
  });
});
