import { useState } from 'react';
import Campo from '../components/Campo.jsx';
import { V } from '../utils.js';

const INICIAL = { nombre: '', correo: '', comentario: '' };

export default function Contacto() {
  const [valores, setValores] = useState(INICIAL);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const cambiar = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
    setEnviado(false);
  };

  const enviar = (e) => {
    e.preventDefault();
    const nuevos = {
      nombre: V.requerido(valores.nombre, 'El nombre') || V.maxLen(valores.nombre, 100, 'El nombre'),
      correo: V.email(valores.correo),
      comentario: V.requerido(valores.comentario, 'El comentario') || V.maxLen(valores.comentario, 500, 'El comentario'),
    };
    setErrores(nuevos);
    if (Object.values(nuevos).some(Boolean)) return;
    setValores(INICIAL);
    setEnviado(true);
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 560 }}>
      <h1 className="h2">Contacto</h1>
      <p className="text-secondary">¿Dudas sobre un producto o un pedido? Escríbenos.</p>
      <form onSubmit={enviar} noValidate>
        <Campo id="nombre" etiqueta="Nombre completo" value={valores.nombre} onChange={cambiar} error={errores.nombre} />
        <Campo id="correo" etiqueta="Correo electrónico" type="email" value={valores.correo} onChange={cambiar} error={errores.correo} />
        <Campo id="comentario" etiqueta="Comentario" como="textarea" rows="5" maxLength="500" value={valores.comentario} onChange={cambiar} error={errores.comentario} />
        <p className="small text-secondary">{valores.comentario.length}/500 caracteres</p>
        {enviado && <div className="alert alert-success" role="status">¡Mensaje enviado! Te contactaremos pronto.</div>}
        <button type="submit" className="btn btn-pearl">Enviar mensaje</button>
      </form>
    </div>
  );
}
