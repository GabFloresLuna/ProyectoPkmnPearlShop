package cl.poketienda.ms_productos.dto;

import java.util.Map;

public record ErrorResponse(
        int codigo,
        String mensaje,
        Map<String, String> campos
) {

    public static ErrorResponse de(int codigo, String mensaje) {
        return new ErrorResponse(codigo, mensaje, null);
    }
}
