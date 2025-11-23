# 🌸 Masajes FloresDeBach

Sistema integral de gestión para un negocio de masajes terapéuticos con terapias florales Bach. Incluye plataforma de cliente, panel administrativo y servicios backend escalables.

---

## 📋 Estructura del Proyecto

```
Masajes-FloresDeBach/
├── API/                          # Microservicios backend
│   ├── Product-OrderService/     # Gestión de productos y órdenes
│   └── UserManagementService/    # Gestión de usuarios y autenticación
├── APP/                          # Frontend
│   ├── app/                      # Aplicación cliente
│   └── app-admin/                # Panel administrativo
├── CategoriesAndProducts.sql     # Base de datos - Categorías y Productos
└── CustomersAndUsers.sql         # Base de datos - Clientes y Usuarios
```

---

## 🔧 Microservicios Backend

### 1. **Product-OrderService** 🛍️
**Ubicación:** `API/Product-OrderService/`

#### Funcionalidades:
- ✅ Gestión completa de productos (crear, leer, actualizar, eliminar)
- ✅ Gestión de categorías de productos
- ✅ Gestión de órdenes/pedidos
- ✅ Cálculo de totales y detalles de órdenes
- ✅ Consultas de inventario

#### Tecnologías:
- **Java** con Spring Boot
- **Maven** para compilación
- **Docker** para contenedorización
- API REST

#### Endpoints principales:
- `GET/POST/PUT/DELETE /products` - Productos
- `GET/POST/PUT/DELETE /categories` - Categorías
- `GET/POST/PUT/DELETE /orders` - Órdenes

---

### 2. **UserManagementService** 👤
**Ubicación:** `API/UserManagementService/`

#### Funcionalidades:
- ✅ Autenticación con JWT
- ✅ Gestión de usuarios administrativos
- ✅ Gestión de clientes
- ✅ Validación de credenciales
- ✅ Generación de tokens seguros
- ✅ Roles y permisos

#### Tecnologías:
- **Java** con Spring Boot
- **JWT** para autenticación segura
- **Maven** para compilación
- **Docker** para contenedorización
- API REST

#### Endpoints principales:
- `POST /auth/login` - Login
- `POST /auth/register` - Registro
- `GET/POST/PUT/DELETE /users` - Usuarios admin
- `GET/POST/PUT/DELETE /customers` - Clientes

---

## 💻 Aplicaciones Frontend

### 1. **App (Cliente)** 🏪
**Ubicación:** `APP/app/`

#### Funcionalidades:
- 🏠 **Home** - Página de inicio con información general
- 🌿 **Productos** - Catálogo completo de masajes y terapias
- 📅 **Agendar** - Sistema de citas/reservas
- 🌸 **Nosotros** - Información sobre la empresa
- ☀️ **Contacto** - Formulario de contacto
- 🪷 **Blogs** - Artículos y contenido educativo
- 🛒 **Carrito** - Gestión de compras
- 📄 **Mis Boletas** - Historial de compras (solo usuarios autenticados)
- 🔑 **Login/Registro** - Autenticación de clientes

#### Tecnologías:
- **React** + Vite
- **React Router** para navegación
- **Zustand** para gestión de estado
- **Bootstrap** para estilos
- **Vitest** para tests

#### Tests incluidos:
- ✅ Navbar - 18 tests
- ✅ Button - 7 tests
- ✅ Footer - 7 tests
- ✅ Content - 7 tests

---

### 2. **App-Admin** 🛠️
**Ubicación:** `APP/app-admin/`

#### Funcionalidades:
- 🏠 **Admin Home** - Dashboard administrativo
- 🛍️ **Productos** - CRUD completo de productos
- ➕ **Crear Producto** - Formulario para nuevos productos
- 📦 **Categorías** - Gestión de categorías
- ➕ **Crear Categoría** - Formulario para nuevas categorías
- 👥 **Usuarios** - Gestión de usuarios administrativos
- 🧩 **Crear Usuario** - Formulario para nuevos usuarios admin
- 👥 **Clientes** - Gestión de clientes registrados
- 🧩 **Crear Cliente** - Formulario para nuevos clientes
- 🔙 **Volver a la tienda** - Enlace a la app cliente
- 🔐 **Cerrar Sesión** - Logout seguro

