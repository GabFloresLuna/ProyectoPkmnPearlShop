/**
 * productos.js — PokéTienda Pearl (v3 — scope aislado)
 *
 * Envuelto en IIFE para evitar colisiones de const/función con otros
 * scripts del proyecto (validaciones.js, carrito.js, main.js).
 *
 * Depende de: nada.
 * Expone:     window.CATALOGO
 */
(function () {
  'use strict';

  /* ============================================================
     CATÁLOGO
     IDs alineados con el HTML hardcodeado y con carrito.js.
     Rutas de imagen relativas a /tienda/.
     ============================================================ */
  const CATALOGO = [
    { id: 'P001', nombre: 'Figura Palkia Legendaria', categoria: 'Figuras',    precio: 24990, stock: 8,  img: '../images/figuraPalkiaLegendaria1.webp', desc: 'Figura coleccionable de Palkia en posición de ataque.' },
    { id: 'P002', nombre: 'Perla Cósmica Decorativa', categoria: 'Decoración', precio: 12490, stock: 15, img: '../images/perlaCosmicaDecorativa.jpg',   desc: 'Perla decorativa con acabado nacarado y aura púrpura.' },
    { id: 'P003', nombre: 'Set de Cartas Sinnoh',     categoria: 'Cartas',     precio:  8990, stock: 40, img: '../images/setCartasSinnoh.jpeg',         desc: 'Set de cartas coleccionables de la región de Sinnoh.' },
    { id: 'P004', nombre: 'Consola Edición Perla',    categoria: 'Consolas',   precio: 89990, stock: 3,  img: '../images/consolaEdicionPerla.jpg',      desc: 'Consola portátil edición Perla con detalles en magenta.' },
    { id: 'P005', nombre: 'Estuche Perla Cósmica',    categoria: 'Accesorios', precio: 18990, stock: 12, img: '../images/estuchePokemonPearl.jpeg',     desc: 'Estuche rígido con impresión de Palkia en acabado nacarado.' },
    { id: 'P006', nombre: 'Álbum Tapa Dura Sinnoh',   categoria: 'Colección',  precio: 24990, stock: 7,  img: '../images/albumColeccionistaSinnoh.webp',desc: 'Álbum de 360 bolsillos con arte de la Generación IV.' },
    { id: 'P007', nombre: 'Lámpara Cósmica Giratina', categoria: 'Accesorios', precio: 15990, stock: 9,  img: '../images/lamparaCosmicaGiratina.webp',  desc: 'Lámpara cósmica con diseño de Giratina.' },
    { id: 'P008', nombre: 'Figura Dialga Temporal',   categoria: 'Figuras',    precio: 24990, stock: 8,  img: '../images/figuraPalkiaTemporal1.jpg',    desc: 'Figura coleccionable de Dialga en posición de ataque.' },
  ];

  /* ============================================================
     UTILIDADES (privadas del IIFE)
     ============================================================ */
  const IMG_FALLBACK = '../images/perlaCosmicaDecorativa.jpg';

  const _fmtCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency', currency: 'CLP', maximumFractionDigits: 0,
  });
  const formatoCLP = (n) => _fmtCLP.format(n);

  const escapar = (s) => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  /* ============================================================
     RENDER
     ============================================================ */
  function crearCardProducto(p) {
    const article = document.createElement('article');
    article.className = 'card-producto';
    article.setAttribute('data-id', p.id);
    article.setAttribute('aria-labelledby', `prod-${p.id}-nombre`);

    article.innerHTML = `
      <a class="card-producto__enlace" href="detalle-producto.html?id=${encodeURIComponent(p.id)}">
        <figure class="card-producto__figura">
          <img class="card-producto__imagen"
               src="${escapar(p.img)}"
               alt="${escapar(p.nombre)}"
               width="300" height="300"
               loading="lazy" decoding="async"
               onerror="this.onerror=null; this.src='${IMG_FALLBACK}';">
        </figure>
        <h3 class="card-producto__nombre" id="prod-${p.id}-nombre">${escapar(p.nombre)}</h3>
      </a>
      <p class="card-producto__precio precio">${formatoCLP(p.precio)}</p>
      <button type="button" class="boton boton--primario boton--bloque"
              data-accion="agregar"
              data-id="${p.id}"
              data-nombre="${escapar(p.nombre)}"
              data-precio="${p.precio}"
              aria-label="Añadir ${escapar(p.nombre)} al carrito">
        Añadir al carrito
      </button>`;
    return article;
  }

  function renderGrilla(contenedor, productos) {
    if (!contenedor) return;
    contenedor.innerHTML = '';
    const frag = document.createDocumentFragment();
    productos.forEach((p) => frag.appendChild(crearCardProducto(p)));
    contenedor.appendChild(frag);
  }

  /* ============================================================
     ARRANQUE
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('lista-productos');
    if (!lista) return;

    const params   = new URLSearchParams(location.search);
    const cat      = params.get('categoria');
    const busqueda = (params.get('q') || '').trim().toLowerCase();
    const orden    = params.get('orden') || 'relevancia';

    let filtrados = CATALOGO.slice();
    if (cat)      filtrados = filtrados.filter((p) => p.categoria === cat);
    if (busqueda) filtrados = filtrados.filter((p) => p.nombre.toLowerCase().includes(busqueda));

    if (orden === 'precio-asc')  filtrados.sort((a, b) => a.precio - b.precio);
    if (orden === 'precio-desc') filtrados.sort((a, b) => b.precio - a.precio);
    if (orden === 'nombre')      filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

    renderGrilla(lista, filtrados);

    const contador = document.getElementById('resultado-contador');
    if (contador) contador.textContent = `${filtrados.length} producto(s)`;
  });

  /* ============================================================
     API pública
     ============================================================ */
  window.CATALOGO = CATALOGO;

  console.info('%c[productos.js] cargado correctamente.', 'color:#28A745;font-weight:bold;');
})();