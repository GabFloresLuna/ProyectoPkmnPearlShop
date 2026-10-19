import { cleanup, fireEvent, screen } from '@testing-library/react';
import { renderApp } from '../../test/render.jsx';
import FormularioLogin from './FormularioLogin.jsx';

const completar = (correo, password) => {
  fireEvent.change(screen.getByLabelText(/Correo electrónico/), { target: { name: 'correo', value: correo } });
  fireEvent.change(screen.getByLabelText(/^Contraseña/), { target: { name: 'password', value: password } });
  fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
};

describe('<FormularioLogin />', () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it('RENDERIZADO CONDICIONAL: el formulario vacío muestra errores de validación', () => {
    renderApp(<FormularioLogin />);
    expect(screen.queryAllByRole('alert').length).toBe(0);
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
    expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
  });

  it('EVENTOS: credenciales incorrectas muestran "Credenciales inválidas." y no abren sesión', () => {
    renderApp(<FormularioLogin />);
    completar('admin@duoc.cl', 'mala1');
    expect(screen.getByText('Credenciales inválidas.')).toBeTruthy();
    expect(localStorage.getItem('poketienda:sesion')).toBeNull();
  });

  it('EVENTOS: credenciales correctas abren la sesión del administrador', () => {
    renderApp(<FormularioLogin />);
    completar('admin@duoc.cl', 'admin');
    expect(localStorage.getItem('poketienda:sesion')).toBe('U001');
  });
});
