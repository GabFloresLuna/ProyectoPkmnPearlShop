import { Link } from 'react-router-dom';
import CardProducto from '../components/CardProducto.jsx';
import { useApp } from '../context/AppContext.jsx';
import { productosDB } from '../data/db.js';

const BENEFICIOS = ['Productos originales verificados', 'Despacho a todo Chile en 48 h hábiles', 'Pago seguro y seguimiento del pedido'];

export default function Home() {
  const { agregar } = useApp();
  const destacados = productosDB.listar().slice(0, 4);

  return (
    <>
      <section className="seccion-portada row align-items-center g-4 py-3">
        <div className="columna-texto col-md-6">
          <p className="text-uppercase text-warning mb-1">Generación IV · Región de Sinnoh</p>
          <h1 className="display-5">Atrapa lo legendario</h1>
          <p className="lead">Figuras, cartas y accesorios inspirados en la era DS, para coleccionistas que crecieron persiguiendo a Palkia, Dialga y Giratina.</p>
          <Link to="/productos" className="btn boton-perla me-2">Explorar catálogo</Link>
          <Link to="/nosotros" className="btn btn-outline-light">Conoce la tienda</Link>
        </div>
        <div className="columna-imagen col-md-6 text-center">
          <img src="/images/perlaCosmicaDecorativa.jpg" alt="Perla cósmica sobre fondo púrpura" className="imagen-portada img-fluid rounded-4" />
        </div>
      </section>

      <h2 className="h3 mt-4 mb-3">Productos destacados</h2>
      <div className="lista-productos-destacados row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {destacados.map((p) => (
          <div className="columna-producto col" key={p.id}>
            <CardProducto producto={p} onAgregar={agregar} />
          </div>
        ))}
      </div>

      <ul className="lista-beneficios row list-unstyled text-center mt-5 g-3">
        {BENEFICIOS.map((b) => (
          <li className="beneficio col-md-4" key={b}>✦ {b}</li>
        ))}
      </ul>
    </>
  );
}
