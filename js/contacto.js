'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-contacto');
  if (!form) return;
  const campos = {
    nombre:    { el: form.querySelector('#nombre'),    reglas: (v) => [V.requerido(v, 'El nombre'), V.maxLen(v, 100, 'El nombre'), V.letras(v, 'El nombre')] },
    correo:    { el: form.querySelector('#correo'),    reglas: (v) => [V.email(v), V.maxLen(v, 100, 'El correo')] },
    comentario:{ el: form.querySelector('#comentario'),reglas: (v) => [V.requerido(v, 'El comentario'), V.maxLen(v, 500, 'El comentario')] },
  };
  const evaluar = (campo) => {
    const v = campo.el.value;
    for (const r of campo.reglas(v)) { if (!r.ok) return marcarCampo(campo.el, r); }
    return marcarCampo(campo.el, { ok: true, mensaje: '' });
  };
  Object.values(campos).forEach((c) => {
    c.el.addEventListener('blur', () => evaluar(c));
    c.el.addEventListener('input', () => { if (c.el.classList.contains('campo--error')) evaluar(c); });
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = Object.values(campos).map(evaluar).every(Boolean);
    const fb = document.getElementById('form-feedback');
    if (!ok) { if (fb) { fb.textContent = 'Revisa los campos marcados.'; fb.className = 'formulario__feedback formulario__feedback--error'; } return; }
    if (fb) { fb.textContent = '¡Mensaje enviado! Te contactaremos pronto.'; fb.className = 'formulario__feedback formulario__feedback--exito'; }
    form.reset();
  });
});