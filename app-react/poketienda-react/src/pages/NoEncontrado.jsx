import { Link } from 'react-router-dom';
import useTituloDocumento from '../hooks/useTituloDocumento.js';

export default function NoEncontrado() {
  useTituloDocumento('Página no encontrada');
  return (
    <section className="contenedor" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1>404 · Página no encontrada</h1>
      <p>La página que buscas no existe o fue movida.</p>
      <Link className="boton boton--primario" to="/">Volver al inicio</Link>
    </section>
  );
}
