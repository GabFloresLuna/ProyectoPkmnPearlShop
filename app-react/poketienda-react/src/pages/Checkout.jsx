import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';
import Campo from '../components/Campo.jsx';
import CamposRegionComuna from '../components/CamposRegionComuna.jsx';
import Feedback from '../components/forms/Feedback.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCarrito } from '../context/CarritoContext.jsx';
import { registrarPedido } from '../data/pedidos.js';
import useFormulario from '../hooks/useFormulario.js';
import useTituloDocumento from '../hooks/useTituloDocumento.js';
import { formatoCLP } from '../utils/formato.js';
import { V } from '../utils/validaciones.js';

const REGLAS = {
  nombre: (v) => [V.requerido(v, 'El nombre'), V.maxLen(v, 50, 'El nombre'), V.letras(v, 'El nombre')],
  apellidos: (v) => [V.requerido(v, 'Los apellidos'), V.maxLen(v, 100, 'Los apellidos'), V.letras(v, 'Los apellidos')],
  correo: (v) => [V.email(v), V.maxLen(v, 100, 'El correo')],
  calle: (v) => [V.requerido(v, 'La calle'), V.maxLen(v, 300, 'La calle')],
  departamento: (v) => [V.maxLen(v, 20, 'El departamento')],
  region: (v) => [V.requerido(v, 'La región')],
  comuna: (v) => [V.requerido(v, 'La comuna')],
  indicaciones: (v) => [V.maxLen(v, 300, 'Las indicaciones')],
};

/** Paso de pago: datos del cliente + dirección de entrega. Si hay sesión iniciada se precargan automáticamente. */
export default function Checkout() {
  useTituloDocumento('Checkout');
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const { items, cupon, subtotal, descuento, envio, total, vaciar } = useCarrito();
  const [feedback, setFeedback] = useState(null);

  const f = useFormulario(
    {
      nombre: usuario?.nombre ?? '', apellidos: usuario?.apellidos ?? '', correo: usuario?.correo ?? '',
      calle: usuario?.direccion ?? '', departamento: '', region: usuario?.region ?? '', comuna: usuario?.comuna ?? '',
      indicaciones: '', resultadoPago: 'aprobado',
    },
    REGLAS
  );
  const { valores, errores, alCambiar, alSalir } = f;
  const comunes = { alCambiar, alSalir };

  if (items.length === 0) {
    return (
      <section className="contenedor" style={{ padding: '3rem 1rem' }}>
        <h1>Tu carrito está vacío</h1>
        <p>Agrega productos antes de continuar con el pago.</p>
        <Link className="boton boton--primario" to="/productos">Explorar productos</Link>
      </section>
    );
  }

  const pagar = (e) => {
    e.preventDefault();
    if (!f.validarTodo()) {
      setFeedback({ tipo: 'error', texto: 'Corrige los campos marcados.' });
      return;
    }
    const aprobado = valores.resultadoPago === 'aprobado';
    const orden = registrarPedido({
      cliente: { nombre: valores.nombre, apellidos: valores.apellidos, correo: valores.correo },
      direccion: {
        calle: valores.calle, departamento: valores.departamento, region: valores.region,
        comuna: valores.comuna, indicaciones: valores.indicaciones,
      },
      items, cupon, totales: { subtotal, descuento, envio, total }, aprobado, usuarioId: usuario?.id ?? null,
    });
    if (aprobado) {
      vaciar();
      navigate(`/compra/exito/${orden.id}`, { replace: true });
    } else {
      navigate(`/compra/error/${orden.id}`, { replace: true });
    }
  };

  return (
    <>
      <Breadcrumb ruta={[{ texto: 'Inicio', to: '/' }, { texto: 'Carrito', to: '/carrito' }, { texto: 'Checkout' }]} />
      <section className="contenedor" style={{ padding: '2rem 1rem 3rem' }} aria-labelledby="checkout-titulo">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div>
            <h1 id="checkout-titulo" className="mb-1">Carrito de compra</h1>
            <p className="mb-0 texto-sec">Completa la siguiente información</p>
          </div>
          <span className="badge badge--primario checkout__total">Total a pagar: {formatoCLP(total)}</span>
        </div>

        <div className="tabla__scroll mb-4">
          <table className="tabla--admin">
            <thead><tr><th>Imagen</th><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id}>
                  <td><img src={i.img} alt="" width="48" height="48" style={{ borderRadius: 6 }} /></td>
                  <td>{i.nombre}</td>
                  <td>{formatoCLP(i.precio)}</td>
                  <td>{i.cantidad}</td>
                  <td>{formatoCLP(i.precio * i.cantidad)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form className="formulario" onSubmit={pagar} noValidate>
          <h2>Información del cliente</h2>
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <Campo id="nombre" etiqueta="Nombre" requerido valor={valores.nombre} error={errores.nombre} maxLength={50} {...comunes} />
            </div>
            <div className="col-12 col-md-6">
              <Campo id="apellidos" etiqueta="Apellidos" requerido valor={valores.apellidos} error={errores.apellidos} maxLength={100} {...comunes} />
            </div>
            <div className="col-12">
              <Campo id="correo" etiqueta="Correo" requerido tipo="email" valor={valores.correo} error={errores.correo} maxLength={100} {...comunes} />
            </div>
          </div>

          <h2>Dirección de entrega de los productos</h2>
          <p className="texto-sec">Ingrese dirección de forma detallada</p>
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <Campo id="calle" etiqueta="Calle" requerido valor={valores.calle} error={errores.calle} maxLength={300} {...comunes} />
            </div>
            <div className="col-12 col-md-6">
              <Campo id="departamento" etiqueta="Departamento" opcional placeholder="Ej: 603" valor={valores.departamento}
                     error={errores.departamento} maxLength={20} {...comunes} />
            </div>
            <CamposRegionComuna columna="col-12 col-md-6" prefijo="" valores={valores} errores={errores} alCambiar={alCambiar} alSalir={alSalir} setValor={f.setValor} />
            <div className="col-12">
              <Campo id="indicaciones" etiqueta="Indicaciones para la entrega" opcional componente="textarea" rows={3} maxLength={300}
                     placeholder="Ej.: Entre calles, color del edificio, no tiene timbre." valor={valores.indicaciones}
                     error={errores.indicaciones} contador={300} {...comunes} />
            </div>
          </div>

          <h2>Pago</h2>
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <Campo id="resultadoPago" etiqueta="Resultado simulado de la pasarela" componente="select" valor={valores.resultadoPago}
                     ayuda="Solo para demostración: permite probar el flujo de pago correcto y el pago con error." {...comunes}>
                <option value="aprobado">Pago aprobado</option>
                <option value="rechazado">Pago rechazado</option>
              </Campo>
            </div>
          </div>

          <Feedback feedback={feedback} />
          <div className="d-flex justify-content-end">
            <button type="submit" className="boton boton--exito">Pagar ahora {formatoCLP(total)}</button>
          </div>
        </form>
      </section>
    </>
  );
}
