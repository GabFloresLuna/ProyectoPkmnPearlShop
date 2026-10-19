import { ordenesDB, productosDB } from '../../data/db.js';
import useRepo from '../../hooks/useRepo.js';
import useTituloDocumento from '../../hooks/useTituloDocumento.js';
import { formatoCLP } from '../../utils/formato.js';
import { esCritico } from '../../utils/productos.js';
import { resumenVentas } from '../../utils/reportes.js';

export default function AdminReportes() {
  useTituloDocumento('Admin · Reportes');
  const ordenes = useRepo(ordenesDB);
  const productos = useRepo(productosDB);
  const r = resumenVentas(ordenes);
  const maximo = Math.max(1, ...r.porCategoria.map((c) => c.monto));

  return (
    <>
      <div className="admin-metricas">
        <div className="admin-metrica"><div className="admin-metrica__label">Ventas totales</div><div className="admin-metrica__valor">{formatoCLP(r.totalVentas)}</div></div>
        <div className="admin-metrica"><div className="admin-metrica__label">Órdenes pagadas</div><div className="admin-metrica__valor">{r.cantidadOrdenes}</div></div>
        <div className="admin-metrica"><div className="admin-metrica__label">Ticket promedio</div><div className="admin-metrica__valor">{formatoCLP(r.ticketPromedio)}</div></div>
        <div className="admin-metrica"><div className="admin-metrica__label">Pagos rechazados</div><div className="admin-metrica__valor">{r.rechazadas}</div></div>
        <div className="admin-metrica"><div className="admin-metrica__label">Productos críticos</div><div className="admin-metrica__valor">{productos.filter(esCritico).length}</div></div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-6">
          <h2 className="mantenedor__titulo">Ventas por categoría</h2>
          {r.porCategoria.length === 0 ? <p className="texto-sec">Sin ventas registradas.</p> : (
            <ul className="reporte-barras" aria-label="Ventas por categoría">
              {r.porCategoria.map((c) => (
                <li key={c.categoria}>
                  <div className="d-flex justify-content-between"><span>{c.categoria}</span><strong>{formatoCLP(c.monto)}</strong></div>
                  <div className="reporte-barras__pista"><div className="reporte-barras__barra" style={{ width: `${Math.round((c.monto / maximo) * 100)}%` }}></div></div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-12 col-xl-6">
          <h2 className="mantenedor__titulo">Productos más vendidos</h2>
          <div className="tabla__scroll">
            <table className="tabla--admin">
              <thead><tr><th scope="col">Producto</th><th scope="col">Unidades</th><th scope="col">Monto</th></tr></thead>
              <tbody>
                {r.topProductos.length === 0
                  ? <tr><td colSpan={3}>Sin ventas registradas.</td></tr>
                  : r.topProductos.map((p) => <tr key={p.id}><td>{p.nombre}</td><td>{p.unidades}</td><td>{formatoCLP(p.monto)}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
