import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

/** Guardia de rutas: solo los usuarios de tipo Administrador entran al panel. */
function RutaAdmin({ children }) {
  const { usuario, esAdmin } = useAuth();
  const location = useLocation();

  if (!usuario) return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  if (!esAdmin) {
    return (
      <section className="contenedor" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h1>Acceso restringido</h1>
        <p>Tu cuenta no tiene permisos de administrador.</p>
        <Link className="boton boton--primario" to="/">Volver a la tienda</Link>
      </section>
    );
  }
  return children;
}

export default RutaAdmin;
