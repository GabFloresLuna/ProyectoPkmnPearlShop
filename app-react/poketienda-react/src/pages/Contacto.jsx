import { Link } from 'react-router-dom';
import useTituloDocumento from '../hooks/useTituloDocumento.js';
import FormularioContacto from '../components/forms/FormularioContacto.jsx';

export default function Contacto() {
  useTituloDocumento('Contacto');
  return (
    <>
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <div className="contenedor">
              <ol className="breadcrumb__lista">
                <li className="breadcrumb__item">
                  <Link className="breadcrumb__enlace" to="/">Inicio</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--actual" aria-current="page">
                  Contacto
                </li>
              </ol>
            </div>
          </nav>
          <section className="page-hero page-hero--contacto" aria-labelledby="contacto-titulo">
            <div className="contenedor page-hero__inner">
              <svg className="page-hero__logo" width="80" height="80" viewBox="0 0 100 100" role="img" aria-hidden="true" focusable="false">
                <defs>
                  <radialGradient id="pearlGradContacto" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#D63384" />
                    <stop offset="100%" stopColor="#4A148C" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#pearlGradContacto)" stroke="#FFC107" strokeWidth="3" />
                <ellipse cx="35" cy="35" rx="10" ry="6" fill="#FFFFFF" opacity="0.6" />
              </svg>
              <p className="page-hero__eyebrow">Estamos para ayudarte</p>
              <h1 className="page-hero__titulo" id="contacto-titulo">
                Formulario de contacto
              </h1>
              <p className="page-hero__descripcion">
                ¿Tienes dudas sobre un producto, tu pedido o una colaboración?
                Escríbenos y te responderemos dentro de 24 horas hábiles.
              </p>
            </div>
          </section>
          <section className="contacto" aria-labelledby="form-titulo">
            <div className="contenedor contacto__inner">
              <div className="contacto__formulario">
                <h2 className="contacto__subtitulo" id="form-titulo">Envíanos un mensaje</h2>
                <FormularioContacto />
              </div>
              <aside className="contacto__info" aria-labelledby="info-titulo">
                <h2 className="contacto__subtitulo" id="info-titulo">Otras vías de contacto</h2>
                <ul className="contacto__lista">
                  <li className="contacto__item">
                    <span className="contacto__icono" aria-hidden="true">✉</span>
                    <div>
                      <h3 className="contacto__item-titulo">Correo</h3>
                      <a className="contacto__enlace" href="mailto:contacto@poketiendapearl.cl">
                        contacto@poketiendapearl.cl
                      </a>
                    </div>
                  </li>
                  <li className="contacto__item">
                    <span className="contacto__icono" aria-hidden="true">☎</span>
                    <div>
                      <h3 className="contacto__item-titulo">Teléfono</h3>
                      <a className="contacto__enlace" href="tel:+56223456789">+56 2 2345 6789</a>
                    </div>
                  </li>
                  <li className="contacto__item">
                    <span className="contacto__icono" aria-hidden="true">⌂</span>
                    <div>
                      <h3 className="contacto__item-titulo">Dirección</h3>
                      <address className="contacto__direccion">
                        Av. Sinnoh 1420<br />
                        Santiago, Chile
                      </address>
                    </div>
                  </li>
                  <li className="contacto__item">
                    <span className="contacto__icono" aria-hidden="true">◔</span>
                    <div>
                      <h3 className="contacto__item-titulo">Horario de atención</h3>
                      <p className="contacto__texto">
                        Lunes a viernes, 9:00 – 18:00 hrs.<br />
                        Sábados, 10:00 – 14:00 hrs.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="contacto__promesa">
                  <p className="contacto__promesa-titulo">Nuestro compromiso</p>
                  <p className="contacto__promesa-texto">
                    Respondemos todos los mensajes en un plazo máximo de
                    <strong>24 horas hábiles</strong>. Si tu consulta es sobre un pedido
                    en curso, incluye tu número de orden para agilizar la respuesta.
                  </p>
                </div>
              </aside>
            </div>
          </section>
          <section className="faq" aria-labelledby="faq-titulo">
            <div className="contenedor contenedor--estrecho">
              <header className="seccion__cabecera">
                <h2 className="seccion__titulo" id="faq-titulo">Preguntas frecuentes</h2>
                <p className="seccion__subtitulo">Antes de escribirnos, revisa si tu duda ya está resuelta.</p>
              </header>
              <div className="faq__lista">
                <details className="faq__item">
                  <summary className="faq__pregunta">¿Hacen despachos a todo Chile?</summary>
                  <p className="faq__respuesta">
                    Sí. Despachamos a las 16 regiones del país mediante courier con
                    seguimiento. Los envíos a regiones tardan entre 3 y 5 días hábiles.
                  </p>
                </details>
                <details className="faq__item">
                  <summary className="faq__pregunta">¿Los productos son originales?</summary>
                  <p className="faq__respuesta">
                    Todos nuestros productos son originales y verificados antes de salir
                    de bodega. Trabajamos únicamente con proveedores autorizados.
                  </p>
                </details>
                <details className="faq__item">
                  <summary className="faq__pregunta">¿Puedo cambiar un producto?</summary>
                  <p className="faq__respuesta">
                    Sí, aceptamos cambios dentro de los 30 días posteriores a la compra,
                    siempre que el producto esté en su empaque original y sin uso.
                  </p>
                </details>
                <details className="faq__item">
                  <summary className="faq__pregunta">¿Tienen tienda física?</summary>
                  <p className="faq__respuesta">
                    Actualmente operamos únicamente de forma online. Puedes retirar
                    pedidos en nuestra bodega de Santiago previa coordinación por correo.
                  </p>
                </details>
              </div>
            </div>
          </section>
    </>
  );
}
