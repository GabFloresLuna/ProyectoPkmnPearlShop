'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-usuario');
  if (!form) return;

  const params = new URLSearchParams(location.search);
  const run = params.get('run');
  const modoEdicion = Boolean(run);
  const titulo = document.getElementById('titulo-formulario');
  if (titulo) titulo.textContent = modoEdicion ? `Editar usuario ${run}` : 'Nuevo usuario';

  const campos = {
    run:        { el: form.querySelector('#run'),        reglas: (v) => [V.run(v)] },
    nombre:     { el: form.querySelector('#nombre'),     reglas: (v) => [V.requerido(v, 'El nombre'), V.maxLen(v, 50, 'El nombre'), V.letras(v, 'El nombre')] },
    apellidos:  { el: form.querySelector('#apellidos'),  reglas: (v) => [V.requerido(v, 'Los apellidos'), V.maxLen(v, 100, 'Los apellidos')] },
    correo:     { el: form.querySelector('#correo'),     reglas: (v) => [V.email(v), V.maxLen(v, 100, 'El correo')] },
    nacimiento: { el: form.querySelector('#nacimiento'), reglas: () => [{ ok: true, mensaje: '' }] },
    tipo:       { el: form.querySelector('#tipo'),       reglas: (v) => [V.requerido(v, 'El tipo de usuario')] },
    region:     { el: form.querySelector('#region'),     reglas: (v) => [V.requerido(v, 'La región')] },
    comuna:     { el: form.querySelector('#comuna'),     reglas: (v) => [V.requerido(v, 'La comuna')] },
    direccion:  { el: form.querySelector('#direccion'),  reglas: (v) => [V.requerido(v, 'La dirección'), V.maxLen(v, 300, 'La dirección')] },
  };

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
    if (fb) { fb.textContent = modoEdicion ? 'Usuario actualizado.' : 'Usuario creado.'; fb.className = 'formulario__feedback formulario__feedback--exito'; }
    setTimeout(() => { location.href = 'usuarios.html'; }, 900);
  });
});