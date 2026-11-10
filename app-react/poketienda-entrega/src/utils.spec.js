import { SEMILLA_PRODUCTOS as P } from './data/db.js';
import { V, formatoCLP, precioFinal } from './utils.js';

describe('utils.js', () => {
  it('precioFinal usa el precio de oferta cuando corresponde', () => {
    expect(precioFinal(P[0])).toBe(24990);
    expect(precioFinal(P[2])).toBe(6990);
  });

  it('formatoCLP da formato de pesos chilenos', () => {
    expect(formatoCLP(24990)).toContain('24.990');
  });

  it('correo: acepta solo los dominios permitidos', () => {
    expect(V.email('ana@duoc.cl')).toBe('');
    expect(V.email('ana@gmail.com')).toBe('');
    expect(V.email('ana@hotmail.com')).not.toBe('');
    expect(V.email('sin-arroba')).toBe('Formato de correo inválido.');
    expect(V.email('')).not.toBe('');
  });

  it('contraseña: entre 4 y 10 caracteres', () => {
    expect(V.password('123')).not.toBe('');
    expect(V.password('1234')).toBe('');
    expect(V.password('12345678901')).not.toBe('');
  });

  it('requerido y largo máximo', () => {
    expect(V.requerido('   ', 'El nombre')).toBe('El nombre es obligatorio.');
    expect(V.requerido('Ana')).toBe('');
    expect(V.maxLen('x'.repeat(101), 100)).not.toBe('');
  });
});
