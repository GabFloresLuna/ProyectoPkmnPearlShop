import { Link } from 'react-router-dom';

/** Miga de pan. `ruta` = [{ texto, to? }]; el último elemento es la página actual. */
function Breadcrumb({ ruta }) {
  return (
    <nav className="breadcrumb" aria-label="Ruta de navegación">
      <div className="contenedor">
        <ol className="breadcrumb__lista">
          {ruta.map((paso, i) => {
            const actual = i === ruta.length - 1;
            return (
              <li key={paso.texto} className={actual ? 'breadcrumb__item breadcrumb__item--actual' : 'breadcrumb__item'}
                  aria-current={actual ? 'page' : undefined}>
                {actual || !paso.to ? paso.texto : <Link className="breadcrumb__enlace" to={paso.to}>{paso.texto}</Link>}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

export default Breadcrumb;
