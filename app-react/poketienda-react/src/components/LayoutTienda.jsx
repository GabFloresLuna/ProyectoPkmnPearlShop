import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

/** Plantilla de la tienda pública: header + contenido de la ruta + footer (se escribe una sola vez). */
function LayoutTienda() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#contenido-principal">Saltar al contenido principal</a>
      <Header />
      <main id="contenido-principal">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default LayoutTienda;
