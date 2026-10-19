import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="contenedor site-footer__inner">
        <div className="site-footer__columna site-footer__marca">
          <Link to="/" className="logo logo--footer" aria-label="PokéTienda Pearl — Ir al inicio">
            <svg className="logo__icono" width="32" height="32" viewBox="0 0 100 100" role="img" aria-hidden="true">
              <defs>
                <radialGradient id="pearlGradFooter" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#D63384" />
                  <stop offset="100%" stopColor="#4A148C" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="url(#pearlGradFooter)" stroke="#FFC107" strokeWidth="3" />
              <ellipse cx="35" cy="35" rx="10" ry="6" fill="#FFFFFF" opacity="0.6" />
            </svg>
            <span className="logo__texto">PokéTienda&nbsp;Pearl</span>
          </Link>
          <p className="site-footer__eslogan">"Atrapa lo legendario"</p>
          <p className="site-footer__texto">
            Tienda online temática inspirada en la Generación IV. Para coleccionistas de Sinnoh.
          </p>
        </div>

        <nav className="site-footer__columna" aria-labelledby="footer-nav-titulo">
          <h2 className="site-footer__titulo" id="footer-nav-titulo">Navegación</h2>
          <ul className="site-footer__lista">
            <li><Link className="site-footer__enlace" to="/">Inicio</Link></li>
            <li><Link className="site-footer__enlace" to="/productos">Productos</Link></li>
            <li><Link className="site-footer__enlace" to="/nosotros">Nosotros</Link></li>
            <li><Link className="site-footer__enlace" to="/blogs">Blogs</Link></li>
            <li><Link className="site-footer__enlace" to="/contacto">Contacto</Link></li>
          </ul>
        </nav>

        <nav className="site-footer__columna" aria-labelledby="footer-ayuda-titulo">
          <h2 className="site-footer__titulo" id="footer-ayuda-titulo">Ayuda</h2>
          <ul className="site-footer__lista">
            <li><Link className="site-footer__enlace" to="/registro">Crear cuenta</Link></li>
            <li><Link className="site-footer__enlace" to="/login">Iniciar sesión</Link></li>
            <li><Link className="site-footer__enlace" to="/carrito">Mi carrito</Link></li>
            <li><Link className="site-footer__enlace" to="/contacto">Preguntas frecuentes</Link></li>
          </ul>
        </nav>

        <section className="site-footer__columna" aria-labelledby="footer-contacto-titulo">
          <h2 className="site-footer__titulo" id="footer-contacto-titulo">Contacto</h2>
          <address className="site-footer__direccion">
            <ul className="site-footer__lista">
              <li><a className="site-footer__enlace" href="mailto:contacto@poketiendapearl.cl">contacto@poketiendapearl.cl</a></li>
              <li><a className="site-footer__enlace" href="tel:+56223456789">+56 2 2345 6789</a></li>
              <li>Av. Sinnoh 1420, Santiago, Chile</li>
            </ul>
          </address>

          <ul className="redes" aria-label="Redes sociales">
            <li>
              <a className="redes__enlace" href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                Instagram<span className="visually-hidden"> (se abre en una pestaña nueva)</span>
              </a>
            </li>
            <li>
              <a className="redes__enlace" href="https://x.com/" target="_blank" rel="noopener noreferrer">
                X<span className="visually-hidden"> (se abre en una pestaña nueva)</span>
              </a>
            </li>
            <li>
              <a className="redes__enlace" href="https://discord.com/" target="_blank" rel="noopener noreferrer">
                Discord<span className="visually-hidden"> (se abre en una pestaña nueva)</span>
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="site-footer__bottom">
        <div className="contenedor site-footer__bottom-inner">
          <p className="site-footer__copy">
            &copy; 2025 PokéTienda Pearl. Proyecto académico DSY1104 — Todos los derechos reservados.
          </p>
          <p className="site-footer__version">Identidad visual v2.0 (React)</p>
        </div>
      </div>
    </footer>
  );
};