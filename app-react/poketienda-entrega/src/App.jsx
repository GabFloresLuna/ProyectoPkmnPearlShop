import { Link, Outlet, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Acceso from './pages/Acceso.jsx';
import Admin from './pages/Admin.jsx';
import Blogs from './pages/Blogs.jsx';
import Carrito from './pages/Carrito.jsx';
import Contacto from './pages/Contacto.jsx';
import DetalleProducto from './pages/DetalleProducto.jsx';
import Home from './pages/Home.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Productos from './pages/Productos.jsx';

// Plantilla común: el header y el footer se escriben una sola vez.
function Layout() {
  return (
    <>
      <Header />
      <main className="container py-4 flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function NoEncontrado() {
  return (
    <div className="text-center py-5">
      <h1>404 · Página no encontrada</h1>
      <Link to="/" className="btn btn-pearl">Volver al inicio</Link>
    </div>
  );
}

/** Mapa de rutas = diagrama de flujo de navegación del proyecto. */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/:id" element={<DetalleProducto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="login" element={<Acceso modo="login" />} />
        <Route path="registro" element={<Acceso modo="registro" />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:id" element={<Blogs />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}
