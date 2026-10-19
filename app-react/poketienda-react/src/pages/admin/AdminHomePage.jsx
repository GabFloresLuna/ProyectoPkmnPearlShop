import { SidebarAdmin } from '../../components/SidebarAdmin';

export const AdminHomePage = () => {
  return (
    <div className="admin-layout">
      <SidebarAdmin />
      <main className="admin-main">
        <header className="admin-topbar">
          <h1 className="admin-topbar__titulo">Dashboard General</h1>
          <div className="admin-topbar__usuario">
            <span className="admin-topbar__avatar"></span>
            <span>Admin Sinnoh</span>
          </div>
        </header>

        <div className="admin-contenido">
          <div className="admin-metricas">
            <article className="admin-metrica">
              <span className="admin-metrica__label">Ventas Totales</span>
              <p className="admin-metrica__valor">$1.250.000</p>
            </article>

            <article className="admin-metrica">
              <span className="admin-metrica__label">Productos Activos</span>
              <p className="admin-metrica__valor">8</p>
            </article>

            <article className="admin-metrica">
              <span className="admin-metrica__label">Usuarios Registrados</span>
              <p className="admin-metrica__valor">14</p>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
};