import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CLAVE_CARRITO = 'poketienda-carrito';
const CLAVE_CUPON = 'poketienda-carrito:cupon';

const CUPONES = {
  PEARL10: { tipo: 'pct', valor: 10, etiqueta: 'PEARL10 (10 % desc.)' },
  PALKIA20: { tipo: 'pct', valor: 20, etiqueta: 'PALKIA20 (20 % desc.)' },
  ENVIOGRATIS: { tipo: 'envio', valor: 0, etiqueta: 'Envío gratis' },
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
    } catch {
      return [];
    }
  });

  const [cupon, setCupon] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CLAVE_CUPON)) || null;
    } catch {
      return null;
    }
  });

  const [feedback, setFeedback] = useState({ mensaje: '', tipo: 'info', visible: false });

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (cupon) {
      localStorage.setItem(CLAVE_CUPON, JSON.stringify(cupon));
    } else {
      localStorage.removeItem(CLAVE_CUPON);
    }
  }, [cupon]);

  const mostrarFeedback = (mensaje, tipo = 'info') => {
    setFeedback({ mensaje, tipo, visible: true });
    if (tipo !== 'error') {
      setTimeout(() => {
        setFeedback((prev) => ({ ...prev, visible: false }));
      }, 4000);
    }
  };

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === producto.id);
      if (idx >= 0) {
        const copia = [...prev];
        copia[idx].cantidad += cantidad;
        return copia;
      }
      return [...prev, { id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad }];
    });
    mostrarFeedback(`"${producto.nombre}" se añadió al carrito.`, 'exito');
  };

  const cambiarCantidad = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nuevaCantidad = Math.max(1, item.cantidad + delta);
          return { ...item, cantidad: nuevaCantidad };
        }
        return item;
      })
    );
  };

  const eliminarDelCarrito = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCart([]);
    setCupon(null);
    mostrarFeedback('Carrito vaciado.', 'info');
  };

  const aplicarCupon = (codigoRaw) => {
    const codigo = (codigoRaw || '').trim().toUpperCase();
    const cuponEncontrado = CUPONES[codigo];

    if (!cuponEncontrado) {
      mostrarFeedback('Cupón inválido o expirado.', 'error');
      return false;
    }

    setCupon({ codigo, ...cuponEncontrado });
    mostrarFeedback(`Cupón ${codigo} aplicado.`, 'exito');
    return true;
  };

  const removerCupon = () => {
    setCupon(null);
    mostrarFeedback('Cupón removido.', 'info');
  };

  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const descuento = cupon && cupon.tipo === 'pct' ? Math.round((subtotal * cupon.valor) / 100) : 0;
  const total = subtotal - descuento;
  const cantidadTotalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cupon,
        feedback,
        subtotal,
        descuento,
        total,
        cantidadTotalItems,
        agregarAlCarrito,
        cambiarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        aplicarCupon,
        removerCupon,
        mostrarFeedback,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);