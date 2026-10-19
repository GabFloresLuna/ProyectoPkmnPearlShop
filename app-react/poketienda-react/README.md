# PokéTienda Pearl — Entrega 2 (React)

Migración del proyecto HTML/CSS/JS a **React + Vite**, con datos persistentes (CRUD simulado), tienda pública,
panel de administración, Bootstrap y pruebas con **Jasmine + Karma**.

## 1. Cómo integrarlo en tu proyecto (`poketienda-react`)

1. Descomprime este ZIP **encima** de tu proyecto (mezcla carpetas; reemplaza `index.html`).
2. **Borra** `src/index.css`, `src/App.css` y `src/assets/` (son del template de Vite y ya no se usan).
3. Copia tu carpeta `images/` original **dentro de `public/images/`** (las rutas son `/images/archivo.ext`).
   Archivos usados: `figuraPalkiaLegendaria1/2/3.webp`, `perlaCosmicaDecorativa.jpg`, `setCartasSinnoh.jpeg`,
   `consolaEdicionPerla.jpg`, `estuchePokemonPearl.jpeg`, `albumColeccionistaSinnoh.webp`,
   `lamparaCosmicaGiratina.webp`, `figuraPalkiaTemporal1.jpg`, `blog-perla-mitologia.jpg`, `blog-gen4.jpeg`,
   `gabrielFlores.png`, `danielRangel.jpg`, `danielRangel2.jpg`, `hernaldoSilva.png`.
4. Instala dependencias (en la carpeta del proyecto):

```bash
npm install react-router-dom bootstrap
npm install -D karma karma-jasmine jasmine-core karma-chrome-launcher karma-esbuild esbuild @testing-library/react @testing-library/dom
```

5. En `package.json`, dentro de `"scripts"`, agrega:  `"test": "karma start karma.conf.cjs"`
6. Ejecuta `npm run dev` (app) y `npm test` (pruebas; requiere Google Chrome instalado).

> Las pruebas de lógica (datos, validaciones, carrito, reportes, pedidos) se verificaron ejecutándolas en Node.
> Las pruebas de **componentes** y la compilación con Vite deben correrse en tu equipo: si alguna falla, pega el mensaje y se corrige.

## 2. Cuentas de demostración

| Perfil | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@duoc.cl` | `admin` |
| Cliente | `cliente@gmail.com` | `1234` |
| Cupones | `PEARL10` (10 %) · `PALKIA20` (20 %) · `ENVIOGRATIS` | |

Para restaurar los datos iniciales: en la consola del navegador ejecuta `localStorage.clear()` y recarga.

## 3. Guion sugerido para la presentación (15 min)

1. **Home** → agregar productos: el contador del header (estado compartido) sube en todas las páginas.
2. **Productos**: buscar, filtrar por categoría y ordenar (los filtros viven en la URL). **Categorías** y **Ofertas**.
3. **Detalle de producto**: galería, selector de cantidad con validación, relacionados.
4. **Carrito**: cantidades, cupón `PEARL10`, envío gratis desde $50.000.
5. **Registro / Login** con validaciones (dominios, RUN, regiones y comunas dependientes).
6. **Checkout** → pago aprobado (boleta, stock descontado) y pago rechazado (reintentar).
7. **Admin** (`admin@duoc.cl`): dashboard → productos (crear/editar/eliminar, stock crítico) → categorías → usuarios
   (+ historial de compras) → órdenes/boletas → reportes. Mostrar que la tienda refleja los cambios al instante.
8. **Pruebas**: `npm test` y explicar qué cubre cada archivo `*.spec`.

## 4. Mapa del código (para la ronda de preguntas)

| Carpeta / archivo | Qué hace |
|---|---|
| `src/main.jsx` | Punto de entrada: Bootstrap + estilos + `BrowserRouter` + proveedores de sesión y carrito |
| `src/App.jsx` | **Mapa de rutas** = diagrama de flujo de navegación (tienda y administrador) |
| `src/data/db.js` | "Base de datos" simulada: repositorios con `listar / obtener / crear / actualizar / eliminar`, persistidos en `localStorage`, con suscripción a cambios |
| `src/data/pedidos.js` | Crea la orden y descuenta stock si el pago fue aprobado |
| `src/hooks/useRepo.js` | Conecta una colección de `db.js` con el componente: se re-renderiza cuando los datos cambian |
| `src/hooks/useFormulario.js` | Estado + validación de formularios (reemplaza el patrón repetido en 5 archivos JS) |
| `src/context/carritoLogica.js` | Reducer y cálculo de totales del carrito (lógica pura, probada aparte) |
| `src/context/CarritoContext.jsx` | Estado compartido del carrito (contador del header, carrito, checkout) |
| `src/context/AuthContext.jsx` | Sesión: cliente / administrador |
| `src/components/` | Átomos (`Logo`), moléculas (`Marca`, `Campo`, `CardProducto`, `CarritoItem`), organismos (`Header`, `Footer`, `Navegacion`, `GrillaProductos`, `ResumenCompra`) |
| `src/components/admin/` | `LayoutAdmin`, `RutaAdmin` (guardia de acceso) y `Mantenedor` (tabla CRUD reutilizable) |
| `src/pages/` | Una página por vista de la tienda; `src/pages/admin/` las del panel |
| `src/utils/` | Validaciones, formatos, reglas de producto y reportes |
| `src/styles/` | `variables.css` + `styles.css` (tu CSS original) + `overrides.css` (integración con React/Bootstrap) |
| `karma.conf.cjs`, `src/**/*.spec.*` | Entorno y pruebas Jasmine + Karma |

## 5. Decisiones a conocer (por si preguntan)

- **Catálogo único**: tu HTML y tu `productos.js` tenían IDs y precios distintos (P005–P008). Se tomó `productos.js` como fuente de verdad.
- **Logo**: el tamaño lo controla la prop `size` y cada instancia genera su `id` de degradado con `useId()` (resuelve la deuda del `pearlGrad` duplicado).
- **Bootstrap** se usa como sistema de grilla y utilidades (`row`, `col-*`, `d-flex`, espaciados) en categorías, checkout y panel admin, y su CSS base está cargado en toda la app. La identidad visual sigue siendo tu CSS.
- **Contraseñas** se guardan en texto plano en `localStorage` porque es una simulación académica; un backend real debe usar hash.
- **Pasarela de pago**: el checkout tiene un selector "Resultado simulado" para demostrar el pago correcto y el pago con error.
