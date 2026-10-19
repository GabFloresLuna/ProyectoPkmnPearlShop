import { SEMILLA_USUARIOS, ordenesDB, productosDB } from './db.js';
import { ordenesDeUsuario, registrarPedido } from './pedidos.js';

const base = () => ({
  cliente: { nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@gmail.com' },
  direccion: { calle: 'Calle 1', departamento: '', region: 'Valparaíso', comuna: 'Viña del Mar', indicaciones: '' },
  items: [{ id: 'P001', nombre: 'Figura Palkia Legendaria', categoria: 'Figuras', precio: 24990, cantidad: 2 }],
  totales: { subtotal: 49980, descuento: 0, envio: 3990, total: 53970 },
});

describe('pedidos.js — registrar pedidos', () => {
  beforeEach(() => localStorage.clear());

  it('pago aprobado: crea la orden Pagada y descuenta el stock', () => {
    const antes = productosDB.obtener('P001').stock;
    const orden = registrarPedido({ ...base(), aprobado: true });
    expect(orden.estado).toBe('Pagada');
    expect(ordenesDB.obtener(orden.id).total).toBe(53970);
    expect(productosDB.obtener('P001').stock).toBe(antes - 2);
  });

  it('pago rechazado: crea la orden Rechazada y NO toca el stock', () => {
    const antes = productosDB.obtener('P001').stock;
    const orden = registrarPedido({ ...base(), aprobado: false });
    expect(orden.estado).toBe('Rechazada');
    expect(productosDB.obtener('P001').stock).toBe(antes);
  });

  it('el stock nunca queda negativo', () => {
    const datos = base();
    datos.items[0].cantidad = 999;
    registrarPedido({ ...datos, aprobado: true });
    expect(productosDB.obtener('P001').stock).toBe(0);
  });

  it('historial: filtra las órdenes de un usuario', () => {
    const cliente = SEMILLA_USUARIOS[1];
    expect(ordenesDeUsuario(cliente).length).toBe(2); // las dos órdenes semilla
    expect(ordenesDeUsuario(SEMILLA_USUARIOS[0]).length).toBe(0);
  });
});
