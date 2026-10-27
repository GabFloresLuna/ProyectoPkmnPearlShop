import { useState } from 'react';
import { Link } from 'react-router-dom';
import Campo from '../components/Campo.jsx';
import { useApp } from '../context/AppContext.jsx';
import { pedidosDB, productosDB, usuariosDB } from '../data/db.js';
import { V, formatoCLP, precioFinal } from '../utils.js';

const STOCK_CRITICO = 3;
const VACIO = { nombre: '', categoria: '', precio: '', stock: '', img: '/images/perlaCosmicaDecorativa.jpg', oferta: false, precioOferta: '' };

/** Panel de administración: métricas y mantenedor de productos (CRUD completo). Solo para administradores. */
export default function Admin() {
  const { usuario } = useApp();
  const [productos, setProductos] = useState(() => productosDB.listar());
  const [form, setForm] = useState(VACIO);
  const [editando, setEditando] = useState(null);
  const [errores, setErrores] = useState({});

  if (usuario?.tipo !== 'Administrador') {
    return (
      <div className="pagina-acceso-restringido text-center py-5">
        <h1>Acceso restringido</h1>
        <p>Esta sección es solo para administradores.</p>
        <Link to="/login" className="btn boton-perla">Iniciar sesión</Link>
      </div>
    );
  }

  const refrescar = () => setProductos(productosDB.listar());
  const pedidos = pedidosDB.listar();
  const criticos = productos.filter((p) => p.stock <= STOCK_CRITICO).length;

  const cambiar = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  // CREATE / UPDATE
  const guardar = (e) => {
    e.preventDefault();
    const nuevos = {
      nombre: V.requerido(form.nombre, 'El nombre'),
      categoria: V.requerido(form.categoria, 'La categoría'),
      precio: Number(form.precio) > 0 ? '' : 'El precio debe ser mayor que 0.',
      stock: form.stock !== '' && Number.isInteger(Number(form.stock)) && Number(form.stock) >= 0 ? '' : 'El stock debe ser un entero desde 0.',
      precioOferta: form.oferta && !(Number(form.precioOferta) > 0 && Number(form.precioOferta) < Number(form.precio)) ? 'El precio de oferta debe ser menor al precio.' : '',
    };
    setErrores(nuevos);
    if (Object.values(nuevos).some(Boolean)) return;

    const datos = { ...form, precio: Number(form.precio), stock: Number(form.stock), precioOferta: form.oferta ? Number(form.precioOferta) : undefined };
    if (editando) productosDB.actualizar(editando, datos);
    else productosDB.crear(datos);
    setForm(VACIO);
    setEditando(null);
    refrescar();
  };

  const editar = (p) => {
    setEditando(p.id);
    setForm({ ...VACIO, ...p, precioOferta: p.precioOferta ?? '' });
    setErrores({});
  };

  // DELETE
  const eliminar = (p) => {
    if (window.confirm(`¿Eliminar "${p.nombre}"?`)) {
      productosDB.eliminar(p.id);
      refrescar();
    }
  };

  return (
    <>
      <h1 className="h2 mb-3">Panel de administración</h1>
      <div className="fila-metricas row g-3 mb-4 text-center">
        {[['Productos', productos.length], ['Stock crítico', criticos], ['Usuarios', usuariosDB.listar().length], ['Pedidos', pedidos.length]].map(([etiqueta, valor]) => (
          <div className="columna-metrica col-6 col-md-3" key={etiqueta}>
            <div className="tarjeta-metrica card p-3"><div className="etiqueta-metrica small text-secondary">{etiqueta}</div><div className="valor-metrica fs-3 fw-bold">{valor}</div></div>
          </div>
        ))}
      </div>

      <h2 className="h4">{editando ? `Editar producto ${editando}` : 'Nuevo producto'}</h2>
      <form className="formulario-producto row g-3 mb-4" onSubmit={guardar} noValidate>
        <div className="columna-nombre col-md-4"><Campo id="nombre" etiqueta="Nombre" value={form.nombre} onChange={cambiar} error={errores.nombre} /></div>
        <div className="columna-categoria col-md-4"><Campo id="categoria" etiqueta="Categoría" value={form.categoria} onChange={cambiar} error={errores.categoria} /></div>
        <div className="columna-precio col-md-2"><Campo id="precio" etiqueta="Precio" type="number" value={form.precio} onChange={cambiar} error={errores.precio} /></div>
        <div className="columna-stock col-md-2"><Campo id="stock" etiqueta="Stock" type="number" value={form.stock} onChange={cambiar} error={errores.stock} /></div>
        <div className="columna-imagen col-md-6"><Campo id="img" etiqueta="Ruta de la imagen" value={form.img} onChange={cambiar} /></div>
        <div className="columna-oferta col-md-3 d-flex align-items-center">
          <div className="casilla-oferta form-check">
            <input className="form-check-input" type="checkbox" id="oferta" name="oferta" checked={form.oferta} onChange={cambiar} />
            <label className="form-check-label" htmlFor="oferta">En oferta</label>
          </div>
        </div>
        {form.oferta && <div className="columna-precio-oferta col-md-3"><Campo id="precioOferta" etiqueta="Precio de oferta" type="number" value={form.precioOferta} onChange={cambiar} error={errores.precioOferta} /></div>}
        <div className="columna-botones col-12 d-flex gap-2">
          <button type="submit" className="btn boton-perla">{editando ? 'Guardar cambios' : 'Crear producto'}</button>
          {editando && <button type="button" className="btn btn-outline-light" onClick={() => { setEditando(null); setForm(VACIO); }}>Cancelar</button>}
        </div>
      </form>

      <h2 className="h4">Productos</h2>
      <div className="tabla-productos table-responsive mb-4">
        <table className="table align-middle">
          <thead><tr><th>Código</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th></th></tr></thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{formatoCLP(precioFinal(p))}</td>
                <td>{p.stock} {p.stock <= STOCK_CRITICO && <span className="badge text-bg-warning">Crítico</span>}</td>
                <td className="celda-acciones text-nowrap">
                  <button type="button" className="btn btn-sm btn-outline-light me-1" onClick={() => editar(p)}>Editar</button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => eliminar(p)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="h4">Pedidos recientes</h2>
      {pedidos.length === 0 ? (
        <p className="text-secondary">Aún no hay pedidos.</p>
      ) : (
        <div className="tabla-pedidos table-responsive">
          <table className="table">
            <thead><tr><th>N°</th><th>Cliente</th><th>Total</th><th>Estado</th></tr></thead>
            <tbody>
              {[...pedidos].reverse().slice(0, 5).map((o) => (
                <tr key={o.id}><td>#{o.id}</td><td>{o.cliente}</td><td>{formatoCLP(o.total)}</td><td>{o.estado}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
