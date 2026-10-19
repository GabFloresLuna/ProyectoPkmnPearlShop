/**
 * db.js — Fuente de datos simulada ("base de datos" del frontend).
 *
 * Cada colección es un repositorio con CRUD completo:
 *   listar() · obtener(id) · crear(datos) · actualizar(id, cambios) · eliminar(id)
 * La persistencia se hace en localStorage, por lo que los datos sobreviven a recargas
 * y se comparten entre la tienda y el panel de administración.
 * suscribir(fn) avisa a la interfaz cuando una colección cambia (actualización en tiempo real).
 */

const PREFIJO_STORAGE = 'poketienda:';
const bus = new EventTarget();
const clonar = (x) => JSON.parse(JSON.stringify(x));

function leerAlmacen(nombre, semilla) {
  try {
    const crudo = localStorage.getItem(PREFIJO_STORAGE + nombre);
    if (crudo !== null) return JSON.parse(crudo);
  } catch {
    /* JSON corrupto o almacenamiento no disponible: se parte desde la semilla */
  }
  const inicial = clonar(semilla);
  try {
    localStorage.setItem(PREFIJO_STORAGE + nombre, JSON.stringify(inicial));
  } catch {
    /* sin persistencia */
  }
  return inicial;
}

function escribirAlmacen(nombre, lista) {
  try {
    localStorage.setItem(PREFIJO_STORAGE + nombre, JSON.stringify(lista));
  } catch {
    /* sin persistencia */
  }
}

function siguienteId(lista, campoId, { prefijo = '', digitos = 0, inicio = 1 }) {
  const numeros = lista
    .map((x) => parseInt(String(x[campoId]).replace(prefijo, ''), 10))
    .filter(Number.isFinite);
  const n = numeros.length ? Math.max(...numeros) + 1 : inicio;
  return prefijo ? prefijo + String(n).padStart(digitos, '0') : n;
}

export function crearRepositorio(nombre, semilla = [], opciones = {}) {
  const { campoId = 'id', ...opId } = opciones;
  const leer = () => leerAlmacen(nombre, semilla);
  const guardar = (lista) => {
    escribirAlmacen(nombre, lista);
    bus.dispatchEvent(new Event(nombre));
  };

  return {
    nombre,
    campoId,

    /** READ: todos los registros. */
    listar: () => leer(),

    /** READ: un registro por id (o null). */
    obtener: (id) => leer().find((x) => String(x[campoId]) === String(id)) ?? null,

    /** CREATE: agrega un registro; genera el id si no viene. */
    crear(datos) {
      const lista = leer();
      const nuevo = { ...datos };
      if (nuevo[campoId] === undefined || nuevo[campoId] === '') {
        nuevo[campoId] = siguienteId(lista, campoId, opId);
      } else if (lista.some((x) => String(x[campoId]) === String(nuevo[campoId]))) {
        throw new Error(`Ya existe un registro con ${campoId} "${nuevo[campoId]}".`);
      }
      lista.push(nuevo);
      guardar(lista);
      return nuevo;
    },

    /** UPDATE: mezcla los cambios sobre el registro existente (el id no se modifica). */
    actualizar(id, cambios) {
      const lista = leer();
      const i = lista.findIndex((x) => String(x[campoId]) === String(id));
      if (i < 0) return null;
      lista[i] = { ...lista[i], ...cambios, [campoId]: lista[i][campoId] };
      guardar(lista);
      return lista[i];
    },

    /** DELETE: elimina por id. Devuelve true si existía. */
    eliminar(id) {
      const lista = leer();
      const resto = lista.filter((x) => String(x[campoId]) !== String(id));
      if (resto.length === lista.length) return false;
      guardar(resto);
      return true;
    },

    /** Notifica cada cambio de la colección. Devuelve la función para cancelar la suscripción. */
    suscribir(fn) {
      bus.addEventListener(nombre, fn);
      return () => bus.removeEventListener(nombre, fn);
    },

    /** Restaura los datos iniciales (útil para demos y pruebas). */
    reiniciar() {
      guardar(clonar(semilla));
    },
  };
}

/* ============================ DATOS INICIALES ============================ */

const IMG = '/images/';

