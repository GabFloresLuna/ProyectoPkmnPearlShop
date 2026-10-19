import { Link } from 'react-router-dom';
import useTituloDocumento from '../hooks/useTituloDocumento.js';
import FormularioRegistro from '../components/forms/FormularioRegistro.jsx';

export default function Registro() {
  useTituloDocumento('Crear cuenta');
  return (
    <>
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <div className="contenedor">
              <ol className="breadcrumb__lista">
                <li className="breadcrumb__item">
                  <Link className="breadcrumb__enlace" to="/">Inicio</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--actual" aria-current="page">
                  Crear cuenta
                </li>
              </ol>
            </div>
          </nav>
          <section className="page-hero page-hero--auth" aria-labelledby="registro-titulo">
            <div className="contenedor page-hero__inner">
              <svg className="page-hero__logo" width="72" height="72" viewBox="0 0 100 100" role="img" aria-hidden="true" focusable="false">
                <defs>
                  <radialGradient id="pearlGradRegistro" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#D63384" />
                    <stop offset="100%" stopColor="#4A148C" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#pearlGradRegistro)" stroke="#FFC107" strokeWidth="3" />
                <ellipse cx="35" cy="35" rx="10" ry="6" fill="#FFFFFF" opacity="0.6" />
              </svg>
              <p className="page-hero__eyebrow">Únete a la comunidad</p>
              <h1 className="page-hero__titulo" id="registro-titulo">Crear cuenta</h1>
              <p className="page-hero__descripcion">
                Regístrate para guardar tu carrito, seguir tus pedidos y acceder
                a lanzamientos exclusivos de la colección Pearl.
              </p>
            </div>
          </section>
          <section className="auth" aria-labelledby="form-registro-titulo">
            <div className="contenedor contenedor--estrecho">
              <div className="auth__card">
                <h2 className="auth__titulo" id="form-registro-titulo">Registro de usuario</h2>
                <FormularioRegistro />
              </div>
            </div>
          </section>
    </>
  );
}
