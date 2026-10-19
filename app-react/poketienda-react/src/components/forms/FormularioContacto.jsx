import { useState } from 'react';
import { mensajesDB } from '../../data/db.js';
import useFormulario from '../../hooks/useFormulario.js';
import { V } from '../../utils/validaciones.js';
import Campo from '../Campo.jsx';
import Feedback from './Feedback.jsx';

const INICIAL = { nombre: '', correo: '', comentario: '' };
const REGLAS = {
  nombre: (v) => [V.requerido(v, 'El nombre'), V.maxLen(v, 100, 'El nombre'), V.letras(v, 'El nombre')],
  correo: (v) => [V.email(v), V.maxLen(v, 100, 'El correo')],
  comentario: (v) => [V.requerido(v, 'El comentario'), V.maxLen(v, 500, 'El comentario')],
};

function FormularioContacto() {
  const [feedback, setFeedback] = useState(null);
  const { valores, errores, alCambiar, alSalir, validarTodo, reiniciar } = useFormulario(INICIAL, REGLAS);
  const comunes = { alCambiar, alSalir };

  const enviar = (e) => {
    e.preventDefault();
    if (!validarTodo()) {
      setFeedback({ tipo: 'error', texto: 'Revisa los campos marcados.' });
      return;
    }
    mensajesDB.crear({ ...valores, fecha: new Date().toISOString() }); // persiste el mensaje
    setFeedback({ tipo: 'exito', texto: '¡Mensaje enviado! Te contactaremos pronto.' });
    reiniciar();
  };

  return (
    <form className="formulario" id="form-contacto" onSubmit={enviar} noValidate>
      <Campo id="nombre" etiqueta="Nombre completo" requerido placeholder="Ej: Gabriel Flores" maxLength={100}
             valor={valores.nombre} error={errores.nombre} ayuda="Máximo 100 caracteres." {...comunes} />
      <Campo id="correo" etiqueta="Correo electrónico" requerido tipo="email" placeholder="tucorreo@duoc.cl" maxLength={100}
             valor={valores.correo} error={errores.correo} {...comunes}
             ayuda={<>Solo dominios <strong>@duoc.cl</strong>, <strong>@profesor.duoc.cl</strong> y <strong>@gmail.com</strong>.</>} />
      <Campo id="comentario" etiqueta="Comentario" requerido componente="textarea" rows={6} maxLength={500}
             placeholder="Cuéntanos en qué podemos ayudarte…" valor={valores.comentario} error={errores.comentario}
             ayuda="Máximo 500 caracteres." contador={500} {...comunes} />
      <button type="submit" className="boton boton--primario boton--bloque" id="btn-enviar">Enviar mensaje</button>
      <Feedback feedback={feedback} />
    </form>
  );
}

export default FormularioContacto;
