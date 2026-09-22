# PokéTienda Pearl

*"Atrapa lo legendario"* — Tienda online temática Pokémon (Generación IV), desarrollada para la asignatura **DSY1104 – Desarrollo Web Frontend**, Duoc UC.

## Descripción del proyecto

PokéTienda Pearl es una tienda en línea dirigida a coleccionistas y fanáticos de la era Pokémon Diamante/Perla. El sitio está construido íntegramente con HTML5, CSS3 y JavaScript vanilla, sin frameworks ni backend, e incorpora dos módulos independientes:

- **Vista Tienda**, orientada al cliente: catálogo de productos, detalle de producto, carrito de compras, registro e inicio de sesión, sección institucional, blog y contacto.
- **Vista Administrador**, orientada a la gestión interna: mantenedores de productos y usuarios.

Toda la lógica de negocio (catálogo, carrito, validaciones de formularios) se ejecuta en el navegador y persiste mediante `localStorage`, sin dependencia de un servidor o base de datos.

## Funcionalidades

### Tienda (vista pública)

| Página | Descripción |
|---|---|
| `index.html` | Página principal: hero, productos destacados y navegación general. |
| `productos.html` | Catálogo con renderizado dinámico, filtro por categoría, búsqueda y orden por precio o nombre. |
| `detalle-producto.html` | Ficha de producto con galería, selector de cantidad y productos relacionados. |
| `carrito.html` | Carrito de compras con control de cantidades, cupones de descuento y cálculo de totales. |
| `registro.html` | Registro de cuenta con selects dependientes de región y comuna. |
| `login.html` | Inicio de sesión con validación de dominio de correo. |
| `nosotros.html` | Historia, misión, visión y equipo de desarrollo. |
| `blogs.html` / `detalle-blog-1.html` / `detalle-blog-2.html` | Blog con artículos sobre la mitología de Sinnoh y la Generación IV. |
| `contacto.html` | Formulario de contacto con validaciones y preguntas frecuentes. |

El carrito persiste en `localStorage`, permite sumar, restar y eliminar ítems, y admite tres cupones: `PEARL10` (10 % de descuento), `PALKIA20` (20 % de descuento) y `ENVIOGRATIS` (envío gratis).

### Panel de administración

| Página | Descripción |
|---|---|
| `admin/home.html` | Panel principal con accesos rápidos. |
| `admin/productos.html` / `admin/producto-form.html` | Listado, búsqueda y formulario de creación/edición de productos (modo determinado por `?id=`). |
| `admin/usuarios.html` / `admin/usuario-form.html` | Listado, búsqueda y formulario de creación/edición de usuarios, con asignación de rol (Administrador, Cliente, Vendedor). |

El panel incluye sidebar colapsable en móvil, búsqueda en tablas y marcado del enlace activo en la navegación.

## Validaciones implementadas

Las validaciones de formularios están centralizadas en `js/validaciones.js` y se aplican en tiempo real y al enviar cada formulario:

- Correo electrónico: solo se aceptan los dominios `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
- Contraseña: entre 4 y 10 caracteres.
- RUN chileno: sin puntos ni guion, con verificación del dígito verificador mediante el algoritmo de módulo 11.
- Campos numéricos (precio, stock): enteros, decimales y valores no negativos según corresponda.
- Mensajes de error accesibles (`role="alert"`, `aria-describedby`, `aria-invalid`).

## Identidad visual

La paleta y la tipografía están inspiradas en la carátula de *Pokémon Pearl Version* (Palkia, tonos cósmicos y acabado nacarado), definidas como variables CSS en `css/variables.css`.

| Uso | Color | HEX |
|---|---|---|
| Primario | Magenta Palkia | `#D63384` |
| Secundario | Púrpura cósmico | `#4A148C` |
| Acento | Amarillo legendario | `#FFC107` |
| Fondo | Negro cósmico | `#1A052A` |
| Éxito / Error | Verde / Rojo | `#28A745` / `#DC3545` |

Tipografías: **Orbitron** (títulos), **Inter** (cuerpo) y **Fredoka One** (precios y acentos), cargadas desde Google Fonts.

## Tecnologías utilizadas

- HTML5 semántico (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`) con atributos de accesibilidad (`aria-*`, skip-link, foco visible).
- CSS3 con metodología BEM y variables CSS (`:root`), sin preprocesadores ni frameworks.
- JavaScript ES6+ vanilla, organizado en módulos aislados mediante IIFE.
- `localStorage` para la persistencia del carrito y del cupón aplicado.
- Google Fonts (Orbitron, Inter, Fredoka One).
- Sin frameworks de frontend, backend ni base de datos en esta versión.

## Estructura del proyecto

```
ProyectoPkmnPearlShop/
├── admin/                  Vista administrativa (5 páginas)
├── css/
│   ├── variables.css       Tokens de diseño: colores, tipografía, espaciado
│   └── styles.css          Estilos de todos los componentes del sitio
├── docs/                   Documentación del proyecto (ERS, identidad visual, bitácoras)
├── images/                 Imágenes de productos, blog y equipo
├── js/                     Catálogo, carrito, validaciones y lógica del panel admin
├── tienda/                 Vista pública (11 páginas)
└── README.md
```

## Instalación y ejecución

El proyecto es completamente estático, por lo que no requiere instalación de dependencias.

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/GabFloresLuna/ProyectoPkmnPearlShop.git
   ```
2. Abrir `tienda/index.html` en el navegador, o servir la carpeta con la extensión **Live Server** de Visual Studio Code (recomendado).

No se requiere ningún paso de compilación ni servidor backend.

## Documentación

La carpeta `docs/` reúne los documentos formales del proyecto:

- `Especificación de Requisitos del Software (ERS)` — Especificación de Requisitos del Software: requerimientos funcionales RF-01 a RF-13, reglas de validación y stack técnico.
- `Propuesta de Identidad Visual — Adaptación _Pokémon Pearl_` — Propuesta de identidad visual: paleta de colores, tipografía, logo y guía de aplicación.
- `Bitácora de Desarrollo — Iteracion 1.pdf` a `Bitácora de Desarrollo — Iteracion 4.pdf` — Bitácoras de desarrollo con el registro de avance de las capas HTML, CSS y del carrito de compras.

## Equipo de desarrollo

| Integrante | Rol |
|---|---|
| Gabriel Flores | Desarrollador Fullstack — arquitectura HTML semántica y lógica de negocio |
| Daniel Rangel | Diseñador UI / Frontend — validaciones de formularios y gestión del repositorio |
| Hernaldo Silva | Desarrollador Frontend / QA — identidad visual y diseño responsivo |

## Flujo de trabajo

El desarrollo se organizó con Git y GitHub, usando ramas de trabajo individuales (`gabo`, `rangel`, `naldo`) integradas a `main` mediante *pull requests*.

## Estado actual

Las capas de estructura (HTML), presentación (CSS) y comportamiento (JavaScript) están implementadas para las 16 vistas del proyecto (11 públicas + 5 administrativas). Quedan fuera del alcance de esta versión la integración con un backend real, la gestión de órdenes de compra y el procesamiento de pagos.

## Licencia

Proyecto desarrollado con fines académicos para la asignatura DSY1104, Duoc UC.
