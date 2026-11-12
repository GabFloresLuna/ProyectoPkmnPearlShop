package cl.poketienda.ms_productos.repository;

import cl.poketienda.ms_productos.model.Producto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    boolean existsByCodigoIgnoreCase(String codigo);

    boolean existsByCodigoIgnoreCaseAndIdNot(String codigo, Long id);

    boolean existsByCategoriaId(Long categoriaId);

    @Query("""
            SELECT p FROM Producto p JOIN FETCH p.categoria c
            WHERE (:categoriaId IS NULL OR c.id = :categoriaId)
              AND (:texto IS NULL OR LOWER(p.nombre) LIKE LOWER(CONCAT('%', :texto, '%')))
            ORDER BY p.id
            """)
    List<Producto> buscar(@Param("categoriaId") Long categoriaId, @Param("texto") String texto);

    @Query("SELECT p FROM Producto p JOIN FETCH p.categoria WHERE p.id = :id")
    Optional<Producto> buscarPorIdConCategoria(@Param("id") Long id);

    @Query("SELECT p FROM Producto p JOIN FETCH p.categoria WHERE p.precioOferta IS NOT NULL ORDER BY p.id")
    List<Producto> buscarOfertas();

    @Query("SELECT p FROM Producto p JOIN FETCH p.categoria WHERE p.stock <= p.stockCritico ORDER BY p.stock")
    List<Producto> buscarCriticos();
}
