import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Campo from '../../components/Campo.jsx';
import Feedback from '../../components/forms/Feedback.jsx';
import { categoriasDB, productosDB } from '../../data/db.js';
import useFormulario from '../../hooks/useFormulario.js';
import useRepo from '../../hooks/useRepo.js';
import useTituloDocumento from '../../hooks/useTituloDocumento.js';
import { esCritico } from '../../utils/productos.js';
import { V } from '../../utils/validaciones.js';

const REGLAS = {
  id: (v) => [V.requerido(v, 'El código'), V.minLen(v, 3, 'El código')],
  nombre: (v) => [V.requerido(v, 'El nombre'), V.maxLen(v, 100, 'El nombre')],
  desc: (v) => [V.maxLen(v, 500, 'La descripción')],
  precio: (v) => [V.decimal(v, 'El precio'), V.noNegativo(v, 'El precio')],
  stock: (v) => [V.entero(v, 'El stock'), V.noNegativo(v, 'El stock')],
  stockCritico: (v) => (v === '' ? [{ ok: true, mensaje: '' }] : [V.entero(v, 'El stock crítico'), V.noNegativo(v, 'El stock crítico')]),
  categoria: (v) => [V.requerido(v, 'La categoría')],
  img: (v) => [V.requerido(v, 'La ruta de la imagen')],
  precioOferta: (v, t) => {
    if (!t.oferta) return [{ ok: true, mensaje: '' }];
    const n = Number(v);
    return [
      V.decimal(v, 'El precio de oferta'),
      { ok: n < Number(t.precio), mensaje: 'El precio de oferta debe ser menor al precio normal.' },
    ];
  },
};

const VACIO = { id: '', nombre: '', desc: '', precio: '', stock: '', stockCritico: '', categoria: '', img: '/images/perlaCosmicaDecorativa.jpg', oferta: false, precioOferta: '', destacado: false };

/** Formulario de producto: sirve para crear (/nuevo) y para editar (/:id/editar). */
export default function AdminProductoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const categorias = useRepo(categoriasDB);
  const existente = id ? productosDB.obtener(id) : null;
  const edicion = Boolean(id);
  const [feedback, setFeedback] = useState(null);
  useTituloDocumento(edicion ? `Admin · Editar ${id}` : 'Admin · Nuevo producto');

  const inicial = existente
    ? { ...VACIO, ...existente, precioOferta: existente.precioOferta ?? '', stockCritico: existente.stockCritico ?? '' }
    : VACIO;
  const f = useFormulario(inicial, REGLAS);
  const { valores, errores, alCambiar, alSalir } = f;
  const comunes = { alCambiar, alSalir };

  if (edicion && !existente) return <p className="aviso aviso--advertencia" role="alert">El producto {id} no existe.</p>;

  const enviar = (e) => {
    e.preventDefault();
    if (!f.validarTodo()) {
      setFeedback({ tipo: 'error', texto: 'Corrige los campos marcados.' });
      return;
    }
    const datos = {
      nombre: valores.nombre.trim(), desc: valores.desc, categoria: valores.categoria, img: valores.img,
      precio: Number(valores.precio), stock: Number(valores.stock),
      stockCritico: valores.stockCritico === '' ? undefined : Number(valores.stockCritico),
      oferta: valores.oferta, precioOferta: valores.oferta ? Number(valores.precioOferta) : undefined,
      destacado: valores.destacado,
    };
    try {
      if (edicion) productosDB.actualizar(id, datos);
      else productosDB.crear({ id: valores.id.trim().toUpperCase(), ...datos });
    } catch (err) {
      setFeedback({ tipo: 'error', texto: err.message });
      return;
    }
    setFeedback({ tipo: 'exito', texto: edicion ? 'Producto actualizado.' : 'Producto creado.' });
    setTimeout(() => navigate('/admin/productos'), 700);
  };

  return (
    <section>
      <h2 className="mantenedor__titulo">{edicion ? `Editar producto ${id}` : 'Nuevo producto'}</h2>
      <form className="formulario formulario--admin" onSubmit={enviar} noValidate>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <Campo id="id" etiqueta="Código" requerido valor={valores.id} error={errores.id} readOnly={edicion} placeholder="Ej: P009" {...comunes} />
          </div>
          <div className="col-12 col-md-8">
            <Campo id="nombre" etiqueta="Nombre" requerido maxLength={100} valor={valores.nombre} error={errores.nombre} {...comunes} />
          </div>
          <div className="col-12">
            <Campo id="desc" etiqueta="Descripción" opcional componente="textarea" rows={3} maxLength={500} contador={500}
                   valor={valores.desc} error={errores.desc} {...comunes} />
          </div>
          <div className="col-12 col-md-4">
            <Campo id="precio" etiqueta="Precio (CLP)" requerido inputMode="decimal" valor={valores.precio} error={errores.precio} {...comunes} />
          </div>
          <div className="col-12 col-md-4">
            <Campo id="stock" etiqueta="Stock" requerido inputMode="numeric" valor={valores.stock} error={errores.stock} {...comunes} />
          </div>
          <div className="col-12 col-md-4">
            <Campo id="stockCritico" etiqueta="Stock crítico" opcional inputMode="numeric" valor={valores.stockCritico}
                   error={errores.stockCritico} ayuda="Se avisa cuando el stock llega a este valor." {...comunes} />
          </div>
          <div className="col-12">
            {esCritico({ stock: valores.stock, stockCritico: valores.stockCritico }) && valores.stock !== '' && (
              <p className="aviso aviso--advertencia" id="alerta-stock" role="status">⚠ El stock actual está en nivel crítico.</p>
            )}
          </div>
          <div className="col-12 col-md-6">
            <Campo id="categoria" etiqueta="Categoría" requerido componente="select" valor={valores.categoria} error={errores.categoria} {...comunes}>
              <option value="">Seleccione una categoría…</option>
              {categorias.map((c) => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
            </Campo>
          </div>
          <div className="col-12 col-md-6">
            <Campo id="img" etiqueta="Ruta de la imagen" requerido valor={valores.img} error={errores.img}
                   ayuda="Ej: /images/figuraPalkiaLegendaria1.webp (archivos de la carpeta public/images)." {...comunes} />
          </div>
          <div className="col-12 col-md-4">
            <Campo id="oferta" tipo="checkbox" etiqueta="Producto en oferta" valor={valores.oferta} {...comunes} />
          </div>
          {valores.oferta && (
            <div className="col-12 col-md-4">
              <Campo id="precioOferta" etiqueta="Precio de oferta" requerido inputMode="decimal" valor={valores.precioOferta} error={errores.precioOferta} {...comunes} />
            </div>
          )}
          <div className="col-12 col-md-4">
            <Campo id="destacado" tipo="checkbox" etiqueta="Mostrar en destacados del inicio" valor={valores.destacado} {...comunes} />
          </div>
        </div>
        <div className="formulario__acciones d-flex gap-2 mt-3">
          <button type="submit" className="boton boton--primario">{edicion ? 'Guardar cambios' : 'Crear producto'}</button>
          <Link className="boton boton--secundario" to="/admin/productos">Cancelar</Link>
        </div>
        <Feedback feedback={feedback} />
      </form>
    </section>
  );
}
