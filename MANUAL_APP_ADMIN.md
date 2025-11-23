# 📖 Manual de Usuario - APP Admin
## Masajes FloresDeBach - Panel Administrativo

**Versión:** 1.0  
**Última actualización:** 23 de Noviembre de 2025

---

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Requisitos](#requisitos)
3. [Acceso al Panel](#acceso-al-panel)
4. [Dashboard](#dashboard)
5. [Gestión de Productos](#gestión-de-productos)
6. [Gestión de Categorías](#gestión-de-categorías)
7. [Gestión de Usuarios](#gestión-de-usuarios)
8. [Gestión de Clientes](#gestión-de-clientes)
9. [Órdenes y Boletas](#órdenes-y-boletas)
10. [Seguridad y Mejores Prácticas](#seguridad-y-mejores-prácticas)

---

## Introducción

Bienvenido al **Panel Administrativo de Masajes FloresDeBach**. Esta herramienta te permite gestionar completamente el negocio: productos, clientes, órdenes y usuarios.

### Funcionalidades Principales
- 📊 Dashboard con estadísticas
- 🛍️ CRUD completo de productos
- 📦 Gestión de categorías
- 👥 Administración de usuarios
- 👤 Gestión de clientes
- 📄 Consulta de órdenes

---

## Requisitos

- **Rol:** Administrador (ADMIN o SUPER_ADMIN)
- **Navegador:** Chrome, Firefox, Safari o Edge (versión reciente)
- **Conexión:** Internet estable
- **Acceso:** Credenciales válidas

---

## Acceso al Panel

### 1.1 Iniciar Sesión

**Paso 1:** Abre `http://localhost:5173` (desarrollo) o la URL del servidor

**Paso 2:** Ingresa tu email de administrador

**Paso 3:** Ingresa tu contraseña

**Paso 4:** Haz clic en "Entrar"

**Paso 5:** Serás redirigido al Dashboard

### 1.2 Interfaz Principal

Al iniciar sesión verás:
- **Sidebar izquierdo:** Menú de navegación
- **Barra superior:** Tu nombre e info de sesión
- **Área principal:** Contenido dinámico
- **Botón menú móvil:** ☰ (en dispositivos pequeños)

### 1.3 Cerrar Sesión

**Paso 1:** Haz clic en tu nombre en la esquina superior derecha

**Paso 2:** Selecciona "Cerrar Sesión"

**Paso 3:** Confirma la acción

---

## Dashboard

### 2.1 Acceder al Dashboard

**Paso 1:** Haz clic en "🏠 Admin Home" en el sidebar

### 2.2 Información Mostrada

**KPIs Principales:**
- 📊 **Total de Ventas:** Ingresos totales del mes
- 👥 **Clientes Nuevos:** Registros recientes
- 📦 **Órdenes Pendientes:** Pedidos por procesar
- 🛍️ **Productos Activos:** Cantidad disponible

**Gráficos:**
- **Ventas por Mes:** Tendencia de ingresos (próximamente)
- **Productos Top:** Top 5 más vendidos
- **Clientes por Región:** Distribución geográfica (próximamente)

### 2.3 Actualizar Datos

Los datos se actualizan automáticamente cada 5 minutos.

Para refrescar manualmente: Presiona **F5** o haz clic en el icono de actualizar.

---

## Gestión de Productos

### 3.1 Acceder a Productos

**Paso 1:** Haz clic en "🛍️ Productos" en el sidebar

**Paso 2:** Verás una tabla con todos los productos

### 3.2 Ver Lista de Productos

**Columnas mostradas:**
| Columna | Descripción |
|---------|-------------|
| ID | Identificador único |
| Nombre | Nombre del producto/servicio |
| Categoría | Categoría asignada |
| Precio | Precio en $ |
| Stock | Cantidad disponible |
| Estado | Activo/Inactivo |
| Acciones | Editar, Desactivar/Activar |

**Filtros:**
- Por estado (Activo/Inactivo)
- Por categoría
- Búsqueda por nombre

**Paginación:** 10 productos por página

### 3.3 Crear Nuevo Producto

**Paso 1:** Haz clic en "➕ Crear Producto" en el sidebar

**Paso 2:** Completa el formulario:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| Nombre | Texto | ✅ | Nombre único del producto |
| Descripción | Textarea | ❌ | Detalles del servicio |
| Categoría | Dropdown | ✅ | Selecciona categoría |
| Precio | Número | ✅ | Precio en pesos ($) |
| Stock | Número | ✅ | Cantidad disponible |
| Imagen | URL | ❌ | Link de imagen (HTTPS) |
| Estado | Toggle | ✅ | Activo por defecto |

**Ejemplo de URL de imagen:**
```
https://ejemplo.com/imagen-producto.jpg
```

**Paso 3:** Haz clic en "Crear Producto"

**Paso 4:** Verás confirmación. El producto aparecerá en la tabla.

### 3.4 Editar Producto

**Paso 1:** En la tabla, haz clic en el botón "✏️ Editar" del producto

**Paso 2:** Se abrirá el formulario con los datos actuales

**Paso 3:** Modifica los campos que necesites

**Paso 4:** Haz clic en "Guardar Cambios"

**Paso 5:** Se actualizará inmediatamente

### 3.5 Cambiar Estado de Producto

**Para desactivar:**
- En la tabla, haz clic en "❌ Desactivar"
- El producto seguirá en la BD pero NO será visible para clientes

**Para activar:**
- En la tabla, haz clic en "✅ Activar"
- El producto volverá a ser visible

❌ **Nota:** No elimina realmente. Solo cambia el estado.

### 3.6 Gestionar Stock

El stock se actualiza automáticamente cuando:
- Creas una orden
- Cancelas una orden

**Actualizar manualmente:**
1. Haz clic en "Editar"
2. Modifica el campo "Stock"
3. Haz clic en "Guardar"

⚠️ **Importante:** Mantén stock actualizado

---

## Gestión de Categorías

### 4.1 Acceder a Categorías

**Paso 1:** Haz clic en "📦 Categoría" en el sidebar

**Paso 2:** Verás la lista de categorías

### 4.2 Ver Categorías

**Columnas:**
- Nombre de categoría
- Descripción
- Cantidad de productos
- Estado
- Acciones

### 4.3 Crear Nueva Categoría

**Paso 1:** Haz clic en "➕ Crear Categoría"

**Paso 2:** Completa:
- **Nombre:** Nombre único de categoría (ej: "Masajes Relajantes")
- **Descripción:** Detalles (opcional)

**Paso 3:** Haz clic en "Crear"

### 4.4 Editar Categoría

**Paso 1:** Haz clic en "✏️ Editar" en la categoría

**Paso 2:** Modifica nombre o descripción

**Paso 3:** Haz clic en "Guardar"

### 4.5 Desactivar/Activar Categoría

**Desactivar:**
- Haz clic en "❌ Desactivar"
- Los productos en esa categoría siguen existiendo

**Activar:**
- Haz clic en "✅ Activar"

---

## Gestión de Usuarios

### 5.1 Acceder a Usuarios

**Paso 1:** Haz clic en "👥 Usuarios" en el sidebar

**Paso 2:** Verás tabla con administradores

### 5.2 Ver Usuarios Admin

**Información mostrada:**
| Campo | Descripción |
|-------|-------------|
| ID | Identificador |
| Nombre | Nombre completo |
| Email | Correo de acceso |
| Rol | ADMIN o SUPER_ADMIN |
| Estado | Activo/Inactivo |
| Acciones | Editar, Desactivar |

### 5.3 Crear Nuevo Usuario Admin

**Paso 1:** Haz clic en "🧩 Crear Usuario"

**Paso 2:** Completa el formulario:

| Campo | Requerido | Validación |
|-------|-----------|-----------|
| Nombre | ✅ | Mínimo 3 caracteres |
| Email | ✅ | Debe ser único y válido |
| Contraseña | ✅ | Mínimo 8 caracteres |
| Rol | ✅ | ADMIN o SUPER_ADMIN |

**Contraseña fuerte:**
- Mínimo 8 caracteres
- Incluir mayúsculas y minúsculas
- Incluir números
- Incluir símbolos (opcional)

**Paso 3:** Haz clic en "Crear Usuario"

**Paso 4:** El usuario recibirá email con credenciales

### 5.4 Editar Usuario

**Paso 1:** Haz clic en "✏️ Editar" en el usuario

**Paso 2:** Modifica datos (excepto ID)

**Paso 3:** Haz clic en "Guardar"

### 5.5 Desactivar Usuario

**Paso 1:** Haz clic en "❌ Desactivar"

**Paso 2:** Confirma la acción

**Resultado:** El usuario NO podrá iniciar sesión

❌ **No puedes:** Desactivarte a ti mismo

---

## Gestión de Clientes

### 6.1 Acceder a Clientes

**Paso 1:** Haz clic en "👥 Clientes" en el sidebar

**Paso 2:** Verás tabla con todos los clientes registrados

### 6.2 Ver Información de Clientes

**Columnas:**
| Campo | Descripción |
|-------|-------------|
| ID | Identificador |
| Nombre | Nombre completo |
| Email | Correo registrado |
| Teléfono | Contacto |
| Total Gastado | Suma de todas sus compras |
| Última Compra | Fecha de último pedido |
| Estado | Activo/Inactivo |

### 6.3 Ver Perfil Completo de Cliente

**Paso 1:** Haz clic en el nombre del cliente

**Paso 2:** Se mostrará:
- Información personal completa
- Historial de compras (órdenes)
- Citas agendadas
- Total gastado

### 6.4 Crear Cliente Manual

**Paso 1:** Haz clic en "🧩 Crear Cliente"

**Paso 2:** Completa:
- Nombre completo
- Email
- Teléfono
- Contraseña

**Paso 3:** Haz clic en "Crear"

**Paso 4:** El cliente puede iniciar sesión con esas credenciales

### 6.5 Desactivar Cliente

**Paso 1:** En la tabla, haz clic en "❌ Desactivar"

**Paso 2:** Confirma

**Resultado:** Cliente NO podrá iniciar sesión ni hacer compras

### 6.6 Filtrar Clientes

Puedes filtrar por:
- Estado (Activo/Inactivo)
- Búsqueda por nombre o email

---

## Órdenes y Boletas

### 7.1 Ver Órdenes

En el Dashboard verás:
- Órdenes pendientes (KPI)
- Lista de últimas órdenes

**Para ver todas:**
1. Desde el Dashboard, haz clic en "Órdenes Pendientes"

### 7.2 Información de Orden

**Cada orden contiene:**
- ID y Número de Boleta
- Cliente (nombre, email)
- Fecha de compra
- Items (productos, cantidades)
- Subtotal, IVA (19%), Total
- Estado actual

### 7.3 Cambiar Estado de Orden

**Estados disponibles:**
```
PENDIENTE → CONFIRMADA → ENVIADA → ENTREGADA
    ↓
 CANCELADA (desde cualquier estado)
```

**Para cambiar estado:**
1. Abre la orden
2. Haz clic en el desplegable de estado
3. Selecciona nuevo estado
4. Haz clic en "Actualizar"
5. Se notificará al cliente por email

### 7.4 Descargar Boleta PDF

**Paso 1:** En la orden, haz clic en "📄 Descargar Boleta"

**Paso 2:** Se descargará un PDF con todos los detalles

---

## Seguridad y Mejores Prácticas

### 8.1 Protección de Cuenta

✅ **Haz:**
- Guarda tu contraseña en un lugar seguro
- Cambia contraseña regularmente
- Usa contraseñas fuertes
- Cierra sesión cuando termines

❌ **No hagas:**
- Compartas credenciales
- Dejes sesión abierta en PC públicas
- Escribas contraseña en notas visibles
- Accedas desde redes WiFi públicas sin VPN

### 8.2 Validación de Datos

**Antes de crear/editar:**
- ✅ Verifica que emails sean válidos
- ✅ Confirma precios correctos
- ✅ Revisa stock actualizado
- ✅ Verifica imágenes se vean bien

### 8.3 Roles y Permisos

| Función | ADMIN | SUPER_ADMIN |
|---------|-------|------------|
| Ver Dashboard | ✅ | ✅ |
| Gestionar Productos | ✅ | ✅ |
| Gestionar Categorías | ✅ | ✅ |
| Gestionar Clientes | ✅ | ✅ |
| Ver Órdenes | ✅ | ✅ |
| Gestionar Usuarios | ❌ | ✅ |
| Cambiar Configuración | ❌ | ✅ |

### 8.4 Auditoría

Todas tus acciones se registran:
- ¿Quién? Nombre del admin
- ¿Qué? Acción realizada
- ¿Cuándo? Fecha y hora
- ¿Dónde? Qué se modificó

---

## Solución de Problemas

### 9.1 ¿No puedo acceder?

**Solución:**
1. Verifica tu email y contraseña
2. Revisa que seas ADMIN
3. Limpia caché del navegador (Ctrl+Shift+Del)
4. Intenta en otra navegador
5. Contacta a SUPER_ADMIN

### 9.2 ¿No se guarda un cambio?

**Solución:**
1. Revisa que todos los campos obligatorios estén completos
2. Verifica que no haya errores (línea roja)
3. Cierra modal y abre nuevamente
4. Recarga la página (F5)
5. Contacta a soporte

### 9.3 ¿Se me desconecta sin razón?

**Causas:**
- Tu sesión expiró (después de 24 horas)
- Navegador cerró
- Conexión se perdió

**Solución:** Inicia sesión nuevamente

### 9.4 ¿Olvidé contraseña?

**Solución:**
1. Contacta a un SUPER_ADMIN
2. Ellos pueden resetear tu contraseña
3. Recibirás nueva contraseña temporal por email

---

## Atajos de Teclado

| Tecla | Función |
|-------|---------|
| F5 | Actualizar página |
| Ctrl+S | Guardar (en algunos formularios) |
| Esc | Cerrar modal |
| Ctrl+Home | Ir a Dashboard |

---

## Cambios Futuros

Próximamente:
- 📊 Reportes avanzados
- 📈 Gráficos interactivos
- 🔔 Notificaciones en tiempo real
- 💾 Exportar datos a Excel
- 🎁 Gestión de cupones
- 📧 Plantillas de email automático

---

**¿Dudas?** Contacta al equipo de soporte o al SUPER_ADMIN

**Última actualización:** 23 de Noviembre de 2025

---
