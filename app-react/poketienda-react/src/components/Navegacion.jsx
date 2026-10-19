import { NavLink } from 'react-router-dom';

/** Los datos van separados de la forma de pintarlos: un solo .map() genera todos los <li>. */
export const ENLACES_PRINCIPALES = [
  { to: '/', texto: 'Inicio', fin: true },
  { to: '/productos', texto: 'Productos' },
  { to: '/categorias', texto: 'Categorías' },
  { to: '/ofertas', texto: 'Ofertas' },
  { to: '/nosotros', texto: 'Nosotros' },
  { to: '/blogs', texto: 'Blogs' },
  { to: '/contacto', texto: 'Contacto' },
];

const clase = (activo, destacado) =>
  ['nav__enlace', destacado && 'nav__enlace--destacado', activo && 'nav__enlace--activo'].filter(Boolean).join(' ');

/**
 * Molécula: menú principal.
 * Cada enlace es { to, texto, fin?, destacado? } o una acción { texto, onClick } (ej. "Cerrar sesión").
 * NavLink marca automáticamente aria-current="page" en el enlace de la ruta activa.
 */
function Navegacion({ enlaces = ENLACES_PRINCIPALES, abierto = false }) {
  return (
    <nav className="nav" id="nav-principal" aria-label="Navegación principal" data-abierto={abierto ? 'true' : 'false'}>
      <ul className="nav__lista">
        {enlaces.map((e) => (
          <li className="nav__item" key={e.to ?? e.texto}>
            {e.onClick ? (
              <button type="button" className={clase(false, e.destacado)} onClick={e.onClick}>
                {e.texto}
              </button>
            ) : (
              <NavLink to={e.to} end={e.fin} className={({ isActive }) => clase(isActive, e.destacado)}>
                {e.texto}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navegacion;
