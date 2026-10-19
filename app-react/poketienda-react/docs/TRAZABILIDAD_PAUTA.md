# Trazabilidad: requisitos de la pauta → implementación

| Requisito (Anexo 1, Evaluación 2) | Dónde está implementado |
|---|---|
| Migración de HTML a componentes React reutilizables | `src/components/**`, `src/pages/**` (10 páginas HTML + admin convertidas) |
| Cada componente maneja su estado y props | `CardProducto` (props + estado "Añadido"), `Campo` (props + estado Ver/Ocultar), `Header` (estado del menú), `useFormulario` (estado de formularios) |
| Archivo de datos JS como fuente simulada | `src/data/db.js` (semillas de productos, categorías, usuarios, órdenes) |
| Funciones CRUD (crear, leer, actualizar, eliminar) | `crearRepositorio()` en `db.js`: `crear`, `listar/obtener`, `actualizar`, `eliminar` |
| Persistencia conectada a los componentes en tiempo real | `localStorage` + `suscribir()` en `db.js` + hook `useRepo` (los cambios del admin se ven al instante en la tienda) |
| Diseño responsivo con Bootstrap | `bootstrap` importado en `main.jsx`; grilla/utilidades en `Categorias`, `Checkout`, `Admin*`; CSS responsivo propio en `styles.css` y `overrides.css` |
| Vistas: Home, Productos, Detalle, Registro, Login, Nosotros, Blogs (+2 detalles), Contacto | `src/pages/*.jsx` |
| Vistas nuevas: Categorías, Ofertas, Comprar (checkout), Pago correcto / con error | `Categorias`, `Ofertas`, `Carrito`, `Checkout`, `CompraExitosa`, `CompraFallida` |
| Panel administrador: Dashboard, Órdenes/Boletas, Productos (nuevo, mostrar, editar, críticos, reportes), Categorías (nueva, editar), Usuarios (nuevo, mostrar, editar, historial), Reportes, Perfil | `src/pages/admin/**` + rutas en `App.jsx` |
| Interactividad: formularios avanzados, filtros de búsqueda, navegación mejorada | `useFormulario` + `Campo`, filtros en `Productos` (URL), `NavLink`, rutas protegidas (`RutaAdmin`) |
| Configuración de pruebas con Jasmine y Karma | `karma.conf.cjs`, `test/setup.js`, script `npm test` |
| Pruebas unitarias: renderizado, props, estado, eventos | ver `docs/COBERTURA_TESTING.md` |
| Entrega: GitHub público, proyecto comprimido, ERS V2, doc. de cobertura de testing | pendiente del equipo: ver "Siguientes pasos" |
