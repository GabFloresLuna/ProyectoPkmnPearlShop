import { Link } from 'react-router-dom';
import { categoriasDB, ordenesDB, productosDB, usuariosDB } from '../../data/db.js';
import useRepo from '../../hooks/useRepo.js';
import useTituloDocumento from '../../hooks/useTituloDocumento.js';
import { formatoCLP } from '../../utils/formato.js';
import { esCritico } from '../../utils/productos.js';
import { resumenVentas } from '../../utils/reportes.js';

const ACCESOS = [
  { to: '/admin/ordenes', titulo: 'Órdenes', texto: 'Gestión y seguimiento de las órdenes de compra realizadas.' },
  { to: '/admin/productos', titulo: 'Productos', texto: 'Administrar inventario y detalles de los productos disponibles.' },
  { to: '/admin/categorias', titulo: 'Categorías', texto: 'Organizar productos en categorías para facilitar su navegación.' },
  { to: '/admin/usuarios', titulo: 'Usuarios', texto: 'Gestión de cuentas de usuario y sus roles dentro del sistema.' },
  { to: '/admin/reportes', titulo: 'Reportes', texto: 'Informes detallados sobre las operaciones del sistema.' },
  { to: '/admin/perfil', titulo: 'Perfil', texto: 'Administración de la información personal y configuración de la cuenta.' },
  { to: '/', titulo: 'Tienda', texto: 'Visualiza tu tienda en tiempo real.' },
];

export default function AdminDashboard() {
  useTituloDocumento('Admin · Dashboard');
  const productos = useRepo(productosDB);
  const usuarios = useRepo(usuariosDB);
  const ordenes = useRepo(ordenesDB);
  useRepo(categoriasDB);
  const ventas = resumenVentas(ordenes);
  const criticos = productos.filter(esCritico).length;

  return (
    <>
      <p className="texto-sec">Resumen de las actividades diarias.</p>
      <div className="admin-metricas">
        <div className="admin-metrica">
          <div className="admin-metrica__label">Compras</div>
          <div className="admin-metrica__valor">{ventas.cantidadOrdenes}</div>
          <small className="texto-sec">Ventas: {formatoCLP(ventas.totalVentas)}</small>
        </div>
        <div className="admin-metrica">
          <div className="admin-metrica__label">Productos</div>
          <div className="admin-metrica__valor">{productos.length}</div>
          <small className="texto-sec">En stock crítico: {criticos}</small>
        </div>
        <div className="admin-metrica">
          <div className="admin-metrica__label">Usuarios</div>
          <div className="admin-metrica__valor">{usuarios.length}</div>
        </div>
      </div>

      <div className="row g-3">
        {ACCESOS.map((a) => (
          <div className="col-12 col-md-6 col-xl-3" key={a.to}>
            <Link to={a.to} className="admin-metrica admin-acceso d-block h-100">
              <strong className="admin-acceso__titulo">{a.titulo}</strong>
              <p className="texto-sec mb-0">{a.texto}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
