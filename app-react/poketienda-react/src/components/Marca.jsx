import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import './Marca.css';

/** Molécula: logo + nombre de la tienda, enlazados al inicio. */
function Marca({ tamanoLogo = 40 }) {
  return (
    <Link to="/" className="logo" aria-label="PokéTienda Pearl — Ir al inicio">
      <Logo size={tamanoLogo} />
      <span className="logo__texto">PokéTienda&nbsp;Pearl</span>
    </Link>
  );
}

export default Marca;
