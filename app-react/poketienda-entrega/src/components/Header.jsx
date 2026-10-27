import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Logo from './Logo.jsx';

// Los datos del menú van separados: un solo .map() genera todos los enlaces.
const ENLACES = [
  { to: '/', texto: 'Inicio' },
  { to: '/productos', texto: 'Productos' },
  { to: '/nosotros', texto: 'Nosotros' },
  { to: '/blogs', texto: 'Blogs' },
  { to: '/contacto', texto: 'Contacto' },
];

/** Organismo: barra de navegación con menú móvil, contador del carrito y sesión. */
export default function Header() {
  const { cantidad, usuario, cerrarSesion } = useApp();
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);

  return (
    <nav className="navbar navbar-expand-md navbar-dark site-nav">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={cerrar}>
          <Logo size={36} />
          <span>PokéTienda Pearl</span>
        </Link>

        <button type="button" className="navbar-toggler" aria-expanded={abierto} aria-label="Abrir menú de navegación"
                onClick={() => setAbierto(!abierto)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse${abierto ? ' show' : ''}`}>
          <ul className="navbar-nav me-auto">
            {ENLACES.map((e) => (
              <li className="nav-item" key={e.to}>
                <NavLink className="nav-link" to={e.to} end={e.to === '/'} onClick={cerrar}>{e.texto}</NavLink>
              </li>
            ))}
            {usuario?.tipo === 'Administrador' && (
              <li className="nav-item"><NavLink className="nav-link" to="/admin" onClick={cerrar}>Admin</NavLink></li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            <Link to="/carrito" className="btn btn-outline-light" onClick={cerrar}>
              Carrito <span className="badge text-bg-warning" id="carrito-contador">{cantidad}</span>
            </Link>
            {usuario ? (
              <button type="button" className="btn btn-pearl" onClick={cerrarSesion}>Cerrar sesión</button>
            ) : (
              <Link to="/login" className="btn btn-pearl" onClick={cerrar}>Iniciar sesión</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
