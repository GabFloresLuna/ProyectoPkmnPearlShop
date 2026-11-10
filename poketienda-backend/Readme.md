# PokéTienda Pearl · Backend

Backend de la tienda online PokéTienda Pearl para la Evaluación Parcial 3 de DSY1104 Desarrollo Fullstack II (Duoc UC). Son tres microservicios Spring Boot, cada uno con su propia base de datos MySQL, que exponen una API REST protegida con JWT y documentada con Swagger.

Frontend (React): https://github.com/GabFloresLuna/ProyectoPkmnPearlShop

## Equipo

| Integrante | Microservicio |
|---|---|
| Gabriel Flores | ms-productos |
| Daniel Rangel | ms-usuarios |
| Hernaldo Silva | ms-ventas |

## Arquitectura

| Microservicio | Responsabilidad | Puerto | Base de datos | Tablas |
|---|---|---|---|---|
| ms-usuarios | Registro, login, tokens JWT, usuarios y perfil | 8081 | `poketienda_usuarios` | usuario |
| ms-productos | Categorías, productos, ofertas y stock | 8082 | `poketienda_productos` | categoria, producto |
| ms-ventas | Compras, boletas y reportes | 8083 | `poketienda_ventas` | boleta, detalle_boleta |

Ningún microservicio lee las tablas de otro. ms-ventas consulta precios y descuenta stock llamando a la API de ms-productos. Los tres validan el token JWT con la misma clave secreta.

## Estructura de directorios

```
poketienda-backend/
├── README.md
├── .gitignore
├── ms-usuarios/
├── ms-productos/
└── ms-ventas/
```

Los tres microservicios usan la misma estructura de paquetes. El paquete base (`ms_productos`, con guion bajo) es el que genera Spring Initializr a partir del Artifact `ms-productos`.

## Requisitos

- JDK 21
- MySQL 8
- Git
- Postman o Insomnia (para probar la API)
- Node.js (solo para ejecutar el frontend)

Maven no se instala aparte: cada microservicio trae su propio `mvnw`.

## Puesta en marcha

### 1. Clonar el repositorio

```bash
git clone <URL-del-repositorio>
cd poketienda-backend
```

### 2. Crear las bases de datos

Ejecutar en MySQL Workbench. Las tablas las crea JPA al iniciar cada microservicio.

```sql
CREATE DATABASE poketienda_usuarios  CHARACTER SET utf8mb4;
CREATE DATABASE poketienda_productos CHARACTER SET utf8mb4;
CREATE DATABASE poketienda_ventas    CHARACTER SET utf8mb4;
```

### 3. Configurar las variables de entorno

La contraseña de MySQL y la clave del JWT no se guardan en el repositorio. Cada microservicio las lee de estas variables:

| Variable | Contenido |
|---|---|
| `DB_USER` | Usuario de MySQL |
| `DB_PASSWORD` | Contraseña de MySQL |
| `JWT_SECRET` | Clave secreta del JWT (la misma en los tres microservicios, mínimo 32 caracteres) |

Windows (PowerShell):

```powershell
$env:DB_USER="root"
$env:DB_PASSWORD="tu_contraseña"
$env:JWT_SECRET="una_clave_larga_de_al_menos_32_caracteres"
```

macOS o Linux:

```bash
export DB_USER=root
export DB_PASSWORD=tu_contraseña
export JWT_SECRET=una_clave_larga_de_al_menos_32_caracteres
```

Las variables valen solo para la terminal donde se definieron: hay que definirlas en cada terminal antes de ejecutar un microservicio.

### 4. Ejecutar los microservicios

Una terminal por microservicio. ms-productos debe estar arriba antes de registrar compras en ms-ventas.

Windows:

```powershell
cd ms-productos
.\mvnw.cmd spring-boot:run
```

macOS o Linux:

```bash
cd ms-productos
./mvnw spring-boot:run
```

Repetir con `ms-usuarios` y `ms-ventas`.

### 5. Verificar

| Microservicio | Swagger |
|---|---|
| ms-usuarios | http://localhost:8081/swagger-ui.html |
| ms-productos | http://localhost:8082/swagger-ui.html |
| ms-ventas | http://localhost:8083/swagger-ui.html |

Para probar un endpoint protegido: iniciar sesión en `POST /api/v1/auth/login` (ms-usuarios), copiar el access token y pegarlo en el botón **Authorize** de Swagger.

## Pruebas

Pruebas unitarias de un microservicio:

```bash
cd ms-productos
./mvnw test
```

En Windows: `.\mvnw.cmd test`

## API

Todas las rutas comienzan con `/api/v1`. El detalle de cada endpoint está en Swagger.

| Microservicio | Recursos |
|---|---|
| ms-usuarios | `/auth`, `/perfil`, `/usuarios` |
| ms-productos | `/categorias`, `/productos` |
| ms-ventas | `/boletas`, `/reportes` |

Roles: `ADMIN`, `VENDEDOR` y `CLIENTE`. Sin token o con token vencido la API responde 401; con un rol sin permiso responde 403.

## Trabajo en equipo

- Una rama por funcionalidad, por ejemplo `productos/crud-categorias`.
- Se une a `main` mediante Pull Request revisado por otro integrante.
- Los mensajes de commit dicen qué cambió, por ejemplo "valida stock antes de registrar la compra".
- No se suben contraseñas, claves ni la carpeta `target`.
