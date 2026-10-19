// Utilidades compartidas por las pruebas (no es una prueba: no termina en .spec).
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import { CarritoProvider } from '../context/CarritoContext.jsx';

/** Renderiza un componente con router, sesión y carrito (los proveedores que usa la app real). */
export function renderApp(ui, { ruta = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <AuthProvider>
        <CarritoProvider>{ui}</CarritoProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

/** Datos de prueba reutilizables. */
export const PRODUCTO = {
  id: 'P001', nombre: 'Figura Palkia Legendaria', categoria: 'Figuras', precio: 24990, stock: 8, stockCritico: 3,
  img: '/images/figuraPalkiaLegendaria1.webp', desc: 'Figura coleccionable de Palkia.', oferta: false,
};
