import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductosPage } from './pages/ProductosPage';
import { DetalleProductoPage } from './pages/DetalleProductoPage';
import { CarritoPage } from './pages/CarritoPage';
import { NosotrosPage } from './pages/NosotrosPage';
import { BlogsPage } from './pages/BlogsPage';
import { ContactoPage } from './pages/ContactoPage';
import { LoginPage } from './pages/LoginPage';
import { RegistroPage } from './pages/RegistroPage';

const PublicLayout = () => (
  <>
    <Header />
    <main id="contenido-principal">
      <Outlet />
    </main>
    <Footer />
  </>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/detalle-producto/:id" element={<DetalleProductoPage />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
        </Route>

        {/* Ruta 404 de fallback */}
        <Route
          path="*"
          element={
            <PublicLayout>
              <section className="seccion contenedor">
                <h1>404 — Página no encontrada</h1>
                <p>La ruta solicitada no existe.</p>
              </section>
            </PublicLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};