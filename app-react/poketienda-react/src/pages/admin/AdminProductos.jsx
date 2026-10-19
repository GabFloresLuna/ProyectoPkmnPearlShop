import { Link } from 'react-router-dom';
import Mantenedor from '../../components/admin/Mantenedor.jsx';
import { productosDB } from '../../data/db.js';
import useRepo from '../../hooks/useRepo.js';
import useTituloDocumento from '../../hooks/useTituloDocumento.js';
import { formatoCLP } from '../../utils/formato.js';
import { esCritico, precioFinal } from '../../utils/productos.js';

const columnas = [
  { titulo: 'Código', render: (p) => p.id },
  { titulo: 'Nombre', render: (p) => p.nombre },
  { titulo: 'Categoría', render: (p) => p.categoria },
  { titulo: 'Precio', render: (p) => formatoCLP(precioFinal(p)) },
  { titulo: 'Stock', render: (p) => (
    <>{p.stock} {esCritico(p) && <span className="badge badge--advertencia">Crítico</span>}</>
  ) },
  { titulo: 'Oferta', render: (p) => (p.oferta ? <span className="badge badge--acento">Sí</span> : '—') },
];

function eliminar(p) {
  if (window.confirm(`¿Eliminar el producto "${p.nombre}"? Esta acción no se puede deshacer.`)) productosDB.eliminar(p.id);
}

const acciones = (p) => (
  <>
    <Link className="tabla--admin__accion" to={`/productos/${p.id}`}>Ver</Link>
    <Link className="tabla--admin__accion" to={`/admin/productos/${p.id}/editar`}>Editar</Link>
    <button type="button" className="tabla--admin__accion tabla--admin__accion--peligro" onClick={() => eliminar(p)}>Eliminar</button>
  </>
);

export function AdminProductos() {
  useTituloDocumento('Admin · Productos');
  const productos = useRepo(productosDB);
  return (
    <>
      <div className="d-flex gap-2 mb-3 flex-wrap">
        <Link className="boton boton--secundario boton--sm" to="/admin/productos/criticos">Ver productos críticos</Link>
      </div>
      <Mantenedor titulo="Productos" filas={productos} columnas={columnas} acciones={acciones}
                  nuevo={{ to: '/admin/productos/nuevo', texto: '+ Nuevo producto' }} vacio="No hay productos." />
    </>
  );
}

export function AdminProductosCriticos() {
  useTituloDocumento('Admin · Productos críticos');
  const criticos = useRepo(productosDB).filter(esCritico);
  return (
    <Mantenedor titulo="Listado de productos críticos"
                descripcion="Productos cuyo stock llegó o bajó de su stock crítico: conviene reponerlos."
                filas={criticos}
                columnas={[...columnas.slice(0, 2), { titulo: 'Stock', render: (p) => p.stock }, { titulo: 'Stock crítico', render: (p) => p.stockCritico }]}
                acciones={(p) => <Link className="tabla--admin__accion" to={`/admin/productos/${p.id}/editar`}>Reponer / editar</Link>}
                vacio="No hay productos en estado crítico." />
  );
}
