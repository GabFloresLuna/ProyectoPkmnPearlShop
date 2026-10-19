import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

const IMG_FALLBACK = '/images/perlaCosmicaDecorativa.jpg';

export const CarritoPage = () => {
  const {
    cart,
    cupon,
    subtotal,
    descuento,
    total,
    cantidadTotalItems,
    cambiarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    aplicarCupon,
    removerCupon,
    feedback,
  } = useCart();

  const [codigoCupon, setCodigoCupon] = useState('');

  const handleFormCupon = (e) => {
    e.preventDefault();
    if (aplicarCupon(codigoCupon)) {
      setCodigoCupon('');
    }
  };

  const handlePagar = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    alert(`¡Gracias por tu compra! El total a pagar es ${formatoCLP.format(total)}.`);
  };

  const hayItems = cart.length > 0;

  return (
    <div className="carrito-view">
      <div className="contenedor">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Ruta de navegación">
          <ol className="breadcrumb__lista">
            <li className="breadcrumb__item">
              <Link className="breadcrumb__enlace" to="/">
                Inicio
              </Link>
            </li>
            <li className="breadcrumb__item breadcrumb__item--actual" aria-current="page">
              Mi Carrito
            </li>
          </ol>
        </nav>

        {/* Cabecera */}
        <header className="carrito-view__cabecera">
          <h1 className="carrito-view__titulo">Carrito de Compras</h1>
          <p className="carrito-view__subtitulo">
            Tienes <strong id="carrito-cantidad-total">{cantidadTotalItems}</strong> {cantidadTotalItems === 1 ? 'producto' : 'productos'} en tu lista.
          </p>
        </header>

        {/* Feedback visual global del carrito */}
        {feedback.visible && (
          <div
            className={`formulario__feedback formulario__feedback--${feedback.tipo}`}
            role={feedback.tipo === 'error' ? 'alert' : 'status'}
            aria-live={feedback.tipo === 'error' ? 'assertive' : 'polite'}
            style={{ marginBottom: '1.5rem' }}
          >
            {feedback.mensaje}
          </div>
        )}

        {/* Layout principal */}
        <div className="carrito-view__layout">
          {/* Si el carrito está vacío */}
          {!hayItems ? (
            <div className="carrito-vacio">
              <svg
                className="carrito-vacio__icono"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <h2 className="carrito-vacio__titulo">Tu carrito está vacío</h2>
              <p className="carrito-vacio__texto">
                Aún no has agregado productos de Sinnoh. ¡Explora nuestro catálogo y empieza tu colección!
              </p>
              <Link to="/productos" className="boton boton--primario">
                Explorar productos
              </Link>
            </div>
          ) : (
            <>
              {/* Lista de Ítems */}
              <div className="carrito-items" id="carrito-items">
                {cart.map((item) => (
                  <article className="carrito-item" key={item.id}>
                    <Link
                      className="carrito-item__enlace"
                      to={`/detalle-producto/${item.id}`}
                      aria-label={`Ver detalle de ${item.nombre}`}
                    >
                      <img
                        className="carrito-item__imagen"
                        src={item.img || IMG_FALLBACK}
                        alt={item.nombre}
                        width="120"
                        height="120"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = IMG_FALLBACK;
                        }}
                      />
                    </Link>

                    <div className="carrito-item__info">
                      <span className="carrito-item__categoria">PokéTienda Pearl</span>
                      <h3 className="carrito-item__nombre">
                        <Link
                          className="carrito-item__nombre-enlace"
                          to={`/detalle-producto/${item.id}`}
                        >
                          {item.nombre}
                        </Link>
                      </h3>
                      <ul className="carrito-item__detalles">
                        <li>
                          <span className="carrito-item__detalle-label">SKU:</span>
                          <code className="carrito-item__sku">{item.id}</code>
                        </li>
                        <li>
                          <span className="carrito-item__detalle-label">Estado:</span>
                          <span className="badge badge--exito">Disponible</span>
                        </li>
                      </ul>
                    </div>

                    <div className="carrito-item__acciones">
                      <div className="carrito-item__precios">
                        <span className="carrito-item__precio-unitario">
                          {formatoCLP.format(item.precio)} <small className="carrito-item__precio-unidad">c/u</small>
                        </span>
                        <span className="carrito-item__subtotal precio">
                          {formatoCLP.format(item.precio * item.cantidad)}
                        </span>
                      </div>

                      <div className="selector-cantidad" role="group" aria-label={`Cantidad de ${item.nombre}`}>
                        <button
                          className="cantidad__boton"
                          type="button"
                          onClick={() => cambiarCantidad(item.id, -1)}
                          aria-label={`Disminuir cantidad de ${item.nombre}`}
                        >
                          −
                        </button>
                        <span className="selector-cantidad__valor" aria-live="polite" style={{ padding: '0 0.5rem', fontWeight: 600 }}>
                          {item.cantidad}
                        </span>
                        <button
                          className="cantidad__boton"
                          type="button"
                          onClick={() => cambiarCantidad(item.id, 1)}
                          aria-label={`Aumentar cantidad de ${item.nombre}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="carrito-item__quitar"
                        type="button"
                        onClick={() => eliminarDelCarrito(item.id)}
                        aria-label={`Quitar ${item.nombre} del carrito`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                          <path d="M10 11v6"></path>
                          <path d="M14 11v6"></path>
                          <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        <span>Quitar</span>
                      </button>
                    </div>
                  </article>
                ))}

                {/* Acciones del carrito */}
                <div className="carrito-items__acciones">
                  <Link to="/productos" className="carrito-items__volver">
                    ← Seguir comprando
                  </Link>
                  <button
                    type="button"
                    className="carrito-items__vaciar"
                    onClick={() => {
                      if (window.confirm('¿Deseas vaciar todo el carrito?')) vaciarCarrito();
                    }}
                  >
                    Vaciar carrito
                  </button>
                </div>
              </div>

              {/* Panel Lateral: Resumen de Compra */}
              <aside className="carrito-resumen" aria-label="Resumen del pedido">
                <h2 className="carrito-resumen__titulo">Resumen del pedido</h2>

                {/* Cupón */}
                {!cupon ? (
                  <form className="carrito-resumen__cupon" onSubmit={handleFormCupon}>
                    <label htmlFor="cupon" className="campo__label">
                      ¿Tienes un cupón?
                    </label>
                    <div className="carrito-resumen__cupon-grupo">
                      <input
                        type="text"
                        id="cupon"
                        className="campo__input"
                        placeholder="Ej: PEARL10"
                        value={codigoCupon}
                        onChange={(e) => setCodigoCupon(e.target.value)}
                      />
                      <button type="submit" className="boton boton--secundario boton--sm">
                        Aplicar
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="carrito-resumen__cupon-aplicado">
                    <span className="carrito-resumen__cupon-texto">
                      Cupón <strong>{cupon.codigo}</strong> aplicado
                    </span>
                    <button
                      type="button"
                      className="carrito-resumen__cupon-quitar"
                      onClick={removerCupon}
                      aria-label="Quitar cupón"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Totales */}
                <div className="carrito-resumen__totales">
                  <div className="carrito-resumen__fila">
                    <span className="carrito-resumen__label">Subtotal</span>
                    <span className="carrito-resumen__valor">{formatoCLP.format(subtotal)}</span>
                  </div>

                  {descuento > 0 && (
                    <div className="carrito-resumen__fila">
                      <span className="carrito-resumen__label">
                        Descuento <small className="carrito-resumen__pct">({cupon.valor}%)</small>
                      </span>
                      <span className="carrito-resumen__valor carrito-resumen__valor--descuento">
                        −{formatoCLP.format(descuento)}
                      </span>
                    </div>
                  )}

                  <div className="carrito-resumen__fila">
                    <span className="carrito-resumen__label">Envío</span>
                    <span className="carrito-resumen__valor" style={{ color: 'var(--color-exito)' }}>
                      Gratis
                    </span>
                  </div>
                </div>

                <div className="carrito-resumen__total">
                  <span>Total</span>
                  <span className="precio">{formatoCLP.format(total)}</span>
                </div>

                <button
                  type="button"
                  className="boton boton--primario boton--bloque carrito-resumen__pagar"
                  onClick={handlePagar}
                >
                  Proceder al pago
                </button>

                <p className="carrito-resumen__pagar-ayuda">
                  Pago 100% seguro con cifrado SSL.
                </p>
              </aside>
            </>
          )}
        </div>
      </div>
    </div>
  );
};