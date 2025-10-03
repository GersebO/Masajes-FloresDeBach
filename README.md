# Masajes-FloresDeBach
# Plataforma Web para Flores de Bach y Masoterapia

Sistema de gestión integral para servicios de terapias alternativas, específicamente Flores de Bach y masoterapia, con arquitectura de microservicios.

---

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Arquitectura](#arquitectura)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Módulos y Funcionalidades](#módulos-y-funcionalidades)
- [API Endpoints](#api-endpoints)
- [Base de Datos](#base-de-datos)
- [Ejecución](#ejecución)
- [Testing](#testing)
- [Contribución](#contribución)
- [Autor](#autor)
- [Licencia](#licencia)

---

## Descripción General

Plataforma web diseñada para la gestión, promoción y agendamiento de servicios de Flores de Bach y masoterapia. El sistema permite:

- Gestión de productos y servicios  
- Administración de usuarios del sistema (trabajadores)  
- Gestión de clientes  
- Categorización de productos  
- Sistema de autenticación  
- CRUD completo para todas las entidades  

---

## Arquitectura

El proyecto sigue una arquitectura de **microservicios** con dos servicios principales:

```
├── Product-OrderService (Puerto 8082)
│   ├── Gestión de Productos
│   └── Gestión de Categorías
│
└── UserManagementService (Puerto 8081)
    ├── Gestión de Usuarios (Trabajadores)
    └── Gestión de Clientes
```

### Patrón de diseño utilizado:
- **Controller-Service-Repository** (3 capas)  
- **DTOs** para transferencia de datos  
- **Entities** con JPA/Hibernate  
- **Delete lógico** (soft delete) en todas las entidades  

---

## Tecnologías Utilizadas

### Backend
- **Java 17+**
- **Spring Boot 3.x**
- **Spring Data JPA**
- **Spring Web**
- **Hibernate**
- **Lombok**
- **Maven**

### Base de Datos
- **PostgreSQL 14+**
- **pgAdmin** (herramienta de administración)

### Herramientas de Desarrollo
- **Visual Studio Code** / **IntelliJ IDEA**
- **Postman** (testing de API)
- **Git** (control de versiones)

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Java JDK 17 o superior  
- Maven 3.8+  
- PostgreSQL 14+  
- Git  
- IDE (VS Code o IntelliJ IDEA)  

---

## Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd proyecto-flores-de-bach
```

### 2. Crear la base de datos
```sql
CREATE DATABASE marafloresdb;
```

### 3. Configurar los servicios

#### Product-OrderService
`Product-OrderService/src/main/resources/application.properties`
```properties
spring.application.name=Product-OrderService
spring.datasource.url=jdbc:postgresql://localhost:5432/marafloresdb
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
server.port=8082
```

#### UserManagementService
`UserManagementService/src/main/resources/application.properties`
```properties
spring.application.name=UserManagementService
spring.datasource.url=jdbc:postgresql://localhost:5432/marafloresdb
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
server.port=8081
```

### 4. Compilar los servicios
```bash
# Product-OrderService
cd Product-OrderService
mvn clean install

# UserManagementService
cd ../UserManagementService
mvn clean install
```

---

## Estructura del Proyecto

```
proyecto-flores-de-bach/
│
├── Product-OrderService/
│   └── src/main/java/com/Product/OrderService/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── entity/
│       └── dto/
│
└── UserManagementService/
    └── src/main/java/com/UserManagementService/
        ├── controller/
        ├── service/
        ├── repository/
        ├── entity/
        └── dto/
```

---

## Módulos y Funcionalidades

### Product-OrderService
- **Category (Categorías)**: CRUD, activar/desactivar, validación de nombres únicos.  
- **Product (Productos)**: CRUD, gestión de stock y precios, asociación con categorías, estados (`AVAILABLE`, `OUT_OF_STOCK`, `DISCONTINUED`), filtros por categoría/estado/stock.  

### UserManagementService
- **User (Usuarios del Sistema)**: CRUD, roles (`ADMIN`, `EMPLOYEE`, `MANAGER`), estados (`ACTIVE`, `INACTIVE`, `SUSPENDED`), autenticación.  
- **Customer (Clientes)**: CRUD, estados (`ACTIVE`, `INACTIVE`, `BLOCKED`), autenticación.  

---

## API Endpoints

### Product-OrderService (8082)
- `/api/categories` → CRUD y activación/desactivación de categorías.  
- `/api/products` → CRUD, gestión de stock/precio, activación/desactivación.  

### UserManagementService (8081)
- `/api/users` → CRUD, login, gestión de roles y estados.  
- `/api/customers` → CRUD, login, gestión de estados.  

---

## Base de Datos

Tablas principales creadas automáticamente por Hibernate:

- **categories** → id, name, description, is_active, created_at, updated_at  
- **products** → id, name, sku, description, price, stock, category_id, status, created_at, updated_at  
- **users** → id, run, first_name, last_name, email, password, role, status, created_at, updated_at  
- **customers** → id, run, first_name, last_name, email, password, status, created_at, updated_at  

---

## Ejecución

### Iniciar Product-OrderService
```bash
cd Product-OrderService
mvn spring-boot:run
```
Disponible en: [http://localhost:8082](http://localhost:8082)

### Iniciar UserManagementService
```bash
cd UserManagementService
mvn spring-boot:run
```
Disponible en: [http://localhost:8081](http://localhost:8081)

---

## Testing

- Usar **Postman** para probar endpoints.  
- Flujo recomendado:  
  1. Crear categorías  
  2. Crear productos  
  3. Crear usuarios  
  4. Crear clientes  

### Ejemplos de peticiones

**Crear Categoría**
```bash
curl -X POST http://localhost:8082/api/categories   -H "Content-Type: application/json"   -d '{"name": "Flores de Bach","description": "Terapias con esencias florales"}'
```

**Crear Usuario**
```bash
curl -X POST http://localhost:8081/api/users   -H "Content-Type: application/json"   -d '{
    "run": "12345678-9",
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan.perez@empresa.com",
    "password": "password123",
    "phone": "912345678",
    "address": "Av. Libertador 1234",
    "region": "Región Metropolitana",
    "commune": "Santiago",
    "birthDate": "1990-05-15",
    "role": "ADMIN",
    "status": "ACTIVE"
  }'
```

---

## Contribución

Si deseas contribuir:  
1. Haz un fork del repositorio  
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)  
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)  
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)  
5. Abre un Pull Request  

---

## Autor
Desarrollado para el proyecto de **Flores de Bach y Masoterapia**.  

---

## Licencia
Este proyecto es **privado y de uso interno**.  
