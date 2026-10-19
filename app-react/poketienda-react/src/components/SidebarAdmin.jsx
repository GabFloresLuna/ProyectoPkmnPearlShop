import { NavLink, Link } from 'react-router-dom';

export const SidebarAdmin = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__marca">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          PokéTienda Admin
        </Link>
      </div>

      <div className="admin-sidebar__grupo">
        <p className="admin-sidebar__titulo">Menú Principal</p>
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => `admin-sidebar__link ${isActive ? 'admin-sidebar__link--activo' : ''}`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/productos"
          className={({ isActive }) => `admin-sidebar__link ${isActive ? 'admin-sidebar__link--activo' : ''}`}
        >
          Productos
        </NavLink>
      </div>

      <div className="admin-sidebar__grupo" style={{ marginTop: 'auto' }}>
        <Link to="/" className="admin-sidebar__link">
          ← Volver a la Tienda
        </Link>
      </div>
    </aside>
  );
};