import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BoletaOrden from '../components/BoletaOrden.jsx';
import { ordenesDB } from '../data/db.js';
import useRepo from '../hooks/useRepo.js';
import useTituloDocumento from '../hooks/useTituloDocumento.js';

export default function CompraExitosa() {
  const { id } = useParams();
  const orden = useRepo(ordenesDB).find((o) => String(o.id) === id);
  const [enviada, setEnviada] = useState(false);
  useTituloDocumento(orden ? `Compra #${orden.id}` : 'Compra no encontrada');

  if (!orden) {
    return (
      <section className="contenedor" style={{ padding: '3rem 1rem' }}>
        <h1>Compra no encontrada</h1>
        <Link className="boton boton--primario" to="/productos">Volver a la tienda</Link>
      </section>
    );
  }

  return (
    <section className="contenedor" style={{ padding: '2rem 1rem 3rem' }} aria-labelledby="exito-titulo">
      <h1 id="exito-titulo">✔ Se ha realizado la compra. nro #{orden.id}</h1>
      <p className="texto-sec">Código orden: ORDER{orden.id}</p>
      <BoletaOrden orden={orden} />
      <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
        <button type="button" className="boton boton--secundario" onClick={() => window.print()}>Imprimir boleta en PDF</button>
        <button type="button" className="boton boton--exito" onClick={() => setEnviada(true)}>Enviar boleta por email</button>
        <Link className="boton boton--primario" to="/productos">Seguir comprando</Link>
      </div>
      {enviada && <p className="formulario__feedback formulario__feedback--exito mt-3" style={{ display: 'block' }} role="status">Boleta enviada a {orden.cliente.correo}.</p>}
    </section>
  );
}
