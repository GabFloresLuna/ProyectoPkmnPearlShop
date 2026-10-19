import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Beneficios from '../components/Beneficios.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import GrillaProductos from '../components/GrillaProductos.jsx';
import { useCarrito } from '../context/CarritoContext.jsx';
import { categoriasDB, productosDB } from '../data/db.js';
import useRepo from '../hooks/useRepo.js';
import useTituloDocumento from '../hooks/useTituloDocumento.js';
import { filtrarProductos } from '../utils/productos.js';

export default function Productos() {
  useTituloDocumento('Productos');
  const productos = useRepo(productosDB);
  const categorias = useRepo(categoriasDB);
  const { agregar } = useCarrito();
  const [params, setParams] = useSearchParams();

  // Los filtros viven en la URL (?q=&categoria=&orden=), igual que en el productos.js original.
  const q = params.get('q') ?? '';
  const categoria = params.get('categoria') ?? '';
  const orden = params.get('orden') ?? 'relevancia';

  const cambiar = (clave, valor) => {
    const nuevos = new URLSearchParams(params);
    if (valor) nuevos.set(clave, valor);
    else nuevos.delete(clave);
    setParams(nuevos, { replace: true });
  };

  const filtrados = useMemo(() => filtrarProductos(productos, { q, categoria, orden }), [productos, q, categoria, orden]);

  return (
    <>
      <Breadcrumb ruta={[{ texto: 'Inicio', to: '/' }, { texto: 'Productos' }]} />
      <section className="productos-view" aria-labelledby="productos-titulo">
        <div className="contenedor">
          <header className="productos-view__cabecera">
            <h1 className="productos-view__titulo" id="productos-titulo">Productos</h1>
            <p className="productos-view__subtitulo">Explora toda la colección Edición Perla.</p>
          </header>

          <div className="toolbar-productos" role="search">
            <div className="toolbar-productos__grupo toolbar-productos__buscador">
              <label className="visually-hidden" htmlFor="buscador">Buscar productos</label>
              <input className="campo__input" type="search" id="buscador" placeholder="Buscar por nombre…"
                     value={q} onChange={(e) => cambiar('q', e.target.value)} />
            </div>
            <div className="toolbar-productos__grupo">
              <label className="campo__label" htmlFor="filtro-categoria">Categoría</label>
              <select className="campo__select" id="filtro-categoria" value={categoria} onChange={(e) => cambiar('categoria', e.target.value)}>
                <option value="">Todas las categorías</option>
                {categorias.map((c) => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
              </select>
            </div>
            <div className="toolbar-productos__grupo">
              <label className="campo__label" htmlFor="ordenar">Ordenar por</label>
              <select className="campo__select" id="ordenar" value={orden} onChange={(e) => cambiar('orden', e.target.value === 'relevancia' ? '' : e.target.value)}>
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="nombre">Nombre (A-Z)</option>
              </select>
            </div>
          </div>
          <p className="toolbar-productos__resultado" role="status" aria-live="polite">
            {filtrados.length === productos.length ? 'Mostrando todos los productos disponibles.' : `${filtrados.length} producto(s) encontrados.`}
          </p>

          <GrillaProductos productos={filtrados} onAgregar={agregar} mensajeVacio="Ningún producto coincide con tu búsqueda." />
        </div>
      </section>
      <Beneficios />
    </>
  );
}
