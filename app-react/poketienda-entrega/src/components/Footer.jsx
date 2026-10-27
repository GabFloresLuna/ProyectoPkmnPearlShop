import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="pie-de-pagina border-top py-4 mt-5">
      <div className="contenido-pie container d-flex flex-column flex-md-row justify-content-between gap-2">
        <span>© 2025 PokéTienda Pearl · Proyecto académico DSY1104 · «Atrapa lo legendario»</span>
        <span>
          <Link to="/contacto">contacto@poketiendapearl.cl</Link> · Av. Sinnoh 1420, Santiago
        </span>
      </div>
    </footer>
  );
}
