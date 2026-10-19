import { Link } from 'react-router-dom';
import useTituloDocumento from '../hooks/useTituloDocumento.js';

export default function Nosotros() {
  useTituloDocumento('Nosotros');
  return (
    <>
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <div className="contenedor">
              <ol className="breadcrumb__lista">
                <li className="breadcrumb__item">
                  <Link className="breadcrumb__enlace" to="/">Inicio</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--actual" aria-current="page">
                  Nosotros
                </li>
              </ol>
            </div>
          </nav>
          <section className="page-hero" aria-labelledby="nosotros-titulo">
            <div className="contenedor">
              <p className="page-hero__eyebrow">Quiénes somos</p>
              <h1 className="page-hero__titulo" id="nosotros-titulo">Sobre PokéTienda Pearl</h1>
              <p className="page-hero__descripcion">
                Nacimos de la nostalgia por la Generación IV y del cariño por la región de Sinnoh.
                Somos una tienda online creada por coleccionistas, para coleccionistas.
              </p>
            </div>
          </section>
          <section className="empresa" aria-labelledby="empresa-titulo">
            <div className="contenedor empresa__inner">
              <div className="empresa__texto">
                <h2 className="empresa__titulo" id="empresa-titulo">Nuestra historia</h2>
                <p>
                  <strong>PokéTienda Pearl</strong> es un proyecto de tienda online temática
                  inspirado en la carátula de <em>Pokémon Pearl Version</em> para Nintendo DS.
                  Nació como una respuesta a la dificultad de encontrar productos de colección
                  originales de la Generación IV en el mercado nacional.
                </p>
                <p>
                  Nuestra propuesta combina la estética mística y cósmica de la portada de
                  <em>Pearl</em> —el legendario Palkia, el brillo nacarado de una perla y un
                  cielo estrellado— con una experiencia de compra clara, accesible y responsiva.
                </p>
                <p>
                  Cada artículo que ofrecemos pasa por un proceso de verificación antes de
                  llegar a tus manos. Trabajamos con proveedores confiables y damos seguimiento
                  a cada pedido desde el momento en que lo realizas hasta que lo recibes.
                </p>
              </div>
              <div className="empresa__pilares">
                <article className="pilar" aria-labelledby="pilar-mision-titulo">
                  <span className="pilar__icono" aria-hidden="true">✦</span>
                  <h3 className="pilar__titulo" id="pilar-mision-titulo">Misión</h3>
                  <p className="pilar__texto">
                    Acercar a los fans de Pokémon de la era DS productos originales y de calidad,
                    con una experiencia de compra premium, rápida y confiable.
                  </p>
                </article>
                <article className="pilar" aria-labelledby="pilar-vision-titulo">
                  <span className="pilar__icono" aria-hidden="true">✦</span>
                  <h3 className="pilar__titulo" id="pilar-vision-titulo">Visión</h3>
                  <p className="pilar__texto">
                    Convertirnos en la tienda de referencia en Chile para coleccionistas de
                    Pokémon, reconocida por su curaduría y por su identidad visual única.
                  </p>
                </article>
                <article className="pilar" aria-labelledby="pilar-valores-titulo">
                  <span className="pilar__icono" aria-hidden="true">✦</span>
                  <h3 className="pilar__titulo" id="pilar-valores-titulo">Valores</h3>
                  <ul className="pilar__lista">
                    <li>Pasión por la colección.</li>
                    <li>Transparencia en cada venta.</li>
                    <li>Respeto por la comunidad fan.</li>
                    <li>Calidad antes que cantidad.</li>
                  </ul>
                </article>
              </div>
            </div>
          </section>
          <section className="metricas" aria-labelledby="metricas-titulo">
            <div className="contenedor">
              <h2 className="visually-hidden" id="metricas-titulo">Cifras de PokéTienda Pearl</h2>
              <ul className="metricas__lista">
                <li className="metrica">
                  <strong className="metrica__numero">+250</strong>
                  <span className="metrica__etiqueta">Productos en catálogo</span>
                </li>
                <li className="metrica">
                  <strong className="metrica__numero">+1.500</strong>
                  <span className="metrica__etiqueta">Clientes felices</span>
                </li>
                <li className="metrica">
                  <strong className="metrica__numero">16</strong>
                  <span className="metrica__etiqueta">Regiones con despacho</span>
                </li>
                <li className="metrica">
                  <strong className="metrica__numero">4,8/5</strong>
                  <span className="metrica__etiqueta">Valoración promedio</span>
                </li>
              </ul>
            </div>
          </section>
          <section className="equipo" aria-labelledby="equipo-titulo">
            <div className="contenedor">
              <header className="seccion__cabecera">
                <p className="seccion__eyebrow">Proyecto DSY1104</p>
                <h2 className="seccion__titulo" id="equipo-titulo">Equipo desarrollador</h2>
                <p className="seccion__subtitulo">
                  Tres estudiantes, una misma pasión: construir una experiencia web
                  que haga justicia a la Generación IV.
                </p>
              </header>
              <ul className="equipo__lista" role="list">
                <li>
                  <article className="integrante" aria-labelledby="integrante-gabriel">
                    <figure className="integrante__foto">
                      <img src="/images/gabrielFlores.png" alt="Retrato ilustrado de Gabriel Flores con estilo edición Perla" width="200" height="200" loading="lazy" decoding="async" />
                    </figure>
                    <div className="integrante__cuerpo">
                      <h3 className="integrante__nombre" id="integrante-gabriel">Gabriel Flores</h3>
                      <p className="integrante__rol">Desarrollador Fullstack</p>
                      <p className="integrante__bio">
                        Encargado de la arquitectura HTML semántica y la lógica de negocio
                        en JavaScript. Apasionado por la accesibilidad y las buenas prácticas web.
                      </p>
                      <ul className="integrante__habilidades" aria-label="Áreas de trabajo de Gabriel Flores">
                        <li className="integrante__chip">HTML5</li>
                        <li className="integrante__chip">JavaScript</li>
                        <li className="integrante__chip">Accesibilidad</li>
                      </ul>
                    </div>
                  </article>
                </li>
                <li>
                  <article className="integrante" aria-labelledby="integrante-daniel">
                    <figure className="integrante__foto">
                      <img src="/images/danielRangel.jpg" alt="Retrato ilustrado de Daniel Rangel con estilo edición Perla" width="200" height="200" loading="lazy" decoding="async" />
                    </figure>
                    <div className="integrante__cuerpo">
                      <h3 className="integrante__nombre" id="integrante-daniel">Daniel Rangel</h3>
                      <p className="integrante__rol">Diseñador UI / Frontend</p>
                      <p className="integrante__bio">
                        Encargado de las validaciones de formularios, la gestión del repositorio
                        remoto y las pruebas funcionales de cada vista del sitio.
                      </p>
                      <ul className="integrante__habilidades" aria-label="Áreas de trabajo de Daniel Rangel">
                        <li className="integrante__chip">Validaciones JS</li>
                        <li className="integrante__chip">Git / GitHub</li>
                        <li className="integrante__chip">QA</li>
                      </ul>
                    </div>
                  </article>
                </li>
                <li>
                  <article className="integrante" aria-labelledby="integrante-hernando">
                    <figure className="integrante__foto">
                      <img src="/images/hernaldoSilva.png" alt="Retrato ilustrado de Hernaldo Silva con estilo edición Perla" width="200" height="200" loading="lazy" decoding="async" />
                    </figure>
                    <div className="integrante__cuerpo">
                      <h3 className="integrante__nombre" id="integrante-hernando">Hernaldo Silva</h3>
                      <p className="integrante__rol">Desarrollador Frontend / QA</p>
                      <p className="integrante__bio">
                        Responsable de la identidad visual, la paleta inspirada en Palkia y
                        la implementación de las hojas de estilo externas del proyecto.
                      </p>
                      <ul className="integrante__habilidades" aria-label="Áreas de trabajo de Hernaldo Silva">
                        <li className="integrante__chip">CSS3</li>
                        <li className="integrante__chip">Diseño responsivo</li>
                        <li className="integrante__chip">Identidad visual</li>
                      </ul>
                    </div>
                  </article>
                </li>
              </ul>
            </div>
          </section>
          <section className="cta" aria-labelledby="cta-titulo">
            <div className="contenedor cta__inner">
              <h2 className="cta__titulo" id="cta-titulo">¿Listo para atrapar lo legendario?</h2>
              <p className="cta__texto">
                Explora nuestra colección de figuras, cartas y accesorios de la Generación IV.
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
