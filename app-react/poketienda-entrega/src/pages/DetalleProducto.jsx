import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CardProducto from '../components/CardProducto.jsx';
import { useApp } from '../context/AppContext.jsx';
import { productosDB } from '../data/db.js';
import { formatoCLP } from '../utils.js';

export default function DetalleProducto() {
  const { id } = useParams();
  const { agregar } = useApp();
  const producto = productosDB.obtener(id);
  const [cantidad, setCantidad] = useState(1);
  const [aviso, setAviso] = useState('');

  if (!producto) {
    return (
      <div className="pagina-no-encontrada text-center py-5">
        <h1>Producto no encontrado</h1>
        <Link className="btn boton-perla" to="/productos">Volver al catálogo</Link>
      </div>
    );
  }

  const max = Math.max(1, Math.min(10, producto.stock));
  const relacionados = productosDB.listar().filter((p) => p.categoria === producto.categoria && p.id !== producto.id).slice(0, 3);

  // Valida la cantidad: entre 1 y el máximo permitido
  const cambiarCantidad = (valor) => {
    const n = Number(valor) || 1;
    setAviso(n > max || n < 1 ? `La cantidad debe estar entre 1 y ${max}.` : '');
    setCantidad(Math.min(max, Math.max(1, n)));
  };

  return (
    <>
      <div className="detalle-producto row g-4">
        <div className="columna-imagen col-md-6">
          <img className="imagen-detalle img-fluid rounded-4" src={producto.img} alt={producto.nombre} />
        </div>
        <div className="columna-informacion col-md-6">
          <small className="text-secondary">{producto.categoria}</small>
          <h1 className="h2">{producto.nombre}</h1>
          <p className="fs-4 fw-bold">
            {producto.oferta && <s className="precio-anterior">{formatoCLP(producto.precio)}</s>}
            {formatoCLP(producto.oferta ? producto.precioOferta : producto.precio)}
          </p>
          <p>{producto.desc}</p>
          <p className="text-secondary">{producto.stock > 0 ? `${producto.stock} unidades disponibles` : 'Agotado'}</p>

          <div className="selector-cantidad input-group mb-2" style={{ maxWidth: 220 }}>
            <button type="button" className="btn btn-outline-light" aria-label="Disminuir cantidad" onClick={() => cambiarCantidad(cantidad - 1)}>−</button>
            <input className="form-control text-center" type="number" aria-label="Cantidad" value={cantidad} onChange={(e) => cambiarCantidad(e.target.value)} />
            <button type="button" className="btn btn-outline-light" aria-label="Aumentar cantidad" onClick={() => cambiarCantidad(cantidad + 1)}>+</button>
          </div>
          {aviso && <div className="aviso-cantidad text-warning mb-2" role="alert">{aviso}</div>}

          <button type="button" className="btn boton-perla" disabled={producto.stock <= 0} onClick={() => agregar(producto, cantidad)}>
            Añadir al carrito
          </button>
        </div>
      </div>

      {relacionados.length > 0 && (
        <>
          <h2 className="h4 mt-5 mb-3">Productos relacionados</h2>
          <div className="lista-relacionados row row-cols-1 row-cols-sm-3 g-4">
            {relacionados.map((p) => (
              <div className="columna-producto col" key={p.id}>
                <CardProducto producto={p} onAgregar={agregar} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
