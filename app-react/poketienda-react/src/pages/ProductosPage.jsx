import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATALOGO } from '../data/catalogo';
import { CardProducto } from '../components/CardProducto';

export const ProductosPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [busqueda, setBusqueda] = useState(searchParams.get('q') || '');
  const [categoria, setCategoria] = useState(searchParams.get('categoria') || '');
  const [orden, setOrden] = useState(searchParams.get('orden') || 'relevancia');
  const categorias = useMemo(() => {
    const setCat = new Set(CATALOGO.map((p) => p.categoria));
    return Array.from(setCat);
  }, []);
  const productosFiltrados = useMemo(() => {
    let resultado = [...CATALOGO];

    if (categoria) {
      resultado = resultado.filter((p) => p.categoria === categoria);
    }

    if (busqueda.trim()) {
      const q = busqueda.trim().toLowerCase();
      resultado = resultado.filter((p) => p.nombre.toLowerCase().includes(q));
    }

    if (orden === 'precio-asc') {
      resultado.sort((a, b) => a.precio - b.precio);
    } else if (orden === 'precio-desc') {
      resultado.sort((a, b) => b.precio - a.precio);
    } else if (orden === 'nombre') {
      resultado.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
    }

    return resultado;
  }, [busqueda, categoria, orden]);

  const handleBusquedaChange = (e) => {
    const val = e.target.value;
    setBusqueda(val);
    actualizarParams({ q: val, categoria, orden });
  };

  const handleCategoriaChange = (e) => {
    const val = e.target.value;
    setCategoria(val);
    actualizarParams({ q: busqueda, categoria: val, orden });
  };

  const handleOrdenChange = (e) => {
    const val = e.target.value;
    setOrden(val);
    actualizarParams({ q: busqueda, categoria, orden: val });
  };

  const actualizarParams = ({ q, categoria: cat, orden: ord }) => {
    const params = {};
    if (q) params.q = q;
    if (cat) params.categoria = cat;
    if (ord && ord !== 'relevancia') params.orden = ord;
    setSearchParams(params);
  };

  return (
    <div className="productos-view">
      <div className="contenedor">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Ruta de navegación">
          <ol className="breadcrumb__lista">
            <li className="breadcrumb__item">
              <a className="breadcrumb__enlace" href="/">
                Inicio
              </a>
            </li>
            <li className="breadcrumb__item breadcrumb__item--actual" aria-current="page">
              Productos
            </li>
          </ol>
        </nav>

        {/* Hero de Sección */}
        <header className="productos-view__cabecera">
          <h1 className="productos-view__titulo">Catálogo Completo</h1>
          <p className="productos-view__subtitulo">
            Explora figuras, artículos de colección, consolas y accesorios de Sinnoh.
          </p>
        </header>

        {/* Toolbar de Filtros */}
        <section className="toolbar-productos" aria-label="Filtros del catálogo">
          <div className="toolbar-productos__grupo toolbar-productos__buscador">
            <label htmlFor="buscador" className="campo__label">
              Buscar
            </label>
            <div className="campo__input-wrapper" style={{ position: 'relative' }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-texto-sec)',
                }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="search"
                id="buscador"
                className="campo__input"
                placeholder="Ej: Palkia, Perla, Álbum..."
                value={busqueda}
                onChange={handleBusquedaChange}
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>
          </div>

          <div className="toolbar-productos__grupo">
            <label htmlFor="filtro-categoria" className="campo__label">
              Categoría
            </label>
            <select
              id="filtro-categoria"
              className="campo__select"
              value={categoria}
              onChange={handleCategoriaChange}
            >
              <option value="">Todas las categorías</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="toolbar-productos__grupo">
            <label htmlFor="ordenar" className="campo__label">
              Ordenar por
            </label>
            <select
              id="ordenar"
              className="campo__select"
              value={orden}
              onChange={handleOrdenChange}
            >
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre (A-Z)</option>
            </select>
          </div>
        </section>

        {/* Contador de Resultados */}
        <p className="toolbar-productos__resultado" id="resultado-contador" aria-live="polite">
          Mostrando {productosFiltrados.length} producto(s)
        </p>

        {/* Grilla de Productos */}
        {productosFiltrados.length > 0 ? (
          <div className="grid-productos" id="lista-productos">
            {productosFiltrados.map((prod) => (
              <CardProducto key={prod.id} producto={prod} />
            ))}
          </div>
        ) : (
          <div className="aviso aviso--info" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <p style={{ margin: 0 }}>
              No se encontraron productos que coincidan con los criterios de búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};