import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const IMG_FALLBACK = '/images/perlaCosmicaDecorativa.jpg';

const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

export const CardProducto = ({ producto }) => {
  const { agregarAlCarrito } = useCart();

  if (!producto) return null;

  const { id, nombre, categoria, precio, img } = producto;

  return (
    <article className="card-producto" data-id={id} aria-labelledby={`prod-${id}-nombre`}>
      <Link className="card-producto__enlace" to={`/detalle-producto/${id}`}>
        <figure className="card-producto__figura">
          <img
            className="card-producto__imagen"
            src={img || IMG_FALLBACK}
            alt={nombre}
            width="300"
            height="300"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = IMG_FALLBACK;
            }}
          />
        </figure>
      </Link>

      <div className="card-producto__cuerpo">
        {categoria && <span className="card-producto__categoria">{categoria}</span>}
        <h3 className="card-producto__nombre" id={`prod-${id}-nombre`}>
          <Link className="card-producto__enlace-texto" to={`/detalle-producto/${id}`}>
            {nombre}
          </Link>
        </h3>
        <p className="card-producto__precio precio">{formatoCLP.format(precio)}</p>
        <button
          type="button"
          className="boton boton--primario card-producto__boton"
          onClick={() => agregarAlCarrito(producto, 1)}
          aria-label={`Añadir ${nombre} al carrito`}
        >
          Añadir al carrito
        </button>
      </div>
    </article>
  );
};