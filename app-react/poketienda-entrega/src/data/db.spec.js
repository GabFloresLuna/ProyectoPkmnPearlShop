import { SEMILLA_PRODUCTOS, pedidosDB, productosDB } from './db.js';

describe('db.js — CRUD con persistencia', () => {
  beforeEach(() => localStorage.clear());

  it('LEER: parte con los productos iniciales', () => {
    expect(productosDB.listar().length).toBe(SEMILLA_PRODUCTOS.length);
  });

  it('CREAR: agrega un producto y genera su código', () => {
    const nuevo = productosDB.crear({ nombre: 'Test', categoria: 'Figuras', precio: 1000, stock: 5 });
    expect(nuevo.id).toBe('P009');
    expect(productosDB.obtener('P009').nombre).toBe('Test');
  });

  it('CREAR: rechaza un código duplicado', () => {
    expect(() => productosDB.crear({ id: 'P001', nombre: 'Repetido' })).toThrowError(/Ya existe/);
  });

  it('ACTUALIZAR: cambia los datos pero nunca el id', () => {
    productosDB.actualizar('P001', { precio: 1, id: 'OTRO' });
    expect(productosDB.obtener('P001').precio).toBe(1);
    expect(productosDB.obtener('OTRO')).toBeNull();
  });

  it('ELIMINAR: borra el registro y avisa si no existía', () => {
    expect(productosDB.eliminar('P002')).toBe(true);
    expect(productosDB.obtener('P002')).toBeNull();
    expect(productosDB.eliminar('P002')).toBe(false);
  });

  it('PERSISTENCIA: los cambios quedan guardados en localStorage', () => {
    productosDB.eliminar('P003');
    const guardado = JSON.parse(localStorage.getItem('poketienda:productos'));
    expect(guardado.some((p) => p.id === 'P003')).toBe(false);
  });

  it('IDs numéricos incrementales para los pedidos', () => {
    expect(pedidosDB.crear({ total: 1 }).id).toBe(1);
    expect(pedidosDB.crear({ total: 2 }).id).toBe(2);
  });

  it('REINICIAR: restaura los datos iniciales', () => {
    productosDB.eliminar('P001');
    productosDB.reiniciar();
    expect(productosDB.listar().length).toBe(SEMILLA_PRODUCTOS.length);
  });
});
