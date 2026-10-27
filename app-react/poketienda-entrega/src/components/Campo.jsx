/**
 * Molécula: etiqueta + control + mensaje de error (solo se muestra cuando hay error).
 * `como` permite usar 'input' (por defecto), 'textarea' o 'select'.
 */
export default function Campo({ id, etiqueta, como: Control = 'input', error, children, ...resto }) {
  const clase = Control === 'select' ? 'form-select' : 'form-control';
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{etiqueta}</label>
      <Control id={id} name={id} className={`${clase}${error ? ' is-invalid' : ''}`} aria-invalid={Boolean(error)} {...resto}>
        {children}
      </Control>
      {error && <div className="invalid-feedback" role="alert">{error}</div>}
    </div>
  );
}
