# 📋 Especificación de Requisitos del Software (ERS)
## Masajes FloresDeBach

**Versión:** 1.0  
**Fecha:** 23 de Noviembre de 2025  
**Autor:** Equipo de Desarrollo  
**Estado:** Activo

---

## 1. Introducción

### 1.1 Propósito
Este documento especifica los requisitos funcionales y no funcionales del sistema **Masajes FloresDeBach**, una plataforma integral de gestión para un negocio de masajes terapéuticos con terapias florales Bach.

### 1.2 Alcance
El sistema incluye:
- **Frontend Cliente (App):** Plataforma de compra y agendamiento
- **Frontend Admin (App-Admin):** Panel administrativo de gestión
- **Backend (API REST):** Dos microservicios (Productos/Órdenes y Usuarios)
- **Base de Datos:** MySQL con tablas de productos, clientes, usuarios

### 1.3 Audiencia
- Desarrolladores Frontend y Backend
- Product Managers
- Testers y QA
- Stakeholders del negocio

---

## 2. Descripción General del Sistema

### 2.1 Visión del Producto
Crear una plataforma de e-commerce y agendamiento que permita a clientes comprar servicios de masajes/terapias y agendar citas, mientras que los administradores gestionan productos, clientes y órdenes de manera eficiente.

### 2.2 Objetivos Principales
1. ✅ Proporcionar experiencia de compra intuitiva a clientes
2. ✅ Facilitar agendamiento de citas online
3. ✅ Permitir gestión completa de productos y categorías
4. ✅ Implementar sistema de autenticación seguro con JWT
5. ✅ Generar reportes de ventas y clientes

### 2.3 Características Principales

#### **App Cliente**
- Catálogo de productos/servicios
- Carrito de compras
- Agendamiento de citas
- Historial de compras
- Autenticación de clientes
- Blog de contenido educativo
- Información de empresa y contacto

#### **App Admin**
- CRUD completo de productos
- Gestión de categorías
- Gestión de usuarios admin
- Gestión de clientes
- Dashboard con estadísticas
- Acceso a órdenes y reportes

#### **API Backend**
- Autenticación JWT
- Gestión de productos y órdenes
- Gestión de usuarios y clientes
- Validación de datos
- Manejo de errores robusto

---

## 3. Requisitos Funcionales

### 3.1 Módulo de Autenticación

#### RF-001: Login de Cliente
**Descripción:** El cliente debe poder iniciar sesión con email y contraseña  
**Actor:** Cliente  
**Precondición:** Cliente registrado en el sistema  
**Flujo Normal:**
1. Cliente ingresa email y contraseña
2. Sistema valida credenciales
3. Sistema genera token JWT
4. Cliente es redirigido al home
**Poscondición:** Cliente autenticado en la sesión

#### RF-002: Registro de Cliente
**Descripción:** Nuevo cliente puede registrarse en el sistema  
**Actor:** Usuario no autenticado  
**Datos requeridos:** Nombre, email, contraseña, teléfono  
**Validaciones:**
- Email único y válido
- Contraseña mínimo 8 caracteres
- Teléfono válido
**Poscondición:** Cliente registrado y puede iniciar sesión

#### RF-003: Login Admin
**Descripción:** Administrador inicia sesión en panel administrativo  
**Actor:** Administrador  
**Datos requeridos:** Email y contraseña  
**Poscondición:** Admin autenticado con rol de administrador

#### RF-004: Logout
**Descripción:** Usuario cierra sesión y se elimina token JWT  
**Actor:** Cliente/Admin autenticado  
**Poscondición:** Sesión cerrada, token invalidado

#### RF-005: Recuperación de Contraseña
**Descripción:** Usuario puede recuperar contraseña olvidada via email  
**Actor:** Usuario no autenticado  
**Flujo:**
1. Usuario ingresa email
2. Sistema envía enlace de recuperación
3. Usuario establece nueva contraseña

---

### 3.2 Módulo de Productos

