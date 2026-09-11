'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-producto');
  if (!form) return;

  // Modo edición vía ?id=
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const modoEdicion = Boolean(id);
  const titulo = document.getElementById('titulo-formulario');
  if (titulo) titulo.textContent = modoEdicion ? `Editar producto ${id}` : 'Nuevo producto';

  // Carga inicial en modo edición (placeholder hasta backend)
  if (modoEdicion) {
    const p = (window.CATALOGO || []).find((x) => x.id === id);
    if (p) {
      form.querySelector('#codigo').value = p.id;
      form.querySelector('#nombre').value = p.nombre;
      form.querySelector('#descripcion').value = p.desc;
      form.querySelector('#precio').value = p.precio;
      form.querySelector('#stock').value = p.stock;
      form.querySelector('#categoria').value = p.categoria;
    }
  }

  const campos = {
    codigo:      { el: form.querySelector('#codigo'),      reglas: (v) => [V.requerido(v, 'El código'), V.minLen(v, 3, 'El código')] },
    nombre:      { el: form.querySelector('#nombre'),      reglas: (v) => [V.requerido(v, 'El nombre'), V.maxLen(v, 100, 'El nombre')] },
    descripcion: { el: form.querySelector('#descripcion'), reglas: (v) => [V.maxLen(v, 500, 'La descripción')] },
    precio:      { el: form.querySelector('#precio'),      reglas: (v) => [V.decimal(v, 'El precio'), V.noNegativo(v, 'El precio')] },
    stock:       { el: form.querySelector('#stock'),       reglas: (v) => [V.entero(v, 'El stock'), V.noNegativo(v, 'El stock')] },
    stockCritico:{ el: form.querySelector('#stock-critico'),reglas: (v) => v === '' ? [{ ok: true, mensaje: '' }] : [V.entero(v, 'El stock crítico'), V.noNegativo(v, 'El stock crítico')] },
    categoria:   { el: form.querySelector('#categoria'),   reglas: (v) => [V.requerido(v, 'La categoría')] },
  };

  // Alerta de stock crítico en vivo
  const stockEl = form.querySelector('#stock');
  const critEl  = form.querySelector('#stock-critico');
  const alerta  = document.getElementById('alerta-stock');
  const evaluarAlerta = () => {
    if (!alerta || !stockEl || !critEl) return;
    const s = Number(stockEl.value), c = Number(critEl.value);
    alerta.hidden = !(critEl.value !== '' && !Number.isNaN(s) && !Number.isNaN(c) && s <= c);
  };
  stockEl?.addEventListener('input', evaluarAlerta);
  critEl?.addEventListener('input', evaluarAlerta);

  // Previsualización de imagen
  const inputImg = form.querySelector('#imagen');
  const preview  = document.getElementById('imagen-preview');
  inputImg?.addEventListener('change', () => {
    const file = inputImg.files?.[0];
    if (!file) { if (preview) preview.hidden = true; return; }
    const url = URL.createObjectURL(file);
    if (preview) { preview.src = url; preview.hidden = false; preview.alt = 'Previsualización'; }
  });

  const evaluar = (c) => {
    for (const r of c.reglas(c.el.value)) { if (!r.ok) return marcarCampo(c.el, r); }
    return marcarCampo(c.el, { ok: true, mensaje: '' });
  };
  Object.values(campos).forEach((c) => {
    c.el.addEventListener('blur', () => evaluar(c));
    c.el.addEventListener('input', () => { if (c.el.classList.contains('campo--error')) evaluar(c); });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = Object.values(campos).map(evaluar).every(Boolean);
    const fb = document.getElementById('form-feedback');
    if (!ok) { if (fb) { fb.textContent = 'Corrige los campos marcados.'; fb.className = 'formulario__feedback formulario__feedback--error'; } return; }
    if (fb) { fb.textContent = modoEdicion ? 'Producto actualizado.' : 'Producto creado.'; fb.className = 'formulario__feedback formulario__feedback--exito'; }
    // Persistencia real: pendiente de backend.
    setTimeout(() => { location.href = 'productos.html'; }, 900);
  });
});