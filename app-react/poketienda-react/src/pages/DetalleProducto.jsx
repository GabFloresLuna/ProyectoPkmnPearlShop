import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';
import GrillaProductos from '../components/GrillaProductos.jsx';
import { useCarrito } from '../context/CarritoContext.jsx';
import { MAX_POR_ITEM } from '../context/carritoLogica.js';
import { productosDB } from '../data/db.js';
import useRepo from '../hooks/useRepo.js';
import useTituloDocumento from '../hooks/useTituloDocumento.js';
import { formatoCLP } from '../utils/formato.js';
import { esCritico, porcentajeOferta } from '../utils/productos.js';

export default function DetalleProducto() {
  const { id } = useParams();
  const productos = useRepo(productosDB);
  const producto = productos.find((p) => p.id === id);
  const { agregar } = useCarrito();

  const [texto, setTexto] = useState('1');
  const [errorCantidad, setErrorCantidad] = useState('');
  const [imagenActiva, setImagenActiva] = useState(0);
  const [mensaje, setMensaje] = useState('');

  useTituloDocumento(producto ? producto.nombre : 'Producto no encontrado');

  // Al cambiar de producto se reinicia el estado local de la vista
  useEffect(() => {
    setTexto('1');
    setErrorCantidad('');
    setImagenActiva(0);
    setMensaje('');
  }, [id]);

  if (!producto) {
    return (
      <section className="seccion contenedor" style={{ padding: '3rem 1rem' }}>
        <h1>Producto no encontrado</h1>
        <p>El producto solicitado no existe o fue retirado del catálogo.</p>
        <Link className="boton boton--primario" to="/productos">Volver al catálogo</Link>
      </section>
    );
  }

  const max = Math.max(1, Math.min(MAX_POR_ITEM, Number(producto.stock)));
  const agotado = Number(producto.stock) <= 0;
  const pct = porcentajeOferta(producto);
  const imagenes = producto.imagenes?.length ? producto.imagenes : [producto.img];
  const relacionados = productos.filter((p) => p.categoria === producto.categoria && p.id !== producto.id).slice(0, 3);
  const estado = agotado
    ? { clase: 'badge--error', texto: 'Agotado' }
    : esCritico(producto)
      ? { clase: 'badge--advertencia', texto: 'Últimas unidades' }
      : { clase: 'badge--exito', texto: 'En stock' };

  // Valida y corrige la cantidad (mismo comportamiento que validarCantidad() de detalle-producto.js)
  const normalizar = (valor) => {
    let n = parseInt(valor, 10);
    if (Number.isNaN(n)) n = 1;
    if (n < 1 || n > max) {
      setErrorCantidad(`Cantidad debe estar entre 1 y ${max} unidades.`);
      n = Math.min(Math.max(n, 1), max);
    } else {
      setErrorCantidad('');
    }
    setTexto(String(n));
    return n;
  };

  const ajustar = (delta) => {
    setErrorCantidad('');
    setTexto(String(Math.min(max, Math.max(1, (parseInt(texto, 10) || 1) + delta))));
  };

  const alEnviar = (e) => {
    e.preventDefault();
    const n = normalizar(texto);
    agregar(producto, n);
    setMensaje(`Añadiste ${n} × ${producto.nombre} al carrito.`);
  };

  return (
    <>
      <Breadcrumb ruta={[
        { texto: 'Inicio', to: '/' },
        { texto: producto.categoria, to: `/categorias/${encodeURIComponent(producto.categoria)}` },
        { texto: producto.nombre },
      ]} />

      <article className="detalle-producto" data-id={producto.id}>
        <div className="contenedor detalle-producto__inner">
          <section className="galeria" aria-labelledby="galeria-titulo">
            <h2 className="visually-hidden" id="galeria-titulo">Galería del producto</h2>
            <figure className="galeria__principal">
              <img className="galeria__imagen" src={imagenes[imagenActiva]} alt={producto.nombre} width="700" height="700" loading="eager" decoding="async" />
            </figure>
            {imagenes.length > 1 && (
              <ul className="galeria__miniaturas" role="list" aria-label="Miniaturas del producto">
                {imagenes.map((src, i) => (
                  <li key={src}>
                    <button type="button" className={i === imagenActiva ? 'galeria__miniatura galeria__miniatura--activa' : 'galeria__miniatura'}
                            aria-label={`Ver imagen ${i + 1}`} aria-pressed={i === imagenActiva} onClick={() => setImagenActiva(i)}>
                      <img src={src} alt="" width="80" height="80" loading="lazy" decoding="async" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="detalle-producto__info" aria-labelledby="producto-titulo">
            <div className="detalle-producto__meta">
              <span className="detalle-producto__categoria">{producto.categoria}</span>
              <span className={`badge ${estado.clase}`}>{estado.texto}</span>
            </div>
            <h1 className="detalle-producto__titulo" id="producto-titulo">{producto.nombre}</h1>
            <p className="detalle-producto__precio precio">
              {pct > 0 && <s className="precio-anterior">{formatoCLP(producto.precio)}</s>}
              {formatoCLP(pct > 0 ? producto.precioOferta : producto.precio)}{' '}
              <span className="detalle-producto__precio-iva">IVA incluido</span>
              {pct > 0 && <span className="badge badge--acento" style={{ marginLeft: '0.5rem' }}>-{pct}%</span>}
            </p>
            <div className="detalle-producto__descripcion">
              <p>{producto.desc}</p>
              {producto.detalles?.length > 0 && (
                <ul className="detalle-producto__lista">
                  {producto.detalles.map((d) => <li key={d}>{d}</li>)}
                </ul>
              )}
            </div>

            <form className="detalle-producto__compra" onSubmit={alEnviar} noValidate>
              <div className="campo campo--cantidad">
                <label className="campo__label" htmlFor="cantidad">Cantidad</label>
                <div className="cantidad">
                  <button type="button" className="cantidad__boton" onClick={() => ajustar(-1)} aria-label="Disminuir cantidad">−</button>
                  <input className="cantidad__input" type="number" id="cantidad" name="cantidad" value={texto} min="1" max={max} step="1"
                         inputMode="numeric" aria-describedby="cantidad-ayuda" onChange={(e) => setTexto(e.target.value)} onBlur={(e) => normalizar(e.target.value)} />
                  <button type="button" className="cantidad__boton" onClick={() => ajustar(1)} aria-label="Aumentar cantidad">+</button>
                </div>
                <p className="campo__ayuda" id="cantidad-ayuda">Máximo {max} unidades por pedido.</p>
                {errorCantidad && <p className="campo__error" id="cantidad-error" role="alert" style={{ display: 'block' }}>{errorCantidad}</p>}
              </div>
              <button type="submit" className="boton boton--primario boton--bloque" disabled={agotado}>
                {agotado ? 'Sin stock' : 'Añadir al carrito'}
              </button>
              {mensaje && <p className="detalle-producto__feedback" role="status" aria-live="polite">{mensaje}</p>}
            </form>

            <div className="detalle-producto__acciones-secundarias">
              <Link className="enlace-secundario" to="/productos">← Seguir comprando</Link>
              <Link className="enlace-secundario" to="/carrito">Ir al carrito</Link>
            </div>
            <ul className="detalle-producto__envio">
              <li><span aria-hidden="true">✦</span> Envío en 48 horas hábiles a todo Chile.</li>
              <li><span aria-hidden="true">✦</span> Producto original verificado.</li>
              <li><span aria-hidden="true">✦</span> Cambio sin costo dentro de 30 días.</li>
            </ul>
          </section>
        </div>
      </article>

      {relacionados.length > 0 && (
        <section className="relacionados" aria-labelledby="relacionados-titulo">
          <div className="contenedor">
            <header className="seccion__cabecera">
              <h2 className="seccion__titulo" id="relacionados-titulo">Productos relacionados</h2>
              <p className="seccion__subtitulo">Completa tu colección de Sinnoh.</p>
            </header>
            <GrillaProductos productos={relacionados} onAgregar={agregar} relacionados />
          </div>
        </section>
      )}
    </>
  );
}