#### RF-010: Listar Productos
**Descripción:** Mostrar catálogo de todos los productos disponibles  
**Actor:** Cliente/Visitante  
**Filtros disponibles:**
- Por categoría
- Por precio (rango)
- Por nombre (búsqueda)
- Por disponibilidad
**Paginación:** Mínimo 10 productos por página

#### RF-011: Ver Detalle de Producto
**Descripción:** Mostrar información completa de un producto  
**Datos mostrados:**
- Nombre, descripción, precio
- Imágenes
- Stock disponible
- Categoría
- Reseñas de clientes

#### RF-012: Crear Producto (Admin)
**Descripción:** Administrador crea nuevo producto  
**Actor:** Administrador  
**Datos requeridos:**
- Nombre (obligatorio)
- Descripción
- Precio (obligatorio)
- Categoría (obligatorio)
- Stock (obligatorio)
- Imágenes
- Estado (activo/inactivo)
**Validaciones:**
- Precio mayor a 0
- Stock no negativo
- Nombre único

#### RF-013: Editar Producto (Admin)
**Descripción:** Administrador modifica datos de un producto  
**Actor:** Administrador  
**Restricción:** Solo puede editar su propio producto
**Datos editables:** Todos excepto ID

#### RF-014: Desactivar/Activar Producto (Admin)
**Descripción:** Cambiar estado de producto  
**Actor:** Administrador  
**Lógica:** No elimina, solo cambia estado a inactivo

#### RF-015: Gestionar Categorías (Admin)
**Descripción:** CRUD completo de categorías  
**Operaciones:**
- Crear categoría
- Editar nombre/descripción
- Listar categorías
- Desactivar categoría

---

### 3.3 Módulo de Carrito

#### RF-020: Agregar al Carrito
**Descripción:** Cliente agrega producto al carrito  
**Actor:** Cliente autenticado  
**Datos requeridos:** ID Producto, cantidad  
**Validaciones:**
- Cantidad > 0
- Producto disponible
- Stock suficiente
**Poscondición:** Producto agregado al carrito

#### RF-021: Ver Carrito
**Descripción:** Mostrar todos los items en el carrito  
**Datos mostrados:**
- Producto, cantidad, precio unitario
- Subtotal por item
- Total general
- IVA (19%)

#### RF-022: Actualizar Cantidad
**Descripción:** Cambiar cantidad de producto en carrito  
**Validaciones:** Cantidad > 0 y ≤ stock disponible

#### RF-023: Eliminar del Carrito
**Descripción:** Remover producto del carrito

#### RF-024: Limpiar Carrito
**Descripción:** Vaciar todos los items del carrito

---

### 3.4 Módulo de Órdenes

#### RF-030: Crear Orden
**Descripción:** Cliente crea orden desde carrito  
**Actor:** Cliente autenticado  
**Flujo:**
1. Cliente revisa carrito
2. Ingresa datos de envío/contacto
3. Selecciona método de pago
4. Confirma orden
**Cálculos:**
- Subtotal = suma de (cantidad × precio)
- IVA = subtotal × 0.19
- Total = subtotal + IVA
**Poscondición:** Orden creada con estado "PENDIENTE"

#### RF-031: Ver Orden/Boleta
**Descripción:** Cliente visualiza detalles de su orden  
**Actor:** Cliente autenticado  
**Datos mostrados:**
- ID Orden, fecha
- Items (producto, cantidad, precio)
- Total, IVA
- Estado
- Número de boleta

#### RF-032: Listar Órdenes (Cliente)
**Descripción:** Mostrar historial de compras del cliente  
**Actor:** Cliente autenticado  
**Filtros:** Por fecha, por estado, búsqueda

#### RF-033: Cambiar Estado de Orden (Admin)
**Descripción:** Admin actualiza estado de orden  
**Estados disponibles:**
- PENDIENTE → CONFIRMADA → ENVIADA → ENTREGADA
- CANCELADA (desde cualquier estado)
**Notificación:** Cliente notificado por cambio de estado

#### RF-034: Generar Boleta PDF
**Descripción:** Crear documento PDF de la orden  
**Contenido:** Datos completos de la orden

---

### 3.5 Módulo de Agendamiento

