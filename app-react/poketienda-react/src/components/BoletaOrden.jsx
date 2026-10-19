import { formatoCLP, formatoFecha } from '../utils/formato.js';

/** Detalle de una orden (boleta): cliente, dirección de entrega, productos y totales. Se usa en la tienda y en el admin. */
function BoletaOrden({ orden }) {
  const { cliente, direccion, items } = orden;
  return (
    <div className="boleta">
      <dl className="row g-3 mb-3">
        <div className="col-12 col-md-4"><dt className="campo__label">Nombre</dt><dd>{cliente.nombre} {cliente.apellidos}</dd></div>
        <div className="col-12 col-md-4"><dt className="campo__label">Correo</dt><dd>{cliente.correo}</dd></div>
        <div className="col-12 col-md-4"><dt className="campo__label">Fecha</dt><dd>{formatoFecha(orden.fecha)}</dd></div>
        <div className="col-12 col-md-4">
          <dt className="campo__label">Dirección</dt>
          <dd>{direccion.calle}{direccion.departamento ? `, Depto ${direccion.departamento}` : ''}</dd>
        </div>
        <div className="col-12 col-md-4"><dt className="campo__label">Región / Comuna</dt><dd>{direccion.region} / {direccion.comuna}</dd></div>
        <div className="col-12 col-md-4"><dt className="campo__label">Indicaciones</dt><dd>{direccion.indicaciones || '—'}</dd></div>
      </dl>

      <div className="tabla__scroll">
        <table className="tabla--admin">
          <thead>
            <tr><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td>{i.nombre}</td>
                <td>{formatoCLP(i.precio)}</td>
                <td>{i.cantidad}</td>
                <td>{formatoCLP(i.precio * i.cantidad)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dl className="carrito-resumen__totales mt-3">
        <div className="carrito-resumen__fila"><dt className="carrito-resumen__label">Subtotal</dt><dd className="carrito-resumen__valor">{formatoCLP(orden.subtotal)}</dd></div>
        {orden.descuento > 0 && (
          <div className="carrito-resumen__fila"><dt className="carrito-resumen__label">Descuento</dt><dd className="carrito-resumen__valor">−{formatoCLP(orden.descuento)}</dd></div>
        )}
        <div className="carrito-resumen__fila"><dt className="carrito-resumen__label">Envío</dt><dd className="carrito-resumen__valor">{orden.envio === 0 ? 'Gratis' : formatoCLP(orden.envio)}</dd></div>
      </dl>
      <div className="carrito-resumen__total"><span>Total:</span><span className="precio">{formatoCLP(orden.total)}</span></div>
    </div>
  );
}

export default BoletaOrden;
