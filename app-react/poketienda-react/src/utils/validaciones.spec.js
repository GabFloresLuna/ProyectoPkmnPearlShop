import { V, validarDV } from './validaciones.js';

describe('validaciones.js', () => {
  it('correo: acepta solo los dominios permitidos', () => {
    expect(V.email('ana@duoc.cl').ok).toBe(true);
    expect(V.email('ana@profesor.duoc.cl').ok).toBe(true);
    expect(V.email('ana@gmail.com').ok).toBe(true);
    expect(V.email('ana@hotmail.com').ok).toBe(false);
    expect(V.email('sin-arroba').mensaje).toBe('Formato de correo inválido.');
    expect(V.email('').ok).toBe(false);
  });

  it('contraseña: entre 4 y 10 caracteres', () => {
    expect(V.password('123').ok).toBe(false);
    expect(V.password('1234').ok).toBe(true);
    expect(V.password('1234567890').ok).toBe(true);
    expect(V.password('12345678901').ok).toBe(false);
  });

  it('RUN: valida formato y dígito verificador (módulo 11)', () => {
    expect(validarDV('123456785')).toBe(true);
    expect(V.run('123456785').ok).toBe(true);
    expect(V.run('123456786').mensaje).toBe('El dígito verificador del RUN no es válido.');
    expect(V.run('12.345.678-5').ok).toBe(false);
  });

  it('coincide: compara dos valores', () => {
    expect(V.coincide('a', 'a').ok).toBe(true);
    expect(V.coincide('a', 'b', 'Los correos').mensaje).toBe('Los correos no coinciden.');
  });

  it('requerido, largos y letras', () => {
    expect(V.requerido('   ', 'El nombre').mensaje).toBe('El nombre es obligatorio.');
    expect(V.maxLen('x'.repeat(101), 100).ok).toBe(false);
    expect(V.letras('Ana María').ok).toBe(true);
    expect(V.letras('Ana123').ok).toBe(false);
  });

  it('números: entero, decimal y no negativo', () => {
    expect(V.entero('12').ok).toBe(true);
    expect(V.entero('1.5').ok).toBe(false);
    expect(V.decimal('10.55').ok).toBe(true);
    expect(V.decimal('10.555').ok).toBe(false);
    expect(V.noNegativo('-1').ok).toBe(false);
  });

  it('teléfono: es opcional, pero si viene debe tener formato válido', () => {
    expect(V.telefono('').ok).toBe(true);
    expect(V.telefono('+56 9 1234 5678').ok).toBe(true);
    expect(V.telefono('abc').ok).toBe(false);
  });
});
