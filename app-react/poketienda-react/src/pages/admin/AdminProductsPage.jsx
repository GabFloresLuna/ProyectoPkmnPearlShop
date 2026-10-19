import { useState } from 'react';
import { SidebarAdmin } from '../../components/SidebarAdmin';
import { CATALOGO } from '../../data/catalogo';

const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

export const AdminProductosPage = () => {
  const [productos, setProductos] = useState(CATALOGO);
  const [busqueda, setBusqueda] = useState('');

  const filtrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.id.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleEliminar = (id) => {
    if (window.confirm(`¿Seguro que deseas eliminar el producto ${id}?`)) {
      setProductos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="admin-layout">
      <SidebarAdmin />
      <main className="admin-main">
        <header className="admin-topbar">
          <h1 className="admin-topbar__titulo">Gestión de Productos</h1>
        </header>

        <div className="admin-contenido">
          <div className="mantenedor__cabecera">
            <h2 className="mantenedor__titulo">
              Catálogo de Inventario
              <span className="mantenedor__contador"> ({filtrados.length} ítems)</span>
            </h2>
          </div>

          <div className="admin-toolbar">
            <div className="admin-toolbar__grupo">
              <input
                type="search"
                className="campo__input"
                placeholder="Buscar por código o nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{ maxWidth: '300px' }}
              />
            </div>
          </div>

          <div className="tabla__scroll">
            <table className="tabla--admin">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <code>{p.id}</code>
                    </td>
                    <td>{p.nombre}</td>
                    <td>{p.categoria}</td>
                    <td>{formatoCLP.format(p.precio)}</td>
                    <td>
                      <span className={`badge ${p.stock <= 5 ? 'badge--error' : 'badge--exito'}`}>
                        {p.stock} un.
                      </span>
                    </td>
                    <td>
                      <div className="tabla--admin__acciones">
                        <button
                          type="button"
                          className="tabla--admin__accion tabla--admin__accion--peligro"
                          onClick={() => handleEliminar(p.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};