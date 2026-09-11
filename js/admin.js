'use strict';
document.addEventListener('DOMContentLoaded', () => {
  // Toggle sidebar en móvil
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.admin-sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      const abierto = sidebar.getAttribute('data-abierto') === 'true';
      sidebar.setAttribute('data-abierto', String(!abierto));
      toggle.setAttribute('aria-expanded', String(!abierto));
    });
  }

  // Marca enlace activo en el sidebar
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('.admin-sidebar a').forEach((a) => {
    if (a.getAttribute('href') === path) a.setAttribute('aria-current', 'page');
  });

  // Botón de cierre de sesión
  document.querySelectorAll('[data-accion="cerrar-sesion"]').forEach((b) =>
    b.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('¿Cerrar sesión?')) location.href = '../login.html';
    })
  );

  // Búsqueda en toolbar: filtra filas de la tabla visible
  const buscador = document.getElementById('buscador-admin');
  if (buscador) {
    buscador.addEventListener('input', () => {
      const q = buscador.value.trim().toLowerCase();
      document.querySelectorAll('.tabla--admin tbody tr').forEach((tr) => {
        tr.hidden = q !== '' && !tr.textContent.toLowerCase().includes(q);
      });
    });
  }

  // Paginación placeholder (la lógica real llegará con backend)
  document.querySelectorAll('.paginacion__btn').forEach((b) =>
    b.addEventListener('click', (e) => { e.preventDefault(); })
  );
});