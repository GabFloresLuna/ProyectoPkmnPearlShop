import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { V } from '../utils/validaciones';
import { REGIONES_COMUNAS } from '../data/regionesComunas';

export const RegistroPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    confirmarPassword: '',
    region: '',
    comuna: '',
  });

  const [errores, setErrores] = useState({});
  const [feedback, setFeedback] = useState({ mensaje: '', tipo: '' });

  const comunasDisponibles = form.region ? REGIONES_COMUNAS[form.region] || [] : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const nuevoState = { ...prev, [name]: value };
      if (name === 'region') {
        nuevoState.comuna = '';
      }
      return nuevoState;
    });

    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validaciones = {
      run: V.run(form.run),
      nombre: V.requerido(form.nombre, 'El nombre'),
      apellidos: V.requerido(form.apellidos, 'Los apellidos'),
      correo: V.email(form.correo),
      password: V.password(form.password),
      confirmarPassword: V.coincide(form.password, form.confirmarPassword, 'Las contraseñas'),
      region: V.requerido(form.region, 'La región'),
      comuna: V.requerido(form.comuna, 'La comuna'),
    };

    const nuevosErrores = {};
    Object.keys(validaciones).forEach((key) => {
      if (!validaciones[key].ok) {
        nuevosErrores[key] = validaciones[key].mensaje;
      }
    });

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setFeedback({ mensaje: 'Por favor, corrige los campos destacados.', tipo: 'error' });
      return;
    }

    setFeedback({ mensaje: '¡Registro exitoso! Ya puedes iniciar sesión.', tipo: 'exito' });
    setTimeout(() => {
      navigate('/login');
    }, 1500);
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
              Registro de Usuario
            </li>
          </ol>
        </nav>

        <article className="auth__card" style={{ maxWidth: '640px' }}>
          <h1 className="auth__titulo">Crear Cuenta</h1>

          {feedback.mensaje && (
            <div className={`formulario__feedback formulario__feedback--${feedback.tipo}`} style={{ marginBottom: '1rem' }}>
              {feedback.mensaje}
            </div>
          )}

          <form className="formulario" onSubmit={handleSubmit} noValidate>
            <div className={`campo ${errores.run ? 'campo--error' : ''}`}>
              <label htmlFor="run" className="campo__label">
                RUN (sin puntos ni guion) <span className="campo__requerido">*</span>
              </label>
              <input
                type="text"
                id="run"
                name="run"
                className="campo__input"
                placeholder="12345678K"
                value={form.run}
                onChange={handleChange}
              />
              {errores.run && <span className="campo__error">{errores.run}</span>}
            </div>

            <div className="campo--doble">
              <div className={`campo ${errores.nombre ? 'campo--error' : ''}`}>
                <label htmlFor="nombre" className="campo__label">Nombre <span className="campo__requerido">*</span></label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="campo__input"
                  value={form.nombre}
                  onChange={handleChange}
                />
                {errores.nombre && <span className="campo__error">{errores.nombre}</span>}
              </div>

              <div className={`campo ${errores.apellidos ? 'campo--error' : ''}`}>
                <label htmlFor="apellidos" className="campo__label">Apellidos <span className="campo__requerido">*</span></label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  className="campo__input"
                  value={form.apellidos}
                  onChange={handleChange}
                />
                {errores.apellidos && <span className="campo__error">{errores.apellidos}</span>}
              </div>
            </div>

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

            <div className="campo--doble">
              <div className={`campo ${errores.password ? 'campo--error' : ''}`}>
                <label htmlFor="password" className="campo__label">Contraseña <span className="campo__requerido">*</span></label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="campo__input"
                  value={form.password}
                  onChange={handleChange}
                />
                {errores.password && <span className="campo__error">{errores.password}</span>}
              </div>

              <div className={`campo ${errores.confirmarPassword ? 'campo--error' : ''}`}>
                <label htmlFor="confirmarPassword" className="campo__label">Confirmar Contraseña <span className="campo__requerido">*</span></label>
                <input
                  type="password"
                  id="confirmarPassword"
                  name="confirmarPassword"
                  className="campo__input"
                  value={form.confirmarPassword}
                  onChange={handleChange}
                />
                {errores.confirmarPassword && <span className="campo__error">{errores.confirmarPassword}</span>}
              </div>
            </div>

            <div className="campo--doble">
              <div className={`campo ${errores.region ? 'campo--error' : ''}`}>
                <label htmlFor="region" className="campo__label">Región <span className="campo__requerido">*</span></label>
                <select id="region" name="region" className="campo__select" value={form.region} onChange={handleChange}>
                  <option value="">Selecciona una región</option>
                  {Object.keys(REGIONES_COMUNAS).map((reg) => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
                {errores.region && <span className="campo__error">{errores.region}</span>}
              </div>

              <div className={`campo ${errores.comuna ? 'campo--error' : ''}`}>
                <label htmlFor="comuna" className="campo__label">Comuna <span className="campo__requerido">*</span></label>
                <select id="comuna" name="comuna" className="campo__select" value={form.comuna} onChange={handleChange} disabled={!form.region}>
                  <option value="">Selecciona una comuna</option>
                  {comunasDisponibles.map((com) => (
                    <option key={com} value={com}>{com}</option>
                  ))}
                </select>
                {errores.comuna && <span className="campo__error">{errores.comuna}</span>}
              </div>
            </div>

            <button type="submit" className="boton boton--primario boton--bloque">
              Registrarme
            </button>
          </form>

          <p className="auth__alternativa">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="auth__enlace">
              Inicia sesión aquí
            </Link>
          </p>
        </article>
      </div>
    </div>
  );
};