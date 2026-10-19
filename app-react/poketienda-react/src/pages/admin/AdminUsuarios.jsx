import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Campo from '../../components/Campo.jsx';
import CamposRegionComuna from '../../components/CamposRegionComuna.jsx';
import Mantenedor from '../../components/admin/Mantenedor.jsx';
import Feedback from '../../components/forms/Feedback.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { usuariosDB } from '../../data/db.js';
import { ordenesDeUsuario } from '../../data/pedidos.js';
import useFormulario from '../../hooks/useFormulario.js';
import useRepo from '../../hooks/useRepo.js';
import useTituloDocumento from '../../hooks/useTituloDocumento.js';
import { formatoCLP, formatoFecha } from '../../utils/formato.js';
import { V } from '../../utils/validaciones.js';

export function AdminUsuarios() {
  useTituloDocumento('Admin · Usuarios');
  const usuarios = useRepo(usuariosDB);
  const { usuario: yo } = useAuth();

  const eliminar = (u) => {
    if (u.id === yo.id) {
      window.alert('No puedes eliminar tu propia cuenta mientras tienes la sesión iniciada.');
      return;
    }
    if (window.confirm(`¿Eliminar al usuario "${u.nombre} ${u.apellidos}"?`)) usuariosDB.eliminar(u.id);
  };

  return (
    <Mantenedor
      titulo="Usuarios"
      filas={usuarios}
      columnas={[
        { titulo: 'RUN', render: (u) => u.run || '—' },
        { titulo: 'Nombre', render: (u) => `${u.nombre} ${u.apellidos}` },
        { titulo: 'Correo', render: (u) => u.correo },
        { titulo: 'Tipo', render: (u) => <span className={u.tipo === 'Administrador' ? 'badge badge--primario' : 'badge badge--info'}>{u.tipo}</span> },
        { titulo: 'Región / Comuna', render: (u) => (u.region ? `${u.region} / ${u.comuna}` : '—') },
      ]}
      acciones={(u) => (
        <>
          <Link className="tabla--admin__accion" to={`/admin/usuarios/${u.id}/historial`}>Historial</Link>
          <Link className="tabla--admin__accion" to={`/admin/usuarios/${u.id}/editar`}>Editar</Link>
          <button type="button" className="tabla--admin__accion tabla--admin__accion--peligro" onClick={() => eliminar(u)}>Eliminar</button>
        </>
      )}
      nuevo={{ to: '/admin/usuarios/nuevo', texto: '+ Nuevo usuario' }}
    />
  );
}

const REGLAS = {
  run: (v) => [V.run(v)],
  nombre: (v) => [V.requerido(v, 'El nombre'), V.maxLen(v, 50, 'El nombre'), V.letras(v, 'El nombre')],
  apellidos: (v) => [V.requerido(v, 'Los apellidos'), V.maxLen(v, 100, 'Los apellidos')],
  correo: (v) => [V.email(v), V.maxLen(v, 100, 'El correo')],
  password: (v) => [V.password(v)],
  tipo: (v) => [V.requerido(v, 'El tipo de usuario')],
  region: (v) => [V.requerido(v, 'La región')],
  comuna: (v) => [V.requerido(v, 'La comuna')],
  direccion: (v) => [V.requerido(v, 'La dirección'), V.maxLen(v, 300, 'La dirección')],
};
const VACIO = { run: '', nombre: '', apellidos: '', correo: '', password: '', tipo: 'Cliente', region: '', comuna: '', direccion: '', telefono: '' };

