import { createContext, useContext, useEffect, useState } from 'react';
import { usuariosDB } from '../data/db.js';
import { precioFinal } from '../utils.js';

const AppContext = createContext(null);
const MAX_POR_ITEM = 10;

const cargar = (clave, defecto) => {
  try {
    return JSON.parse(localStorage.getItem(clave)) ?? defecto;
  } catch {
    return defecto;
  }
};

/**
 * Estado compartido de toda la app: el carrito (lo leen el header, el carrito y las tarjetas)
 * y la sesión del usuario. Ambos se guardan en localStorage.
 */
export function AppProvider({ children }) {
  const [carrito, setCarrito] = useState(() => cargar('poketienda-carrito', []));
  const [usuario, setUsuario] = useState(() => cargar('poketienda-sesion', null));

  useEffect(() => localStorage.setItem('poketienda-carrito', JSON.stringify(carrito)), [carrito]);
  useEffect(() => localStorage.setItem('poketienda-sesion', JSON.stringify(usuario)), [usuario]);

  /* ---- carrito ---- */
  const agregar = (producto, cantidad = 1) =>
    setCarrito((c) =>
      c.some((i) => i.id === producto.id)
        ? c.map((i) => (i.id === producto.id ? { ...i, cantidad: Math.min(MAX_POR_ITEM, i.cantidad + cantidad) } : i))
        : [...c, { id: producto.id, nombre: producto.nombre, img: producto.img, precio: precioFinal(producto), cantidad }]
    );
  const cambiarCantidad = (id, delta) =>
    setCarrito((c) => c.map((i) => (i.id === id ? { ...i, cantidad: Math.min(MAX_POR_ITEM, Math.max(1, i.cantidad + delta)) } : i)));
  const quitar = (id) => setCarrito((c) => c.filter((i) => i.id !== id));
  const vaciar = () => setCarrito([]);

  /* ---- sesión ---- */
  const abrirSesion = (u) => {
    const sesion = { id: u.id, nombre: u.nombre, correo: u.correo, tipo: u.tipo };
    setUsuario(sesion);
    return sesion;
  };
  /** Devuelve el usuario si las credenciales son correctas, o null. */
  const iniciarSesion = (correo, password) => {
    const u = usuariosDB.listar().find((x) => x.correo.toLowerCase() === correo.toLowerCase() && x.password === password);
    return u ? abrirSesion(u) : null;
  };
  /** Crea un cliente. Devuelve un mensaje de error, o '' si todo salió bien. */
  const registrar = ({ nombre, correo, password }) => {
    if (usuariosDB.listar().some((x) => x.correo.toLowerCase() === correo.toLowerCase())) return 'Ya existe una cuenta con ese correo.';
    abrirSesion(usuariosDB.crear({ nombre, correo: correo.toLowerCase(), password, tipo: 'Cliente' }));
    return '';
  };
  const cerrarSesion = () => setUsuario(null);

  /* ---- valores derivados: se calculan, no se guardan ---- */
  const cantidad = carrito.reduce((s, i) => s + i.cantidad, 0);
  const total = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);

  const valor = { carrito, cantidad, total, agregar, cambiarCantidad, quitar, vaciar, usuario, iniciarSesion, registrar, cerrarSesion };
  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>.');
  return ctx;
}
