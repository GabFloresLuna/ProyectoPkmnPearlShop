import { Link } from 'react-router-dom';
import Beneficios from '../components/Beneficios.jsx';
import GrillaProductos from '../components/GrillaProductos.jsx';
import { useCarrito } from '../context/CarritoContext.jsx';
import { productosDB } from '../data/db.js';
import useRepo from '../hooks/useRepo.js';
import useTituloDocumento from '../hooks/useTituloDocumento.js';

const ESTADISTICAS = [
  { numero: '+250', texto: 'Productos disponibles' },
  { numero: '100%', texto: 'Originales' },
  { numero: '48h', texto: 'Despacho nacional' },
];

export default function Home() {
  useTituloDocumento(null);
  const productos = useRepo(productosDB);
  const { agregar } = useCarrito();
  const destacados = productos.filter((p) => p.destacado).slice(0, 4);

  return (
    <>
      <section className="hero" aria-labelledby="hero-titulo">
        <div className="contenedor hero__inner">
          <div className="hero__texto">
            <p className="hero__eyebrow">Generación IV · Región de Sinnoh</p>
            <h1 className="hero__titulo" id="hero-titulo">Atrapa lo legendario</h1>
            <p className="hero__descripcion">
              Figura coleccionable, cartas y accesorios inspirados en la era DS. Una tienda para coleccionistas que
              crecieron persiguiendo a Palkia, Dialga y Giratina.
            </p>
            <div className="hero__acciones">
              <Link to="/productos" className="boton boton--primario">Explorar catálogo</Link>
              <Link to="/nosotros" className="boton boton--secundario">Conoce la tienda</Link>
            </div>
            <ul className="hero__stats">
              {ESTADISTICAS.map((e) => (
                <li className="hero__stat" key={e.texto}>
                  <strong className="hero__stat-numero">{e.numero}</strong>
                  <span className="hero__stat-texto">{e.texto}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="hero__media">
            <img className="hero__imagen" src="/images/perlaCosmicaDecorativa.jpg"
                 alt="Perla cósmica con degradado de blanco a magenta sobre fondo púrpura estrellado, emblema de PokéTienda Pearl"
                 width="560" height="560" loading="eager" decoding="async" />
            <figcaption className="hero__caption">Colección Edición Perla</figcaption>
          </figure>
        </div>
      </section>

      <section className="destacados" aria-labelledby="destacados-titulo">
        <div className="contenedor">
          <header className="seccion__cabecera">
            <h2 className="seccion__titulo" id="destacados-titulo">Productos destacados</h2>
            <p className="seccion__subtitulo">Selección de artículos legendarios de nuestra colección.</p>
          </header>
          <GrillaProductos productos={destacados} onAgregar={agregar} />
          <div className="destacados__acciones">
            <Link to="/productos" className="boton boton--secundario">Ver todo el catálogo</Link>
          </div>
        </div>
      </section>

      <Beneficios />
    </>
  );
}
