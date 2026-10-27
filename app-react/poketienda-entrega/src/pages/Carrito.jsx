import { useState } from 'react';
import { Link } from 'react-router-dom';
import Campo from '../components/Campo.jsx';
import { useApp } from '../context/AppContext.jsx';
import { pedidosDB, productosDB } from '../data/db.js';
import { V, formatoCLP } from '../utils.js';

/** Carrito + pago: lista los productos, calcula el total y registra el pedido (aprobado o rechazado). */
export default function Carrito() {
  const { carrito, total, cambiarCantidad, quitar, vaciar } = useApp();
  const [datos, setDatos] = useState({ nombre: '', direccion: '', pago: 'aprobado' });
  const [errores, setErrores] = useState({});
  const [resultado, setResultado] = useState(null);

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const pagar = (e) => {
    e.preventDefault();
    const nuevos = { nombre: V.requerido(datos.nombre, 'El nombre'), direccion: V.requerido(datos.direccion, 'La dirección') };
    setErrores(nuevos);
    if (nuevos.nombre || nuevos.direccion) return;

    const aprobado = datos.pago === 'aprobado';
    const orden = pedidosDB.crear({
      fecha: new Date().toISOString(),
      cliente: datos.nombre,
      direccion: datos.direccion,
      items: carrito,
      total,
      estado: aprobado ? 'Pagada' : 'Rechazada',
    });
    if (aprobado) {
      // Descuenta el stock de cada producto comprado y vacía el carrito
      carrito.forEach((i) => {
        const p = productosDB.obtener(i.id);
        if (p) productosDB.actualizar(i.id, { stock: Math.max(0, p.stock - i.cantidad) });
      });
      vaciar();
    }
    setResultado({ aprobado, orden });
  };

  if (resultado) {
    return resultado.aprobado ? (
      <div className="alert alert-success" role="status">
        <h1 className="h4">¡Compra realizada!</h1>
        <p>Orden #{resultado.orden.id} · Total pagado: {formatoCLP(resultado.orden.total)}</p>
        <Link to="/productos" className="btn btn-pearl">Seguir comprando</Link>
      </div>
    ) : (
      <div className="alert alert-danger" role="alert">
        <h1 className="h4">No se pudo realizar el pago</h1>
        <p>Orden #{resultado.orden.id}. Tu carrito se mantiene para que lo intentes de nuevo.</p>
        <button type="button" className="btn btn-pearl" onClick={() => setResultado(null)}>Volver a realizar el pago</button>
      </div>
    );
  }

  if (carrito.length === 0) {
    return (
      <div className="text-center py-5">
        <h1>Tu carrito está vacío</h1>
        <Link to="/productos" className="btn btn-pearl">Explorar productos</Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="h2 mb-3">Mi carrito</h1>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr>
          </thead>
          <tbody>
            {carrito.map((i) => (
              <tr key={i.id}>
                <td><img src={i.img} alt="" width="48" height="48" className="rounded me-2" />{i.nombre}</td>
                <td>{formatoCLP(i.precio)}</td>
                <td>
                  <button type="button" className="btn btn-sm btn-outline-light" aria-label={`Disminuir ${i.nombre}`} onClick={() => cambiarCantidad(i.id, -1)}>−</button>
                  <span className="mx-2">{i.cantidad}</span>
                  <button type="button" className="btn btn-sm btn-outline-light" aria-label={`Aumentar ${i.nombre}`} onClick={() => cambiarCantidad(i.id, 1)}>+</button>
                </td>
                <td>{formatoCLP(i.precio * i.cantidad)}</td>
                <td><button type="button" className="btn btn-sm btn-outline-danger" onClick={() => quitar(i.id)}>Quitar</button></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr><th colSpan="3" className="text-end">Total</th><th colSpan="2">{formatoCLP(total)}</th></tr>
          </tfoot>
        </table>
      </div>

      <form className="row g-3 mt-2" onSubmit={pagar} noValidate>
        <div className="col-md-4"><Campo id="nombre" etiqueta="Nombre completo" value={datos.nombre} onChange={cambiar} error={errores.nombre} /></div>
        <div className="col-md-4"><Campo id="direccion" etiqueta="Dirección de entrega" value={datos.direccion} onChange={cambiar} error={errores.direccion} /></div>
        <div className="col-md-4">
          <Campo id="pago" etiqueta="Resultado simulado del pago" como="select" value={datos.pago} onChange={cambiar}>
            <option value="aprobado">Pago aprobado</option>
            <option value="rechazado">Pago rechazado</option>
          </Campo>
        </div>
        <div className="col-12 d-flex gap-2">
          <button type="submit" className="btn btn-pearl">Pagar {formatoCLP(total)}</button>
          <button type="button" className="btn btn-outline-light" onClick={vaciar}>Vaciar carrito</button>
        </div>
      </form>
    </>
  );
}
