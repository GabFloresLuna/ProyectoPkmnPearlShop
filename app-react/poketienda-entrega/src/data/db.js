/**
 * db.js — Fuente de datos simulada ("base de datos" del frontend).
 * Cada colección es un repositorio con CRUD: listar, obtener, crear, actualizar y eliminar.
 * Los datos se guardan en localStorage, así que sobreviven a recargar la página.
 */
const PREFIJO = 'poketienda:';

function leer(nombre, semilla) {
  try {
    const crudo = localStorage.getItem(PREFIJO + nombre);
    if (crudo) return JSON.parse(crudo);
  } catch {
    /* datos corruptos: se parte desde la semilla */
  }
  guardar(nombre, semilla);
  return JSON.parse(JSON.stringify(semilla));
}

function guardar(nombre, lista) {
  try {
    localStorage.setItem(PREFIJO + nombre, JSON.stringify(lista));
  } catch {
    /* sin persistencia */
  }
}

/** Genera el siguiente id: P009 si los anteriores eran P001..P008, o un número si eran numéricos. */
function siguienteId(lista) {
  const prefijo = String(lista[0]?.id ?? '').replace(/\d/g, '');
  const mayor = Math.max(0, ...lista.map((x) => parseInt(String(x.id).replace(/\D/g, ''), 10) || 0));
  return prefijo ? prefijo + String(mayor + 1).padStart(3, '0') : mayor + 1;
}

export function crearRepo(nombre, semilla = []) {
  return {
    listar: () => leer(nombre, semilla),

    obtener: (id) => leer(nombre, semilla).find((x) => String(x.id) === String(id)) ?? null,

    crear(datos) {
      const lista = leer(nombre, semilla);
      const id = datos.id ?? siguienteId(lista);
      if (lista.some((x) => String(x.id) === String(id))) throw new Error(`Ya existe un registro con id ${id}.`);
      const nuevo = { ...datos, id };
      guardar(nombre, [...lista, nuevo]);
      return nuevo;
    },

    actualizar(id, cambios) {
      const lista = leer(nombre, semilla);
      const i = lista.findIndex((x) => String(x.id) === String(id));
      if (i < 0) return null;
      lista[i] = { ...lista[i], ...cambios, id: lista[i].id };
      guardar(nombre, lista);
      return lista[i];
    },

    eliminar(id) {
      const lista = leer(nombre, semilla);
      const resto = lista.filter((x) => String(x.id) !== String(id));
      if (resto.length === lista.length) return false;
      guardar(nombre, resto);
      return true;
    },

    reiniciar: () => guardar(nombre, semilla),
  };
}

/* ------------------------- datos iniciales ------------------------- */
const IMG = '/images/';

export const SEMILLA_PRODUCTOS = [
  { id: 'P001', nombre: 'Figura Palkia Legendaria', categoria: 'Figuras', precio: 24990, stock: 8, img: IMG + 'figuraPalkiaLegendaria1.webp', desc: 'Figura coleccionable de Palkia en posición de ataque.' },
  { id: 'P002', nombre: 'Perla Cósmica Decorativa', categoria: 'Decoración', precio: 12490, stock: 15, img: IMG + 'perlaCosmicaDecorativa.jpg', desc: 'Perla decorativa con acabado nacarado y aura púrpura.' },
  { id: 'P003', nombre: 'Set de Cartas Sinnoh', categoria: 'Cartas', precio: 8990, stock: 40, img: IMG + 'setCartasSinnoh.jpeg', desc: 'Set de cartas coleccionables de la región de Sinnoh.', oferta: true, precioOferta: 6990 },
  { id: 'P004', nombre: 'Consola Edición Perla', categoria: 'Consolas', precio: 89990, stock: 3, img: IMG + 'consolaEdicionPerla.jpg', desc: 'Consola portátil edición Perla con detalles en magenta.' },
  { id: 'P005', nombre: 'Estuche Perla Cósmica', categoria: 'Accesorios', precio: 18990, stock: 12, img: IMG + 'estuchePokemonPearl.jpeg', desc: 'Estuche rígido con impresión de Palkia en acabado nacarado.', oferta: true, precioOferta: 14990 },
  { id: 'P006', nombre: 'Álbum Tapa Dura Sinnoh', categoria: 'Colección', precio: 24990, stock: 7, img: IMG + 'albumColeccionistaSinnoh.webp', desc: 'Álbum de 360 bolsillos con arte de la Generación IV.' },
  { id: 'P007', nombre: 'Lámpara Cósmica Giratina', categoria: 'Accesorios', precio: 15990, stock: 9, img: IMG + 'lamparaCosmicaGiratina.webp', desc: 'Lámpara cósmica con diseño de Giratina.' },
  { id: 'P008', nombre: 'Figura Dialga Temporal', categoria: 'Figuras', precio: 24990, stock: 8, img: IMG + 'figuraPalkiaTemporal1.jpg', desc: 'Figura coleccionable de Dialga en posición de ataque.' },
];

export const SEMILLA_USUARIOS = [
  { id: 'U001', nombre: 'Admin Pearl', correo: 'admin@duoc.cl', password: 'admin', tipo: 'Administrador' },
  { id: 'U002', nombre: 'Cliente Demo', correo: 'cliente@gmail.com', password: '1234', tipo: 'Cliente' },
];

export const productosDB = crearRepo('productos', SEMILLA_PRODUCTOS);
export const usuariosDB = crearRepo('usuarios', SEMILLA_USUARIOS);
export const pedidosDB = crearRepo('pedidos', []);
