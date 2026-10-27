import { useState } from 'react';
import CardProducto from '../components/CardProducto.jsx';
import { useApp } from '../context/AppContext.jsx';
import { productosDB } from '../data/db.js';
import { precioFinal } from '../utils.js';

/** Catálogo con búsqueda, filtro por categoría, solo ofertas y orden (reemplaza a las vistas Categorías y Ofertas). */
export default function Productos() {
  const { agregar } = useApp();
  const productos = productosDB.listar();
  const [q, setQ] = useState('');
  const [categoria, setCategoria] = useState('');
  const [soloOfertas, setSoloOfertas] = useState(false);
  const [orden, setOrden] = useState('');

  const categorias = [...new Set(productos.map((p) => p.categoria))];
  const lista = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(q.trim().toLowerCase()) &&
      (!categoria || p.categoria === categoria) &&
      (!soloOfertas || p.oferta)
  );
  if (orden === 'precio-asc') lista.sort((a, b) => precioFinal(a) - precioFinal(b));
  if (orden === 'precio-desc') lista.sort((a, b) => precioFinal(b) - precioFinal(a));
  if (orden === 'nombre') lista.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

  return (
    <>
      <h1 className="h2">Productos</h1>
      <p className="text-secondary">Explora toda la colección Edición Perla.</p>

      <div className="barra-filtros row g-2 mb-4" role="search">
        <div className="filtro-busqueda col-md-4">
          <input className="form-control" type="search" placeholder="Buscar por nombre…" aria-label="Buscar productos" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="filtro-categoria col-6 col-md-3">
          <select className="form-select" aria-label="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Todas las categorías</option>
            {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="filtro-orden col-6 col-md-3">
          <select className="form-select" aria-label="Ordenar por" value={orden} onChange={(e) => setOrden(e.target.value)}>
            <option value="">Relevancia</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="nombre">Nombre (A-Z)</option>
          </select>
        </div>
        <div className="filtro-ofertas col-md-2 d-flex align-items-center">
          <div className="casilla-ofertas form-check">
            <input className="form-check-input" type="checkbox" id="ofertas" checked={soloOfertas} onChange={(e) => setSoloOfertas(e.target.checked)} />
            <label className="form-check-label" htmlFor="ofertas">Solo ofertas</label>
          </div>
        </div>
      </div>

      {lista.length === 0 ? (
        <p className="aviso-sin-resultados alert alert-info" role="status">Ningún producto coincide con tu búsqueda.</p>
      ) : (
        <div className="lista-productos row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {lista.map((p) => (
            <div className="columna-producto col" key={p.id}>
              <CardProducto producto={p} onAgregar={agregar} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
