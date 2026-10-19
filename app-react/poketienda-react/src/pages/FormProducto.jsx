import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const FormProducto = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: 'Consolas',
    precio: '',
    stock: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Producto guardado con éxito');
    navigate('/admin/productos');
  };

  return (
    <section className="form-section">
      <h2>Formulario de Producto</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Producto:</label>
          <input 
            type="text" 
            id="nombre"
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <select 
            id="categoria"
            name="categoria" 
            value={formData.categoria} 
            onChange={handleChange}
          >
            <option value="Consolas">Consolas</option>
            <option value="Videojuegos">Videojuegos</option>
            <option value="Accesorios / Figuras">Accesorios / Figuras</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio ($ CLP):</label>
          <input 
            type="number" 
            id="precio"
            name="precio" 
            value={formData.precio} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input 
            type="number" 
            id="stock"
            name="stock" 
            value={formData.stock} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea 
            id="descripcion"
            name="descripcion"
            rows="4"
            value={formData.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Guardar</button>
          <button 
            type="button" 
            onClick={() => navigate('/admin/productos')} 
            className="btn btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
};