import { Link, useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';
import GrillaProductos from '../components/GrillaProductos.jsx';
import { useCarrito } from '../context/CarritoContext.jsx';
import { categoriasDB, productosDB } from '../data/db.js';
import useRepo from '../hooks/useRepo.js';
import useTituloDocumento from '../hooks/useTituloDocumento.js';

/** Vista /categorias y /categorias/:nombre — separa los productos por categoría. */
export default function Categorias() {
  const { nombre } = useParams();
  const categorias = useRepo(categoriasDB);
  const productos = useRepo(productosDB);
  const { agregar } = useCarrito();
  useTituloDocumento(nombre ? `Categoría ${nombre}` : 'Categorías');

  const existe = !nombre || categorias.some((c) => c.nombre === nombre);
  const visibles = nombre ? productos.filter((p) => p.categoria === nombre) : productos;

  return (
    <>
      <Breadcrumb ruta={nombre
        ? [{ texto: 'Inicio', to: '/' }, { texto: 'Categorías', to: '/categorias' }, { texto: nombre }]
        : [{ texto: 'Inicio', to: '/' }, { texto: 'Categorías' }]} />
      <section className="productos-view" aria-labelledby="categorias-titulo">
        <div className="contenedor">
          <header className="productos-view__cabecera">
            <h1 className="productos-view__titulo" id="categorias-titulo">Categorías</h1>
            <p className="productos-view__subtitulo">Encuentra rápido lo que buscas para tu colección.</p>
          </header>

          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3 mb-4">
            {categorias.map((c) => {
              const activa = c.nombre === nombre;
              const cantidad = productos.filter((p) => p.categoria === c.nombre).length;
              return (
                <div className="col" key={c.id}>
                  <Link to={`/categorias/${encodeURIComponent(c.nombre)}`}
                        className={activa ? 'categoria-tile categoria-tile--activa' : 'categoria-tile'}
                        aria-current={activa ? 'page' : undefined}>
                    <strong className="categoria-tile__nombre">{c.nombre}</strong>
                    <span className="categoria-tile__cantidad">{cantidad} producto(s)</span>
                  </Link>
                </div>
              );
            })}
          </div>

          {existe ? (
            <>
              <h2 className="seccion__titulo">{nombre || 'Todos los productos'}</h2>
              <GrillaProductos productos={visibles} onAgregar={agregar} mensajeVacio="Esta categoría aún no tiene productos." />
            </>
          ) : (
            <p className="aviso aviso--advertencia" role="alert">La categoría «{nombre}» no existe.</p>
          )}
        </div>
      </section>
    </>
  );
}
