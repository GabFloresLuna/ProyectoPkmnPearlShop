import { REGIONES, REGIONES_COMUNAS } from '../data/regionesComunas.js';
import Campo from './Campo.jsx';

/** Dos selects dependientes: al elegir una región se cargan sus comunas (migrado de regiones-comunas.js). */
function CamposRegionComuna({ prefijo = '', columna, valores, errores, alCambiar, alSalir, setValor }) {
  const envolver = (nodo, clave) => (columna ? <div className={columna} key={clave}>{nodo}</div> : nodo);
  const comunas = REGIONES_COMUNAS[valores.region] || [];
  const alCambiarRegion = (e) => {
    alCambiar(e);
    setValor('comuna', '');
  };
  return (
    <>
      {envolver(
      <Campo id={`${prefijo}region`} nombre="region" etiqueta="Región" requerido componente="select"
             valor={valores.region} error={errores.region} alCambiar={alCambiarRegion} alSalir={alSalir}>
        <option value="">Seleccione una región…</option>
        {REGIONES.map((r) => <option key={r} value={r}>{r}</option>)}
      </Campo>, 'region')}
      {envolver(
      <Campo id={`${prefijo}comuna`} nombre="comuna" etiqueta="Comuna" requerido componente="select"
             valor={valores.comuna} error={errores.comuna} alCambiar={alCambiar} alSalir={alSalir}
             disabled={comunas.length === 0}
             ayuda={comunas.length === 0 ? 'Se habilita al elegir una región.' : undefined}>
        <option value="">{comunas.length ? 'Seleccione una comuna…' : 'Seleccione primero una región…'}</option>
        {comunas.map((c) => <option key={c} value={c}>{c}</option>)}
      </Campo>, 'comuna')}
    </>
  );
}

export default CamposRegionComuna;
