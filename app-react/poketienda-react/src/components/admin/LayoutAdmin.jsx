import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Logo from '../Logo.jsx';

const MENU = [
  { to: '/admin', texto: 'Dashboard', fin: true },
  { to: '/admin/ordenes', texto: 'Órdenes / boletas' },
  { to: '/admin/productos', texto: 'Productos' },
  { to: '/admin/categorias', texto: 'Categorías' },
  { to: '/admin/usuarios', texto: 'Usuarios' },
  { to: '/admin/reportes', texto: 'Reportes' },
];
const TITULOS = {
  '': 'Dashboard', ordenes: 'Órdenes / boletas', productos: 'Productos', categorias: 'Categorías',
  usuarios: 'Usuarios', reportes: 'Reportes', perfil: 'Perfil',
};

/** Plantilla del panel de administración: sidebar + barra superior + contenido de la ruta. */
function LayoutAdmin() {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [abierto, setAbierto] = useState(false);
  const titulo = TITULOS[pathname.split('/')[2] ?? ''] ?? 'Administración';
  const clase = ({ isActive }) => (isActive ? 'admin-sidebar__link admin-sidebar__link--activo' : 'admin-sidebar__link');

  const salir = () => {
    if (window.confirm('¿Cerrar sesión?')) {
      cerrarSesion();
      navigate('/login');
    }
  };

  return (
    <div className="admin-layout" data-bs-theme="dark">
      <aside className="admin-sidebar" id="admin-sidebar" data-abierto={abierto ? 'true' : 'false'} aria-label="Menú de administración">
        <div className="admin-sidebar__marca">
          <Logo size={32} />
          <span>Admin Pearl</span>
        </div>
        <nav className="admin-sidebar__grupo" aria-label="Gestión" onClick={() => setAbierto(false)}>
          <p className="admin-sidebar__titulo">Gestión</p>
          {MENU.map((m) => (
            <NavLink key={m.to} to={m.to} end={m.fin} className={clase}>{m.texto}</NavLink>
          ))}
        </nav>
        <nav className="admin-sidebar__grupo" aria-label="Cuenta" onClick={() => setAbierto(false)}>
          <p className="admin-sidebar__titulo">Cuenta</p>
          <NavLink to="/admin/perfil" className={clase}>Perfil</NavLink>
          <Link to="/" className="admin-sidebar__link">Ir a la tienda</Link>
          <button type="button" className="admin-sidebar__link admin-sidebar__salir" onClick={salir}>Cerrar sesión</button>
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button type="button" className="admin-toggle" id="sidebar-toggle" aria-controls="admin-sidebar"
                  aria-expanded={abierto} aria-label="Abrir menú de administración" onClick={() => setAbierto((a) => !a)}>
            ☰
          </button>
          <h1 className="admin-topbar__titulo">{titulo}</h1>
          <div className="admin-topbar__usuario">
            <span>{usuario.nombre} {usuario.apellidos}</span>
            <span className="admin-topbar__avatar" aria-hidden="true"></span>
          </div>
        </header>
        <div className="admin-contenido"><Outlet /></div>
        <footer className="admin-footer">© 2025 PokéTienda Pearl — Panel de administración · Proyecto académico DSY1104</footer>
      </div>
    </div>
  );
}

export default LayoutAdmin;
