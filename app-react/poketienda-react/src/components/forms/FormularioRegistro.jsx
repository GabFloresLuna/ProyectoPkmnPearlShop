import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import useFormulario from '../../hooks/useFormulario.js';
import { V } from '../../utils/validaciones.js';
import Campo from '../Campo.jsx';
import CamposRegionComuna from '../CamposRegionComuna.jsx';
import Feedback from './Feedback.jsx';

const INICIAL = {
  nombre: '', correo: '', correoConfirmar: '', password: '', passwordConfirmar: '',
  telefono: '', region: '', comuna: '', terminos: false,
};

const REGLAS = {
  nombre: (v) => [V.requerido(v, 'El nombre'), V.maxLen(v, 100, 'El nombre'), V.letras(v, 'El nombre')],
  correo: (v) => [V.email(v), V.maxLen(v, 100, 'El correo')],
  correoConfirmar: (v, t) => [V.requerido(v, 'La confirmación'), V.coincide(v, t.correo, 'Los correos')],
  password: (v) => [V.password(v)],
  passwordConfirmar: (v, t) => [V.requerido(v, 'La confirmación'), V.coincide(v, t.password, 'Las contraseñas')],
  telefono: (v) => [V.telefono(v)],
  region: (v) => [V.requerido(v, 'La región')],
  comuna: (v) => [V.requerido(v, 'La comuna')],
  terminos: (v) => [V.aceptado(v)],
};

function FormularioRegistro() {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const f = useFormulario(INICIAL, REGLAS);
  const { valores, errores, alCambiar, alSalir } = f;
  const comunes = { alCambiar, alSalir };

  const enviar = (e) => {
    e.preventDefault();
    if (!f.validarTodo()) {
      setFeedback({ tipo: 'error', texto: 'Corrige los campos marcados.' });
      return;
    }
    const { nombre, correo, password, telefono, region, comuna } = valores;
    const r = registrar({ nombre, correo, password, telefono, region, comuna });
    if (!r.ok) {
      setFeedback({ tipo: 'error', texto: r.mensaje });
      return;
    }
    setFeedback({ tipo: 'exito', texto: '¡Cuenta creada con éxito!' });
    navigate('/', { replace: true });
  };

  return (
    <form className="formulario" id="form-registro" onSubmit={enviar} noValidate>
      <Campo id="nombre" etiqueta="Nombre completo" requerido placeholder="Ej: Gabriel Flores Rojas" maxLength={100}
             valor={valores.nombre} error={errores.nombre} ayuda="Máximo 100 caracteres." autoComplete="name" {...comunes} />
      <Campo id="correo" etiqueta="Correo electrónico" requerido tipo="email" placeholder="tucorreo@duoc.cl" maxLength={100}
             valor={valores.correo} error={errores.correo} autoComplete="email" {...comunes}
             ayuda={<>Dominios permitidos: <strong>@duoc.cl</strong>, <strong>@profesor.duoc.cl</strong> y <strong>@gmail.com</strong>.</>} />
      <Campo id="correo-confirmar" nombre="correoConfirmar" etiqueta="Confirmar correo electrónico" requerido tipo="email"
             placeholder="Repite tu correo electrónico" maxLength={100} valor={valores.correoConfirmar} error={errores.correoConfirmar} {...comunes} />
      <Campo id="password" etiqueta="Contraseña" requerido tipo="password" placeholder="Entre 4 y 10 caracteres" maxLength={10}
             valor={valores.password} error={errores.password} ayuda="Entre 4 y 10 caracteres." autoComplete="new-password" {...comunes} />
      <Campo id="password-confirmar" nombre="passwordConfirmar" etiqueta="Confirmar contraseña" requerido tipo="password"
             placeholder="Repite tu contraseña" maxLength={10} valor={valores.passwordConfirmar} error={errores.passwordConfirmar} {...comunes} />
      <Campo id="telefono" etiqueta="Teléfono" opcional tipo="tel" placeholder="Ej: +56 9 1234 5678" maxLength={20}
             valor={valores.telefono} error={errores.telefono} ayuda="Formato libre. Solo dígitos, espacios, guiones y el signo +." {...comunes} />
      <CamposRegionComuna valores={valores} errores={errores} alCambiar={alCambiar} alSalir={alSalir} setValor={f.setValor} />
      <Campo id="terminos" tipo="checkbox" requerido valor={valores.terminos} error={errores.terminos} {...comunes}
             etiqueta="Acepto los términos y condiciones y la política de privacidad." />
      <button type="submit" className="boton boton--primario boton--bloque" id="btn-registrar">Registrarme</button>
      <Feedback feedback={feedback} />
    </form>
  );
}

export default FormularioRegistro;
