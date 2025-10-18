# 🌸 Masajes-FloresDeBach  
## Plataforma Web para Flores de Bach y Masoterapia  

Sistema de gestión integral para servicios de terapias alternativas —específicamente Flores de Bach y masoterapia— desarrollado con arquitectura de microservicios.

---

## 📚 Tabla de Contenidos
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
- [Pruebas Manuales con Postman](#pruebas-manuales-con-postman)  
- [Contribución](#contribución)  
- [Autor](#autor)  
- [Licencia](#licencia)

---

## 🧩 Descripción General

Plataforma web diseñada para la gestión, promoción y agendamiento de servicios de Flores de Bach y masoterapia.  
Permite:

- Gestión de productos y servicios  
- Administración de usuarios internos (trabajadores)  
- Gestión de clientes  
- Categorización de productos  
- Autenticación y manejo de roles  
- CRUD completo para todas las entidades  

---

## 🏗️ Arquitectura

El sistema está dividido en **dos microservicios backend** que se comunican con una misma base de datos PostgreSQL:

```
Masajes-FloresDeBach/
│
├── Product-OrderService (Puerto 8082)
│   ├── Gestión de Productos
│   └── Gestión de Categorías
│
└── UserManagementService (Puerto 8081)
    ├── Gestión de Usuarios del Sistema
    └── Gestión de Clientes
```

### Patrón de diseño utilizado
- **Controller – Service – Repository** (3 capas)  
- **DTOs** para transferencia de datos  
- **Entities** con JPA / Hibernate  
- **Manejo lógico de estado activo/inactivo** en las entidades  

---

## ⚙️ Tecnologías Utilizadas

### Backend
- **Java 21**  
- **Spring Boot 3.3.5**  
- **Spring Data JPA**  
- **Spring Web**  
- **Hibernate**  
- **Lombok**  
- **Maven**

### Base de Datos
- **PostgreSQL 16 (alpine, Docker)**  
- **pgAdmin** (administración)

### Herramientas de Desarrollo
- **Visual Studio Code** / **IntelliJ IDEA**  
- **Postman**  
- **Git / GitHub**

---

## 🧠 Requisitos Previos

Asegúrate de tener instalado:

- **Java JDK 21**  
- **Maven 3.9+**  
- **Docker Desktop** (para ejecutar con `docker compose`)  
- **Git**  
- **IDE** (VS Code o IntelliJ IDEA)

---

## 🚀 Instalación y Configuración

### 1️⃣ Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd Masajes-FloresDeBach
```

### 2️⃣ Crear la base de datos (opcional si usas Docker)
```sql
CREATE DATABASE marafloresdb;
```

### 3️⃣ Configurar los servicios

#### Product-OrderService
`Product-OrderService/src/main/resources/application.properties`
```properties
spring.application.name=Product-OrderService
spring.datasource.url=jdbc:postgresql://localhost:5432/marafloresdb
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_PASSWORD
spring.jpa.hibernate.ddl-auto=update
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
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
server.port=8081
```

### 4️⃣ Compilar los servicios
```bash
# Product-OrderService
cd Product-OrderService
mvn clean install

# UserManagementService
cd ../UserManagementService
mvn clean install
```

---

## 🧱 Estructura del Proyecto

```
Masajes-FloresDeBach/
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

## 🧮 Módulos y Funcionalidades

### Product-OrderService
- **Category (Categorías):** CRUD, activación / desactivación, validación de nombres únicos.  
- **Product (Productos):** CRUD, gestión de stock y precios, asociación con categorías, estados (`AVAILABLE`, `OUT_OF_STOCK`, `DISCONTINUED`), filtros por categoría / estado / stock.

### UserManagementService
- **User (Usuarios del Sistema):** CRUD, roles (`ADMIN`, `EMPLOYEE`, `MANAGER`), estados (`ACTIVE`, `INACTIVE`, `SUSPENDED`), autenticación.  
- **Customer (Clientes):** CRUD, estados (`ACTIVE`, `INACTIVE`, `BLOCKED`).

---

## 🔗 API Endpoints

### Product-OrderService (8082)
- `/api/categories` → CRUD y activación / desactivación.  
- `/api/products` → CRUD, stock / precio, activación / desactivación.

### UserManagementService (8081)
- `/api/users` → CRUD, login, gestión de roles y estados.  
- `/api/customers` → CRUD y gestión de estados.

---

## 🗄️ Base de Datos

Tablas principales creadas automáticamente por Hibernate:

| Tabla | Campos principales |
|--------|--------------------|
| **categories** | id, name, description, is_active, created_at, updated_at |
| **products** | id, name, sku, description, price, stock, category_id, status, created_at, updated_at |
| **users** | id, run, first_name, last_name, email, password, role, status, created_at, updated_at |
| **customers** | id, run, first_name, last_name, email, password, status, created_at, updated_at |

---

## ▶️ Ejecución

### Desarrollo local
#### Product-OrderService
```bash
cd Product-OrderService
mvn spring-boot:run
```
Disponible en: [http://localhost:8082](http://localhost:8082)

#### UserManagementService
```bash
cd UserManagementService
mvn spring-boot:run
```
Disponible en: [http://localhost:8081](http://localhost:8081)

### Despliegue con Docker Compose
El proyecto incluye un `docker-compose.yml` que levanta PostgreSQL y ambos microservicios.

1. Construir y levantar:
   ```bash
   docker-compose up --build
   ```
2. (Opcional) Personalizar variables de entorno antes de ejecutar:
   ```bash
   export DB_NAME=marafloresdb
   export DB_USERNAME=postgres
   export DB_PASSWORD=postgres
   ```

Servicios disponibles:
- Product-OrderService → [http://localhost:8082](http://localhost:8082)  
- UserManagementService → [http://localhost:8081](http://localhost:8081)  

La base PostgreSQL expone el puerto `5432` y persiste los datos en el volumen `postgres-data`.

---

## 🧪 Pruebas Manuales con Postman

Flujo sugerido:
1. Crear categorías  
2. Crear productos  
3. Crear usuarios  
4. Crear clientes  

### Ejemplos de peticiones

**Crear Categoría**
```bash
curl -X POST http://localhost:8082/api/categories   -H "Content-Type: application/json"   -d '{"name":"Flores de Bach","description":"Terapias con esencias florales"}'
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

## 🤝 Contribución

1. Haz fork del repositorio  
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)  
3. Realiza tus cambios (`git commit -m "Añadir nueva funcionalidad"`)  
4. Sube la rama (`git push origin feature/nueva-funcionalidad`)  
5. Abre un Pull Request  

---

## 👤 Autor
Desarrollado para el proyecto **Flores de Bach y Masoterapia**.  

---

## 🔒 Licencia
Este proyecto es **privado y de uso interno**.


---

## 💻 Ejemplos de uso desde Postman

A continuación, se muestran ejemplos de cómo crear registros desde **Postman** para probar los endpoints de los microservicios.

### 🧍 Crear User
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "person.one@inbox.cl",
  "password": "string",
  "phone": "667488254",
  "address": "string",
  "region": "string",
  "commune": "string",
  "birthDate": "2025-10-16",
  "run": "12345678-9",
  "role": "ADMIN",
  "status": "ACTIVE"
}
```

### 👤 Crear Customer
```json
{
  "run": "12336945-9",
  "firstName": "pereira",
  "lastName": "string",
  "email": "8@duoc.cl",
  "password": "string",
  "phone": "5804242027",
  "address": "string",
  "region": "string",
  "commune": "string",
  "birthDate": "2025-10-16",
  "status": "ACTIVE"
}
```

### 🌸 Crear Category
```json
{
  "name": "Rosas",
  "description": "Rosas de diferentes colores y tamaños",
  "status": "ACTIVE"
}
```

### 🛒 Crear Product
```json
{
  "name": "Rosa Roja Premium",
  "description": "Rosa roja importada de Ecuador",
  "price": 2500.00,
  "stock": 100,
  "categoryId": 1,
  "imageUrl": "https://ejemplo.com/rosa-roja.jpg",
  "sku": "RP-001",
  "status": "AVAILABLE"
}
```
