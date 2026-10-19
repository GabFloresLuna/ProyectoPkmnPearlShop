import { Link } from 'react-router-dom';
import { formatoCLP } from '../utils/formato.js';
import { esCritico } from '../utils/productos.js';

/** Molécula: una fila del carrito con selector de cantidad y botón para quitar. */
function CarritoItem({ item, producto, onCambiar, onQuitar }) {
  const detalle = `/productos/${item.id}`;
  const estado = producto
    ? Number(producto.stock) <= 0
      ? { clase: 'badge--error', texto: 'Agotado' }
      : esCritico(producto)
        ? { clase: 'badge--advertencia', texto: 'Últimas unidades' }
        : { clase: 'badge--exito', texto: 'Disponible' }
    : null;

  return (
    <article className="carrito-item" data-id={item.id}>
      <Link className="carrito-item__enlace" to={detalle} aria-label={`Ver detalle de ${item.nombre}`}>
        <img className="carrito-item__imagen" src={item.img} alt={item.nombre} width="120" height="120" loading="lazy" decoding="async" />
      </Link>
      <div className="carrito-item__info">
        <span className="carrito-item__categoria">{item.categoria}</span>
        <h3 className="carrito-item__nombre">
          <Link className="carrito-item__nombre-enlace" to={detalle}>{item.nombre}</Link>
        </h3>
        {producto && <p className="carrito-item__desc">{producto.desc}</p>}
        <ul className="carrito-item__detalles">
          <li>
            <span className="carrito-item__detalle-label">SKU:</span> <code className="carrito-item__sku">{item.id}</code>
          </li>
          {estado && (
            <li>
              <span className="carrito-item__detalle-label">Estado:</span> <span className={`badge ${estado.clase}`}>{estado.texto}</span>
            </li>
          )}
        </ul>
      </div>
      <div className="carrito-item__acciones">
        <div className="carrito-item__precios">
          <span className="carrito-item__precio-unitario">
            {formatoCLP(item.precio)} <small className="carrito-item__precio-unidad">c/u</small>
          </span>
          <span className="carrito-item__subtotal precio">{formatoCLP(item.precio * item.cantidad)}</span>
        </div>
        <div className="selector-cantidad" role="group" aria-label={`Cantidad de ${item.nombre}`}>
          <button className="selector-cantidad__btn" type="button" onClick={() => onCambiar(item.id, -1)}
                  aria-label={`Disminuir cantidad de ${item.nombre}`}>−</button>
          <span className="selector-cantidad__valor" aria-live="polite">{item.cantidad}</span>
          <button className="selector-cantidad__btn" type="button" onClick={() => onCambiar(item.id, 1)}
                  aria-label={`Aumentar cantidad de ${item.nombre}`}>+</button>
        </div>
        <button className="carrito-item__quitar" type="button" onClick={() => onQuitar(item.id)}
                aria-label={`Quitar ${item.nombre} del carrito`}>
          <span>Quitar</span>
        </button>
      </div>
    </article>
  );
}

export default CarritoItem;
