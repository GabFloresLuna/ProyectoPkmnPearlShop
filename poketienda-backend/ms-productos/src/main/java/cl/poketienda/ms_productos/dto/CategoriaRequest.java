package cl.poketienda.ms_productos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoriaRequest(

        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 50, message = "El nombre no puede superar los 50 caracteres")
        String nombre,

        @Size(max = 255, message = "La descripción no puede superar los 255 caracteres")
        String descripcion,

        @Size(max = 20, message = "El color no puede superar los 20 caracteres")
        String color
) {
}