export const SEMILLA_PRODUCTOS = [
  { id: 'P001', nombre: 'Figura Palkia Legendaria', categoria: 'Figuras', precio: 24990, stock: 8, stockCritico: 3,
    img: IMG + 'figuraPalkiaLegendaria1.webp',
    imagenes: [IMG + 'figuraPalkiaLegendaria1.webp', IMG + 'figuraPalkiaLegendaria2.webp', IMG + 'figuraPalkiaLegendaria3.webp'],
    desc: 'Figura coleccionable de Palkia en posición de ataque.',
    detalles: ['Altura aproximada: 20 cm.', 'Material: PVC de alta densidad.', 'Incluye base decorativa y caja edición Perla.', 'Apto para coleccionistas desde 8 años.'],
    destacado: true, oferta: false },
  { id: 'P002', nombre: 'Perla Cósmica Decorativa', categoria: 'Decoración', precio: 12490, stock: 15, stockCritico: 5,
    img: IMG + 'perlaCosmicaDecorativa.jpg', desc: 'Perla decorativa con acabado nacarado y aura púrpura.', destacado: true, oferta: false },
  { id: 'P003', nombre: 'Set de Cartas Sinnoh', categoria: 'Cartas', precio: 8990, stock: 40, stockCritico: 10,
    img: IMG + 'setCartasSinnoh.jpeg', desc: 'Set de cartas coleccionables de la región de Sinnoh.', destacado: true, oferta: true, precioOferta: 6990 },
  { id: 'P004', nombre: 'Consola Edición Perla', categoria: 'Consolas', precio: 89990, stock: 3, stockCritico: 3,
    img: IMG + 'consolaEdicionPerla.jpg', desc: 'Consola portátil edición Perla con detalles en magenta.', destacado: true, oferta: false },
  { id: 'P005', nombre: 'Estuche Perla Cósmica', categoria: 'Accesorios', precio: 18990, stock: 12, stockCritico: 4,
    img: IMG + 'estuchePokemonPearl.jpeg', desc: 'Estuche rígido con impresión de Palkia en acabado nacarado.', destacado: false, oferta: true, precioOferta: 14990 },
  { id: 'P006', nombre: 'Álbum Tapa Dura Sinnoh', categoria: 'Colección', precio: 24990, stock: 7, stockCritico: 8,
    img: IMG + 'albumColeccionistaSinnoh.webp', desc: 'Álbum de 360 bolsillos con arte de la Generación IV.', destacado: false, oferta: true, precioOferta: 19990 },
  { id: 'P007', nombre: 'Lámpara Cósmica Giratina', categoria: 'Accesorios', precio: 15990, stock: 9, stockCritico: 3,
    img: IMG + 'lamparaCosmicaGiratina.webp', desc: 'Lámpara cósmica con diseño de Giratina.', destacado: false, oferta: false },
  { id: 'P008', nombre: 'Figura Dialga Temporal', categoria: 'Figuras', precio: 24990, stock: 8, stockCritico: 3,
    img: IMG + 'figuraPalkiaTemporal1.jpg', desc: 'Figura coleccionable de Dialga en posición de ataque.', destacado: false, oferta: false },
];

export const SEMILLA_CATEGORIAS = [
  { id: 'C001', nombre: 'Figuras', descripcion: 'Figuras coleccionables de la Generación IV.' },
  { id: 'C002', nombre: 'Decoración', descripcion: 'Piezas decorativas inspiradas en Sinnoh.' },
  { id: 'C003', nombre: 'Cartas', descripcion: 'Cartas y sets coleccionables.' },
  { id: 'C004', nombre: 'Consolas', descripcion: 'Consolas portátiles edición especial.' },
  { id: 'C005', nombre: 'Accesorios', descripcion: 'Estuches, lámparas y complementos.' },
  { id: 'C006', nombre: 'Colección', descripcion: 'Álbumes y artículos para coleccionistas.' },
];

export const SEMILLA_USUARIOS = [
  { id: 'U001', run: '123456785', nombre: 'Admin', apellidos: 'Pearl', correo: 'admin@duoc.cl', password: 'admin',
    tipo: 'Administrador', telefono: '', region: 'Metropolitana de Santiago', comuna: 'Santiago', direccion: 'Av. Sinnoh 1420' },
  { id: 'U002', run: '987654325', nombre: 'Cliente', apellidos: 'Demo', correo: 'cliente@gmail.com', password: '1234',
    tipo: 'Cliente', telefono: '+56 9 1234 5678', region: 'Valparaíso', comuna: 'Viña del Mar', direccion: 'Calle Sinnoh 12' },
];

const ORDEN_BASE = {
  cliente: { usuarioId: 'U002', nombre: 'Cliente', apellidos: 'Demo', correo: 'cliente@gmail.com' },
  direccion: { calle: 'Calle Sinnoh 12', departamento: '', region: 'Valparaíso', comuna: 'Viña del Mar', indicaciones: '' },
  descuento: 0,
  estado: 'Pagada',
};
export const SEMILLA_ORDENES = [
  { ...ORDEN_BASE, id: 20260001, fecha: '2026-10-05T15:30:00.000Z',
    items: [
      { id: 'P001', nombre: 'Figura Palkia Legendaria', categoria: 'Figuras', precio: 24990, cantidad: 1 },
      { id: 'P003', nombre: 'Set de Cartas Sinnoh', categoria: 'Cartas', precio: 8990, cantidad: 2 },
    ],
    subtotal: 42970, envio: 3990, total: 46960 },
  { ...ORDEN_BASE, id: 20260002, fecha: '2026-10-09T18:10:00.000Z',
    items: [{ id: 'P004', nombre: 'Consola Edición Perla', categoria: 'Consolas', precio: 89990, cantidad: 1 }],
    subtotal: 89990, envio: 0, total: 89990 },
];

/* ============================ REPOSITORIOS ============================ */

export const productosDB = crearRepositorio('productos', SEMILLA_PRODUCTOS, { prefijo: 'P', digitos: 3 });
export const categoriasDB = crearRepositorio('categorias', SEMILLA_CATEGORIAS, { prefijo: 'C', digitos: 3 });
export const usuariosDB = crearRepositorio('usuarios', SEMILLA_USUARIOS, { prefijo: 'U', digitos: 3 });
export const ordenesDB = crearRepositorio('ordenes', SEMILLA_ORDENES, { inicio: 20260001 });
export const mensajesDB = crearRepositorio('mensajes', [], { inicio: 1 });

/** Restaura todas las colecciones a su estado inicial. */
export function reiniciarTodo() {
  [productosDB, categoriasDB, usuariosDB, ordenesDB, mensajesDB].forEach((r) => r.reiniciar());
}
