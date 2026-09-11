/**
 * detalle-producto.js — Vista de detalle.
 * - Lee ?id= de la URL.
 * - Rellena la ficha desde CATALOGO.
 * - Galería con miniaturas.
 * - Selector de cantidad que alimenta el botón "Añadir al carrito".
 * - Renderiza relacionados (misma categoría).
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const producto = (window.CATALOGO || []).find((p) => p.id === id);

  if (!producto) {
    const main = document.getElementById('contenido-principal');
    if (main) main.innerHTML = `<section class="seccion"><h1>Producto no encontrado</h1>
      <p>El producto solicitado no existe o fue retirado del catálogo.</p>
      <a class="boton boton--primario" href="productos.html">Volver al catálogo</a></section>`;
    return;
  }

  document.title = `${producto.nombre} — PokéTienda Pearl`;
  const set = (sel, txt) => { const el = document.querySelector(sel); if (el) el.textContent = txt; };
  set('#detalle-nombre', producto.nombre);
  set('#detalle-descripcion', producto.desc);
  set('#detalle-precio', new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(producto.precio));
  set('#detalle-sku', producto.id);
  set('#breadcrumb-producto', producto.nombre);

  const img = document.getElementById('detalle-imagen');
  if (img) { img.src = producto.img; img.alt = producto.nombre; }

  // Galería (miniaturas apuntan a la misma imagen con variantes opcionales)
  document.querySelectorAll('[data-galeria-src]').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      if (img) img.src = thumb.dataset.galeriaSrc;
      document.querySelectorAll('[data-galeria-src]').forEach((t) => t.classList.remove('galeria__thumb--activo'));
      thumb.classList.add('galeria__thumb--activo');
    });
  });

  // Cantidad + añadir
  let cantidad = 1;
  const valor = document.getElementById('cantidad-valor');
  const btnSum = document.getElementById('btn-sumar');
  const btnRes = document.getElementById('btn-restar');
  const btnAdd = document.getElementById('btn-anadir');

  if (btnSum) btnSum.addEventListener('click', () => { cantidad++; if (valor) valor.textContent = cantidad; });
  if (btnRes) btnRes.addEventListener('click', () => { cantidad = Math.max(1, cantidad - 1); if (valor) valor.textContent = cantidad; });
  if (btnAdd) btnAdd.addEventListener('click', () => {
    window.agregarAlCarrito(producto.id, producto.nombre, producto.precio, cantidad);
  });

  // Relacionados
  const rel = document.getElementById('lista-relacionados');
  if (rel) {
    const relacionados = window.CATALOGO.filter((p) => p.categoria === producto.categoria && p.id !== producto.id).slice(0, 3);
    const frag = document.createDocumentFragment();
    relacionados.forEach((p) => {
      const art = document.createElement('article');
      art.className = 'card-producto';
      art.innerHTML = `
        <a href="detalle-producto.html?id=${p.id}" class="card-producto__enlace">
          <figure class="card-producto__figura"><img src="${p.img}" alt="${p.nombre}" loading="lazy" onerror="this.src='img/favicon-perla.svg'"></figure>
          <h3 class="card-producto__nombre">${p.nombre}</h3>
        </a>
        <p class="card-producto__precio precio">${new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0}).format(p.precio)}</p>`;
      frag.appendChild(art);
    });
    rel.appendChild(frag);
  }
});