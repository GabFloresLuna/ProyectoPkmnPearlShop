import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Campo from './Campo.jsx';

describe('<Campo />', () => {
  afterEach(cleanup);

  it('RENDERIZADO CONDICIONAL: sin error no se muestra ningún mensaje de error', () => {
    render(<Campo id="nombre" etiqueta="Nombre" valor="" alCambiar={() => {}} />);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('RENDERIZADO CONDICIONAL: con error muestra el mensaje y marca aria-invalid', () => {
    const { container } = render(<Campo id="nombre" etiqueta="Nombre" valor="" error="El nombre es obligatorio." alCambiar={() => {}} />);
    expect(screen.getByRole('alert').textContent).toBe('El nombre es obligatorio.');
    expect(container.querySelector('input').getAttribute('aria-invalid')).toBe('true');
  });

  it('PROPS: asocia la etiqueta con el control y muestra la ayuda', () => {
    render(<Campo id="correo" etiqueta="Correo" ayuda="Usa tu correo institucional." valor="" alCambiar={() => {}} />);
    expect(screen.getByLabelText(/Correo/)).toBeTruthy();
    expect(screen.getByText('Usa tu correo institucional.')).toBeTruthy();
  });

  it('EVENTOS: al escribir se ejecuta alCambiar', () => {
    const alCambiar = jasmine.createSpy('alCambiar');
    render(<Campo id="nombre" etiqueta="Nombre" valor="" alCambiar={alCambiar} />);
    fireEvent.change(screen.getByLabelText(/Nombre/), { target: { value: 'Ana' } });
    expect(alCambiar).toHaveBeenCalledTimes(1);
  });

  it('ESTADO: el botón Ver/Ocultar alterna el tipo del campo contraseña', () => {
    const { container } = render(<Campo id="password" etiqueta="Contraseña" tipo="password" valor="1234" alCambiar={() => {}} />);
    const input = container.querySelector('input');
    expect(input.type).toBe('password');
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar contraseña' }));
    expect(input.type).toBe('text');
  });

  it('PROPS: el contador muestra los caracteres usados', () => {
    render(<Campo id="comentario" etiqueta="Comentario" componente="textarea" valor="hola" contador={500} alCambiar={() => {}} />);
    expect(screen.getByText('4/500')).toBeTruthy();
  });
});
