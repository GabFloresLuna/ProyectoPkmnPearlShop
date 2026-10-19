import { useState } from 'react';

/**
 * Molécula: campo de formulario (label + control + ayuda + error).
 * Reemplaza los ~15 bloques <div class="campo"> repetidos en el HTML y a marcarCampo() de validaciones.js.
 *
 *  - componente: 'input' (por defecto) | 'select' | 'textarea'
 *  - tipo: 'text', 'email', 'password' (agrega botón Ver/Ocultar), 'checkbox', ...
 *  - error: texto del error. El mensaje SOLO se renderiza cuando existe (renderizado condicional).
 */
function Campo({
  id, nombre = id, etiqueta, requerido = false, opcional = false,
  componente = 'input', tipo = 'text', valor, error, ayuda, contador,
  alCambiar, alSalir, children, ...resto
}) {
  const [verPassword, setVerPassword] = useState(false);
  const idAyuda = `${id}-ayuda`;
  const idError = `${id}-error`;
  const describedBy = [ayuda && idAyuda, error && idError].filter(Boolean).join(' ') || undefined;
  const base = {
    id,
    name: nombre,
    'aria-required': requerido ? 'true' : undefined,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': describedBy,
    onChange: alCambiar,
    onBlur: alSalir,
    ...resto,
  };
  const clases = ['campo', error && 'campo--error'].filter(Boolean).join(' ');
  const textoError = error ? <p className="campo__error" id={idError} role="alert">{error}</p> : null;

  if (tipo === 'checkbox') {
    return (
      <div className={`${clases} campo--check`}>
        <input {...base} className="campo__check" type="checkbox" checked={Boolean(valor)} />
        <label className="campo__check-label" htmlFor={id}>
          {etiqueta}
          {requerido && <span className="campo__requerido" aria-hidden="true"> *</span>}
        </label>
        {textoError}
      </div>
    );
  }

  let control;
  if (componente === 'select') {
    control = <select {...base} className="campo__select" value={valor ?? ''}>{children}</select>;
  } else if (componente === 'textarea') {
    control = <textarea {...base} className="campo__textarea" value={valor ?? ''} />;
  } else if (tipo === 'password') {
    control = (
      <div className="campo__grupo">
        <input {...base} className="campo__input" type={verPassword ? 'text' : 'password'} value={valor ?? ''} />
        <button
          type="button"
          className="campo__toggle"
          onClick={() => setVerPassword((v) => !v)}
          aria-label={verPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          aria-pressed={verPassword}
        >
          <span className="campo__toggle-texto" aria-hidden="true">{verPassword ? 'Ocultar' : 'Ver'}</span>
        </button>
      </div>
    );
  } else {
    control = <input {...base} className="campo__input" type={tipo} value={valor ?? ''} />;
  }

  const pie = (
    <>
      {ayuda && <p className="campo__ayuda" id={idAyuda}>{ayuda}</p>}
      {contador !== undefined && (
        <p className="campo__contador" aria-live="polite">{String(valor ?? '').length}/{contador}</p>
      )}
    </>
  );

  return (
    <div className={clases}>
      {etiqueta && (
        <label className="campo__label" htmlFor={id}>
          {etiqueta}
          {requerido && <span className="campo__requerido" aria-hidden="true"> *</span>}
          {opcional && <span className="campo__opcional"> (opcional)</span>}
        </label>
      )}
      {control}
      {contador !== undefined ? <div className="campo__pie">{pie}</div> : pie}
      {textoError}
    </div>
  );
}

export default Campo;
