'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-registro');
  if (!form) return;
  const campos = {
    nombre:     { el: form.querySelector('#nombre'),     reglas: (v) => [V.requerido(v, 'El nombre'), V.maxLen(v, 50, 'El nombre'), V.letras(v, 'El nombre')] },
    apellidos:  { el: form.querySelector('#apellidos'),  reglas: (v) => [V.requerido(v, 'Los apellidos'), V.maxLen(v, 100, 'Los apellidos')] },
    correo:     { el: form.querySelector('#correo'),     reglas: (v) => [V.email(v), V.maxLen(v, 100, 'El correo')] },
    correo2:    { el: form.querySelector('#correo2'),    reglas: (v) => [V.requerido(v, 'La confirmación'), V.coincide(v, form.querySelector('#correo').value, 'Los correos')] },
    telefono:   { el: form.querySelector('#telefono'),   reglas: (v) => [V.requerido(v, 'El teléfono'), { ok: /^\+?\d{8,15}$/.test(v.replace(/\s/g,'')), mensaje: 'Formato de teléfono inválido.' }] },
    region:     { el: form.querySelector('#region'),     reglas: (v) => [V.requerido(v, 'La región')] },
    comuna:     { el: form.querySelector('#comuna'),     reglas: (v) => [V.requerido(v, 'La comuna')] },
    password:   { el: form.querySelector('#password'),   reglas: (v) => [V.password(v)] },
    password2:  { el: form.querySelector('#password2'),  reglas: (v) => [V.requerido(v, 'La confirmación'), V.coincide(v, form.querySelector('#password').value, 'Las contraseñas')] },
    terminos:   { el: form.querySelector('#terminos'),   reglas: (v, el) => [el.checked ? { ok: true, mensaje: '' } : { ok: false, mensaje: 'Debes aceptar los términos.' }] },
  };
  const evaluar = (c) => {
    for (const r of c.reglas(c.el.value, c.el)) { if (!r.ok) return marcarCampo(c.el, r); }
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
    if (fb) { fb.textContent = '¡Cuenta creada con éxito!'; fb.className = 'formulario__feedback formulario__feedback--exito'; }
    form.reset();
  });
});