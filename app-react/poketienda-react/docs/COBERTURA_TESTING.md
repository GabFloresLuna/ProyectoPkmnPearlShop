# Documento de cobertura del testing (borrador)

**Herramientas:** Jasmine (pruebas) + Karma (ejecución en Chrome) + karma-esbuild (compila JSX) + React Testing Library (monta componentes).
**Comando:** `npm test`.

> Completar con los resultados reales de tu ejecución: nº de pruebas, fallos y captura del reporte de Karma.

## 1. Pruebas por tipo (según el anexo del docente)

| Tipo de prueba del anexo | Tarea pedida | Archivo(s) que la cubren |
|---|---|---|
| **Renderizado correcto** | Que los componentes de lista rendericen todos los elementos de un conjunto de datos | `GrillaProductos.spec.jsx` (una tarjeta por producto), `Navegacion.spec.jsx` (un `<li>` por enlace) |
| **Renderizado condicional** | Que un mensaje de error solo se muestre cuando hay error | `Campo.spec.jsx` (error solo con `error`), `FormularioContacto.spec.jsx`, `FormularioLogin.spec.jsx`, `ResumenCompra.spec.jsx` (cupón inválido), `AdminProductoForm.spec.jsx` (alerta de stock crítico), `RutaAdmin.spec.jsx` |
| **Propiedades recibidas (props)** | Que un botón reciba la etiqueta y la función `onClick` | `CardProducto.spec.jsx` (llama a `onAgregar` con el producto), `Logo.spec.jsx` (`size`), `Navegacion.spec.jsx` (`abierto`, `onClick`) |
| **Gestión del estado** | Que el estado de un formulario cambie al escribir | `FormularioContacto.spec.jsx` (valor y contador), `Campo.spec.jsx` (Ver/Ocultar contraseña), `Header.spec.jsx` (menú) |
| **Simulación de eventos** | Simular un clic y comprobar que cambia el estado o se ejecuta una función | `CardProducto.spec.jsx` ("✓ Añadido"), `Header.spec.jsx` (hamburguesa y contador compartido), `FormularioLogin.spec.jsx` (abre sesión), `AdminProductoForm.spec.jsx` (crea producto) |

## 2. Pruebas de la lógica de negocio (sin interfaz)

| Archivo | Qué verifica |
|---|---|
| `src/data/db.spec.js` | CRUD completo, ids autogenerados, id duplicado, persistencia en `localStorage`, suscripción a cambios, reinicio |
| `src/data/pedidos.spec.js` | Pago aprobado descuenta stock; rechazado no; stock nunca negativo; historial por usuario |
| `src/utils/validaciones.spec.js` | Correo (dominios), contraseña (4–10), RUN con módulo 11, coincidencias, teléfono, números |
| `src/context/carrito.spec.js` | Reducer del carrito, límites de cantidad, totales, envío gratis, cupones |
| `src/utils/productos.spec.js` | Precio final, % de oferta, stock crítico, filtros y orden, reporte de ventas |

## 3. Resultados de la ejecución (completar)

- Fecha y equipo: ____
- Total de pruebas: ____ · Exitosas: ____ · Fallidas: ____
- Captura del reporte de Karma: ____

## 4. Análisis y limitaciones (completar con tu criterio)

- Qué módulos quedan sin pruebas automáticas (por ejemplo, las páginas de contenido estático: Nosotros, Blogs).
- Qué se probó manualmente (flujo completo de compra, panel admin).
- Mejoras futuras: pruebas de las páginas de checkout y de los mantenedores de categorías y usuarios.
