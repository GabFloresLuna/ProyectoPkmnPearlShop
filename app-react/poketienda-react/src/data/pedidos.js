// Operaciones de negocio sobre pedidos: crean la orden y descuentan stock (todo persistido en db.js).
import { ordenesDB, productosDB } from './db.js';

/**
 * Registra un pedido. Si el pago fue aprobado, descuenta el stock de cada producto.
 * @returns la orden creada (con id numérico autogenerado)
 */
export function registrarPedido({ cliente, direccion, items, totales, cupon = null, aprobado, usuarioId = null }) {
  const orden = ordenesDB.crear({
    fecha: new Date().toISOString(),
    cliente: { usuarioId, ...cliente },
    direccion,
    items: items.map(({ id, nombre, categoria, precio, cantidad }) => ({ id, nombre, categoria, precio, cantidad })),
    subtotal: totales.subtotal,
    descuento: totales.descuento,
    envio: totales.envio,
    total: totales.total,
    cupon: cupon ? cupon.codigo : null,
    estado: aprobado ? 'Pagada' : 'Rechazada',
  });
  if (aprobado) {
    items.forEach((it) => {
      const p = productosDB.obtener(it.id);
      if (p) productosDB.actualizar(it.id, { stock: Math.max(0, Number(p.stock) - it.cantidad) });
    });
  }
  return orden;
}

/** Órdenes de un usuario (por id de usuario o, en su defecto, por correo). */
export const ordenesDeUsuario = (usuario) =>
  ordenesDB
    .listar()
    .filter((o) => o.cliente.usuarioId === usuario.id || o.cliente.correo?.toLowerCase() === usuario.correo.toLowerCase());
