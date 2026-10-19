import { useState } from 'react';
import { useCarrito } from '../context/CarritoContext.jsx';
import { ENVIO_GRATIS_DESDE } from '../context/carritoLogica.js';
import { formatoCLP } from '../utils/formato.js';

/** Organismo: resumen del carrito (cupón, subtotal, descuento, envío y total). */
function ResumenCompra({ textoBoton = 'Pagar', onPagar, ayuda = 'Serás redirigido a la pasarela de pago segura.' }) {
  const { items, cupon, subtotal, descuento, envio, total, aplicarCupon, quitarCupon } = useCarrito();
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');

  const alAplicar = (e) => {
    e.preventDefault();
    const r = aplicarCupon(codigo);
    if (r.ok) {
      setCodigo('');
      setError('');
    } else {
      setError(r.mensaje);
    }
  };

  return (
    <aside className="carrito-resumen" aria-labelledby="resumen-titulo">
      <h2 className="carrito-resumen__titulo" id="resumen-titulo">Resumen de compra</h2>

      {cupon ? (
        <div className="carrito-resumen__cupon-aplicado">
          <span className="carrito-resumen__cupon-texto">Cupón <strong>{cupon.codigo}</strong> aplicado</span>
          <button type="button" className="carrito-resumen__cupon-quitar" onClick={quitarCupon} aria-label="Quitar cupón aplicado">×</button>
        </div>
      ) : (
        <form className="carrito-resumen__cupon" onSubmit={alAplicar} noValidate>
          <label className="visually-hidden" htmlFor="cupon">Cupón de descuento</label>
          <div className="carrito-resumen__cupon-grupo">
            <input className="campo__input" type="text" id="cupon" name="cupon" placeholder="Cupón de descuento"
                   maxLength={20} autoComplete="off" value={codigo} onChange={(e) => setCodigo(e.target.value)}
                   aria-describedby="cupon-ayuda" />
            <button className="boton boton--secundario boton--sm" type="submit">Aplicar</button>
          </div>
          <p className="campo__ayuda" id="cupon-ayuda">Prueba con <strong>PEARL10</strong> (10 % de descuento).</p>
          {error && <p className="campo__error" role="alert" style={{ display: 'block' }}>{error}</p>}
        </form>
      )}

      <dl className="carrito-resumen__totales">
        <div className="carrito-resumen__fila">
          <dt className="carrito-resumen__label">Subtotal</dt>
          <dd className="carrito-resumen__valor">{formatoCLP(subtotal)}</dd>
        </div>
        {descuento > 0 && (
          <div className="carrito-resumen__fila">
            <dt className="carrito-resumen__label">Descuento <span className="carrito-resumen__pct">({cupon.valor} %)</span></dt>
            <dd className="carrito-resumen__valor carrito-resumen__valor--descuento">−{formatoCLP(descuento)}</dd>
          </div>
        )}
        <div className="carrito-resumen__fila">
          <dt className="carrito-resumen__label">Envío</dt>
          <dd className="carrito-resumen__valor">{items.length === 0 ? '—' : envio === 0 ? 'Gratis' : formatoCLP(envio)}</dd>
        </div>
      </dl>
      <div className="carrito-resumen__total">
        <span>TOTAL:</span>
        <span className="precio">{formatoCLP(total)}</span>
      </div>
      <p className="carrito-resumen__nota"><span aria-hidden="true">✦</span> Envío gratis desde {formatoCLP(ENVIO_GRATIS_DESDE)}</p>

      {onPagar && (
        <>
          <button className="boton boton--exito boton--bloque carrito-resumen__pagar" type="button"
                  onClick={onPagar} disabled={items.length === 0} aria-describedby="pagar-ayuda">
            {textoBoton}
          </button>
          <p className="carrito-resumen__pagar-ayuda" id="pagar-ayuda">{ayuda}</p>
        </>
      )}

      <ul className="carrito-resumen__sellos" aria-label="Garantías de compra">
        <li className="carrito-resumen__sello"><span className="carrito-resumen__sello-icono" aria-hidden="true">✦</span><span>Pago 100 % seguro</span></li>
        <li className="carrito-resumen__sello"><span className="carrito-resumen__sello-icono" aria-hidden="true">✦</span><span>Despacho en 48 h hábiles</span></li>
        <li className="carrito-resumen__sello"><span className="carrito-resumen__sello-icono" aria-hidden="true">✦</span><span>Cambios sin costo dentro de 30 días</span></li>
      </ul>
    </aside>
  );
}

export default ResumenCompra;
