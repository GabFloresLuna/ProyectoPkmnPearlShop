import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { V } from '../utils/validaciones';

export const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ correo: '', password: '' });
  const [errores, setErrores] = useState({});
  const [feedback, setFeedback] = useState({ mensaje: '', tipo: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errCorreo = V.email(form.correo);
    const errPass = V.password(form.password);

    const nuevosErrores = {};
    if (!errCorreo.ok) nuevosErrores.correo = errCorreo.mensaje;
    if (!errPass.ok) nuevosErrores.password = errPass.mensaje;

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setFeedback({ mensaje: 'Corrige los errores indicados en el formulario.', tipo: 'error' });
      return;
    }

    setFeedback({ mensaje: '¡Sesión iniciada correctamente! Redirigiendo...', tipo: 'exito' });
    setTimeout(() => {
      navigate('/');
    }, 1200);
  };

  return (
    <div className="auth">
      <div className="contenedor">
        <nav className="breadcrumb" aria-label="Ruta de navegación">
          <ol className="breadcrumb__lista">
            <li className="breadcrumb__item">
              <Link className="breadcrumb__enlace" to="/">Inicio</Link>
            </li>
            <li className="breadcrumb__item breadcrumb__item--actual" aria-current="page">
              Iniciar Sesión
            </li>
          </ol>
        </nav>

        <article className="auth__card">
          <h1 className="auth__titulo">Iniciar Sesión</h1>

          {feedback.mensaje && (
            <div className={`formulario__feedback formulario__feedback--${feedback.tipo}`} style={{ marginBottom: '1rem' }}>
              {feedback.mensaje}
            </div>
          )}

          <form className="formulario" onSubmit={handleSubmit} noValidate>
            <div className={`campo ${errores.correo ? 'campo--error' : ''}`}>
              <label htmlFor="correo" className="campo__label">
                Correo Electrónico <span className="campo__requerido">*</span>
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                className="campo__input"
                placeholder="ejemplo@duoc.cl"
                value={form.correo}
                onChange={handleChange}
              />
              {errores.correo && <span className="campo__error">{errores.correo}</span>}
            </div>

            <div className={`campo ${errores.password ? 'campo--error' : ''}`}>
              <label htmlFor="password" className="campo__label">
                Contraseña <span className="campo__requerido">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="campo__input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
              {errores.password && <span className="campo__error">{errores.password}</span>}
            </div>

            <button type="submit" className="boton boton--primario boton--bloque">
              Ingresar
            </button>
          </form>

          <p className="auth__alternativa">
            ¿No tienes una cuenta aún?{' '}
            <Link to="/registro" className="auth__enlace">
              Regístrate aquí
            </Link>
          </p>
        </article>
      </div>
    </div>
  );
};