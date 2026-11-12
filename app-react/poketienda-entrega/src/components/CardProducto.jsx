import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatoCLP } from '../utils.js';

/** Molécula: tarjeta de producto. Recibe el producto y la función onAgregar por props. */
export default function CardProducto({ producto, onAgregar }) {
  const [agregado, setAgregado] = useState(false);
  const agotado = producto.stock <= 0;

  // El mensaje "Añadido" desaparece solo a los 1,5 segundos
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
    <article className="tarjeta-producto card h-100" data-id={producto.id}>
      <Link to={`/productos/${producto.id}`}>
        <img className="imagen-producto card-img-top" src={producto.img} alt={producto.nombre} loading="lazy" />
      </Link>
      <div className="cuerpo-tarjeta card-body d-flex flex-column">
        <small className="categoria-producto text-secondary">{producto.categoria}</small>
        <h3 className="nombre-producto h6">{producto.nombre}</h3>
        <p className="precio-producto fw-bold mb-3">
          {producto.oferta ? (
            <>
              <s className="precio-anterior">{formatoCLP(producto.precio)}</s>
              {formatoCLP(producto.precioOferta)}
            </>
          ) : (
            formatoCLP(producto.precio)
          )}
        </p>
        <button type="button" className="btn boton-perla mt-auto" onClick={alAgregar} disabled={agotado}>
          {agotado ? 'Sin stock' : agregado ? '✓ Añadido' : 'Añadir al carrito'}
        </button>
      </div>
    </article>
  );
}
