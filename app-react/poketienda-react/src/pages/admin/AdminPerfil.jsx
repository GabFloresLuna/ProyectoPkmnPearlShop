import { useState } from 'react';
import Campo from '../../components/Campo.jsx';
import CamposRegionComuna from '../../components/CamposRegionComuna.jsx';
import Feedback from '../../components/forms/Feedback.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { usuariosDB } from '../../data/db.js';
import useFormulario from '../../hooks/useFormulario.js';
import useTituloDocumento from '../../hooks/useTituloDocumento.js';
import { V } from '../../utils/validaciones.js';

const REGLAS = {
  nombre: (v) => [V.requerido(v, 'El nombre'), V.maxLen(v, 50, 'El nombre'), V.letras(v, 'El nombre')],
  apellidos: (v) => [V.requerido(v, 'Los apellidos'), V.maxLen(v, 100, 'Los apellidos')],
  telefono: (v) => [V.telefono(v)],
  region: (v) => [V.requerido(v, 'La región')],
  comuna: (v) => [V.requerido(v, 'La comuna')],
  direccion: (v) => [V.requerido(v, 'La dirección'), V.maxLen(v, 300, 'La dirección')],
};

export default function AdminPerfil() {
  useTituloDocumento('Admin · Perfil');
  const { usuario } = useAuth();
  const [feedback, setFeedback] = useState(null);
  const f = useFormulario(
    { nombre: usuario.nombre, apellidos: usuario.apellidos, telefono: usuario.telefono ?? '', region: usuario.region ?? '', comuna: usuario.comuna ?? '', direccion: usuario.direccion ?? '' },
    REGLAS
  );
  const { valores, errores, alCambiar, alSalir } = f;
  const comunes = { alCambiar, alSalir };

  const enviar = (e) => {
    e.preventDefault();
    if (!f.validarTodo()) {
      setFeedback({ tipo: 'error', texto: 'Corrige los campos marcados.' });
      return;
    }
    usuariosDB.actualizar(usuario.id, valores);
    setFeedback({ tipo: 'exito', texto: 'Perfil actualizado.' });
  };

  return (
    <section>
      <h2 className="mantenedor__titulo">Mi perfil</h2>
      <p className="texto-sec">{usuario.correo} · {usuario.tipo}</p>
      <form className="formulario formulario--admin" onSubmit={enviar} noValidate>
        <div className="row g-3">
          <div className="col-12 col-md-6"><Campo id="nombre" etiqueta="Nombre" requerido valor={valores.nombre} error={errores.nombre} {...comunes} /></div>
          <div className="col-12 col-md-6"><Campo id="apellidos" etiqueta="Apellidos" requerido valor={valores.apellidos} error={errores.apellidos} {...comunes} /></div>
          <div className="col-12 col-md-6"><Campo id="telefono" etiqueta="Teléfono" opcional tipo="tel" valor={valores.telefono} error={errores.telefono} {...comunes} /></div>
          <CamposRegionComuna columna="col-12 col-md-6" valores={valores} errores={errores} alCambiar={alCambiar} alSalir={alSalir} setValor={f.setValor} />
          <div className="col-12"><Campo id="direccion" etiqueta="Dirección" requerido valor={valores.direccion} error={errores.direccion} {...comunes} /></div>
        </div>
        <button type="submit" className="boton boton--primario mt-3">Guardar cambios</button>
        <Feedback feedback={feedback} />
      </form>
    </section>
  );
}
