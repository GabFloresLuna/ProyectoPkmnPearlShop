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
      <section className="row align-items-center g-4 py-3">
        <div className="col-md-6">
          <p className="text-uppercase text-warning mb-1">Generación IV · Región de Sinnoh</p>
          <h1 className="display-5">Atrapa lo legendario</h1>
          <p className="lead">Figuras, cartas y accesorios inspirados en la era DS, para coleccionistas que crecieron persiguiendo a Palkia, Dialga y Giratina.</p>
          <Link to="/productos" className="btn btn-pearl me-2">Explorar catálogo</Link>
          <Link to="/nosotros" className="btn btn-outline-light">Conoce la tienda</Link>
        </div>
        <div className="col-md-6 text-center">
          <img src="/images/perlaCosmicaDecorativa.jpg" alt="Perla cósmica sobre fondo púrpura" className="img-fluid rounded-4 hero-img" />
        </div>
      </section>

      <h2 className="h3 mt-4 mb-3">Productos destacados</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {destacados.map((p) => (
          <div className="col" key={p.id}>
            <CardProducto producto={p} onAgregar={agregar} />
          </div>
        ))}
      </div>

      <ul className="row list-unstyled text-center mt-5 g-3">
        {BENEFICIOS.map((b) => (
          <li className="col-md-4" key={b}>✦ {b}</li>
        ))}
      </ul>
    </>
  );
}
