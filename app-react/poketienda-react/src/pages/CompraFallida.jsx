import { Link, useParams } from 'react-router-dom';
import BoletaOrden from '../components/BoletaOrden.jsx';
import { ordenesDB } from '../data/db.js';
import useRepo from '../hooks/useRepo.js';
import useTituloDocumento from '../hooks/useTituloDocumento.js';

export default function CompraFallida() {
  const { id } = useParams();
  const orden = useRepo(ordenesDB).find((o) => String(o.id) === id);
  useTituloDocumento('No se pudo realizar el pago');

  return (
    <section className="contenedor" style={{ padding: '2rem 1rem 3rem' }} aria-labelledby="error-titulo">
      <h1 id="error-titulo">✖ No se pudo realizar el pago{orden ? `. nro #${orden.id}` : ''}</h1>
      <p className="texto-sec">Detalle de la compra. Tu carrito se mantiene para que puedas intentarlo nuevamente.</p>
      <div className="d-flex justify-content-center mb-4">
        <Link className="boton boton--exito" to="/checkout">VOLVER A REALIZAR EL PAGO</Link>
      </div>
      {orden && <BoletaOrden orden={orden} />}
    </section>
  );
}
