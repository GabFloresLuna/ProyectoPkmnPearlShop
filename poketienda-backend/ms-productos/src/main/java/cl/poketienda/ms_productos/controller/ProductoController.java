package cl.poketienda.ms_productos.controller;

import cl.poketienda.ms_productos.dto.ProductoRequest;
import cl.poketienda.ms_productos.dto.ProductoResponse;
import cl.poketienda.ms_productos.dto.StockRequest;
import cl.poketienda.ms_productos.service.ProductoService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/productos")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    @GetMapping
    public List<ProductoResponse> listar(@RequestParam(required = false) Long categoriaId,
                                         @RequestParam(required = false) String texto) {
        return productoService.listar(categoriaId, texto);
    }

    @GetMapping("/ofertas")
    public List<ProductoResponse> listarOfertas() {
        return productoService.listarOfertas();
    }

    @GetMapping("/criticos")
    public List<ProductoResponse> listarCriticos() {
        return productoService.listarCriticos();
    }

    @GetMapping("/{id}")
    public ProductoResponse obtener(@PathVariable Long id) {
        return productoService.obtener(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductoResponse crear(@Valid @RequestBody ProductoRequest request) {
        return productoService.crear(request);
    }

    @PutMapping("/{id}")
    public ProductoResponse actualizar(@PathVariable Long id, @Valid @RequestBody ProductoRequest request) {
        return productoService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
    }

    @PostMapping("/stock/descontar")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void descontarStock(@Valid @RequestBody StockRequest request) {
        productoService.descontarStock(request);
    }

    @PostMapping("/stock/reponer")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void reponerStock(@Valid @RequestBody StockRequest request) {
        productoService.reponerStock(request);
    }
}
