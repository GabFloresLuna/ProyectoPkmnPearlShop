/**
 * carrito.js — PokéTienda Pearl (v4 — totales siempre actualizados)
 *
 * Cambios respecto a v3:
 *   - Los totales del resumen se actualizan SIEMPRE, incluso con
 *     carrito vacío (antes un return temprano los dejaba hardcodeados).
 *   - Un solo flujo: render de ítems condicional, totales incondicionales.
 *   - Conserva IIFE, hooks BEM y API pública.
 *
 * Requiere en styles.css:  [hidden] { display: none !important; }
 */
(function () {
  'use strict';

  /* ============================================================
     CONSTANTES
     ============================================================ */
  const CLAVE_CARRITO = 'poketienda-carrito';

  const CUPONES = {
    PEARL10:     { tipo: 'pct',   valor: 10, etiqueta: 'PEARL10 (10 % desc.)' },
    PALKIA20:    { tipo: 'pct',   valor: 20, etiqueta: 'PALKIA20 (20 % desc.)' },
    ENVIOGRATIS: { tipo: 'envio', valor:  0, etiqueta: 'Envío gratis' },
  };

  const IMG_FALLBACK = '../images/perlaCosmicaDecorativa.jpg';

  const IMAGENES_PRODUCTO = {
    P001: '../images/figuraPalkiaLegendaria1.webp',
    P002: '../images/perlaCosmicaDecorativa.jpg',
    P003: '../images/setCartasSinnoh.jpeg',
    P004: '../images/consolaEdicionPerla.jpg',
    P005: '../images/estuchePokemonPearl.jpeg',
    P006: '../images/albumColeccionistaSinnoh.webp',
    P007: '../images/lamparaCosmicaGiratina.webp',
    P008: '../images/figuraPalkiaTemporal1.jpg',
  };

  /* ============================================================
     PERSISTENCIA
     ============================================================ */
  const leerCarrito = () => {
    try { return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || []; }
    catch { return []; }
  };

  const guardarCarrito = (items) => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
    document.dispatchEvent(new CustomEvent('carrito:actualizado', { detail: { items } }));
  };

  const leerCupon = () => {
    try { return JSON.parse(localStorage.getItem(CLAVE_CARRITO + ':cupon')) || null; }
    catch { return null; }
  };

  const guardarCupon = (c) => {
    if (c) localStorage.setItem(CLAVE_CARRITO + ':cupon', JSON.stringify(c));
    else   localStorage.removeItem(CLAVE_CARRITO + ':cupon');
  };

  /* ============================================================
     API INTERNA
     ============================================================ */
  function agregarAlCarrito(id, nombre, precio, cantidad = 1) {
    const items = leerCarrito();
    const idx = items.findIndex((i) => i.id === id);
    if (idx >= 0) items[idx].cantidad += cantidad;
    else items.push({ id, nombre, precio: Number(precio), cantidad });
    guardarCarrito(items);
    mostrarFeedback(`"${nombre}" se añadió al carrito.`, 'exito');
  }

  function cambiarCantidad(id, delta) {
    const items = leerCarrito();
    const idx = items.findIndex((i) => i.id === id);
    if (idx < 0) return;
    items[idx].cantidad = Math.max(1, items[idx].cantidad + delta);
    guardarCarrito(items);
  }

  function eliminarDelCarrito(id) {
    guardarCarrito(leerCarrito().filter((i) => i.id !== id));
  }

  function vaciarCarrito() {
    guardarCarrito([]);
    guardarCupon(null);
    mostrarFeedback('Carrito vaciado.', 'info');
  }

  function totales() {
    const items = leerCarrito();
    const subtotal = items.reduce((s, i) => s + i.precio * i.cantidad, 0);
    const cupon = leerCupon();
    let descuento = 0;
    if (cupon && cupon.tipo === 'pct') descuento = Math.round(subtotal * cupon.valor / 100);
    const total = subtotal - descuento;
    return { subtotal, descuento, total, cupon, items };
  }

  /* ============================================================
     FEEDBACK ACCESIBLE
     ============================================================ */
  function mostrarFeedback(mensaje, tipo = 'info') {
    const el = document.getElementById('carrito-feedback');
    if (!el) return;

    el.textContent = mensaje;
    el.classList.remove(
      'formulario__feedback--exito',
      'formulario__feedback--error',
      'formulario__feedback--info'
    );
    el.classList.add(`formulario__feedback--${tipo}`);
    el.setAttribute('role', tipo === 'error' ? 'alert' : 'status');
    el.setAttribute('aria-live', tipo === 'error' ? 'assertive' : 'polite');
    el.hidden = false;

    if (tipo !== 'error') {
      clearTimeout(mostrarFeedback._t);
      mostrarFeedback._t = setTimeout(() => {
        el.textContent = '';
        el.className = 'formulario__feedback';
        el.hidden = true;
      }, 4000);
    }
  }

  /* ============================================================
     UTILIDADES
     ============================================================ */
  const _fmtCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency', currency: 'CLP', maximumFractionDigits: 0,
  });
  const fmtCLP = (n) => _fmtCLP.format(n);

  const escapar = (s) => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const imagenProducto = (id) => IMAGENES_PRODUCTO[id] || IMG_FALLBACK;

  /* ============================================================
     RENDER: CONTADOR DEL HEADER
     ============================================================ */
  function renderContadorHeader() {
    const items = leerCarrito();
    const total = items.reduce((s, i) => s + i.cantidad, 0);

    const badge = document.getElementById('carrito-contador');
    if (badge) {
      badge.textContent = total;
      badge.setAttribute('aria-label', `${total} producto(s) en el carrito`);
    }

    const ct = document.getElementById('carrito-cantidad-total');
    if (ct) ct.textContent = `${total} ${total === 1 ? 'producto' : 'productos'}`;

    const icono = document.getElementById('carrito');
    if (icono) icono.classList.toggle('carrito--activo', total > 0);
  }

  /* ============================================================
     RENDER: VISTA DEL CARRITO
     ============================================================ */
  function renderVistaCarrito() {
    const cont = document.getElementById('carrito-items');
    if (!cont) return;

    const { items, subtotal, descuento, total, cupon } = totales();
    const vacio    = document.getElementById('carrito-vacio');
    const acciones = document.querySelector('.carrito-items__acciones');
    const resumen  = document.querySelector('.carrito-resumen');

    const hayItems = items.length > 0;

    /* --- 1. Visibilidad (depende de [hidden] en el CSS) --- */
    if (vacio)    vacio.hidden    = hayItems;
    if (cont)     cont.hidden     = !hayItems;
    if (acciones) acciones.hidden = !hayItems;
    if (resumen)  resumen.hidden  = !hayItems;

    /* --- 2. Limpiar SIEMPRE el contenedor (borra los ítems hardcoded) --- */
    cont.innerHTML = '';

    /* --- 3. Renderizar ítems SOLO si hay --- */
    if (hayItems) {
      const frag = document.createDocumentFragment();
      items.forEach((i) => {
        const art = document.createElement('article');
        art.className = 'carrito-item';
        art.setAttribute('data-id', i.id);
        art.setAttribute('data-precio', i.precio);
        art.setAttribute('data-nombre', i.nombre);
        art.innerHTML = `
          <a class="carrito-item__enlace"
             href="detalle-producto.html?id=${encodeURIComponent(i.id)}"
             aria-label="Ver detalle de ${escapar(i.nombre)}">
            <img class="carrito-item__imagen"
                 src="${escapar(imagenProducto(i.id))}"
                 alt="${escapar(i.nombre)}"
                 width="120" height="120"
                 loading="lazy" decoding="async"
                 onerror="this.onerror=null; this.src='${IMG_FALLBACK}';">
          </a>

          <div class="carrito-item__info">
            <span class="carrito-item__categoria">PokéTienda Pearl</span>
            <h3 class="carrito-item__nombre">
              <a class="carrito-item__nombre-enlace"
                 href="detalle-producto.html?id=${encodeURIComponent(i.id)}">
                ${escapar(i.nombre)}
              </a>
            </h3>
            <ul class="carrito-item__detalles">
              <li>
                <span class="carrito-item__detalle-label">SKU:</span>
                <code class="carrito-item__sku">${i.id}</code>
              </li>
              <li>
                <span class="carrito-item__detalle-label">Estado:</span>
                <span class="badge badge--exito">Disponible</span>
              </li>
            </ul>
          </div>

          <div class="carrito-item__acciones">
            <div class="carrito-item__precios">
              <span class="carrito-item__precio-unitario">
                ${fmtCLP(i.precio)} <small class="carrito-item__precio-unidad">c/u</small>
              </span>
              <span class="carrito-item__subtotal precio" data-id="${i.id}">
                ${fmtCLP(i.precio * i.cantidad)}
              </span>
            </div>

            <div class="selector-cantidad" role="group" aria-label="Cantidad de ${escapar(i.nombre)}">
              <button class="selector-cantidad__btn" type="button"
                      data-accion="restar" data-id="${i.id}"
                      aria-label="Disminuir cantidad de ${escapar(i.nombre)}">−</button>
              <span class="selector-cantidad__valor" data-id="${i.id}" aria-live="polite">${i.cantidad}</span>
              <button class="selector-cantidad__btn" type="button"
                      data-accion="sumar" data-id="${i.id}"
                      aria-label="Aumentar cantidad de ${escapar(i.nombre)}">+</button>
            </div>

            <button class="carrito-item__quitar" type="button"
                    data-accion="eliminar" data-id="${i.id}"
                    aria-label="Quitar ${escapar(i.nombre)} del carrito">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   role="img" aria-hidden="true" focusable="false">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
                <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>Quitar</span>
            </button>
          </div>`;
        frag.appendChild(art);
      });
      cont.appendChild(frag);
    }

    /* --- 4. Totales — SIEMPRE, incluso con carrito vacío --- */
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('carrito-subtotal',  fmtCLP(subtotal));
    set('carrito-total',     fmtCLP(total));
    set('carrito-descuento', descuento > 0 ? `−${fmtCLP(descuento)}` : fmtCLP(0));

    const filaDesc = document.getElementById('fila-descuento');
    if (filaDesc) filaDesc.hidden = descuento <= 0;

    const pct = document.getElementById('carrito-descuento-pct');
    if (pct) pct.textContent = cupon && cupon.tipo === 'pct' ? `(${cupon.valor} %)` : '(0 %)';

    /* --- 5. Estado de cupones — SIEMPRE --- */
    const formCupon = document.getElementById('form-cupon');
    const banner    = document.getElementById('cupon-aplicado');
    const txtCupon  = document.getElementById('cupon-aplicado-codigo');
    const errCupon  = document.getElementById('cupon-error');

    if (formCupon) formCupon.hidden = !!cupon;
    if (banner)    banner.hidden    = !cupon;
    if (errCupon)  { errCupon.textContent = ''; errCupon.hidden = true; }
    if (txtCupon && cupon) txtCupon.textContent = cupon.codigo || '';

    /* --- 6. Header --- */
    renderContadorHeader();
  }

  /* ============================================================
     DELEGACIÓN GLOBAL: botones [data-accion]
     ============================================================ */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-accion]');
    if (!btn) return;

    const accion = btn.getAttribute('data-accion');
    const id     = btn.getAttribute('data-id');

    switch (accion) {
      case 'agregar':
        e.preventDefault();
        agregarAlCarrito(id, btn.dataset.nombre, btn.dataset.precio, 1);
        break;
      case 'sumar':    e.preventDefault(); cambiarCantidad(id, +1); break;
      case 'restar':   e.preventDefault(); cambiarCantidad(id, -1); break;
      case 'eliminar': e.preventDefault(); eliminarDelCarrito(id);  break;
    }
  });

  /* ============================================================
     CUPONES: submit
     ============================================================ */
  document.addEventListener('submit', (e) => {
    if (e.target.id !== 'form-cupon') return;
    e.preventDefault();

    const input  = document.getElementById('cupon');
    const err    = document.getElementById('cupon-error');
    const codigo = (input?.value || '').trim().toUpperCase();
    const cupon  = CUPONES[codigo];

    if (!cupon) {
      if (err) { err.textContent = 'Cupón inválido o expirado.'; err.hidden = false; }
      input?.setAttribute('aria-invalid', 'true');
      mostrarFeedback('Cupón inválido.', 'error');
      return;
    }

    if (err) { err.textContent = ''; err.hidden = true; }
    input?.setAttribute('aria-invalid', 'false');
    guardarCupon({ codigo, ...cupon });
    input.value = '';
    mostrarFeedback(`Cupón ${codigo} aplicado.`, 'exito');
    renderVistaCarrito();
  });

  /* ============================================================
     BOTONES DEL RESUMEN
     ============================================================ */
  document.addEventListener('click', (e) => {
    if (e.target.closest('#btn-quitar-cupon')) {
      guardarCupon(null);
      mostrarFeedback('Cupón removido.', 'info');
      renderVistaCarrito();
      return;
    }
    if (e.target.closest('#btn-vaciar-carrito')) {
      if (confirm('¿Vaciar todo el carrito?')) vaciarCarrito();
      return;
    }
    if (e.target.closest('#btn-pagar')) {
      e.preventDefault();
      const { total, items } = totales();
      if (!items.length) { mostrarFeedback('El carrito está vacío.', 'error'); return; }
      mostrarFeedback(`Gracias por tu compra. Total: ${fmtCLP(total)}`, 'exito');
    }
  });

  /* ============================================================
     SINCRONIZACIÓN Y ARRANQUE
     ============================================================ */
  window.addEventListener('storage', (e) => {
    if (e.key === CLAVE_CARRITO || e.key === CLAVE_CARRITO + ':cupon') {
      renderContadorHeader();
      renderVistaCarrito();
    }
  });

  document.addEventListener('carrito:actualizado', () => {
    renderContadorHeader();
    renderVistaCarrito();
  });

  document.addEventListener('DOMContentLoaded', () => {
    renderContadorHeader();
    renderVistaCarrito();
  });

  /* ============================================================
     API PÚBLICA
     ============================================================ */
  window.carrito = {
    agregar:      agregarAlCarrito,
    sumar:        (id) => cambiarCantidad(id, +1),
    restar:       (id) => cambiarCantidad(id, -1),
    eliminar:     eliminarDelCarrito,
    vaciar:       vaciarCarrito,
    totales:      totales,
    render:       renderVistaCarrito,
    renderHeader: renderContadorHeader,
    feedback:     mostrarFeedback,
  };

  window.agregarAlCarrito = agregarAlCarrito;
  window.totales          = totales;

  console.info('%c[carrito.js] cargado correctamente.', 'color:#28A745;font-weight:bold;');
})();