import { Link } from 'react-router-dom';
import useTituloDocumento from '../hooks/useTituloDocumento.js';

export default function Blogs() {
  useTituloDocumento('Blogs');
  return (
    <>
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <div className="contenedor">
              <ol className="breadcrumb__lista">
                <li className="breadcrumb__item">
                  <Link className="breadcrumb__enlace" to="/">Inicio</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--actual" aria-current="page">
                  Blogs
                </li>
              </ol>
            </div>
          </nav>
          <section className="page-hero" aria-labelledby="blogs-titulo">
            <div className="contenedor">
              <p className="page-hero__eyebrow">Bitácora de Sinnoh</p>
              <h1 className="page-hero__titulo" id="blogs-titulo">Noticias importantes</h1>
              <p className="page-hero__descripcion">
                Datos curiosos, historia de la Generación IV y todo lo que un coleccionista
                de la era DS debería saber.
              </p>
            </div>
          </section>
          <section className="blogs" aria-labelledby="listado-blogs-titulo">
            <div className="contenedor">
              <h2 className="visually-hidden" id="listado-blogs-titulo">Listado de artículos del blog</h2>
              <ul className="blogs__lista" role="list">
                <li>
                  <article className="blog-card blog-card--destacado" aria-labelledby="blog-1-titulo">
                    <div className="blog-card__texto">
                      <p className="blog-card__categoria">Caso curioso</p>
                      <h3 className="blog-card__titulo" id="blog-1-titulo">
                        El misterio de las perlas en la mitología de Sinnoh
                      </h3>
                      <p className="blog-card__fecha">
                        <time dateTime="2025-03-12">12 de marzo, 2025</time>
                        <span className="blog-card__separador" aria-hidden="true">·</span>
                        <span className="blog-card__lectura">5 min de lectura</span>
                      </p>
                      <p className="blog-card__resumen">
                        Palkia, el legendario que controla el espacio, está asociado a las perlas
                        en la cosmología de Sinnoh. Repasamos el origen mitológico de esta
                        asociación y por qué una perla se volvió el símbolo de toda una generación.
                      </p>
                      <Link className="boton boton--primario blog-card__boton" to="/blogs/1" aria-label="Ver caso completo: El misterio de las perlas en la mitología de Sinnoh">
                        Ver caso
                      </Link>
                    </div>
                    <figure className="blog-card__media">
                      <img className="blog-card__imagen" src="/images/blog-perla-mitologia.jpg" alt="Ilustración de una perla cósmica con destellos magenta y púrpura" width="600" height="400" loading="lazy" decoding="async" />
                    </figure>
                  </article>
                </li>
                <li>
                  <article className="blog-card" aria-labelledby="blog-2-titulo">
                    <div className="blog-card__texto">
                      <p className="blog-card__categoria">Historia</p>
                      <h3 className="blog-card__titulo" id="blog-2-titulo">
                        Cómo la Generación IV marcó un antes y un después en Pokémon
                      </h3>
                      <p className="blog-card__fecha">
                        <time dateTime="2025-02-28">28 de febrero, 2025</time>
                        <span className="blog-card__separador" aria-hidden="true">·</span>
                        <span className="blog-card__lectura">7 min de lectura</span>
                      </p>
                      <p className="blog-card__resumen">
                        La llegada de Nintendo DS trajo consigo conexión online, pantalla táctil
                        y una región completamente nueva: Sinnoh. Analizamos por qué Pearl y
                        Diamond son considerados por muchos el punto más alto de la saga.
                      </p>
                      <Link className="boton boton--primario blog-card__boton" to="/blogs/2" aria-label="Ver caso completo: Cómo la Generación IV marcó un antes y un después en Pokémon">
                        Ver caso
                      </Link>
                    </div>
                    <figure className="blog-card__media">
                      <img className="blog-card__imagen" src="/images/blog-gen4.jpeg" alt="Consola Nintendo DS con la carátula de Pokémon Pearl Version" width="600" height="400" loading="lazy" decoding="async" />
                    </figure>
                  </article>
                </li>
              </ul>
            </div>
          </section>
          <section className="cta" aria-labelledby="cta-blogs-titulo">
            <div className="contenedor cta__inner">
              <h2 className="cta__titulo" id="cta-blogs-titulo">¿Quieres ampliar tu colección?</h2>
              <p className="cta__texto">
                Explora figuras, cartas y accesorios inspirados en Sinnoh.
              </p>
              <div className="cta__acciones">
                <Link to="/productos" className="boton boton--primario">Ver productos</Link>
                <Link to="/contacto" className="boton boton--secundario">Contáctanos</Link>
              </div>
            </div>
          </section>
    </>
  );
}
