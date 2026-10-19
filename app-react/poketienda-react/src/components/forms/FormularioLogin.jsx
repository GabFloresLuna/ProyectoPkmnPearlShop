import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import useFormulario from '../../hooks/useFormulario.js';
import { V } from '../../utils/validaciones.js';
import Campo from '../Campo.jsx';
import Feedback from './Feedback.jsx';

const REGLAS = {
  correo: (v) => [V.email(v), V.maxLen(v, 100, 'El correo')],
  password: (v) => [V.password(v)],
};

function FormularioLogin() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [feedback, setFeedback] = useState(null);
  const { valores, errores, alCambiar, alSalir, validarTodo } = useFormulario({ correo: '', password: '', recordarme: false }, REGLAS);

  const enviar = (e) => {
    e.preventDefault();
    if (!validarTodo()) {
      setFeedback({ tipo: 'error', texto: 'Credenciales inválidas.' });
      return;
    }
    const r = iniciarSesion(valores.correo, valores.password);
    if (!r.ok) {
      setFeedback({ tipo: 'error', texto: r.mensaje });
      return;
    }
    setFeedback({ tipo: 'exito', texto: 'Inicio de sesión exitoso.' });
    const destino = r.usuario.tipo === 'Administrador' ? '/admin' : location.state?.desde || '/';
    navigate(destino, { replace: true });
  };

  return (
    <form className="formulario" id="form-login" onSubmit={enviar} noValidate>
      <Campo id="correo" etiqueta="Correo electrónico" requerido tipo="email" placeholder="tucorreo@duoc.cl"
             maxLength={100} autoComplete="email" inputMode="email" valor={valores.correo} error={errores.correo}
             alCambiar={alCambiar} alSalir={alSalir}
             ayuda={<>Dominios permitidos: <strong>@duoc.cl</strong>, <strong>@profesor.duoc.cl</strong> y <strong>@gmail.com</strong>.</>} />
      <Campo id="password" etiqueta="Contraseña" requerido tipo="password" placeholder="Entre 4 y 10 caracteres"
             maxLength={10} autoComplete="current-password" valor={valores.password} error={errores.password}
             alCambiar={alCambiar} alSalir={alSalir} ayuda="Entre 4 y 10 caracteres." />
      <div className="formulario__fila">
        <Campo id="recordarme" tipo="checkbox" etiqueta="Recordarme en este equipo" valor={valores.recordarme} alCambiar={alCambiar} />
        <a className="auth__enlace auth__enlace--pequeno" href="#">¿Olvidaste tu contraseña?</a>
      </div>
      <button type="submit" className="boton boton--primario boton--bloque" id="btn-login">Iniciar sesión</button>
      <Feedback feedback={feedback} />
      <p className="formulario__nota">Demo: <code>admin@duoc.cl</code> / <code>admin</code> (administrador) · <code>cliente@gmail.com</code> / <code>1234</code> (cliente).</p>
      <p className="auth__alternativa">¿Aún no tienes cuenta? <Link className="auth__enlace" to="/registro">Regístrate aquí</Link></p>
    </form>
  );
}

export default FormularioLogin;
