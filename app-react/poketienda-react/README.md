# PokéTienda Pearl — versión completa (React + Vite)

Migración del proyecto HTML/CSS/JS a **React + Vite**, con datos persistentes (CRUD simulado sobre `localStorage`), tienda pública, panel de administración, Bootstrap y pruebas con **Jasmine + Karma**.

> Existe una versión reducida del mismo proyecto en [`../poketienda-entrega`](../poketienda-entrega).

## Cómo ejecutarlo

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # Jasmine + Karma (requiere Google Chrome instalado)
npm run build    # genera dist/
npm run lint     # ESLint
```

## Cuentas de demostración

| Perfil | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@duoc.cl` | `admin` |
| Cliente | `cliente@gmail.com` | `1234` |
| Cupones | `PEARL10` (10 %) · `PALKIA20` (20 %) · `ENVIOGRATIS` | |

Para restaurar los datos iniciales: en la consola del navegador ejecutar `localStorage.clear()` y recargar.

## Rutas principales

| Zona | Rutas |
|---|---|
| Tienda | `/`, `/productos`, `/productos/:id`, `/categorias`, `/ofertas`, `/nosotros`, `/blogs`, `/contacto` |
| Cuenta | `/login`, `/registro` |
| Compra | `/carrito`, `/checkout`, `/compra/exito/:id`, `/compra/error/:id` |
| Administración | `/admin` (solo rol Administrador): productos, categorías, usuarios, órdenes, reportes y perfil |

## Estructura

```
src/
  components/   átomos y moléculas reutilizables (Logo, Campo, CardProducto…), forms/ y admin/
  pages/        una vista por ruta; pages/admin/ para el panel
  context/      CarritoContext y AuthContext (+ lógica pura en *Logica.js)
  data/         db.js (repositorios CRUD), pedidos.js, regionesComunas.js
  hooks/        useFormulario, useRepo, useTituloDocumento
  utils/        formato, validaciones, productos, reportes
  styles/       variables.css y hojas de estilo
```

## Documentación

- [`docs/TRAZABILIDAD_PAUTA.md`](docs/TRAZABILIDAD_PAUTA.md) — cada exigencia de la pauta y dónde se cumple.
- [`docs/COBERTURA_TESTING.md`](docs/COBERTURA_TESTING.md) — qué cubren las pruebas.

## Reglas de validación

- Correo: dominios `duoc.cl`, `profesor.duoc.cl` o `gmail.com`.
- Contraseña: entre 4 y 10 caracteres.
- Carrito: máximo 10 unidades por producto.
- Envío gratis desde $50.000.
