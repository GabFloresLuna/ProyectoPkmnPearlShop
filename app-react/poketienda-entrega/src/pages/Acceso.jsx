import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Campo from '../components/Campo.jsx';
import { useApp } from '../context/AppContext.jsx';
import { V } from '../utils.js';

/** Login y registro comparten el mismo formulario: la prop `modo` decide qué campos se muestran. */
export default function Acceso({ modo }) {
  const registro = modo === 'registro';
  const { iniciarSesion, registrar } = useApp();
  const navigate = useNavigate();
  const [valores, setValores] = useState({ nombre: '', correo: '', password: '', confirmar: '' });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  const cambiar = (e) => setValores({ ...valores, [e.target.name]: e.target.value });

  const enviar = (e) => {
    e.preventDefault();
    const nuevos = { correo: V.email(valores.correo), password: V.password(valores.password) };
    if (registro) {
      nuevos.nombre = V.requerido(valores.nombre, 'El nombre');
      nuevos.confirmar = valores.confirmar === valores.password ? '' : 'Las contraseñas no coinciden.';
    }
    setErrores(nuevos);
    if (Object.values(nuevos).some(Boolean)) {
      setMensaje('');
      return;
    }

    if (registro) {
      const error = registrar(valores);
      if (error) return setMensaje(error);
      navigate('/');
    } else {
      const usuario = iniciarSesion(valores.correo, valores.password);
      if (!usuario) return setMensaje('Credenciales inválidas.');
      navigate(usuario.tipo === 'Administrador' ? '/admin' : '/');
    }
  };

  return (
    <div className="pagina-acceso mx-auto" style={{ maxWidth: 440 }}>
      <h1 className="h2 mb-3">{registro ? 'Crear cuenta' : 'Iniciar sesión'}</h1>
      <form onSubmit={enviar} noValidate>
        {registro && <Campo id="nombre" etiqueta="Nombre completo" value={valores.nombre} onChange={cambiar} error={errores.nombre} />}
        <Campo id="correo" etiqueta="Correo electrónico" type="email" value={valores.correo} onChange={cambiar} error={errores.correo} />
        <Campo id="password" etiqueta="Contraseña (4 a 10 caracteres)" type="password" value={valores.password} onChange={cambiar} error={errores.password} />
        {registro && <Campo id="confirmar" etiqueta="Confirmar contraseña" type="password" value={valores.confirmar} onChange={cambiar} error={errores.confirmar} />}
        {mensaje && <div className="aviso-error alert alert-danger" role="alert">{mensaje}</div>}
        <button type="submit" className="btn boton-perla w-100">{registro ? 'Registrarme' : 'Iniciar sesión'}</button>
      </form>
      {!registro && (
        <p className="small text-secondary mt-3">Demo: <code>admin@duoc.cl</code> / <code>admin</code> · <code>cliente@gmail.com</code> / <code>1234</code></p>
      )}
      <p className="mt-3">
        {registro ? <>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></> : <>¿Aún no tienes cuenta? <Link to="/registro">Regístrate</Link></>}
      </p>
    </div>
  );
}
