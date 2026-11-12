package cl.poketienda.ms_productos.service;

import cl.poketienda.ms_productos.dto.CategoriaRequest;
import cl.poketienda.ms_productos.dto.CategoriaResponse;
import cl.poketienda.ms_productos.exception.RecursoNoEncontradoException;
import cl.poketienda.ms_productos.exception.ReglaNegocioException;
import cl.poketienda.ms_productos.model.Categoria;
import cl.poketienda.ms_productos.repository.CategoriaRepository;
import cl.poketienda.ms_productos.repository.ProductoRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private final ProductoRepository productoRepository;

    @Transactional(readOnly = true)
    public List<CategoriaResponse> listar() {
        return categoriaRepository.findAll().stream()
                .map(CategoriaResponse::desde)
                .toList();
    }

    @Transactional(readOnly = true)
    public CategoriaResponse obtener(Long id) {
        return CategoriaResponse.desde(buscar(id));
    }

    @Transactional
    public CategoriaResponse crear(CategoriaRequest request) {
        String nombre = request.nombre().trim();
        if (categoriaRepository.existsByNombreIgnoreCase(nombre)) {
            throw new ReglaNegocioException("Ya existe una categoría con el nombre " + nombre);
        }
        Categoria categoria = new Categoria();
        categoria.setNombre(nombre);
        categoria.setDescripcion(request.descripcion());
        categoria.setColor(request.color());
        return CategoriaResponse.desde(categoriaRepository.save(categoria));
    }

    @Transactional
    public CategoriaResponse actualizar(Long id, CategoriaRequest request) {
        Categoria categoria = buscar(id);
        String nombre = request.nombre().trim();
        if (categoriaRepository.existsByNombreIgnoreCaseAndIdNot(nombre, id)) {
            throw new ReglaNegocioException("Ya existe una categoría con el nombre " + nombre);
        }
        categoria.setNombre(nombre);
        categoria.setDescripcion(request.descripcion());
        categoria.setColor(request.color());
        return CategoriaResponse.desde(categoriaRepository.save(categoria));
    }

    @Transactional
    public void eliminar(Long id) {
        Categoria categoria = buscar(id);
        if (productoRepository.existsByCategoriaId(id)) {
            throw new ReglaNegocioException("No se puede eliminar una categoría que tiene productos asociados");
        }
        categoriaRepository.delete(categoria);
    }

    private Categoria buscar(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("No existe la categoría con id " + id));
    }
}
