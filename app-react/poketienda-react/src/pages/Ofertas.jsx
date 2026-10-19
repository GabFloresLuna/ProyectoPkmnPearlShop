import Breadcrumb from '../components/Breadcrumb.jsx';
import GrillaProductos from '../components/GrillaProductos.jsx';
import PageHero from '../components/PageHero.jsx';
import { useCarrito } from '../context/CarritoContext.jsx';
import { productosDB } from '../data/db.js';
import useRepo from '../hooks/useRepo.js';
import useTituloDocumento from '../hooks/useTituloDocumento.js';

/** Vista /ofertas — todos los productos marcados en oferta desde el panel de administración. */
export default function Ofertas() {
  useTituloDocumento('Ofertas');
  const productos = useRepo(productosDB);
  const { agregar } = useCarrito();
  const enOferta = productos.filter((p) => p.oferta && p.precioOferta);

  return (
    <>
      <Breadcrumb ruta={[{ texto: 'Inicio', to: '/' }, { texto: 'Ofertas' }]} />
      <PageHero id="ofertas-titulo" eyebrow="Precios especiales" titulo="Ofertas"
                descripcion="Aprovecha los descuentos de la colección Edición Perla mientras duren las existencias." />
      <section className="productos-view" aria-label="Productos en oferta">
        <div className="contenedor">
          <GrillaProductos productos={enOferta} onAgregar={agregar} mensajeVacio="Por ahora no hay productos en oferta." />
        </div>
      </section>
    </>
  );
}
