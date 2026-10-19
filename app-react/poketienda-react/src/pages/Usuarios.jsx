import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Usuarios = () => {
  // Datos exactos de usuarios de la Fase 1
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Gabriel Flores', email: 'gab.flores@duocuc.cl', rol: 'Administrador' },
    { id: 2, nombre: 'Daniel Rangel', email: 'da.rangel@duocuc.cl', rol: 'Administrador' },
    { id: 3, nombre: 'Hernaldo Silva', email: 'her.silva@duocuc.cl', rol: 'Administrador' },
    { id: 4, nombre: 'Roberto Manfinfla', email: 'vendedor1@gmail.com', rol: 'Vendedor' },
    { id: 5, nombre: 'Diego Armando Maradona', email: 'cliente1@gmail.com', rol: 'Cliente' }
  ]);

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  return (
    <section className="admin-section">
      <div className="section-header">
        <h2>Gestión de Usuarios (Fase 1)</h2>
        <Link to="/admin/usuarios/nuevo" className="btn btn-primary">
          + Agregar Usuario
        </Link>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usr) => (
              <tr key={usr.id}>
                <td>{usr.id}</td>
                <td>{usr.nombre}</td>
                <td>{usr.email}</td>
                <td>{usr.rol}</td>
                <td>
                  <Link to={`/admin/usuarios/editar/${usr.id}`} className="btn btn-warning">
                    Editar
                  </Link>
                  <button 
                    onClick={() => handleEliminar(usr.id)} 
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