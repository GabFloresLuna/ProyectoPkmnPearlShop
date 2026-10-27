# PokéTienda Pearl — versión de entrega (React + Vite)

Migración del proyecto HTML/CSS/JS a **React**, con datos persistentes (CRUD sobre `localStorage`), Bootstrap responsive, panel de administración y pruebas con **Jasmine + Karma**. Es la versión reducida del proyecto: misma estructura e idea que [`../poketienda-react`](../poketienda-react), con menos archivos.

## Cómo ejecutarlo

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # Jasmine + Karma (necesita Google Chrome instalado)
npm run build    # genera dist/
```

> `node_modules/` no se sube al repositorio (ver `.gitignore`); `npm install` lo genera.

## Cuentas de demostración

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@duoc.cl` | `admin` |
| Cliente | `cliente@gmail.com` | `1234` |

Para restaurar los datos iniciales: en la consola del navegador ejecutar `localStorage.clear()` y recargar.

## Estructura

```
src/
  main.jsx · App.jsx · styles.css · utils.js
  context/AppContext.jsx      carrito + sesión (estado compartido)
  data/db.js                  datos iniciales + CRUD con localStorage
  components/                 Logo, Campo, CardProducto, Header, Footer
  pages/                      Home, Productos, DetalleProducto, Carrito, Acceso,
                              Contacto, Nosotros, Blogs, Admin
```

## Rúbrica → dónde se cumple

| Exigencia | Dónde |
|---|---|
| Migración a React (componentes, props, JSX) | `components/`, `pages/` |
| Archivo JS con datos + CRUD | `data/db.js` (`crearRepo`: listar, obtener, crear, actualizar, eliminar) |
| Persistencia conectada a componentes | `localStorage` vía `db.js` y `AppContext` (carrito y sesión) |
| Bootstrap responsive | navbar colapsable, `row`/`col-*`, `table-responsive` |
| Vistas de categorías y ofertas | `pages/Productos.jsx` (filtro por categoría y “solo ofertas”) |
| Checkout, pago correcto y error | `pages/Carrito.jsx` (resultado aprobado / rechazado) |
| Panel de administración | `pages/Admin.jsx` (métricas, CRUD de productos, pedidos) |
| Interactividad y validaciones | `Acceso`, `Contacto`, `Carrito` usan `V` de `utils.js` |

## Pruebas (Jasmine + Karma)

| Archivo | Qué comprueba |
|---|---|
| `data/db.spec.js` | CRUD y persistencia |
| `utils.spec.js` | formato de precio y validaciones |
| `components/CardProducto.spec.jsx` | renderizado, props, renderizado condicional (oferta / sin stock), evento “agregar” |
| `components/Header.spec.jsx` | enlaces, insignia del carrito, enlace Admin solo para administrador |
| `pages/Acceso.spec.jsx` | estado y eventos del formulario, errores de validación |
| `pages/Carrito.spec.jsx` | carrito vacío, total, pago aprobado y rechazado |

<!-- Tras ejecutar `npm test`, pegar aquí el resumen real: "Executed N of N SUCCESS". -->
