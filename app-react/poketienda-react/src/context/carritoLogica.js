// Lógica pura del carrito (sin React): migrada desde carrito.js y fácil de probar de forma aislada.
import { precioFinal } from '../utils/productos.js';

export const CLAVE_CARRITO = 'poketienda-carrito';
export const MAX_POR_ITEM = 10;
export const ENVIO_BASE = 3990;
export const ENVIO_GRATIS_DESDE = 50000;

export const CUPONES = {
  PEARL10: { tipo: 'pct', valor: 10, etiqueta: 'PEARL10 (10 % desc.)' },
  PALKIA20: { tipo: 'pct', valor: 20, etiqueta: 'PALKIA20 (20 % desc.)' },
  ENVIOGRATIS: { tipo: 'envio', valor: 0, etiqueta: 'Envío gratis' },
};

const acotar = (n) => Math.min(MAX_POR_ITEM, Math.max(1, Number(n) || 1));

export function cargarEstado() {
  try {
    const items = JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
    const cupon = JSON.parse(localStorage.getItem(CLAVE_CARRITO + ':cupon')) || null;
    return { items: Array.isArray(items) ? items : [], cupon };
  } catch {
    return { items: [], cupon: null };
  }
}

export function guardarEstado(estado) {
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(estado.items));
    if (estado.cupon) localStorage.setItem(CLAVE_CARRITO + ':cupon', JSON.stringify(estado.cupon));
    else localStorage.removeItem(CLAVE_CARRITO + ':cupon');
  } catch {
    /* sin persistencia */
  }
}

/** Reducer: toda modificación del carrito pasa por aquí. */
export function carritoReducer(estado, accion) {
  switch (accion.tipo) {
    case 'agregar': {
      const { producto } = accion;
      const cantidad = acotar(accion.cantidad ?? 1);
      const existe = estado.items.some((i) => i.id === producto.id);
      const items = existe
        ? estado.items.map((i) =>
            i.id === producto.id ? { ...i, cantidad: Math.min(MAX_POR_ITEM, i.cantidad + cantidad) } : i
          )
        : [
            ...estado.items,
            {
              id: producto.id,
              nombre: producto.nombre,
              categoria: producto.categoria,
              img: producto.img,
              precio: precioFinal(producto),
              cantidad,
            },
          ];
      return { ...estado, items };
    }
    case 'fijar':
      return {
        ...estado,
        items: estado.items.map((i) => (i.id === accion.id ? { ...i, cantidad: acotar(accion.cantidad) } : i)),
      };
    case 'quitar':
      return { ...estado, items: estado.items.filter((i) => i.id !== accion.id) };
    case 'vaciar':
      return { items: [], cupon: null };
    case 'cupon':
      return { ...estado, cupon: accion.cupon };
    default:
      return estado;
  }
}

/** Valores derivados: no se guardan, se calculan a partir de items y cupón. */
export function calcularTotales({ items, cupon }) {
  const cantidadTotal = items.reduce((s, i) => s + i.cantidad, 0);
  const subtotal = items.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const descuento = cupon && cupon.tipo === 'pct' ? Math.round((subtotal * cupon.valor) / 100) : 0;
  const base = subtotal - descuento;
  const envio = items.length === 0 ? 0 : cupon?.tipo === 'envio' || base >= ENVIO_GRATIS_DESDE ? 0 : ENVIO_BASE;
  return { cantidadTotal, subtotal, descuento, envio, total: base + envio };
}

/** Busca un cupón por código (sin distinguir mayúsculas). */
export function buscarCupon(codigoCrudo) {
  const codigo = String(codigoCrudo || '').trim().toUpperCase();
  const cupon = CUPONES[codigo];
  return cupon ? { codigo, ...cupon } : null;
}
