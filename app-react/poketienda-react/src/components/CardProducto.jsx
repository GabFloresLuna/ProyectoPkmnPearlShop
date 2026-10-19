import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatoCLP } from '../utils/formato.js';
import { porcentajeOferta } from '../utils/productos.js';

const IMG_FALLBACK = '/images/perlaCosmicaDecorativa.jpg';

/**
 * Molécula: tarjeta de producto. Recibe el producto y la función `onAgregar` por props
 * (no conoce el carrito: eso la hace reutilizable y fácil de probar).
 */
function CardProducto({ producto, onAgregar }) {
  const [agregado, setAgregado] = useState(false);
  const agotado = Number(producto.stock) <= 0;
  const pct = porcentajeOferta(producto);
  const detalle = `/productos/${producto.id}`;

  useEffect(() => {
    if (!agregado) return undefined;
    const t = setTimeout(() => setAgregado(false), 1500);
    return () => clearTimeout(t);
  }, [agregado]);

  const alAgregar = () => {
    onAgregar(producto);
    setAgregado(true);
  };

  return (
    <article className="card-producto" data-id={producto.id}>
      <Link className="card-producto__enlace" to={detalle} aria-label={`Ver detalle de ${producto.nombre}`}>
        <img
          className="card-producto__imagen"
          src={producto.img}
          alt={producto.desc || producto.nombre}
          width="300"
          height="300"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = IMG_FALLBACK;
          }}
        />
      </Link>
      <div className="card-producto__cuerpo">
        <span className="card-producto__categoria">
          {producto.categoria}
          {pct > 0 && <span className="badge badge--acento" style={{ marginLeft: '0.5rem' }}>-{pct}%</span>}
        </span>
        <h3 className="card-producto__nombre">
          <Link className="card-producto__enlace-texto" to={detalle}>{producto.nombre}</Link>
        </h3>
        <p className="card-producto__precio precio">
          {pct > 0 ? (
            <>
              <s className="precio-anterior">{formatoCLP(producto.precio)}</s>
              {formatoCLP(producto.precioOferta)}
            </>
          ) : (
            formatoCLP(producto.precio)
          )}
        </p>
        <button type="button" className="boton boton--primario card-producto__boton" onClick={alAgregar} disabled={agotado}>
          {agotado ? 'Sin stock' : agregado ? '✓ Añadido' : 'Añadir al carrito'}
        </button>
      </div>
    </article>
  );
}

export default CardProducto;
