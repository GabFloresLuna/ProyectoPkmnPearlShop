import CardProducto from './CardProducto.jsx';

/** Organismo: grilla de tarjetas. Renderiza un CardProducto por cada producto de la lista. */
function GrillaProductos({ productos, onAgregar, mensajeVacio = 'No hay productos para mostrar.', relacionados = false }) {
  if (productos.length === 0) {
    return <p className="aviso aviso--info" role="status">{mensajeVacio}</p>;
  }
  return (
    <div className={relacionados ? 'grid-productos grid-productos--relacionados' : 'grid-productos'} aria-live="polite">
      {productos.map((p) => (
        <CardProducto key={p.id} producto={p} onAgregar={onAgregar} />
      ))}
    </div>
  );
}

export default GrillaProductos;