#### RF-040: Agendar Cita
**Descripción:** Cliente agenda cita de masaje/terapia  
**Actor:** Cliente autenticado  
**Datos requeridos:**
- Servicio (obligatorio)
- Fecha (no pasada)
- Hora
- Notas adicionales
**Validaciones:**
- Fecha mínima: hoy
- Fecha máxima: 3 meses adelante
- Horarios: 09:00 - 18:00, cada hora
**Poscondición:** Cita agendada, cliente notificado

#### RF-041: Ver Citas Agendadas (Cliente)
**Descripción:** Listar citas del cliente  
**Actor:** Cliente autenticado

#### RF-042: Cancelar Cita
**Descripción:** Cliente cancela cita agendada

#### RF-043: Listar Disponibilidad
**Descripción:** Mostrar horarios disponibles para una fecha  
**Lógica:** Excluir horarios ya reservados

---

### 3.6 Módulo de Gestión de Usuarios

#### RF-050: Crear Usuario Admin
**Descripción:** Admin crea nueva cuenta de administrador  
**Actor:** Administrador  
**Datos requeridos:**
- Nombre completo
- Email (único)
- Contraseña
- Rol (ADMIN)
**Validaciones:** Email válido, contraseña fuerte

#### RF-051: Listar Usuarios
**Descripción:** Ver todos los usuarios admin  
**Actor:** Administrador  
**Filtros:** Por estado, por rol

#### RF-052: Editar Usuario
**Descripción:** Modificar datos de usuario  
**Datos editables:** Nombre, email, rol

#### RF-053: Desactivar/Activar Usuario
**Descripción:** Cambiar estado de usuario admin

#### RF-054: Eliminar Usuario
**Descripción:** Remover usuario del sistema  
**Restricción:** No se puede eliminar a sí mismo

---

### 3.7 Módulo de Gestión de Clientes

#### RF-060: Listar Clientes
**Descripción:** Admin ve todos los clientes registrados  
**Actor:** Administrador  
**Información mostrada:**
- Nombre, email, teléfono
- Fecha de registro
- Total gastado
- Última compra

#### RF-061: Ver Perfil de Cliente
**Descripción:** Admin visualiza detalles completos de cliente  
**Datos:** Información personal, historial de compras, citas

#### RF-062: Crear Cliente Manual (Admin)
**Descripción:** Admin registra cliente sin que se autoregistre  
**Actor:** Administrador

#### RF-063: Editar Cliente
**Descripción:** Admin modifica datos de cliente

#### RF-064: Desactivar Cliente
**Descripción:** Desactivar cuenta de cliente

---

### 3.8 Módulo de Contenido

#### RF-070: Ver Blog
**Descripción:** Cliente visualiza artículos educativos  
**Contenido:** Sobre masajes, terapias Bach, bienestar

#### RF-071: Ver Información de Empresa
**Descripción:** Mostrar datos: Nosotros, ubicación, horarios

#### RF-072: Formulario de Contacto
**Descripción:** Cliente envía consulta via formulario  
**Datos:** Nombre, email, mensaje  
**Validación:** Email válido  
**Poscondición:** Email enviado a empresa

---

## 4. Requisitos No Funcionales

### 4.1 Rendimiento
- **RNF-001:** Tiempo de carga < 2 segundos
- **RNF-002:** API responde en < 500ms (p95)
- **RNF-003:** Soportar 1000 usuarios concurrentes
- **RNF-004:** Caché de productos actualizado cada 5 minutos

### 4.2 Seguridad
- **RNF-010:** Autenticación con JWT (token válido 24 horas)
- **RNF-011:** Contraseñas encriptadas con bcrypt
- **RNF-012:** HTTPS en todas las conexiones
- **RNF-013:** Validación de entrada en servidor y cliente
- **RNF-014:** CORS configurado solo para dominios permitidos
- **RNF-015:** Rate limiting: máx 100 requests/minuto por IP

### 4.3 Disponibilidad
- **RNF-020:** Uptime >= 99%
- **RNF-021:** Backups automáticos diarios
- **RNF-022:** Recuperación ante fallos en < 30 minutos

