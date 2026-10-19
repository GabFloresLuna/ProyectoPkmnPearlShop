import { Link } from 'react-router-dom';
import useTituloDocumento from '../hooks/useTituloDocumento.js';
import FormularioLogin from '../components/forms/FormularioLogin.jsx';

export default function Login() {
  useTituloDocumento('Iniciar sesión');
  return (
    <>
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <div className="contenedor">
              <ol className="breadcrumb__lista">
                <li className="breadcrumb__item">
                  <Link className="breadcrumb__enlace" to="/">Inicio</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--actual" aria-current="page">
                  Iniciar sesión
                </li>
              </ol>
            </div>
          </nav>
          <section className="page-hero page-hero--auth" aria-labelledby="login-titulo">
            <div className="contenedor page-hero__inner">
              <svg className="page-hero__logo" width="72" height="72" viewBox="0 0 100 100" role="img" aria-hidden="true" focusable="false">
                <defs>
                  <radialGradient id="pearlGradLogin" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#D63384" />
                    <stop offset="100%" stopColor="#4A148C" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#pearlGradLogin)" stroke="#FFC107" strokeWidth="3" />
                <ellipse cx="35" cy="35" rx="10" ry="6" fill="#FFFFFF" opacity="0.6" />
              </svg>
              <p className="page-hero__marca">PokéTienda&nbsp;Pearl</p>
              <p className="page-hero__eyebrow">Bienvenido de vuelta</p>
              <h1 className="page-hero__titulo" id="login-titulo">Iniciar sesión</h1>
              <p className="page-hero__descripcion">
                Accede a tu cuenta para revisar tus pedidos, gestionar tu carrito
                y continuar con tu colección de Sinnoh.
              </p>
            </div>
          </section>
          <section className="auth" aria-labelledby="form-login-titulo">
            <div className="contenedor contenedor--estrecho">
              <div className="auth__card">
                <h2 className="auth__titulo" id="form-login-titulo">Inicio de sesión</h2>
                <FormularioLogin />
              </div>
              <aside className="auth__beneficios" aria-labelledby="beneficios-login-titulo">
                <h2 className="visually-hidden" id="beneficios-login-titulo">Beneficios de tener una cuenta</h2>
                <ul className="auth__beneficios-lista">
                  <li className="auth__beneficio">
                    <span className="auth__beneficio-icono" aria-hidden="true">✦</span>
                    <span>Sigue el estado de tus pedidos en tiempo real.</span>
                  </li>
                  <li className="auth__beneficio">
                    <span className="auth__beneficio-icono" aria-hidden="true">✦</span>
                    <span>Guarda tus productos favoritos para después.</span>
                  </li>
                  <li className="auth__beneficio">
                    <span className="auth__beneficio-icono" aria-hidden="true">✦</span>
                    <span>Accede a lanzamientos exclusivos Edición Perla.</span>
                  </li>
                </ul>
              </aside>
            </div>
          </section>
    </>
  );
}
