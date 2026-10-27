# PokéTienda Pearl — versión reducida (React + Vite)

Misma estructura e idea que la versión completa, con ~25 archivos en lugar de ~90.

## Cómo ejecutarlo
```bash
npm install
npm run dev      # http://localhost:5173
npm test         # Jasmine + Karma (necesita Google Chrome instalado)
```
Si lo integras en tu proyecto `poketienda-react` existente: copia `src/`, `test/`, `public/`, `index.html`,
`karma.conf.cjs`, `vite.config.js` y reemplaza `package.json` (o instala lo mismo con
`npm i react-router-dom bootstrap` y `npm i -D karma karma-jasmine karma-chrome-launcher karma-esbuild jasmine-core @testing-library/react @testing-library/dom`).
Las imágenes de productos van en `public/images/` (mismas rutas que usa `src/data/db.js`).

## Cuentas de prueba
| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@duoc.cl | admin |
| Cliente | cliente@gmail.com | 1234 |

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

## Pauta → dónde se cumple
| Exigencia | Dónde |
|---|---|
| Migración a React (componentes, props, JSX) | `components/`, `pages/` |
| Archivo JS con datos + CRUD | `data/db.js` (`crearRepo`: listar, obtener, crear, actualizar, eliminar) |
| Persistencia conectada a componentes | `localStorage` vía `db.js` y `AppContext` (carrito y sesión) |
| Bootstrap responsive | navbar colapsable, `row`/`col-*`, `table-responsive` |
| Vista categorías / ofertas | `pages/Productos.jsx` (filtro por categoría y “solo ofertas”) |
| Checkout, pago correcto y error | `pages/Carrito.jsx` (resultado aprobado / rechazado) |
| Panel de administración | `pages/Admin.jsx` (métricas, CRUD de productos, pedidos) |
| Interactividad y validaciones | `Acceso`, `Contacto`, `Carrito` usan `V` de `utils.js` |

## Pruebas (Jasmine + Karma)
| Archivo | Qué comprueba |
|---|---|
| `data/db.spec.js` | CRUD y persistencia |
| `utils.spec.js` | formato de precio y validaciones |
| `components/CardProducto.spec.jsx` | renderizado, props, renderizado condicional (oferta/sin stock), evento “agregar” |
| `components/Header.spec.jsx` | enlaces, insignia del carrito, enlace Admin solo para administrador |
| `pages/Acceso.spec.jsx` | estado y eventos del formulario, errores de validación |
| `pages/Carrito.spec.jsx` | carrito vacío, total, pago aprobado y rechazado |

Para el documento de cobertura, pega la salida real de `npm test`.

## Antes de entregar
- Repositorio de GitHub **público**.
- ZIP **sin** `node_modules` (ni `dist`).
