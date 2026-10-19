// Cálculo de reportes de ventas a partir de las órdenes (solo cuentan las órdenes pagadas).

export function resumenVentas(ordenes) {
  const pagadas = ordenes.filter((o) => o.estado === 'Pagada');
  const totalVentas = pagadas.reduce((s, o) => s + o.total, 0);
  const porCategoria = new Map();
  const porProducto = new Map();

  pagadas.forEach((o) =>
    o.items.forEach((i) => {
      const monto = i.precio * i.cantidad;
      porCategoria.set(i.categoria, (porCategoria.get(i.categoria) ?? 0) + monto);
      const prev = porProducto.get(i.id) ?? { id: i.id, nombre: i.nombre, unidades: 0, monto: 0 };
      porProducto.set(i.id, { ...prev, unidades: prev.unidades + i.cantidad, monto: prev.monto + monto });
    })
  );

  return {
    cantidadOrdenes: pagadas.length,
    rechazadas: ordenes.length - pagadas.length,
    totalVentas,
    ticketPromedio: pagadas.length ? Math.round(totalVentas / pagadas.length) : 0,
    porCategoria: [...porCategoria].map(([categoria, monto]) => ({ categoria, monto })).sort((a, b) => b.monto - a.monto),
    topProductos: [...porProducto.values()].sort((a, b) => b.unidades - a.unidades || b.monto - a.monto).slice(0, 5),
  };
}
