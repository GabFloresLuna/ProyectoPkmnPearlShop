import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { buscarCupon, calcularTotales, cargarEstado, carritoReducer, guardarEstado } from './carritoLogica.js';

const CarritoContext = createContext(null);

/**
 * Estado compartido del carrito: lo leen el header (contador), el carrito, el checkout y las tarjetas de producto.
 * Es la solución React al "evento carrito:actualizado" + localStorage del carrito.js original.
 */
export function CarritoProvider({ children }) {
  const [estado, dispatch] = useReducer(carritoReducer, undefined, cargarEstado);

  useEffect(() => {
    guardarEstado(estado);
  }, [estado]);

  const valor = useMemo(
    () => ({
      items: estado.items,
      cupon: estado.cupon,
      ...calcularTotales(estado),
      agregar: (producto, cantidad = 1) => dispatch({ tipo: 'agregar', producto, cantidad }),
      fijarCantidad: (id, cantidad) => dispatch({ tipo: 'fijar', id, cantidad }),
      cambiarCantidad: (id, delta) => {
        const item = estado.items.find((i) => i.id === id);
        if (item) dispatch({ tipo: 'fijar', id, cantidad: item.cantidad + delta });
      },
      quitar: (id) => dispatch({ tipo: 'quitar', id }),
      vaciar: () => dispatch({ tipo: 'vaciar' }),
      aplicarCupon: (codigo) => {
        const cupon = buscarCupon(codigo);
        if (!cupon) return { ok: false, mensaje: 'El cupón ingresado no es válido.' };
        dispatch({ tipo: 'cupon', cupon });
        return { ok: true, mensaje: `Cupón ${cupon.codigo} aplicado.` };
      },
      quitarCupon: () => dispatch({ tipo: 'cupon', cupon: null }),
    }),
    [estado]
  );

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>.');
  return ctx;
}
