import { Link, useParams } from 'react-router-dom';
import BoletaOrden from '../../components/BoletaOrden.jsx';
import Mantenedor from '../../components/admin/Mantenedor.jsx';
import { ordenesDB } from '../../data/db.js';
import useRepo from '../../hooks/useRepo.js';
import useTituloDocumento from '../../hooks/useTituloDocumento.js';
import { formatoCLP, formatoFecha } from '../../utils/formato.js';

const BADGE = { Pagada: 'badge--exito', Rechazada: 'badge--error' };

export function AdminOrdenes() {
  useTituloDocumento('Admin · Órdenes');
  const ordenes = useRepo(ordenesDB);
  const recientes = [...ordenes].sort((a, b) => b.fecha.localeCompare(a.fecha));
  return (
    <Mantenedor
      titulo="Órdenes / boletas"
      filas={recientes}
      columnas={[
        { titulo: 'N° orden', render: (o) => `#${o.id}` },
        { titulo: 'Fecha', render: (o) => formatoFecha(o.fecha) },
        { titulo: 'Cliente', render: (o) => `${o.cliente.nombre} ${o.cliente.apellidos}` },
        { titulo: 'Total', render: (o) => formatoCLP(o.total) },
        { titulo: 'Estado', render: (o) => <span className={`badge ${BADGE[o.estado] ?? 'badge--info'}`}>{o.estado}</span> },
      ]}
      acciones={(o) => <Link className="tabla--admin__accion" to={`/admin/ordenes/${o.id}`}>Mostrar boleta</Link>}
      vacio="Aún no hay órdenes registradas."
    />
  );
}

export function AdminOrdenDetalle() {
  const { id } = useParams();
  const orden = useRepo(ordenesDB).find((o) => String(o.id) === id);
  useTituloDocumento(`Admin · Boleta ${id}`);
  if (!orden) return <p className="aviso aviso--advertencia" role="alert">La orden #{id} no existe.</p>;
  return (
    <section>
      <div className="mantenedor__cabecera">
        <h2 className="mantenedor__titulo">Boleta #{orden.id} <span className={`badge ${BADGE[orden.estado] ?? 'badge--info'}`}>{orden.estado}</span></h2>
        <div className="d-flex gap-2">
          <button type="button" className="boton boton--secundario" onClick={() => window.print()}>Imprimir</button>
          <Link className="boton boton--primario" to="/admin/ordenes">Volver</Link>
        </div>
      </div>
      <BoletaOrden orden={orden} />
    </section>
  );
}
