import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { mensajesDB } from '../../data/db.js';
import FormularioContacto from './FormularioContacto.jsx';

const enviar = () => fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));

describe('<FormularioContacto />', () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it('ESTADO: el formulario guarda lo que el usuario escribe y actualiza el contador', () => {
    render(<FormularioContacto />);
    const area = screen.getByLabelText(/Comentario/);
    fireEvent.change(area, { target: { name: 'comentario', value: 'Hola' } });
    expect(area.value).toBe('Hola');
    expect(screen.getByText('4/500')).toBeTruthy();
  });

  it('RENDERIZADO CONDICIONAL: con campos vacíos muestra errores y no guarda nada', () => {
    render(<FormularioContacto />);
    expect(screen.queryAllByRole('alert').length).toBe(0);
    enviar();
    expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
    expect(screen.getByText('Revisa los campos marcados.')).toBeTruthy();
    expect(mensajesDB.listar().length).toBe(0);
  });

  it('EVENTOS: un envío válido guarda el mensaje, confirma y limpia el formulario', () => {
    render(<FormularioContacto />);
    fireEvent.change(screen.getByLabelText(/Nombre completo/), { target: { name: 'nombre', value: 'Ana Perez' } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/), { target: { name: 'correo', value: 'ana@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/Comentario/), { target: { name: 'comentario', value: 'Quiero consultar por un envío.' } });
    enviar();
    expect(screen.getByText('¡Mensaje enviado! Te contactaremos pronto.')).toBeTruthy();
    expect(mensajesDB.listar().length).toBe(1);
    expect(screen.getByLabelText(/Nombre completo/).value).toBe('');
  });
});
