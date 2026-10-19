import { Link } from 'react-router-dom';
import { CATALOGO } from '../data/catalogo';
import { CardProducto } from '../components/CardProducto';

export const HomePage = () => {
  // Obtenemos los 4 productos destacados iniciales
  const destacados = CATALOGO.filter((p) =>
    ['P001', 'P002', 'P003', 'P004'].includes(p.id)
  );

  return (
    <>
      {/* HERO BANNER */}
      <section className="hero" aria-labelledby="hero-titulo">
        <div className="contenedor hero__inner">
          <div className="hero__texto">
            <p className="hero__eyebrow">Edición Sinnoh — Generación IV</p>
            <h1 className="hero__titulo" id="hero-titulo">
              Atrapa lo legendario en PokéTienda Pearl
            </h1>
            <p className="hero__descripcion">
              Figuras exclusivas, merchandising oficial, consolas retro y coleccionables inspirados en el universo de la Perla Cósmica.
            </p>
            <div className="hero__acciones">
              <Link to="/productos" className="boton boton--primario">
                Ver catálogo
              </Link>
              <Link to="/blogs" className="boton boton--fantasma">
                Leer blogs
              </Link>
            </div>

            {/* Métricas rápidas */}
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-numero">+1.2k</span>
                <span className="hero__stat-texto">Entrenadores felices</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-numero">100%</span>
                <span className="hero__stat-texto">Productos originales</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-numero">24h</span>
                <span className="hero__stat-texto">Despacho express</span>
              </div>
            </div>
          </div>

          <figure className="hero__media">
            <img
              className="hero__imagen"
              src="/images/figuraPalkiaLegendaria1.webp"
              alt="Figura Palkia Legendaria con efectos de luz"
              width="500"
              height="500"
            />
            <figcaption className="hero__caption">
              Edición limitada Palkia Legendario — Disponible en catálogo.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="destacados" aria-labelledby="destacados-titulo">
        <div className="contenedor">
          <header className="seccion__cabecera">
            <p className="seccion__eyebrow">Selección Especial</p>
            <h2 className="seccion__titulo" id="destacados-titulo">
              Productos Destacados
            </h2>
            <p className="seccion__subtitulo">
              Lo más buscado por los coleccionistas de la región de Sinnoh.
            </p>
          </header>

          <div className="grid-productos">
            {destacados.map((prod) => (
              <CardProducto key={prod.id} producto={prod} />
            ))}
          </div>

          <div className="destacados__acciones">
            <Link to="/productos" className="boton boton--secundario">
              Explorar todo el catálogo →
            </Link>
          </div>
        </div>
      </section>

      {/* BENEFICIOS DE COMPRA */}
      <section className="beneficios" aria-labelledby="beneficios-titulo">
        <div className="contenedor">
          <h2 className="visually-hidden" id="beneficios-titulo">
            Beneficios de comprar en PokéTienda Pearl
          </h2>
          <div className="beneficios__lista">
            <article className="beneficio">
              <span className="beneficio__icono" aria-hidden="true">🚀</span>
              <h3 className="beneficio__titulo">Envíos Rápidos</h3>
              <p className="beneficio__texto">
                Despachamos a todo Chile mediante BlueExpress y Starken en menos de 48 horas.
              </p>
            </article>

            <article className="beneficio">
              <span className="beneficio__icono" aria-hidden="true">🛡️</span>
              <h3 className="beneficio__titulo">Garantía Oficial</h3>
              <p className="beneficio__texto">
                Todos nuestros artículos cuentan con 3 meses de garantía directa.
              </p>
            </article>

            <article className="beneficio">
              <span className="beneficio__icono" aria-hidden="true">💎</span>
              <h3 className="beneficio__titulo">Calidad Coleccionista</h3>
              <p className="beneficio__texto">
                Embalaje reforzado con protección para evitar daños en cajas y empaques originales.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};