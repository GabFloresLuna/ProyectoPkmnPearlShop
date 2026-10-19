import { useEffect } from 'react';

/** Actualiza el <title> de la pestaña según la vista actual. */
export default function useTituloDocumento(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} | PokéTienda Pearl` : 'PokéTienda Pearl';
  }, [titulo]);
}
