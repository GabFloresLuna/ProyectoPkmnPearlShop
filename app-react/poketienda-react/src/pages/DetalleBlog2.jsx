import { Link } from 'react-router-dom';
import useTituloDocumento from '../hooks/useTituloDocumento.js';

export default function DetalleBlog2() {
  useTituloDocumento('La Generación IV');
  return (
    <>
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <div className="contenedor">
              <ol className="breadcrumb__lista">
                <li className="breadcrumb__item">
                  <Link className="breadcrumb__enlace" to="/">Inicio</Link>
                </li>
                <li className="breadcrumb__item">
                  <Link className="breadcrumb__enlace" to="/blogs">Blogs</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--actual" aria-current="page">
                  La Generación IV
                </li>
              </ol>
            </div>
          </nav>
          <article className="articulo">
            <header className="articulo__header">
              <div className="contenedor contenedor--estrecho">
                <p className="articulo__categoria">Historia</p>
                <h1 className="articulo__titulo">
                  Cómo la Generación IV marcó un antes y un después en Pokémon
                </h1>
                <p className="articulo__meta">
                  <time dateTime="2025-02-28">28 de febrero, 2025</time>
                  <span className="articulo__separador" aria-hidden="true">·</span>
                  <span>7 min de lectura</span>
                  <span className="articulo__separador" aria-hidden="true">·</span>
                  <span>Por <strong>Gabriel Flores</strong></span>
                </p>
              </div>
            </header>
            <figure className="articulo__portada">
              <div className="contenedor contenedor--estrecho">
                <img className="articulo__portada-imagen" src="/images/blog-gen4.jpeg" alt="Consola Nintendo DS con la carátula de Pokémon Pearl Version sobre fondo púrpura" width="1200" height="675" loading="eager" decoding="async" />
                <figcaption className="articulo__portada-pie">
                  La llegada de Nintendo DS transformó la forma de jugar Pokémon.
                </figcaption>
              </div>
            </figure>
            <div className="articulo__cuerpo">
              <div className="contenedor contenedor--estrecho">
                <p className="articulo__entradilla">
                  <strong>2006</strong> fue un año bisagra para la saga. Con la llegada de
                  <em>Pokémon Diamond</em> y <em>Pokémon Pearl</em> a Nintendo DS, la franquicia
                  no solo cambió de consola: cambió su forma de entender la conexión entre
                  jugadores.
                </p>
                <h2>Una nueva región: Sinnoh</h2>
                <p>
                  Sinnoh se inspiró en la isla japonesa de <strong>Hokkaido</strong>, y fue la
                  primera región en incorporar un <em>Monte Coronet</em> como eje geográfico
                  central. Su diseño introdujo una estructura vertical inédita: los jugadores
                  tenían que atravesar la región de norte a sur, atravesando nieve, cuevas y
                  lagos legendarios.
                </p>
                <h2>La conexión online cambió todo</h2>
                <p>
                  La característica estrella de la Generación IV fue la <strong>Nintendo Wi-Fi
                  Connection</strong>. Por primera vez en la saga principal, era posible
                  intercambiar Pokémon y combatir con jugadores de todo el mundo sin cables
                  ni adaptadores.
                </p>
                <p>
                  Esto no solo transformó la experiencia de juego: sentó las bases de lo que
                  hoy conocemos como la escena competitiva moderna de Pokémon.
                </p>
                <h2>Pantalla táctil y reloj Pokétch</h2>
                <p>
                  La doble pantalla de la DS permitió introducir el <strong>Pokétch</strong>,
                  un reloj multifunción que ofrecía mapas, contador de pasos, calculadora
                  y hasta un medidor de felicidad para los Pokémon del equipo.
                </p>
                <p>
                  Fue una de las primeras veces que la saga integró verdaderamente las
                  capacidades del hardware en la jugabilidad cotidiana, en lugar de
                  solo utilizarlas como un extra.
                </p>
                <blockquote className="articulo__cita">
                  <p>
                    "La Generación IV no inventó Pokémon, pero le dio su primera
                    dimensión verdaderamente global."
                  </p>
                  <cite>— Equipo PokéTienda Pearl</cite>
                </blockquote>
                <h2>El legado</h2>
                <p>
                  Muchos consideran a Diamond y Pearl el punto más alto de la saga principal.
                  Introdujeron 107 nuevos Pokémon, la separación física/especial de movimientos
                  y el sistema de combates que hoy seguimos usando.
                </p>
                <p>
                  En PokéTienda Pearl celebramos esa generación no solo vendiendo productos:
                  manteniendo viva la memoria de quienes crecimos persiguiendo a Palkia y Dialga.
                </p>
              </div>
            </div>
            <aside className="articulo__autor" aria-labelledby="autor-titulo">
              <div className="contenedor contenedor--estrecho">
                <h2 className="visually-hidden" id="autor-titulo">Sobre el autor</h2>
                <div className="autor">
                  <figure className="autor__foto">
                    <img src="/images/gabrielFlores.png" alt="Retrato ilustrado de Gabriel Flores" width="80" height="80" loading="lazy" decoding="async" />
                  </figure>
                  <div className="autor__info">
                    <p className="autor__nombre">Gabriel Flores</p>
                    <p className="autor__rol">Desarrollador Fullstack de PokéTienda Pearl</p>
                    <p className="autor__bio">
                      Encargado de la arquitectura HTML y la lógica de negocio del proyecto.
                      Fan de la Generación IV desde que jugó su primera partida en DS.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
            <nav className="articulo__nav" aria-label="Navegación entre artículos del blog">
              <div className="contenedor contenedor--estrecho">
                <ul className="articulo__nav-lista">
                  <li className="articulo__nav-item articulo__nav-item--anterior">
                    <span className="articulo__nav-label">Artículo anterior</span>
                    <Link className="articulo__nav-enlace" to="/blogs/1">
                      El misterio de las perlas en la mitología de Sinnoh
                    </Link>
                  </li>
                  <li className="articulo__nav-item articulo__nav-item--siguiente">
                    <span className="articulo__nav-label">Siguiente artículo</span>
                    <span className="articulo__nav-texto">No hay más artículos</span>
                  </li>
                </ul>
              </div>
            </nav>
          </article>
          <section className="articulo__volver" aria-labelledby="volver-titulo">
            <div className="contenedor contenedor--estrecho">
              <h2 className="visually-hidden" id="volver-titulo">Volver al listado</h2>
              <Link className="boton boton--secundario" to="/blogs">← Volver al blog</Link>
            </div>
          </section>
    </>
  );
}
