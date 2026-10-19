import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCarrito } from '../context/CarritoContext.jsx';
import Marca from './Marca.jsx';
import Navegacion, { ENLACES_PRINCIPALES } from './Navegacion.jsx';

/** Organismo: encabezado con marca, menú (hamburguesa en móvil) y contador del carrito compartido. */
function Header() {
  const { cantidadTotal } = useCarrito();
  const { usuario, esAdmin, cerrarSesion } = useAuth();
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();
  const refHeader = useRef(null);
  const refToggle = useRef(null);

  // Cierra el menú al navegar a otra página
  useEffect(() => {
    setAbierto(false);
  }, [pathname]);

  // Cierra con clic fuera o con Escape (mientras está abierto)
  useEffect(() => {
    if (!abierto) return undefined;
    const clicFuera = (e) => {
      if (refHeader.current && !refHeader.current.contains(e.target)) setAbierto(false);
    };
    const tecla = (e) => {
      if (e.key === 'Escape') {
        setAbierto(false);
        refToggle.current?.focus();
      }
    };
    document.addEventListener('click', clicFuera);
    document.addEventListener('keydown', tecla);
    return () => {
      document.removeEventListener('click', clicFuera);
      document.removeEventListener('keydown', tecla);
    };
  }, [abierto]);

  // Reset automático al pasar a escritorio
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const mq = window.matchMedia('(min-width: 769px)');
    const alCambiar = (ev) => {
      if (ev.matches) setAbierto(false);
    };
    mq.addEventListener('change', alCambiar);
    return () => mq.removeEventListener('change', alCambiar);
  }, []);

  const enlaces = [
    ...ENLACES_PRINCIPALES,
    ...(esAdmin ? [{ to: '/admin', texto: 'Panel admin' }] : []),
    usuario
      ? { texto: 'Cerrar sesión', onClick: cerrarSesion, destacado: true }
      : { to: '/login', texto: 'Iniciar sesión', destacado: true },
  ];

  return (
    <header className="site-header" ref={refHeader}>
      <div className="contenedor site-header__inner">
        <Marca />

        <button
          type="button"
          ref={refToggle}
          className="nav-toggle"
          id="nav-toggle"
          aria-expanded={abierto}
          aria-controls="nav-principal"
          aria-label={abierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          onClick={() => setAbierto((a) => !a)}
        >
          <span className="nav-toggle__barra" aria-hidden="true"></span>
          <span className="nav-toggle__barra" aria-hidden="true"></span>
          <span className="nav-toggle__barra" aria-hidden="true"></span>
        </button>

        <Navegacion enlaces={enlaces} abierto={abierto} />

        <Link to="/carrito" className="carrito" id="carrito" aria-label={`Carrito de compras: ${cantidadTotal} productos`}>
          <svg className="carrito__icono" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-hidden="true" focusable="false">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="carrito__badge" id="carrito-contador" role="status" aria-live="polite">{cantidadTotal}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
