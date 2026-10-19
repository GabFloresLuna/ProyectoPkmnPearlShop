// Lógica pura de autenticación contra la "base de datos" simulada (db.js).
import { usuariosDB } from '../data/db.js';

export const sinPassword = (u) => {
  if (!u) return null;
  const { password: _omitida, ...seguro } = u;
  return seguro;
};

/** Devuelve el usuario cuyo correo y contraseña coinciden, o null. */
export function autenticar(correo, password) {
  const c = String(correo || '').trim().toLowerCase();
  return usuariosDB.listar().find((u) => u.correo.toLowerCase() === c && u.password === password) ?? null;
}

/** Crea un usuario de tipo Cliente. Lanza Error si el correo ya está registrado. */
export function registrarUsuario(datos) {
  const c = String(datos.correo || '').trim().toLowerCase();
  if (usuariosDB.listar().some((u) => u.correo.toLowerCase() === c)) {
    throw new Error('Ya existe una cuenta registrada con ese correo.');
  }
  return usuariosDB.crear({
    run: '', apellidos: '', telefono: '', direccion: '', ...datos, correo: c, tipo: 'Cliente',
  });
}
