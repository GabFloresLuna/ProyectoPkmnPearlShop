import { Link, useNavigate } from 'react-router-dom';
import Beneficios from '../components/Beneficios.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import CarritoItem from '../components/CarritoItem.jsx';
import GrillaProductos from '../components/GrillaProductos.jsx';
import ResumenCompra from '../components/ResumenCompra.jsx';
import { useCarrito } from '../context/CarritoContext.jsx';
import { productosDB } from '../data/db.js';
import useRepo from '../hooks/useRepo.js';
import useTituloDocumento from '../hooks/useTituloDocumento.js';

export default function Carrito() {
  useTituloDocumento('Carrito');
  const navigate = useNavigate();
  const productos = useRepo(productosDB);
  const { items, cantidadTotal, cambiarCantidad, quitar, vaciar, agregar } = useCarrito();
  const sugeridos = productos.filter((p) => !items.some((i) => i.id === p.id) && Number(p.stock) > 0).slice(0, 4);

  return (
    <>
      <Breadcrumb ruta={[{ texto: 'Inicio', to: '/' }, { texto: 'Carrito' }]} />
      <section className="carrito-view" aria-labelledby="carrito-titulo">
        <div className="contenedor">
          <header className="carrito-view__cabecera">
            <h1 className="carrito-view__titulo" id="carrito-titulo">Mi carrito de compras</h1>
            <p className="carrito-view__subtitulo">
              Tienes <strong>{cantidadTotal} {cantidadTotal === 1 ? 'producto' : 'productos'}</strong> en tu carrito.
            </p>
          </header>

          <div className="carrito-view__layout">
            <div className="carrito-items" aria-live="polite">
              {items.length === 0 ? (
                <div className="carrito-vacio">
                  <h2 className="carrito-vacio__titulo">Tu carrito está vacío</h2>
                  <p className="carrito-vacio__texto">Aún no has añadido productos. Explora nuestra colección y atrapa lo legendario.</p>
                  <Link to="/productos" className="boton boton--primario">Explorar productos</Link>
                </div>
              ) : (
                items.map((item) => (
                  <CarritoItem key={item.id} item={item} producto={productos.find((p) => p.id === item.id)}
                               onCambiar={cambiarCantidad} onQuitar={quitar} />
                ))
              )}
            </div>
            <div className="carrito-items__acciones">
              <Link className="carrito-items__volver" to="/productos">← Seguir comprando</Link>
              {items.length > 0 && (
                <button className="carrito-items__vaciar" type="button" onClick={vaciar}>Vaciar carrito</button>
              )}
            </div>
            <ResumenCompra textoBoton="Ir a pagar" onPagar={() => navigate('/checkout')} />
          </div>
        </div>
      </section>

      {sugeridos.length > 0 && (
        <section className="relacionados relacionados--sugeridos" aria-labelledby="sugeridos-titulo">
          <div className="contenedor">
            <header className="seccion__cabecera">
              <h2 className="seccion__titulo" id="sugeridos-titulo">También te puede interesar</h2>
            </header>
            <GrillaProductos productos={sugeridos} onAgregar={agregar} relacionados />
          </div>
        </section>
      )}
      <Beneficios />
    </>
  );
}
