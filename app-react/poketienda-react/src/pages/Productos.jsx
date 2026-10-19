import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Productos = () => {
    const [productos, setProductos] = useState([
        {
      id: 1,
      nombre: 'Nintendo DS (Edición Pearl)',
      categoria: 'Consolas',
      precio: 150000,
      stock: 3
    },
    {
      id: 2,
      nombre: 'Lampara Giratina',
      categoria: 'Lamparas',
      precio: 65000,
      stock: 8
    },
    {
      id: 3,
      nombre: 'Figura Leyenda Palkia (20cm)',
      categoria: 'Accesorios / Figuras',
      precio: 35000,
      stock: 15
    }
  ]);

    const handleEliminar = (id) => {
        if(window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            setProductos(productos.filter(producto => producto.id !== id));
        }
    };

    return (
        <section className="admin-section">
      <div className="section-header">
        <h2>Gestión de Productos (Fase 1)</h2>
        <Link to="/admin/productos/nuevo" className="btn btn-primary">
          + Agregar Producto
        </Link>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>{prod.categoria}</td>
                <td>\${prod.precio.toLocaleString('es-CL')}</td>
                <td>{prod.stock}</td>
                <td>
                  <Link to={`/admin/productos/editar/${prod.id}`} className="btn btn-warning">
                    Editar
                  </Link>
                  <button 
                    onClick={() => handleEliminar(prod.id)} 
                    className="btn btn-danger"
                    style={{ marginLeft: '6px' }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};