import { SEMILLA_PRODUCTOS as P } from '../data/db.js';
import { ENVIO_BASE, MAX_POR_ITEM, buscarCupon, calcularTotales, carritoReducer } from './carritoLogica.js';

const vacio = { items: [], cupon: null };

describe('carritoLogica — reducer y totales', () => {
  it('agregar el mismo producto acumula la cantidad', () => {
    let e = carritoReducer(vacio, { tipo: 'agregar', producto: P[0], cantidad: 1 });
    e = carritoReducer(e, { tipo: 'agregar', producto: P[0], cantidad: 2 });
    expect(e.items.length).toBe(1);
    expect(e.items[0].cantidad).toBe(3);
  });

  it('usa el precio de oferta cuando el producto está en oferta', () => {
    const e = carritoReducer(vacio, { tipo: 'agregar', producto: P[2], cantidad: 1 });
    expect(e.items[0].precio).toBe(6990);
  });

  it('la cantidad se limita entre 1 y el máximo por ítem', () => {
    let e = carritoReducer(vacio, { tipo: 'agregar', producto: P[0], cantidad: 1 });
    e = carritoReducer(e, { tipo: 'fijar', id: 'P001', cantidad: 99 });
    expect(e.items[0].cantidad).toBe(MAX_POR_ITEM);
    e = carritoReducer(e, { tipo: 'fijar', id: 'P001', cantidad: 0 });
    expect(e.items[0].cantidad).toBe(1);
  });

  it('quitar y vaciar', () => {
    let e = carritoReducer(vacio, { tipo: 'agregar', producto: P[0], cantidad: 1 });
    e = carritoReducer(e, { tipo: 'agregar', producto: P[1], cantidad: 1 });
    e = carritoReducer(e, { tipo: 'quitar', id: 'P001' });
    expect(e.items.length).toBe(1);
    expect(carritoReducer(e, { tipo: 'vaciar' })).toEqual(vacio);
  });

  it('totales: subtotal + envío; envío gratis desde $50.000', () => {
    let e = carritoReducer(vacio, { tipo: 'agregar', producto: P[0], cantidad: 1 });
    expect(calcularTotales(e)).toEqual({ cantidadTotal: 1, subtotal: 24990, descuento: 0, envio: ENVIO_BASE, total: 24990 + ENVIO_BASE });
    e = carritoReducer(e, { tipo: 'agregar', producto: P[3], cantidad: 1 });
    expect(calcularTotales(e).envio).toBe(0);
  });

  it('cupón PEARL10 descuenta el 10 % y el código no distingue mayúsculas', () => {
    let e = carritoReducer(vacio, { tipo: 'agregar', producto: P[0], cantidad: 1 });
    e = carritoReducer(e, { tipo: 'cupon', cupon: buscarCupon('pearl10') });
    expect(calcularTotales(e).descuento).toBe(2499);
  });

  it('cupón inexistente devuelve null', () => {
    expect(buscarCupon('NOEXISTE')).toBeNull();
  });
});
