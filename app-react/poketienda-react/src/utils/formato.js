// Utilidades de presentación (moneda y fechas) con formato chileno.
const _clp = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

export const formatoCLP = (n) => _clp.format(Number(n) || 0);

export const formatoFecha = (iso) =>
  new Date(iso).toLocaleString('es-CL', { dateStyle: 'medium', timeStyle: 'short' });
