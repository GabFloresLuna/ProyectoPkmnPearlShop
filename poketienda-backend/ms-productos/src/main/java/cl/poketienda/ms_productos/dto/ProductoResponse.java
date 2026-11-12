package cl.poketienda.ms_productos.dto;

import cl.poketienda.ms_productos.model.Producto;

public record ProductoResponse(
        Long id,
        String codigo,
        String nombre,
        String descripcion,
        String plataforma,
        Integer precio,
        Integer precioOferta,
        boolean oferta,
        Integer stock,
        Integer stockCritico,
        String imagenUrl,
        Long categoriaId,
        String categoria
) {

    public static ProductoResponse desde(Producto producto) {
        return new ProductoResponse(
                producto.getId(),
                producto.getCodigo(),
                producto.getNombre(),
                producto.getDescripcion(),
                producto.getPlataforma(),
                producto.getPrecio(),
                producto.getPrecioOferta(),
                producto.getPrecioOferta() != null,
                producto.getStock(),
                producto.getStockCritico(),
                producto.getImagenUrl(),
                producto.getCategoria().getId(),
                producto.getCategoria().getNombre()
        );
    }
}