### 4.4 Escalabilidad
- **RNF-030:** Arquitectura de microservicios
- **RNF-031:** Base de datos normalizada
- **RNF-032:** Cache en Redis para mejora de performance
- **RNF-033:** CDN para servir imágenes

### 4.5 Usabilidad
- **RNF-040:** Interfaz responsive (mobile, tablet, desktop)
- **RNF-041:** Tiempo máximo de aprendizaje: 5 minutos
- **RNF-042:** Accesibilidad WCAG 2.1 nivel AA

### 4.6 Mantenibilidad
- **RNF-050:** Código comentado y documentado
- **RNF-051:** Tests unitarios con cobertura > 80%
- **RNF-052:** Tests de integración para APIs principales

### 4.7 Compatibilidad
- **RNF-060:** Navegadores: Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- **RNF-061:** Dispositivos: iOS 12+, Android 6+
- **RNF-062:** Java 17+, Node 18+

---

## 5. Requisitos de Datos

### 5.1 Estructura de Base de Datos

```
TABLAS PRINCIPALES:

Usuarios
├── id (PK)
├── email (UNIQUE)
├── firstName
├── lastName
├── password (hashed)
├── role (ADMIN, USER)
├── status (ACTIVE, INACTIVE)
├── createdAt
└── updatedAt

Customers
├── id (PK)
├── email (UNIQUE)
├── firstName
├── lastName
├── phone
├── password (hashed)
├── address
├── status (ACTIVE, INACTIVE)
├── createdAt
└── updatedAt

Productos
├── id (PK)
├── name (UNIQUE)
├── description
├── price (DECIMAL)
├── categoryId (FK)
├── stock (INT)
├── image (URL)
├── status (ACTIVE, INACTIVE)
├── createdAt
└── updatedAt

Categorías
├── id (PK)
├── name (UNIQUE)
├── description
├── status (ACTIVE, INACTIVE)
└── createdAt

Órdenes
├── id (PK)
├── customerId (FK)
├── total (DECIMAL)
├── iva (DECIMAL)
├── status (PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED)
├── createdAt
└── updatedAt

OrderItems
├── id (PK)
├── orderId (FK)
├── productId (FK)
├── quantity (INT)
├── unitPrice (DECIMAL)
└── totalPrice (DECIMAL)

Citas (Appointments)
├── id (PK)
├── customerId (FK)
├── serviceId (FK - Producto)
├── appointmentDate (DATETIME)
├── notes
├── status (SCHEDULED, COMPLETED, CANCELLED)
└── createdAt
```

### 5.2 Volumen de Datos Esperado
- **Productos:** 50-100
- **Categorías:** 10-15
- **Clientes:** 1000+
- **Órdenes mensuales:** 100-500
- **Citas mensuales:** 200-1000

### 5.3 Retención de Datos
- **Órdenes:** 5 años (requisito legal)
- **Clientes inactivos:** Archivar después de 2 años
- **Logs:** 90 días

---

## 6. Interfaces de Usuario

### 6.1 Pantallas Principales - App Cliente

#### Home
- Hero image/banner
- Catálogo destacado de productos
- Testimonios
- CTA a contacto

#### Productos
- Grid de productos con filtros
- Buscador
- Paginación
- Modal con detalle

#### Carrito
- Lista de items
- Cantidad editable
- Total con IVA
- Botón checkout

#### Checkout
- Confirmación de orden
- Datos de contacto
- Resumen total

#### Mis Compras
- Tabla de órdenes
- Ver detalles
- Descargar boleta

#### Agendar Cita
- Selector de servicio
- Calendario con disponibilidad
- Selector de hora
- Confirmación

### 6.2 Pantallas Principales - App Admin

#### Dashboard
- KPIs: Total ventas, clientes nuevos, citas
- Gráficos: Ventas por mes, productos top

#### Gestión de Productos
- Tabla de productos
- CRUD (crear, editar, eliminar, desactivar)
- Filtros por categoría, estado

#### Gestión de Categorías
- CRUD de categorías

