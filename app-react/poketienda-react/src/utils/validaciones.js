// Validaciones atómicas (migradas desde validaciones.js). Cada una devuelve { ok, mensaje }.
export const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RE_RUN = /^\d{7,8}[0-9Kk]$/;
const RE_SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/;
const OK = { ok: true, mensaje: '' };
const FALLO = (mensaje) => ({ ok: false, mensaje });

/** Algoritmo módulo 11 para el dígito verificador del RUN chileno. */
export function validarDV(run) {
  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1).toUpperCase();
  let suma = 0;
  let mult = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * mult;
    mult = mult === 7 ? 2 : mult + 1;
  }
  const resto = 11 - (suma % 11);
  const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);
  return esperado === dv;
}

export const V = {
  requerido: (v, etiqueta = 'Este campo') =>
    v && String(v).trim() !== '' ? OK : FALLO(`${etiqueta} es obligatorio.`),

  minLen: (v, n, etiqueta = 'El campo') =>
    v && String(v).trim().length >= n ? OK : FALLO(`${etiqueta} debe tener al menos ${n} caracteres.`),

  maxLen: (v, n, etiqueta = 'El campo') =>
    !v || String(v).length <= n ? OK : FALLO(`${etiqueta} no puede superar los ${n} caracteres.`),

  email: (v) => {
    const r = V.requerido(v, 'El correo');
    if (!r.ok) return r;
    if (!RE_EMAIL.test(v)) return FALLO('Formato de correo inválido.');
    const dominio = v.split('@')[1].toLowerCase();
    if (!DOMINIOS_PERMITIDOS.includes(dominio))
      return FALLO(`Solo se permiten dominios: ${DOMINIOS_PERMITIDOS.join(', ')}.`);
    return OK;
  },

  password: (v) => {
    if (!v) return FALLO('La contraseña es obligatoria.');
    if (v.length < 4 || v.length > 10) return FALLO('La contraseña debe tener entre 4 y 10 caracteres.');
    return OK;
  },

  coincide: (a, b, etiqueta = 'Los valores') => (a === b ? OK : FALLO(`${etiqueta} no coinciden.`)),

  run: (v) => {
    if (!v) return FALLO('El RUN es obligatorio.');
    if (/[.\-\s]/.test(v)) return FALLO('El RUN no debe llevar puntos, guion ni espacios (ej: 19011022K).');
    if (!RE_RUN.test(v))
      return FALLO('RUN inválido: solo números, y "K" únicamente como dígito verificador (7 a 9 caracteres).');
    if (!validarDV(v)) return FALLO('El dígito verificador del RUN no es válido.');
    return OK;
  },

  entero: (v, etiqueta = 'El campo') => {
    if (v === '' || v === null || v === undefined) return FALLO(`${etiqueta} es obligatorio.`);
    if (!/^-?\d+$/.test(String(v))) return FALLO(`${etiqueta} debe ser un entero.`);
    return OK;
  },

  noNegativo: (v, etiqueta = 'El campo') => {
    const n = Number(v);
    if (Number.isNaN(n)) return FALLO(`${etiqueta} debe ser numérico.`);
    if (n < 0) return FALLO(`${etiqueta} no puede ser negativo.`);
    return OK;
  },

  decimal: (v, etiqueta = 'El campo') => {
    if (v === '' || v === null || v === undefined) return FALLO(`${etiqueta} es obligatorio.`);
    if (!/^\d+(\.\d{1,2})?$/.test(String(v))) return FALLO(`${etiqueta} admite hasta 2 decimales.`);
    return OK;
  },

  letras: (v, etiqueta = 'El campo') => (RE_SOLO_LETRAS.test(v || '') ? OK : FALLO(`${etiqueta} solo admite letras.`)),

  telefono: (v) => {
    if (!v) return OK; // el teléfono es opcional
    return /^\+?\d{8,15}$/.test(String(v).replace(/[\s-]/g, '')) ? OK : FALLO('Formato de teléfono inválido.');
  },

  aceptado: (v, mensaje = 'Debes aceptar los términos.') => (v ? OK : FALLO(mensaje)),
};
