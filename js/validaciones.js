/**
 * validaciones.js — PokéTienda Pearl (v2 — scope aislado)
 *
 * Envuelto en IIFE para evitar colisiones de const/función con otros
 * scripts del proyecto (productos.js, carrito.js, main.js).
 * La API pública se expone explícitamente en window al final.
 *
 * Depende de: nada.
 * Expone: window.V, window.marcarCampo, window.$, window.$$, window.DOMINIOS_PERMITIDOS
 */
(function () {
  'use strict';

  /* ---------- Constantes de negocio (ERS §3.3) ---------- */
  const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
  const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const RE_RUN   = /^\d{7,8}[0-9Kk]$/;
  const RE_SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/;

  /* ---------- Utilidades de presentación ---------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /**
   * Pinta el estado de un campo: borde, mensaje de error y aria-invalid.
   * El párrafo de error debe existir en el HTML con id="{campo}-error".
   */
  function marcarCampo(input, resultado) {
    const idError = `${input.id}-error`;
    const pError  = document.getElementById(idError);
    const grupo   = input.closest('.campo') || input.parentElement;

    if (resultado.ok) {
      input.classList.remove('campo--error');
      input.classList.add('campo--exito');
      input.setAttribute('aria-invalid', 'false');
      if (pError) { pError.textContent = ''; pError.setAttribute('role', 'status'); }
    } else {
      input.classList.add('campo--error');
      input.classList.remove('campo--exito');
      input.setAttribute('aria-invalid', 'true');
      if (pError) { pError.textContent = resultado.mensaje; pError.setAttribute('role', 'alert'); }
    }
    if (grupo) grupo.classList.toggle('campo--invalido', !resultado.ok);
    return resultado.ok;
  }

  /* ---------- Validadores atómicos ---------- */
  const V = {
    requerido: (v, etiqueta = 'Este campo') =>
      v && v.trim() !== ''
        ? { ok: true, mensaje: '' }
        : { ok: false, mensaje: `${etiqueta} es obligatorio.` },

    minLen: (v, n, etiqueta = 'El campo') =>
      v && v.trim().length >= n
        ? { ok: true, mensaje: '' }
        : { ok: false, mensaje: `${etiqueta} debe tener al menos ${n} caracteres.` },

    maxLen: (v, n, etiqueta = 'El campo') =>
      !v || v.length <= n
        ? { ok: true, mensaje: '' }
        : { ok: false, mensaje: `${etiqueta} no puede superar los ${n} caracteres.` },

    email: (v) => {
      const r = V.requerido(v, 'El correo');
      if (!r.ok) return r;
      if (!RE_EMAIL.test(v)) return { ok: false, mensaje: 'Formato de correo inválido.' };
      const dominio = v.split('@')[1].toLowerCase();
      if (!DOMINIOS_PERMITIDOS.includes(dominio))
        return { ok: false, mensaje: `Solo se permiten dominios: ${DOMINIOS_PERMITIDOS.join(', ')}.` };
      return { ok: true, mensaje: '' };
    },

    password: (v) => {
      if (!v) return { ok: false, mensaje: 'La contraseña es obligatoria.' };
      if (v.length < 4 || v.length > 10)
        return { ok: false, mensaje: 'La contraseña debe tener entre 4 y 10 caracteres.' };
      return { ok: true, mensaje: '' };
    },

    coincide: (a, b, etiqueta = 'Los valores') =>
      a === b ? { ok: true, mensaje: '' }
              : { ok: false, mensaje: `${etiqueta} no coinciden.` },

    run: (v) => {
      if (!v) return { ok: false, mensaje: 'El RUN es obligatorio.' };
      const limpio = v.replace(/[.\-\s]/g, '');
      if (!RE_RUN.test(limpio))
        return { ok: false, mensaje: 'RUN inválido (7 a 9 caracteres, sin puntos ni guion).' };
      if (!validarDV(limpio))
        return { ok: false, mensaje: 'El dígito verificador del RUN no es válido.' };
      return { ok: true, mensaje: '' };
    },

    entero: (v, etiqueta = 'El campo') => {
      if (v === '' || v === null) return { ok: false, mensaje: `${etiqueta} es obligatorio.` };
      if (!/^-?\d+$/.test(String(v))) return { ok: false, mensaje: `${etiqueta} debe ser un entero.` };
      return { ok: true, mensaje: '' };
    },

    noNegativo: (v, etiqueta = 'El campo') => {
      const n = Number(v);
      if (Number.isNaN(n)) return { ok: false, mensaje: `${etiqueta} debe ser numérico.` };
      if (n < 0) return { ok: false, mensaje: `${etiqueta} no puede ser negativo.` };
      return { ok: true, mensaje: '' };
    },

    decimal: (v, etiqueta = 'El campo') => {
      if (v === '' || v === null) return { ok: false, mensaje: `${etiqueta} es obligatorio.` };
      if (!/^\d+(\.\d{1,2})?$/.test(String(v)))
        return { ok: false, mensaje: `${etiqueta} admite hasta 2 decimales.` };
      return { ok: true, mensaje: '' };
    },

    letras: (v, etiqueta = 'El campo') =>
      RE_SOLO_LETRAS.test(v) ? { ok: true, mensaje: '' }
                             : { ok: false, mensaje: `${etiqueta} solo admite letras.` },
  };

  /* ---------- Algoritmo módulo 11 para RUN chileno ---------- */
  function validarDV(run) {
    const cuerpo = run.slice(0, -1);
    const dv     = run.slice(-1).toUpperCase();
    let suma = 0, mult = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += Number(cuerpo[i]) * mult;
      mult = mult === 7 ? 2 : mult + 1;
    }
    const resto = 11 - (suma % 11);
    const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);
    return esperado === dv;
  }

  /* ---------- API pública ---------- */
  window.V                    = V;
  window.marcarCampo          = marcarCampo;
  window.$                    = $;
  window.$$                   = $$;
  window.DOMINIOS_PERMITIDOS  = DOMINIOS_PERMITIDOS;

  console.info('%c[validaciones.js] cargado correctamente.', 'color:#28A745;font-weight:bold;');
})();