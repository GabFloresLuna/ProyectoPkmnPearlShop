import { useState } from 'react';
import { Link } from 'react-router-dom';

const sinPassword = (clave, valor) => (clave === 'password' ? undefined : valor);

/**
 * Organismo reutilizable de los mantenedores del admin: título + botón "Nuevo" + buscador + tabla.
 * Cada pantalla solo declara sus columnas y acciones (única responsabilidad: mostrar una lista).
 */
function Mantenedor({ titulo, descripcion, filas, columnas, claveFila = 'id', acciones, nuevo, buscar = true, vacio = 'No hay registros.' }) {
  const [q, setQ] = useState('');
  const texto = q.trim().toLowerCase();
  const visibles = texto ? filas.filter((f) => JSON.stringify(f, sinPassword).toLowerCase().includes(texto)) : filas;

  return (
    <section aria-labelledby="mantenedor-titulo">
      <div className="mantenedor__cabecera">
        <h2 className="mantenedor__titulo" id="mantenedor-titulo">
          {titulo}<span className="mantenedor__contador">({visibles.length})</span>
        </h2>
        {nuevo && <Link className="boton boton--primario" to={nuevo.to}>{nuevo.texto}</Link>}
      </div>
      {descripcion && <p className="texto-sec">{descripcion}</p>}

      {buscar && (
        <div className="admin-toolbar">
          <div className="admin-toolbar__grupo">
            <label className="visually-hidden" htmlFor="buscador-admin">Buscar en la tabla</label>
            <input className="campo__input" type="search" id="buscador-admin" placeholder="Buscar…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
      )}

      <div className="tabla__scroll">
        <table className="tabla--admin">
          <thead>
            <tr>
              {columnas.map((c) => <th key={c.titulo} scope="col">{c.titulo}</th>)}
              {acciones && <th scope="col"><span className="visually-hidden">Acciones</span></th>}
            </tr>
          </thead>
          <tbody>
            {visibles.length === 0 ? (
              <tr><td colSpan={columnas.length + (acciones ? 1 : 0)}>{vacio}</td></tr>
            ) : (
              visibles.map((fila) => (
                <tr key={fila[claveFila]}>
                  {columnas.map((c) => <td key={c.titulo}>{c.render(fila)}</td>)}
                  {acciones && <td><div className="tabla--admin__acciones">{acciones(fila)}</div></td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Mantenedor;
