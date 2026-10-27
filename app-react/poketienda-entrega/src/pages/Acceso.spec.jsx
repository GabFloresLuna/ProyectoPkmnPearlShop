import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext.jsx';
import { usuariosDB } from '../data/db.js';
import Acceso from './Acceso.jsx';

const montar = (modo) => render(<MemoryRouter><AppProvider><Acceso modo={modo} /></AppProvider></MemoryRouter>);
const escribir = (etiqueta, valor) => fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });

describe('<Acceso /> — login y registro', () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it('RENDERIZADO CONDICIONAL: en login no pide nombre; en registro sí', () => {
    montar('login');
    expect(screen.queryByLabelText('Nombre completo')).toBeNull();
    cleanup();
    montar('registro');
    expect(screen.getByLabelText('Nombre completo')).toBeTruthy();
  });

  it('RENDERIZADO CONDICIONAL: los errores solo aparecen al enviar un formulario inválido', () => {
    montar('login');
    expect(screen.queryAllByRole('alert').length).toBe(0);
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
    expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
  });

  it('ESTADO: el campo guarda lo que el usuario escribe', () => {
    montar('login');
    escribir('Correo electrónico', 'ana@gmail.com');
    expect(screen.getByLabelText('Correo electrónico').value).toBe('ana@gmail.com');
  });

  it('EVENTOS: credenciales incorrectas muestran "Credenciales inválidas."', () => {
    montar('login');
    escribir('Correo electrónico', 'admin@duoc.cl');
    escribir(/^Contraseña/, 'mala1');
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
    expect(screen.getByText('Credenciales inválidas.')).toBeTruthy();
  });

  it('EVENTOS: credenciales correctas abren la sesión del administrador', () => {
    montar('login');
    escribir('Correo electrónico', 'admin@duoc.cl');
    escribir(/^Contraseña/, 'admin');
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
    expect(JSON.parse(localStorage.getItem('poketienda-sesion')).tipo).toBe('Administrador');
  });

  it('EVENTOS: registro con contraseñas distintas no crea el usuario', () => {
    montar('registro');
    escribir('Nombre completo', 'Ana Pérez');
    escribir('Correo electrónico', 'ana@gmail.com');
    escribir(/^Contraseña \(/, '1234');
    escribir('Confirmar contraseña', '9999');
    fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }));
    expect(screen.getByText('Las contraseñas no coinciden.')).toBeTruthy();
    expect(usuariosDB.listar().length).toBe(2);
  });

  it('EVENTOS: un registro válido guarda al usuario en la base de datos', () => {
    montar('registro');
    escribir('Nombre completo', 'Ana Pérez');
    escribir('Correo electrónico', 'ana@gmail.com');
    escribir(/^Contraseña \(/, '1234');
    escribir('Confirmar contraseña', '1234');
    fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }));
    expect(usuariosDB.listar().some((u) => u.correo === 'ana@gmail.com')).toBe(true);
  });
});
