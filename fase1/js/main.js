/**
 * main.js — PokéTienda Pearl
 *
 * Comportamiento global de la vista pública:
 *   - Toggle del menú móvil (aria-expanded + data-abierto, consumido por CSS).
 *   - Cierre por click fuera del nav, por tecla Escape y por resize a desktop.
 *   - Marca del enlace activo en el nav según el pathname actual.
 *
 * Requiere en el HTML:
 *   - #nav-toggle          (botón hamburguesa con aria-controls="nav-principal")
 *   - #nav-principal       (nav con clase .nav)
 *   - .nav__enlace         (enlaces del menú)
 *
 * Requiere en styles.css:
 *   .nav[data-abierto="true"] { max-height: 500px; overflow-y: auto; }
 *
 * Depende de: nada.
 * Expone:     nada (todo queda en scope privado).
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('nav-toggle');
    const nav    = document.getElementById('nav-principal');

    /* ---------- Toggle del menú móvil ---------- */
    if (toggle && nav) {
      const abrir = () => {
        nav.setAttribute('data-abierto', 'true');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Cerrar menú de navegación');
      };

      const cerrar = () => {
        nav.setAttribute('data-abierto', 'false');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú de navegación');
      };

      const alternar = () =>
        nav.getAttribute('data-abierto') === 'true' ? cerrar() : abrir();

      toggle.addEventListener('click', alternar);

      // Cerrar al hacer click fuera del nav
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
          if (nav.getAttribute('data-abierto') === 'true') cerrar();
        }
      });

      // Cerrar con la tecla Escape (accesibilidad por teclado)
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.getAttribute('data-abierto') === 'true') {
          cerrar();
          toggle.focus();
        }
      });

      // Reset automático al pasar a desktop
      const mq = window.matchMedia('(min-width: 769px)');
      mq.addEventListener('change', (ev) => { if (ev.matches) cerrar(); });
    }

    /* ---------- Marca del enlace activo ---------- */
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__enlace').forEach((a) => {
      const href = a.getAttribute('href');
      const activo = href === path
        || (path === 'index.html' && href === 'index.html')
        || (path === '' && href === 'index.html');
      if (activo) {
        a.setAttribute('aria-current', 'page');
        a.classList.add('nav__enlace--activo');
      }
    });

    console.info('%c[main.js] cargado correctamente.', 'color:#28A745;font-weight:bold;');
  });
})();