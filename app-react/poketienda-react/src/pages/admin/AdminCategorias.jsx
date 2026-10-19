import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Campo from '../../components/Campo.jsx';
import Mantenedor from '../../components/admin/Mantenedor.jsx';
import Feedback from '../../components/forms/Feedback.jsx';
import { categoriasDB, productosDB } from '../../data/db.js';
import useFormulario from '../../hooks/useFormulario.js';
import useRepo from '../../hooks/useRepo.js';
import useTituloDocumento from '../../hooks/useTituloDocumento.js';
import { V } from '../../utils/validaciones.js';

export function AdminCategorias() {
  useTituloDocumento('Admin · Categorías');
  const categorias = useRepo(categoriasDB);
  const productos = useRepo(productosDB);
  const contar = (c) => productos.filter((p) => p.categoria === c.nombre).length;

  const eliminar = (c) => {
    if (contar(c) > 0) {
      window.alert(`No se puede eliminar "${c.nombre}": tiene ${contar(c)} producto(s) asociados.`);
      return;
    }
    if (window.confirm(`¿Eliminar la categoría "${c.nombre}"?`)) categoriasDB.eliminar(c.id);
  };

  return (
    <Mantenedor
      titulo="Categorías"
      filas={categorias}
      columnas={[
        { titulo: 'ID', render: (c) => c.id },
        { titulo: 'Nombre', render: (c) => c.nombre },
        { titulo: 'Descripción', render: (c) => c.descripcion },
        { titulo: 'Productos', render: contar },
      ]}
      acciones={(c) => (
        <>
          <Link className="tabla--admin__accion" to={`/admin/categorias/${c.id}/editar`}>Editar</Link>
          <button type="button" className="tabla--admin__accion tabla--admin__accion--peligro" onClick={() => eliminar(c)}>Eliminar</button>
        </>
      )}
      nuevo={{ to: '/admin/categorias/nueva', texto: '+ Nueva categoría' }}
    />
  );
}

const REGLAS = {
  nombre: (v) => [V.requerido(v, 'El nombre'), V.maxLen(v, 50, 'El nombre')],
  descripcion: (v) => [V.maxLen(v, 200, 'La descripción')],
};

export function AdminCategoriaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existente = id ? categoriasDB.obtener(id) : null;
  const edicion = Boolean(id);
  const [feedback, setFeedback] = useState(null);
  useTituloDocumento(edicion ? 'Admin · Editar categoría' : 'Admin · Nueva categoría');
  const f = useFormulario({ nombre: existente?.nombre ?? '', descripcion: existente?.descripcion ?? '' }, REGLAS);
  const { valores, errores, alCambiar, alSalir } = f;

  if (edicion && !existente) return <p className="aviso aviso--advertencia" role="alert">La categoría {id} no existe.</p>;

  const enviar = (e) => {
    e.preventDefault();
    if (!f.validarTodo()) {
      setFeedback({ tipo: 'error', texto: 'Corrige los campos marcados.' });
      return;
    }
    const nombre = valores.nombre.trim();
    const repetida = categoriasDB.listar().some((c) => c.nombre.toLowerCase() === nombre.toLowerCase() && c.id !== id);
    if (repetida) {
      setFeedback({ tipo: 'error', texto: 'Ya existe una categoría con ese nombre.' });
      return;
    }
    if (edicion) {
      categoriasDB.actualizar(id, { nombre, descripcion: valores.descripcion });
      // Mantiene la relación: los productos de la categoría renombrada siguen asociados
      if (existente.nombre !== nombre) {
        productosDB.listar().filter((p) => p.categoria === existente.nombre).forEach((p) => productosDB.actualizar(p.id, { categoria: nombre }));
      }
    } else {
      categoriasDB.crear({ nombre, descripcion: valores.descripcion });
    }
    setFeedback({ tipo: 'exito', texto: edicion ? 'Categoría actualizada.' : 'Categoría creada.' });
    setTimeout(() => navigate('/admin/categorias'), 700);
  };

  return (
    <section>
      <h2 className="mantenedor__titulo">{edicion ? `Editar categoría ${id}` : 'Nueva categoría'}</h2>
      <form className="formulario formulario--admin" onSubmit={enviar} noValidate>
        <Campo id="nombre" etiqueta="Nombre" requerido maxLength={50} valor={valores.nombre} error={errores.nombre} alCambiar={alCambiar} alSalir={alSalir} />
        <Campo id="descripcion" etiqueta="Descripción" opcional componente="textarea" rows={3} maxLength={200} contador={200}
               valor={valores.descripcion} error={errores.descripcion} alCambiar={alCambiar} alSalir={alSalir} />
        <div className="formulario__acciones d-flex gap-2 mt-3">
          <button type="submit" className="boton boton--primario">{edicion ? 'Guardar cambios' : 'Crear categoría'}</button>
          <Link className="boton boton--secundario" to="/admin/categorias">Cancelar</Link>
        </div>
        <Feedback feedback={feedback} />
      </form>
    </section>
  );
}
