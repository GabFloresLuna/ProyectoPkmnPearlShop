import { Route, Routes } from 'react-router-dom';
import LayoutAdmin from './components/admin/LayoutAdmin.jsx';
import RutaAdmin from './components/admin/RutaAdmin.jsx';
import LayoutTienda from './components/LayoutTienda.jsx';
import { AdminCategoriaForm, AdminCategorias } from './pages/admin/AdminCategorias.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import { AdminOrdenDetalle, AdminOrdenes } from './pages/admin/AdminOrdenes.jsx';
import AdminPerfil from './pages/admin/AdminPerfil.jsx';
import AdminProductoForm from './pages/admin/AdminProductoForm.jsx';
import { AdminProductos, AdminProductosCriticos } from './pages/admin/AdminProductos.jsx';
import AdminReportes from './pages/admin/AdminReportes.jsx';
import { AdminHistorialCompras, AdminUsuarioForm, AdminUsuarios } from './pages/admin/AdminUsuarios.jsx';
import Blogs from './pages/Blogs.jsx';
import Carrito from './pages/Carrito.jsx';
import Categorias from './pages/Categorias.jsx';
import Checkout from './pages/Checkout.jsx';
import CompraExitosa from './pages/CompraExitosa.jsx';
import CompraFallida from './pages/CompraFallida.jsx';
import Contacto from './pages/Contacto.jsx';
import DetalleBlog1 from './pages/DetalleBlog1.jsx';
import DetalleBlog2 from './pages/DetalleBlog2.jsx';
import DetalleProducto from './pages/DetalleProducto.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import NoEncontrado from './pages/NoEncontrado.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Ofertas from './pages/Ofertas.jsx';
import Productos from './pages/Productos.jsx';
import Registro from './pages/Registro.jsx';

/** Mapa de rutas = diagrama de flujo de navegación de la entrega (tienda + administrador). */
export default function App() {
  return (
    <Routes>
      {/* ---------- Tienda (pública) ---------- */}
      <Route element={<LayoutTienda />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/:id" element={<DetalleProducto />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="categorias/:nombre" element={<Categorias />} />
        <Route path="ofertas" element={<Ofertas />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/1" element={<DetalleBlog1 />} />
        <Route path="blogs/2" element={<DetalleBlog2 />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="compra/exito/:id" element={<CompraExitosa />} />
        <Route path="compra/error/:id" element={<CompraFallida />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>

      {/* ---------- Administrador (protegido) ---------- */}
      <Route path="admin" element={<RutaAdmin><LayoutAdmin /></RutaAdmin>}>
        <Route index element={<AdminDashboard />} />
        <Route path="ordenes" element={<AdminOrdenes />} />
        <Route path="ordenes/:id" element={<AdminOrdenDetalle />} />
        <Route path="productos" element={<AdminProductos />} />
        <Route path="productos/nuevo" element={<AdminProductoForm />} />
        <Route path="productos/criticos" element={<AdminProductosCriticos />} />
        <Route path="productos/:id/editar" element={<AdminProductoForm />} />
        <Route path="categorias" element={<AdminCategorias />} />
        <Route path="categorias/nueva" element={<AdminCategoriaForm />} />
        <Route path="categorias/:id/editar" element={<AdminCategoriaForm />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="usuarios/nuevo" element={<AdminUsuarioForm />} />
        <Route path="usuarios/:id/editar" element={<AdminUsuarioForm />} />
        <Route path="usuarios/:id/historial" element={<AdminHistorialCompras />} />
        <Route path="reportes" element={<AdminReportes />} />
        <Route path="perfil" element={<AdminPerfil />} />
      </Route>
    </Routes>
  );
}
