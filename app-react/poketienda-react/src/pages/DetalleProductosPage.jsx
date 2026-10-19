import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATALOGO } from '../data/catalogo';
import { useCart } from '../context/CartContext';
import { CardProducto } from '../components/CardProducto';

const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

export const DetalleProductoPage = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useCart();
  const producto = CATALOGO.find((p) => p.id === id);
  const [cantidad, setCantidad] = useState(1);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  if (!producto) {
    return (
      <section className="seccion contenedor">
        <h1>Producto no encontrado</h1>
        <p>El producto solicitado no existe o fue retirado del catálogo.</p>
        <Link className="boton boton--primario" to="/productos">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  const { nombre, desc, precio, img, categoria, stock } = producto;
  const imagenPrincipal = imagenSeleccionada || img;

  const relacionados = CATALOGO.filter(
    (p) => p.categoria === categoria && p.id !== id
  ).slice(0, 3);

  const handleRestar = () => setCantidad((prev) => Math.max(1, prev - 1));
  const handleSumar = () => setCantidad((prev) => Math.min(stock || 10, prev + 1));

  const handleAgregar = (e) => {
    e.preventDefault();
    agregarAlCarrito(producto, cantidad);
  };

  return (
    <div className="detalle-producto">
      <div className="contenedor">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Ruta de navegación">
          <ol className="breadcrumb__lista">
            <li className="breadcrumb__item">
              <Link className="breadcrumb__enlace" to="/">Inicio</Link>
            </li>
            <li className="breadcrumb__item">
              <Link className="breadcrumb__enlace" to="/productos">Productos</Link>
            </li>
            <li className="breadcrumb__item breadcrumb__item--actual" aria-current="page">
              {nombre}
            </li>
          </ol>
        </nav>

        {/* Layout principal de detalle */}
        <div className="detalle-producto__inner">
          {/* Galería */}
          <div className="galeria">
            <figure className="galeria__principal">
              <img
                src={imagenPrincipal}
                alt={nombre}
                className="galeria__imagen"
                id="detalle-imagen"
              />
            </figure>
            <div className="galeria__miniaturas">
              <button
                type="button"
                className={`galeria__miniatura ${imagenPrincipal === img ? 'galeria__miniatura--activa' : ''}`}
                onClick={() => setImagenSeleccionada(img)}
              >
                <img src={img} alt={nombre} />
              </button>
            </div>
          </div>

          {/* Información y Compra */}
          <div className="detalle-producto__info">
            <div className="detalle-producto__meta">
              <span className="detalle-producto__categoria">{categoria}</span>
              <span className="badge badge--exito">Stock disponible ({stock} un.)</span>
            </div>

            <h1 className="detalle-producto__titulo">{nombre}</h1>

            <p className="detalle-producto__precio">
              {formatoCLP.format(precio)}{' '}
              <span className="detalle-producto__precio-iva">IVA incluido</span>
            </p>

            <div className="detalle-producto__descripcion">
              <p>{desc}</p>
            </div>

            {/* Formulario de Compra */}
            <form className="detalle-producto__compra" onSubmit={handleAgregar}>
              <div className="campo--cantidad">
                <label htmlFor="cantidad" className="campo__label">Cantidad</label>
                <div className="cantidad">
                  <button
                    type="button"
                    className="cantidad__boton"
                    onClick={handleRestar}
                    aria-label="Disminuir cantidad"
                  >
                    −
                  </button>

                  <input
                    type="number"
                    id="cantidad"
                    className="cantidad__input"
                    value={cantidad}
                    min="1"
                    max={stock || 10}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) {
                        setCantidad(Math.min(Math.max(1, val), stock || 10));
                      }
                    }}
                  />

                  <button
                    type="button"
                    className="cantidad__boton"
                    onClick={handleSumar}
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>

              <button type="submit" className="boton boton--primario boton--lg">
                Añadir al carrito
              </button>
            </form>

            <ul className="detalle-producto__envio">
              <li>
                <span aria-hidden="true">✔</span> Envío a todo Chile mediante BlueExpress / Starken.
              </li>
              <li>
                <span aria-hidden="true">✔</span> Garantía oficial PokéTienda Pearl de 3 meses.
              </li>
            </ul>
          </div>
        </div>

        {/* Productos Relacionados */}
        {relacionados.length > 0 && (
          <section className="relacionados" aria-labelledby="relacionados-titulo">
            <h2 className="seccion__titulo" id="relacionados-titulo">Productos Relacionados</h2>
            <div className="grid-productos grid-productos--relacionados">
              {relacionados.map((rel) => (
                <CardProducto key={rel.id} producto={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};