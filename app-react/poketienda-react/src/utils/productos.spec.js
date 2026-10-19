import { SEMILLA_ORDENES, SEMILLA_PRODUCTOS as P } from '../data/db.js';
import { esCritico, filtrarProductos, porcentajeOferta, precioFinal } from './productos.js';
import { resumenVentas } from './reportes.js';

describe('productos.js', () => {
  it('precioFinal usa la oferta cuando corresponde', () => {
    expect(precioFinal(P[0])).toBe(24990);
    expect(precioFinal(P[2])).toBe(6990);
  });

  it('porcentajeOferta calcula el descuento', () => {
    expect(porcentajeOferta(P[2])).toBe(22);
    expect(porcentajeOferta(P[0])).toBe(0);
  });

  it('esCritico: el stock llegó al nivel crítico', () => {
    expect(P.filter(esCritico).map((p) => p.id)).toEqual(['P004', 'P006']);
  });

  it('filtrarProductos: por texto, por categoría y por orden', () => {
    expect(filtrarProductos(P, { q: 'palkia' }).map((p) => p.id)).toEqual(['P001']);
    expect(filtrarProductos(P, { categoria: 'Figuras' }).length).toBe(2);
    expect(filtrarProductos(P, { orden: 'precio-asc' })[0].id).toBe('P003');
    expect(filtrarProductos(P, { orden: 'precio-desc' })[0].id).toBe('P004');
    expect(filtrarProductos(P, { q: 'zzz' })).toEqual([]);
  });
});

describe('reportes.js', () => {
  it('resumenVentas suma solo las órdenes pagadas', () => {
    const r = resumenVentas(SEMILLA_ORDENES);
    expect(r.cantidadOrdenes).toBe(2);
    expect(r.totalVentas).toBe(46960 + 89990);
    expect(r.ticketPromedio).toBe(68475);
    expect(r.porCategoria[0].categoria).toBe('Consolas');
    expect(r.topProductos[0].id).toBe('P003');
  });

  it('ignora las órdenes rechazadas', () => {
    const r = resumenVentas([{ ...SEMILLA_ORDENES[0], estado: 'Rechazada' }]);
    expect(r.cantidadOrdenes).toBe(0);
    expect(r.rechazadas).toBe(1);
    expect(r.totalVentas).toBe(0);
  });
});
