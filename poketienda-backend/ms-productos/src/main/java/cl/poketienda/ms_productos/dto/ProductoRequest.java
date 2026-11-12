package cl.poketienda.ms_productos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record ProductoRequest(

        @NotBlank(message = "El código es obligatorio")
        @Size(max = 20, message = "El código no puede superar los 20 caracteres")
        String codigo,

        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 100, message = "El nombre no puede superar los 100 caracteres")
        String nombre,

        @Size(max = 500, message = "La descripción no puede superar los 500 caracteres")
        String descripcion,

        @Size(max = 50, message = "La plataforma no puede superar los 50 caracteres")
        String plataforma,

        @NotNull(message = "El precio es obligatorio")
        @Positive(message = "El precio debe ser mayor que 0")
        Integer precio,

        @Positive(message = "El precio de oferta debe ser mayor que 0")
        Integer precioOferta,

        @NotNull(message = "El stock es obligatorio")
        @PositiveOrZero(message = "El stock no puede ser negativo")
        Integer stock,

        @NotNull(message = "El stock crítico es obligatorio")
        @PositiveOrZero(message = "El stock crítico no puede ser negativo")
        Integer stockCritico,

        @Size(max = 255, message = "La ruta de la imagen no puede superar los 255 caracteres")
        String imagenUrl,

        @NotNull(message = "La categoría es obligatoria")
        Long categoriaId
) {
}