#### Gestión de Usuarios
- Lista de admins
- CRUD de usuarios
- Cambio de rol

#### Gestión de Clientes
- Tabla de clientes
- Ver historial de compras

---

## 7. Requisitos de Seguridad

### 7.1 Autenticación
- JWT con expiración de 24 horas
- Refresh tokens para renovación
- Logout invalida token

### 7.2 Autorización
- Roles basados en permisos:
  - **CUSTOMER:** Acceso a compras, citas, perfil
  - **ADMIN:** Acceso a panel administrativo completo
  - **SUPER_ADMIN:** Gestión de admins y configuración

### 7.3 Encriptación
- Contraseñas: bcrypt con salt 10
- Datos sensibles en tránsito: HTTPS
- Base de datos: Encriptación de campos sensibles si necesario

### 7.4 Validación
- Validación en cliente (UX)
- Validación en servidor (seguridad)
- Sanitización de inputs
- Protección contra XSS y SQL Injection

### 7.5 Auditoría
- Log de acciones de admins
- Registro de cambios en productos
- Historial de órdenes completo

---

## 8. Restricciones y Asunciones

### 8.1 Restricciones Técnicas
- **Base de datos:** MySQL 8.0+
- **Backend:** Java 17+, Spring Boot
- **Frontend:** React 19+, Node 18+
- **Hosting:** Acceso a servidor con Docker

### 8.2 Restricciones de Negocio
- Máximo 3 admins activos
- Productos no pueden tener precio negativo
- Citas solo en horario 09:00-18:00
- IVA fijo en 19%

### 8.3 Asunciones
- Clientes tienen email válido
- Proveedores actualizan stock manualmente
- Internet de clientes es estable
- Productos son digitales o se envían después

---

## 9. Criterios de Aceptación

### 9.1 Funcionalidad
- ✅ Todas las RF implementadas sin bugs críticos
- ✅ Casos de error manejados correctamente
- ✅ Validaciones funcionan en cliente y servidor

### 9.2 Rendimiento
- ✅ Páginas cargan en < 2 segundos
- ✅ API responde en < 500ms
- ✅ Base de datos tiene índices apropiados

### 9.3 Seguridad
- ✅ OWASP Top 10 validaciones implementadas
- ✅ Penetration testing sin vulnerabilidades críticas
- ✅ Token JWT validado en cada request

### 9.4 Calidad
- ✅ Cobertura de tests > 80%
- ✅ Code review aprobado
- ✅ No hay warnings en build

### 9.5 Documentación
- ✅ README completo
- ✅ APIs documentadas con Swagger/OpenAPI
- ✅ Guía de instalación y deployment

---

## 10. Glosario

| Término | Definición |
|---------|-----------|
| **JWT** | JSON Web Token - estándar para autenticación stateless |
| **CRUD** | Create, Read, Update, Delete - operaciones básicas |
| **API REST** | Interfaz para comunicación entre cliente y servidor |
| **Microservicios** | Arquitectura con múltiples servicios independientes |
| **Token** | Credencial de autenticación temporal |
| **IVA** | Impuesto al Valor Agregado (19% en este caso) |
| **Boleta** | Documento de venta con detalles de compra |
| **Cita** | Reserva de servicio en fecha/hora específica |
| **Rol** | Nivel de permisos de usuario (ADMIN, CUSTOMER) |
| **Cache** | Almacenamiento temporal para optimizar performance |
| **HTTPS** | Protocolo seguro de comunicación |
| **Uptime** | Porcentaje de tiempo que el sistema está disponible |
| **KPI** | Key Performance Indicator - métrica de éxito |
| **Responsive** | Interfaz que se adapta a diferentes tamaños de pantalla |

---

## 11. Cambios Futuros (Roadmap)

- [ ] Integración con pasarela de pagos
- [ ] Sistema de calificaciones y reseñas
- [ ] Notificaciones por email/SMS
- [ ] Integración con redes sociales
- [ ] App móvil nativa
- [ ] Sistema de promociones y cupones
- [ ] Programa de lealtad

---

**Documento Elaborado:** Noviembre 2025  
**Responsable:** German Ormeño
