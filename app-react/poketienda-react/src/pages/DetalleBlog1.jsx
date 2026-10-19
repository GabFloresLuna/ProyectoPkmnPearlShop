import { Link } from 'react-router-dom';
import useTituloDocumento from '../hooks/useTituloDocumento.js';

export default function DetalleBlog1() {
  useTituloDocumento('El misterio de las perlas');
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
                  El misterio de las perlas
                </li>
              </ol>
            </div>
          </nav>
          <article className="articulo">
            <header className="articulo__header">
              <div className="contenedor contenedor--estrecho">
                <p className="articulo__categoria">Caso curioso</p>
                <h1 className="articulo__titulo">
                  El misterio de las perlas en la mitología de Sinnoh
                </h1>
                <p className="articulo__meta">
                  <time dateTime="2025-03-12">12 de marzo, 2025</time>
                  <span className="articulo__separador" aria-hidden="true">·</span>
                  <span>5 min de lectura</span>
                  <span className="articulo__separador" aria-hidden="true">·</span>
                  <span>Por <strong>Daniel Rangel</strong></span>
                </p>
              </div>
            </header>
            <figure className="articulo__portada">
              <div className="contenedor contenedor--estrecho">
                <img className="articulo__portada-imagen" src="/images/blog-perla-mitologia.jpg" alt="Ilustración de una perla cósmica con destellos magenta y púrpura sobre fondo estrellado" width="1200" height="675" loading="eager" decoding="async" />
                <figcaption className="articulo__portada-pie">
                  Representación de la perla cósmica asociada a Palkia en la mitología de Sinnoh.
                </figcaption>
              </div>
            </figure>
            <div className="articulo__cuerpo">
              <div className="contenedor contenedor--estrecho">
                <p className="articulo__entradilla">
                  <strong>Palkia</strong>, el Pokémon legendario que controla el espacio, aparece
                  en la carátula de <em>Pokémon Pearl Version</em> flanqueado por una perla.
                  Pero ¿por qué una perla? Y más importante aún: ¿qué nos dice esa elección
                  sobre la cosmología de la región de Sinnoh?
                </p>
                <h2>El espacio y la materia</h2>
                <p>
                  En la mitología de Sinnoh, el universo fue creado por Arceus, quien delegó
                  el control del <strong>tiempo</strong> a Dialga y del <strong>espacio</strong>
                  a Palkia. Mientras Dialga representa el devenir y la estructura temporal,
                  Palkia encarna la expansión, la materia y la forma.
                </p>
                <p>
                  La perla, con su superficie nacarada y su origen en el interior de las
                  conchas, ha sido durante siglos un símbolo de perfección formada lentamente.
                  En muchas culturas orientales se la asocia al <em>orden dentro del caos</em>,
                  precisamente la función que Palkia cumple en el universo Pokémon.
                </p>
                <h2>La perla como símbolo generacional</h2>
                <p>
                  Cuando Game Freak eligió nombrar la versión de Nintendo DS como
                  <em>Pearl</em>, no fue solo por el brillo de la carátula. La perla se
                  convirtió en el emblema de toda una generación que descubrió Pokémon
                  en pantallas táctiles, con conexión Wi-Fi y una región completamente nueva.
                </p>
                <p>
                  Para muchos coleccionistas, sostener una perla decorativa es sostener un
                  pedazo de infancia. Por eso en PokéTienda Pearl la perla no es un adorno:
                  es el corazón de nuestra identidad visual.
                </p>
                <blockquote className="articulo__cita">
                  <p>
                    "El espacio y el tiempo, nacidos de un solo huevo, se separaron en dos.
                    Y de su separación, nació la forma de las cosas."
                  </p>
                  <cite>— Mitología de Sinnoh</cite>
                </blockquote>
                <h2>Conclusión</h2>
                <p>
                  La perla de Pearl no es un detalle estético: es un símbolo cargado de
                  significado. Representa el orden, la forma y esa nostalgia generacional
                  que seguimos celebrando cada vez que abrimos una caja de colección.
                </p>
              </div>
            </div>
            <aside className="articulo__autor" aria-labelledby="autor-titulo">
              <div className="contenedor contenedor--estrecho">
                <h2 className="visually-hidden" id="autor-titulo">Sobre el autor</h2>
                <div className="autor">
                  <figure className="autor__foto">
                    <img src="/images/danielRangel2.jpg" alt="Retrato ilustrado de Daniel Rangel" width="80" height="80" loading="lazy" decoding="async" />
                  </figure>
                  <div className="autor__info">
                    <p className="autor__nombre">Daniel Rangel</p>
                    <p className="autor__rol">Diseñador UI / Frontend de PokéTienda Pearl</p>
                    <p className="autor__bio">
                      Coleccionista de la Generación IV y responsable de la identidad
                      visual inspirada en la carátula de Pokémon Pearl.
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
                    <span className="articulo__nav-texto">No hay artículos anteriores</span>
                  </li>
                  <li className="articulo__nav-item articulo__nav-item--siguiente">
                    <span className="articulo__nav-label">Siguiente artículo</span>
                    <Link className="articulo__nav-enlace" to="/blogs/2">
                      Cómo la Generación IV marcó un antes y un después en Pokémon
                    </Link>
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
