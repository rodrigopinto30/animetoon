# 📚 ANIMETOON - Full-Stack Comic Platform

![Versión](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![NestJS](https://img.shields.io/badge/NestJS-10-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

**ANIMETOON** es una plataforma integral para la publicación y lectura de cómics digitales. Diseñada con un enfoque en la experiencia de usuario (UX) y la escalabilidad, permite a los autores gestionar sus obras y a los lectores sumergirse en historias mediante un lector vertical optimizado.

---

## 📝 Secciones del Proyecto

### 1. 🚀 Características Principales
* **Gestión de Contenido (CRUD):** Sistema completo para crear, leer, actualizar y eliminar cómics y episodios.
* **Biblioteca Personal:** Los usuarios pueden marcar cómics como favoritos con persistencia en base de datos y animaciones fluidas.
* **Lector Premium:** Visualizador de episodios con scroll vertical, optimizado para una lectura sin interrupciones.
* **Panel Administrativo:** Dashboard robusto para el control de publicaciones y métricas básicas.
* **Autenticación Segura:** Flujo completo de registro e inicio de sesión basado en roles.

### 2. 🛠️ Stack Tecnológico
#### **Frontend (El Cliente)**
* **Next.js:** Uso de *App Router* y componentes híbridos (SSR y Client Components).
* **Tailwind CSS:** Diseño responsivo y estilizado basado en utilidades.
* **Framer Motion:** Micro-interacciones y transiciones suaves entre páginas.
* **Shadcn/UI:** Componentes de interfaz accesibles y consistentes.
* **Lucide React:** Set de iconos minimalistas y modernos.

#### **Backend (La API)**
* **NestJS:** Arquitectura modular y escalable para el lado del servidor.
* **TypeORM:** Gestión de base de datos relacional con MySQL.
* **JWT & Passport:** Estrategia de seguridad para la protección de endpoints.
* **Multer:** Procesamiento eficiente de archivos multimedia (portadas y páginas).

---

## 🛡️ Buenas Prácticas y Calidad de Código

### **Arquitectura Isomórfica**
Se implementó un servicio de conexión a API inteligente que detecta el entorno de ejecución. Esto permite que el servidor de Next.js (Node) se comunique internamente mediante la red de Docker (`http://backend`), mientras que el navegador utiliza la red externa (`localhost`), evitando errores de resolución de nombres.

### **Seguridad de Nivel Producción**
* **RBAC (Role-Based Access Control):** Control de acceso basado en roles (Admin, Author, Reader) para proteger el contenido.
* **Data Validation:** Validación estricta de datos mediante DTOs en el backend y esquemas en el frontend.
* **Null-Safety:** Manejo preventivo de errores de punteros nulos para evitar caídas del servidor durante consultas a la DB.

### **Metodología de Desarrollo**
* **Atomic Pushes:** Siguiendo la filosofía de cambios frecuentes y pequeños para facilitar el mantenimiento y evitar regresiones.
* **Separación de Preocupaciones (SoC):** Lógica de negocio encapsulada en servicios, dejando los controladores y componentes limpios.

---

## 📂 Estructura de Archivos
```text
.
├── backend/                # API en NestJS
│   ├── src/auth/           # Seguridad y Roles
│   ├── src/comics/         # Lógica de Cómics y Episodios
│   └── src/favorites/      # Gestión de Biblioteca
├── frontend/               # Cliente en Next.js
│   ├── src/app/            # Sistema de Rutas
│   ├── src/components/     # UI Reutilizable
│   └── src/services/       # Comunicación con API
└── docker-compose.yml      # Orquestación de Contenedores