#### Tecnologías:
- **React** + Vite
- **React Router** para navegación
- **Bootstrap** para estilos
- **JWT** para autenticación
- **Vitest** para tests

#### Tests incluidos:
- ✅ Navbar - 21 tests

---

## 🗄️ Bases de Datos

### CategoriesAndProducts.sql
- Tabla de categorías
- Tabla de productos con relación a categorías
- Precios, descripciones, inventario

### CustomersAndUsers.sql
- Tabla de usuarios administrativos
- Tabla de clientes
- Roles y permisos
- Información de contacto

---

## 👤 Como Usuario - ¿Qué puedo hacer?

### Como Cliente (App) 🛍️

1. **Navegar la tienda**
   - Ver todos los masajes y terapias disponibles
   - Consultar información sobre la empresa
   - Leer artículos de interés en el blog

2. **Agendar citas**
   - Seleccionar fecha y hora disponible
   - Elegir tipo de servicio
   - Confirmar reserva

3. **Realizar compras**
   - Agregar productos al carrito
   - Ver detalles de precios
   - Procesar pago

4. **Gestionar mi cuenta**
   - Registrarse en la plataforma
   - Login seguro con JWT
   - Ver mis compras anteriores (boletas)
   - Acceso a mi historial

5. **Contactar**
   - Enviar mensajes a la empresa
   - Hacer consultas
   - Reportar problemas

---

### Como Administrador (App-Admin) 🛠️

1. **Gestionar Productos**
   - Crear nuevos masajes/terapias
   - Editar detalles y precios
   - Eliminar productos
   - Ver inventario

2. **Gestionar Categorías**
   - Organizar productos por tipo
   - Crear categorías nuevas
   - Editar nombres y descripciones

3. **Gestionar Usuarios**
   - Crear nuevos administradores
   - Ver lista de admins
   - Editar permisos
   - Eliminar cuentas

4. **Gestionar Clientes**
   - Ver lista completa de clientes
   - Crear clientes manualmente
   - Ver información de contacto
   - Editar datos de clientes

5. **Monitoreo**
   - Dashboard con estadísticas
   - Ver órdenes pendientes
   - Historial de transacciones

---

## 🚀 Cómo empezar

### Requisitos
- Node.js 18+
- Java 17+
- Maven
- Docker (opcional)

### Instalación

#### Backend
```bash
cd API/Product-OrderService
mvn clean install
mvn spring-boot:run

cd API/UserManagementService
mvn clean install
mvn spring-boot:run
```

#### Frontend
```bash
cd APP/app
npm install
npm run dev

cd APP/app-admin
npm install
npm run dev
```

### Bases de datos
```bash
# Ejecutar scripts SQL
mysql < CategoriesAndProducts.sql
mysql < CustomersAndUsers.sql
```

---

## 🧪 Testing

Ver archivo `APP/README-TESTS.md` para instrucciones detalladas sobre cómo ejecutar los tests de cada componente.

```bash
npm test -- [ComponentName].test.jsx --run
```

---

## 📦 Deploy con Docker

```bash
cd API/Product-OrderService
docker build -t product-service .
docker run -p 8081:8081 product-service

cd API/UserManagementService
docker build -t user-service .
docker run -p 8082:8082 user-service
```

---

## 🔐 Seguridad

- ✅ Autenticación JWT en todos los endpoints
- ✅ Contraseñas encriptadas
- ✅ Validación de entrada en servidor
- ✅ CORS configurado
- ✅ Roles y permisos por usuario

---

## 📞 Soporte

Para reportar bugs o sugerir mejoras, contacta al equipo de desarrollo.

---

**© 2025 Masajes FloresDeBach - Todos los derechos reservados** 🌸
