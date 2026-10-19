// Reglas de negocio de producto reutilizadas por la tienda y el panel de administración.

/** Precio que realmente paga el cliente (oferta si corresponde). */
export const precioFinal = (p) => (p.oferta && p.precioOferta ? p.precioOferta : p.precio);

/** Porcentaje de descuento de un producto en oferta (0 si no está en oferta). */
export const porcentajeOferta = (p) =>
  p.oferta && p.precioOferta ? Math.round((1 - p.precioOferta / p.precio) * 100) : 0;

/** Un producto es "crítico" cuando su stock llegó (o bajó de) su stock crítico. */
export const esCritico = (p) =>
  p.stockCritico !== undefined && p.stockCritico !== '' && Number(p.stock) <= Number(p.stockCritico);

/** Filtra y ordena el catálogo (usado por Productos, Categorías y Ofertas). */
export function filtrarProductos(productos, { q = '', categoria = '', orden = 'relevancia' } = {}) {
  const texto = q.trim().toLowerCase();
  const lista = productos.filter(
    (p) => (!categoria || p.categoria === categoria) && (!texto || p.nombre.toLowerCase().includes(texto))
  );
  if (orden === 'precio-asc') lista.sort((a, b) => precioFinal(a) - precioFinal(b));
  if (orden === 'precio-desc') lista.sort((a, b) => precioFinal(b) - precioFinal(a));
  if (orden === 'nombre') lista.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  return lista;
}
