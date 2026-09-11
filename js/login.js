'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-login');
  if (!form) return;
  const correo = form.querySelector('#correo');
  const pass   = form.querySelector('#password');
  const evaluar = (input, reglas) => {
    for (const r of reglas(input.value)) { if (!r.ok) return marcarCampo(input, r); }
    return marcarCampo(input, { ok: true, mensaje: '' });
  };
  const reglasCorreo = (v) => [V.email(v), V.maxLen(v, 100, 'El correo')];
  const reglasPass   = (v) => [V.password(v)];
  correo.addEventListener('blur', () => evaluar(correo, reglasCorreo));
  pass.addEventListener('blur',   () => evaluar(pass, reglasPass));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const okC = evaluar(correo, reglasCorreo);
    const okP = evaluar(pass, reglasPass);
    const fb  = document.getElementById('form-feedback');
    if (!(okC && okP)) { if (fb) { fb.textContent = 'Credenciales inválidas.'; fb.className = 'formulario__feedback formulario__feedback--error'; } return; }
    if (fb) { fb.textContent = 'Inicio de sesión exitoso.'; fb.className = 'formulario__feedback formulario__feedback--exito'; }
    setTimeout(() => { location.href = 'index.html'; }, 800);
  });
});