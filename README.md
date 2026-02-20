# 📚 ANIMETOON – Full-Stack Comic Platform

![Versión](https://img.shields.io/badge/version-1.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![NestJS](https://img.shields.io/badge/NestJS-red)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

ANIMETOON es una plataforma full-stack moderna para la publicación y lectura de cómics digitales.  
Construida con una arquitectura escalable utilizando **Next.js 16 (App Router)** en el frontend y **NestJS** en el backend, incluye autenticación JWT, control de acceso por roles (RBAC), lector vertical optimizado y entorno completamente dockerizado.

---

# 🎯 Objetivos del Proyecto

- ⚡ Experiencia de usuario fluida con animaciones modernas.
- 🔐 Seguridad robusta con autenticación JWT + RBAC.
- 🧱 Arquitectura limpia, modular y escalable.
- 🐳 Despliegue simple mediante Docker.
- 🌱 Generación automática de datos de prueba.

---

# 🚀 Quick Start

## 1️⃣ Requisitos

- Docker
- Docker Compose
- Archivo `.env` dentro de la carpeta `backend/` con:

```env
JWT_SECRET=your_secret_key
```

---

## 2️⃣ Levantar el sistema

Desde la raíz del proyecto ejecutar:

```bash
docker-compose up --build
```

Esto iniciará:

- 🗄️ MySQL
- 🔧 API NestJS → http://localhost:3001
- 🌐 Cliente Next.js → http://localhost:3000

---

## 3️⃣ Poblar la Base de Datos (Seeding)

Para generar usuarios, cómics, episodios y páginas automáticamente:

```bash
docker-compose exec backend npm run seed
```

### Credenciales generadas por defecto

| Rol   | Email              | Password  |
|--------|-------------------|-----------|
| Admin  | admin@gmail.com   | admin123  |
| User   | user@gmail.com    | user123   |

---

# 🛠️ Stack Tecnológico

## 🎨 Frontend (Next.js 16)

- App Router
- Server Components
- Middleware para protección de rutas
- Tailwind CSS
- Shadcn/UI
- Framer Motion
- Jose (validación JWT en Edge Runtime)

## 🔧 Backend (NestJS)

- Arquitectura modular (Controllers, Services, Modules)
- TypeORM
- MySQL
- Autenticación JWT
- Bcrypt (hash seguro de contraseñas)
- Faker.js (generación masiva de datos)

---

# 🏗️ Modelo de Datos

Entidades principales del sistema:

- **User** → Gestión de perfiles y roles (admin, author, reader)
- **Comic** → Obra principal con metadatos y portada
- **Episode** → Capítulos numerados asociados a un cómic
- **Page** → Imágenes individuales ordenadas secuencialmente
- **Favorite** → Relación Many-to-Many para la biblioteca personal

---

# 🔐 Seguridad

## RBAC (Role-Based Access Control)

El middleware de Next.js:

- Intercepta peticiones
- Valida el JWT
- Verifica el rol del usuario
- Restringe acceso a rutas protegidas

Rutas protegidas:

- `/favorites`
- `/reader/[id]`
- `/admin/*`

---

# 🌐 Arquitectura API Isomórfica

El servicio de conexión detecta automáticamente:

- Si la petición proviene del servidor (SSR dentro de Docker)
- Si proviene del cliente (browser)

Resolviendo correctamente conflictos de red interna y DNS entre contenedores.

---

# 📂 Estructura del Proyecto

```
.
├── backend/                 # API NestJS (Puerto 3001)
│   ├── src/auth/
│   ├── src/comics/
│   ├── src/db/seeds/
│   └── src/favorites/
│
├── frontend/                # Cliente Next.js (Puerto 3000)
│   ├── src/app/
│   ├── src/components/
│   ├── src/services/
│   └── middleware.ts
│
└── docker-compose.yml       # Orquestación de contenedores
```

---

# 🗺️ Mapa de Rutas

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/` | Público | Galería principal de cómics |
| `/comics/[id]` | Público | Detalle del cómic |
| `/login` | Público | Autenticación |
| `/favorites` | Registrado | Biblioteca personal |
| `/reader/[id]` | Registrado | Lector vertical optimizado |
| `/admin/*` | Admin | Panel de administración |

---

# 🧪 Metodología de Desarrollo

## Atomic Pushes

- Commits pequeños y enfocados
- Cada cambio cumple una sola responsabilidad
- Facilita code review
- Reduce regresiones
- Mejora trazabilidad

---

# 📦 Consideraciones para Producción

- Configurar variables de entorno seguras
- Utilizar base de datos persistente
- Implementar reverse proxy (ej: NGINX)
- Habilitar HTTPS
- Configurar backups automáticos

---

# 📄 Licencia

Proyecto desarrollado con fines educativos y demostrativos.