import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Header = () => {
  const [navAbierto, setNavAbierto] = useState(false);
  const { cantidadTotalItems } = useCart();

  const toggleNav = () => setNavAbierto((prev) => !prev);
  const cerrarNav = () => setNavAbierto(false);

  return (
    <header className="site-header">
      <div className="contenedor site-header__inner">
        <Link to="/" className="logo" aria-label="PokéTienda Pearl — Ir al inicio" onClick={cerrarNav}>
          <svg className="logo__icono" width="40" height="40" viewBox="0 0 100 100" role="img" aria-hidden="true">
            <defs>
              <radialGradient id="pearlGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#D63384" />
                <stop offset="100%" stopColor="#4A148C" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#pearlGrad)" stroke="#FFC107" strokeWidth="3" />
            <ellipse cx="35" cy="35" rx="10" ry="6" fill="#FFFFFF" opacity="0.6" />
          </svg>
          <span className="logo__texto">PokéTienda&nbsp;Pearl</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          id="nav-toggle"
          aria-expanded={navAbierto}
          aria-controls="nav-principal"
          aria-label={navAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          onClick={toggleNav}
        >
          <span className="nav-toggle__barra" aria-hidden="true"></span>
          <span className="nav-toggle__barra" aria-hidden="true"></span>
          <span className="nav-toggle__barra" aria-hidden="true"></span>
        </button>

        <nav
          className="nav"
          id="nav-principal"
          aria-label="Navegación principal"
          data-abierto={navAbierto ? 'true' : 'false'}
        >
          <ul className="nav__lista">
            <li className="nav__item">
              <NavLink to="/" className={({ isActive }) => `nav__enlace ${isActive ? 'nav__enlace--activo' : ''}`} onClick={cerrarNav} end>
                Inicio
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/productos" className={({ isActive }) => `nav__enlace ${isActive ? 'nav__enlace--activo' : ''}`} onClick={cerrarNav}>
                Productos
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/nosotros" className={({ isActive }) => `nav__enlace ${isActive ? 'nav__enlace--activo' : ''}`} onClick={cerrarNav}>
                Nosotros
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/blogs" className={({ isActive }) => `nav__enlace ${isActive ? 'nav__enlace--activo' : ''}`} onClick={cerrarNav}>
                Blogs
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/contacto" className={({ isActive }) => `nav__enlace ${isActive ? 'nav__enlace--activo' : ''}`} onClick={cerrarNav}>
                Contacto
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/login" className={({ isActive }) => `nav__enlace nav__enlace--destacado ${isActive ? 'nav__enlace--activo' : ''}`} onClick={cerrarNav}>
                Iniciar sesión
              </NavLink>
            </li>
          </ul>
        </nav>

        <Link
          to="/carrito"
          className={`carrito ${cantidadTotalItems > 0 ? 'carrito--activo' : ''}`}
          id="carrito"
          aria-label={`Carrito de compras: ${cantidadTotalItems} productos`}
          onClick={cerrarNav}
        >
          <svg
            className="carrito__icono"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            role="img"
            aria-hidden="true"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="carrito__badge" id="carrito-contador" role="status" aria-live="polite">
            {cantidadTotalItems}
          </span>
        </Link>
      </div>
    </header>
  );
};