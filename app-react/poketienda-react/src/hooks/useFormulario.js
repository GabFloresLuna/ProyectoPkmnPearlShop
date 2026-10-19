import { useState } from 'react';

/**
 * Estado y validación de un formulario controlado.
 *
 * @param valoresIniciales  { campo: valor }
 * @param reglas            { campo: (valor, todosLosValores) => [{ ok, mensaje }, ...] }
 *
 * Reemplaza el patrón repetido en registro.js, login.js, contacto.js, admin-producto.js y admin-usuario.js
 * (evaluar en blur, re-evaluar al escribir si hay error, validar todo al enviar).
 */
export default function useFormulario(valoresIniciales, reglas) {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});

  const mensajeDe = (nombre, vals) => {
    const lista = reglas[nombre] ? reglas[nombre](vals[nombre], vals) : [];
    const fallo = lista.find((r) => !r.ok);
    return fallo ? fallo.mensaje : '';
  };

  const validarCampo = (nombre, vals = valores) => {
    const mensaje = mensajeDe(nombre, vals);
    setErrores((e) => ({ ...e, [nombre]: mensaje }));
    return !mensaje;
  };

  const alCambiar = (e) => {
    const { name, type, value, checked } = e.target;
    const nuevo = type === 'checkbox' ? checked : value;
    setValores((v) => ({ ...v, [name]: nuevo }));
    if (errores[name]) validarCampo(name, { ...valores, [name]: nuevo });
  };

  const alSalir = (e) => {
    validarCampo(e.target.name);
  };

  /** Asigna un valor por código (por ejemplo, limpiar la comuna al cambiar de región). */
  const setValor = (nombre, valor) => setValores((v) => ({ ...v, [nombre]: valor }));

  /** Valida todos los campos con reglas; devuelve true si el formulario es válido. */
  const validarTodo = () => {
    const nuevos = {};
    Object.keys(reglas).forEach((nombre) => {
      nuevos[nombre] = mensajeDe(nombre, valores);
    });
    setErrores(nuevos);
    return Object.values(nuevos).every((m) => !m);
  };

  const reiniciar = (vals = valoresIniciales) => {
    setValores(vals);
    setErrores({});
  };

  return { valores, errores, alCambiar, alSalir, setValor, setValores, validarTodo, reiniciar };
}
