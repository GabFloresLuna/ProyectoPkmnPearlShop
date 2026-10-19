import { createContext, useContext, useMemo, useState } from 'react';
import { usuariosDB } from '../data/db.js';
import useRepo from '../hooks/useRepo.js';
import { autenticar, registrarUsuario, sinPassword } from './authLogica.js';

const CLAVE_SESION = 'poketienda:sesion';
const AuthContext = createContext(null);

const leerSesion = () => {
  try {
    return localStorage.getItem(CLAVE_SESION);
  } catch {
    return null;
  }
};
const guardarSesion = (id) => {
  try {
    if (id) localStorage.setItem(CLAVE_SESION, id);
    else localStorage.removeItem(CLAVE_SESION);
  } catch {
    /* sin persistencia */
  }
};

/** Sesión del usuario: quién está logueado y de qué tipo (Cliente / Administrador). */
export function AuthProvider({ children }) {
  const [usuarioId, setUsuarioId] = useState(leerSesion);
  const usuarios = useRepo(usuariosDB);

  const valor = useMemo(() => {
    const usuario = sinPassword(usuarios.find((u) => u.id === usuarioId));
    const abrir = (u) => {
      guardarSesion(u.id);
      setUsuarioId(u.id);
    };
    return {
      usuario,
      esAdmin: usuario?.tipo === 'Administrador',
      iniciarSesion: (correo, password) => {
        const u = autenticar(correo, password);
        if (!u) return { ok: false, mensaje: 'Credenciales inválidas.' };
        abrir(u);
        return { ok: true, usuario: sinPassword(u) };
      },
      registrar: (datos) => {
        try {
          const u = registrarUsuario(datos);
          abrir(u);
          return { ok: true, usuario: sinPassword(u) };
        } catch (e) {
          return { ok: false, mensaje: e.message };
        }
      },
      cerrarSesion: () => {
        guardarSesion(null);
        setUsuarioId(null);
      },
    };
  }, [usuarios, usuarioId]);

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>.');
  return ctx;
}
