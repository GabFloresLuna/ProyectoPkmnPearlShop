// ms-productos/src/main/java/cl/poketienda/ms_productos/service/ProductoService.java
package cl.poketienda.ms_productos.service;

import cl.poketienda.ms_productos.dto.ProductoRequest;
import cl.poketienda.ms_productos.dto.ProductoResponse;
import cl.poketienda.ms_productos.dto.StockRequest;
import cl.poketienda.ms_productos.exception.RecursoNoEncontradoException;
import cl.poketienda.ms_productos.exception.ReglaNegocioException;
import cl.poketienda.ms_productos.model.Categoria;
import cl.poketienda.ms_productos.model.Producto;
import cl.poketienda.ms_productos.repository.CategoriaRepository;
import cl.poketienda.ms_productos.repository.ProductoRepository;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    @Transactional(readOnly = true)
    public List<ProductoResponse> listar(Long categoriaId, String texto) {
        String filtro = (texto == null || texto.isBlank()) ? null : texto.trim();
        return productoRepository.buscar(categoriaId, filtro).stream()
                .map(ProductoResponse::desde)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProductoResponse obtener(Long id) {
        return ProductoResponse.desde(buscar(id));
    }

    @Transactional(readOnly = true)
    public List<ProductoResponse> listarOfertas() {
        return productoRepository.buscarOfertas().stream()
                .map(ProductoResponse::desde)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProductoResponse> listarCriticos() {
        return productoRepository.buscarCriticos().stream()
                .map(ProductoResponse::desde)
                .toList();
    }

    @Transactional
    public ProductoResponse crear(ProductoRequest request) {
        String codigo = normalizarCodigo(request.codigo());
        if (productoRepository.existsByCodigoIgnoreCase(codigo)) {
            throw new ReglaNegocioException("Ya existe un producto con el código " + codigo);
        }
        validarOferta(request.precio(), request.precioOferta());
        Producto producto = new Producto();
        aplicar(producto, request, codigo, buscarCategoria(request.categoriaId()));
        return ProductoResponse.desde(productoRepository.save(producto));
    }

    @Transactional
    public ProductoResponse actualizar(Long id, ProductoRequest request) {
        Producto producto = buscar(id);
        String codigo = normalizarCodigo(request.codigo());
        if (productoRepository.existsByCodigoIgnoreCaseAndIdNot(codigo, id)) {
            throw new ReglaNegocioException("Ya existe un producto con el código " + codigo);
        }
        validarOferta(request.precio(), request.precioOferta());
        aplicar(producto, request, codigo, buscarCategoria(request.categoriaId()));
        return ProductoResponse.desde(productoRepository.save(producto));
    }

    @Transactional
    public void eliminar(Long id) {
        productoRepository.delete(buscar(id));
    }

    @Transactional
    public void descontarStock(StockRequest request) {
        Map<Long, Integer> cantidades = agruparCantidades(request);
        List<Producto> productos = buscarTodos(cantidades);
        for (Producto producto : productos) {
            int cantidad = cantidades.get(producto.getId());
            if (producto.getStock() < cantidad) {
                throw new ReglaNegocioException("Stock insuficiente para " + producto.getNombre()
                        + ": quedan " + producto.getStock() + " y se pidieron " + cantidad);
            }
        }
        for (Producto producto : productos) {
            producto.setStock(producto.getStock() - cantidades.get(producto.getId()));
        }
        productoRepository.saveAll(productos);
    }

    @Transactional
    public void reponerStock(StockRequest request) {
        Map<Long, Integer> cantidades = agruparCantidades(request);
        List<Producto> productos = buscarTodos(cantidades);
        for (Producto producto : productos) {
            producto.setStock(producto.getStock() + cantidades.get(producto.getId()));
        }
        productoRepository.saveAll(productos);
    }

    private Map<Long, Integer> agruparCantidades(StockRequest request) {
        Map<Long, Integer> cantidades = new LinkedHashMap<>();
        for (StockRequest.Item item : request.items()) {
            cantidades.merge(item.productoId(), item.cantidad(), Integer::sum);
        }
        return cantidades;
    }

    private List<Producto> buscarTodos(Map<Long, Integer> cantidades) {
        List<Producto> productos = productoRepository.findAllById(cantidades.keySet());
        if (productos.size() != cantidades.size()) {
            throw new RecursoNoEncontradoException("Uno o más productos de la lista no existen");
        }
        return productos;
    }

    private void validarOferta(Integer precio, Integer precioOferta) {
        if (precioOferta != null && precioOferta >= precio) {
            throw new ReglaNegocioException("El precio de oferta debe ser menor al precio normal");
        }
    }

    private void aplicar(Producto producto, ProductoRequest request, String codigo, Categoria categoria) {
        producto.setCodigo(codigo);
        producto.setNombre(request.nombre().trim());
        producto.setDescripcion(request.descripcion());
        producto.setPlataforma(request.plataforma());
        producto.setPrecio(request.precio());
        producto.setPrecioOferta(request.precioOferta());
        producto.setStock(request.stock());
        producto.setStockCritico(request.stockCritico());
        producto.setImagenUrl(request.imagenUrl());
        producto.setCategoria(categoria);
    }

    private String normalizarCodigo(String codigo) {
        return codigo.trim().toUpperCase();
    }

    private Producto buscar(Long id) {
        return productoRepository.buscarPorIdConCategoria(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("No existe el producto con id " + id));
    }

    private Categoria buscarCategoria(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("No existe la categoría con id " + id));
    }
}
