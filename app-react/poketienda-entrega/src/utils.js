// Utilidades compartidas: formato de moneda, precio con oferta y validaciones simples.
const _clp = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

export const formatoCLP = (n) => _clp.format(Number(n) || 0);

/** Precio que realmente paga el cliente (usa el precio de oferta si el producto está en oferta). */
export const precioFinal = (p) => (p.oferta && p.precioOferta ? p.precioOferta : p.precio);

/** Cada validación devuelve '' si el valor está bien, o el mensaje de error. */
const DOMINIOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

export const V = {
  requerido: (v, etiqueta = 'Este campo') => (String(v ?? '').trim() ? '' : `${etiqueta} es obligatorio.`),

  maxLen: (v, n, etiqueta = 'El campo') => (String(v ?? '').length <= n ? '' : `${etiqueta} no puede superar los ${n} caracteres.`),

  email: (v) => {
    if (!v) return 'El correo es obligatorio.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Formato de correo inválido.';
    return DOMINIOS.includes(v.split('@')[1].toLowerCase()) ? '' : `Solo se permiten los dominios: ${DOMINIOS.join(', ')}.`;
  },

  password: (v) => (v && v.length >= 4 && v.length <= 10 ? '' : 'La contraseña debe tener entre 4 y 10 caracteres.'),
};