export function AdminUsuarioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existente = id ? usuariosDB.obtener(id) : null;
  const edicion = Boolean(id);
  const [feedback, setFeedback] = useState(null);
  useTituloDocumento(edicion ? 'Admin · Editar usuario' : 'Admin · Nuevo usuario');
  const f = useFormulario(existente ? { ...VACIO, ...existente } : VACIO, REGLAS);
  const { valores, errores, alCambiar, alSalir } = f;
  const comunes = { alCambiar, alSalir };

  if (edicion && !existente) return <p className="aviso aviso--advertencia" role="alert">El usuario {id} no existe.</p>;

  const enviar = (e) => {
    e.preventDefault();
    if (!f.validarTodo()) {
      setFeedback({ tipo: 'error', texto: 'Corrige los campos marcados.' });
      return;
    }
    const otros = usuariosDB.listar().filter((u) => u.id !== id);
    if (otros.some((u) => u.correo.toLowerCase() === valores.correo.toLowerCase())) {
      setFeedback({ tipo: 'error', texto: 'Ya existe un usuario con ese correo.' });
      return;
    }
    if (otros.some((u) => u.run && u.run.toUpperCase() === valores.run.toUpperCase())) {
      setFeedback({ tipo: 'error', texto: 'Ya existe un usuario con ese RUN.' });
      return;
    }
    const datos = { ...valores, run: valores.run.toUpperCase(), correo: valores.correo.toLowerCase() };
    if (edicion) usuariosDB.actualizar(id, datos);
    else usuariosDB.crear(datos);
    setFeedback({ tipo: 'exito', texto: edicion ? 'Usuario actualizado.' : 'Usuario creado.' });
    setTimeout(() => navigate('/admin/usuarios'), 700);
  };

  return (
    <section>
      <h2 className="mantenedor__titulo">{edicion ? `Editar usuario ${existente.nombre}` : 'Registro de usuario'}</h2>
      <form className="formulario formulario--admin" onSubmit={enviar} noValidate>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <Campo id="run" etiqueta="RUN" requerido maxLength={9} placeholder="Ej: 19011022K" valor={valores.run} error={errores.run}
                   ayuda="Sin puntos ni guion." {...comunes} />
          </div>
          <div className="col-12 col-md-4">
            <Campo id="nombre" etiqueta="Nombre" requerido maxLength={50} valor={valores.nombre} error={errores.nombre} {...comunes} />
          </div>
          <div className="col-12 col-md-4">
            <Campo id="apellidos" etiqueta="Apellidos" requerido maxLength={100} valor={valores.apellidos} error={errores.apellidos} {...comunes} />
          </div>
          <div className="col-12 col-md-6">
            <Campo id="correo" etiqueta="Correo" requerido tipo="email" maxLength={100} valor={valores.correo} error={errores.correo} {...comunes} />
          </div>
          <div className="col-12 col-md-6">
            <Campo id="password" etiqueta="Contraseña" requerido tipo="password" maxLength={10} valor={valores.password}
                   error={errores.password} ayuda="Entre 4 y 10 caracteres." {...comunes} />
          </div>
          <div className="col-12 col-md-4">
            <Campo id="tipo" etiqueta="Tipo de usuario" requerido componente="select" valor={valores.tipo} error={errores.tipo} {...comunes}>
              <option value="Cliente">Cliente</option>
              <option value="Administrador">Administrador</option>
            </Campo>
          </div>
          <div className="col-12 col-md-4">
            <Campo id="telefono" etiqueta="Teléfono" opcional tipo="tel" valor={valores.telefono} error={errores.telefono} {...comunes} />
          </div>
          <CamposRegionComuna columna="col-12 col-md-6" valores={valores} errores={errores} alCambiar={alCambiar} alSalir={alSalir} setValor={f.setValor} />
          <div className="col-12">
            <Campo id="direccion" etiqueta="Dirección" requerido maxLength={300} valor={valores.direccion} error={errores.direccion} {...comunes} />
          </div>
        </div>
        <div className="formulario__acciones d-flex gap-2 mt-3">
          <button type="submit" className="boton boton--primario">{edicion ? 'Guardar cambios' : 'Crear usuario'}</button>
          <Link className="boton boton--secundario" to="/admin/usuarios">Cancelar</Link>
        </div>
        <Feedback feedback={feedback} />
      </form>
    </section>
  );
}

export function AdminHistorialCompras() {
  const { id } = useParams();
  const usuario = useRepo(usuariosDB).find((u) => u.id === id);
  useTituloDocumento('Admin · Historial de compras');
  if (!usuario) return <p className="aviso aviso--advertencia" role="alert">El usuario {id} no existe.</p>;
  const ordenes = ordenesDeUsuario(usuario);
  return (
    <Mantenedor
      titulo={`Historial de compras de ${usuario.nombre} ${usuario.apellidos}`}
      filas={ordenes}
      buscar={false}
      columnas={[
        { titulo: 'N° orden', render: (o) => `#${o.id}` },
        { titulo: 'Fecha', render: (o) => formatoFecha(o.fecha) },
        { titulo: 'Productos', render: (o) => o.items.reduce((s, i) => s + i.cantidad, 0) },
        { titulo: 'Total', render: (o) => formatoCLP(o.total) },
        { titulo: 'Estado', render: (o) => o.estado },
      ]}
      acciones={(o) => <Link className="tabla--admin__accion" to={`/admin/ordenes/${o.id}`}>Boleta</Link>}
      vacio="Este usuario aún no tiene compras."
    />
  );
}
