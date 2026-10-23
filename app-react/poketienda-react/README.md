# PokéTienda Pearl — Entrega 2 (React)

Migración del proyecto HTML/CSS/JS a **React + Vite**, con datos persistentes (CRUD simulado), tienda pública,
panel de administración, Bootstrap y pruebas con **Jasmine + Karma**.

## 1. Cómo integrarlo en tu proyecto (`poketienda-react`)

1. Descomprime este ZIP **encima** de tu proyecto (mezcla carpetas; reemplaza `index.html`).
2. Instala dependencias (en la carpeta del proyecto):

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
