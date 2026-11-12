package cl.poketienda.ms_productos.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.List;

public record StockRequest(

        @NotEmpty(message = "Debe incluir al menos un producto")
        @Valid
        List<Item> items
) {

    public record Item(

            @NotNull(message = "El id del producto es obligatorio")
            Long productoId,

            @NotNull(message = "La cantidad es obligatoria")
            @Positive(message = "La cantidad debe ser mayor que 0")
            Integer cantidad
    ) {
    }
}
