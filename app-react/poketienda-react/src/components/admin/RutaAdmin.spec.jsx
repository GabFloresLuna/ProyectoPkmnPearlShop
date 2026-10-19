import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext.jsx';
import RutaAdmin from './RutaAdmin.jsx';

const montar = () =>
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <AuthProvider>
        <Routes>
          <Route path="/admin" element={<RutaAdmin><p>contenido del panel</p></RutaAdmin>} />
          <Route path="/login" element={<p>pantalla de login</p>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );

describe('<RutaAdmin /> — protección de rutas', () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it('sin sesión redirige al login', () => {
    montar();
    expect(screen.getByText('pantalla de login')).toBeTruthy();
    expect(screen.queryByText('contenido del panel')).toBeNull();
  });

  it('un cliente ve "Acceso restringido"', () => {
    localStorage.setItem('poketienda:sesion', 'U002');
    montar();
    expect(screen.getByText('Acceso restringido')).toBeTruthy();
    expect(screen.queryByText('contenido del panel')).toBeNull();
  });

  it('un administrador accede al contenido', () => {
    localStorage.setItem('poketienda:sesion', 'U001');
    montar();
    expect(screen.getByText('contenido del panel')).toBeTruthy();
  });
});
