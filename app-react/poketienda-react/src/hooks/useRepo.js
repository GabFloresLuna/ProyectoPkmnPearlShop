import { useEffect, useState } from 'react';

/**
 * Mantiene sincronizada una colección de db.js con el componente:
 * cada vez que alguien crea/actualiza/elimina, el componente se vuelve a renderizar.
 */
export default function useRepo(repo) {
  const [lista, setLista] = useState(() => repo.listar());
  useEffect(() => {
    setLista(repo.listar());
    return repo.suscribir(() => setLista(repo.listar()));
  }, [repo]);
  return lista;
}
