import { cleanup, fireEvent, screen } from '@testing-library/react';
import { useCarrito } from '../context/CarritoContext.jsx';
import { PRODUCTO, renderApp } from '../test/render.jsx';
import ResumenCompra from './ResumenCompra.jsx';

function Preparar() {
  const { agregar } = useCarrito();
  return <button type="button" onClick={() => agregar(PRODUCTO)}>preparar</button>;
}
const aplicar = (codigo) => {
  fireEvent.change(screen.getByLabelText('Cupón de descuento'), { target: { value: codigo } });
  fireEvent.click(screen.getByRole('button', { name: 'Aplicar' }));
};

describe('<ResumenCompra />', () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it('EVENTOS + ESTADO: un cupón válido se aplica y muestra el descuento', () => {
    renderApp(<><Preparar /><ResumenCompra /></>);
    fireEvent.click(screen.getByText('preparar'));
    aplicar('PEARL10');
    expect(screen.getByText(/aplicado/)).toBeTruthy();
    expect(screen.getByText(/Descuento/)).toBeTruthy();
  });

  it('RENDERIZADO CONDICIONAL: un cupón inválido muestra un mensaje de error', () => {
    renderApp(<ResumenCompra />);
    expect(screen.queryByRole('alert')).toBeNull();
    aplicar('XXXX');
    expect(screen.getByText('El cupón ingresado no es válido.')).toBeTruthy();
  });

  it('RENDERIZADO CONDICIONAL: el botón de pago se deshabilita con el carrito vacío', () => {
    renderApp(<ResumenCompra onPagar={() => {}} />);
    expect(screen.getByRole('button', { name: 'Pagar' }).disabled).toBe(true);
  });
});
