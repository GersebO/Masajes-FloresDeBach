# 🧪 Plan de Pruebas (Testing)
## Masajes FloresDeBach

**Versión:** 1.0  
**Última actualización:** 23 de Noviembre de 2025  
**Tipo:** Documento de Testing - QA

---

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Estrategia de Testing](#estrategia-de-testing)
3. [Tipos de Pruebas](#tipos-de-pruebas)
4. [Casos de Prueba - App Cliente](#casos-de-prueba---app-cliente)
5. [Casos de Prueba - App Admin](#casos-de-prueba---app-admin)
6. [Pruebas de Seguridad](#pruebas-de-seguridad)
7. [Pruebas de Rendimiento](#pruebas-de-rendimiento)
8. [Defectos y Reportes](#defectos-y-reportes)
9. [Criterios de Aceptación](#criterios-de-aceptación)

---

## 1. Introducción

### 1.1 Objetivo
Asegurar que el sistema **Masajes FloresDeBach** funciona correctamente, es seguro y cumple con los requisitos especificados.

### 1.2 Alcance
- ✅ Frontend App Cliente
- ✅ Frontend App Admin
- ✅ APIs Backend
- ✅ Base de Datos
- ✅ Autenticación y Autorización
- ✅ Seguridad

### 1.3 Entorno de Testing

```
Desarrollo:
- Browser: Chrome/Firefox/Safari
- OS: Windows 10/11, macOS, Linux
- Node: 18+
- Dispositivos: Desktop, Tablet, Mobile

Staging:
- Similar a producción
- Datos de prueba
- URLs: http://staging.example.com
```

---

## 2. Estrategia de Testing

### 2.1 Niveles de Testing

```
┌─────────────────────────────────────────┐
│      Pruebas Unitarias (80%)            │
│  - Componentes React                    │
│  - Funciones de negocio                 │
│  - Validadores                          │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│      Pruebas de Integración (15%)       │
│  - APIs con BD                          │
│  - Flujos completos                     │
│  - Múltiples componentes                │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│      Pruebas E2E (5%)                   │
│  - Flujos críticos                      │
│  - Escenarios reales                    │
│  - Tiempo del usuario                   │
└─────────────────────────────────────────┘
```

### 2.2 Distribución de Responsabilidades

| Tipo | Responsable | Frecuencia | Tools |
|------|------------|-----------|-------|
| Unitaria | Developers | Por commit | Vitest |
| Integración | QA/Developers | Pre-push | Vitest |
| E2E | QA Team | Pre-release | Cypress/Playwright |
| Performance | QA Team | Semanal | Lighthouse |
| Seguridad | Security Team | Mensual | OWASP ZAP |

---

## 3. Tipos de Pruebas

### 3.1 Pruebas Funcionales

**Objetivo:** Validar que cada función funciona según especificación

**Método:** Manual + Automatizado

**Ejemplo:**
```javascript
✅ Test: RF-001 Login de Cliente
1. Ingresa email y password válidos
2. Verifica que redirige a home
3. Verifica que token JWT se crea
4. Verifica que usuario está autenticado
```

### 3.2 Pruebas Unitarias

**Objetivo:** Probar funciones/componentes aislados

**Ejemplo:**
```javascript
// test: Button Component
test('debe renderizar el botón con texto', () => {
  render(<Button>Click</Button>);
  expect(screen.getByText('Click')).toBeInTheDocument();
});
```

### 3.3 Pruebas de Integración

**Objetivo:** Probar interacción entre componentes y APIs

**Ejemplo:**
```
1. Usuario crea orden
2. Sistema calcula IVA
3. Se envía a API
4. API guarda en BD
5. Respuesta se muestra en UI
```

### 3.4 Pruebas E2E (End-to-End)

**Objetivo:** Simular flujos completos del usuario

**Escenarios:**
1. Cliente compra un producto
2. Admin crea categoría y producto
3. Cliente agenda cita

### 3.5 Pruebas de Usabilidad

**Objetivo:** Validar que interfaz es intuitiva

**Métodos:**
- Testing con usuarios reales
- Análisis de heatmaps
- Time-on-task medición

---

## 4. Casos de Prueba - App Cliente

### 4.1 Autenticación

#### TC-001: Login Exitoso
```
Precondición: Cliente registrado con email: test@example.com, pass: Pass123!

Pasos:
1. Abre página de login
2. Ingresa test@example.com en campo email
3. Ingresa Pass123! en campo contraseña
4. Haz clic en "Entrar"

Resultado Esperado:
✅ Redirige a Home
✅ Token JWT se genera
✅ Usuario aparece en navbar

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

#### TC-002: Login Fallido - Email Incorrecto
```
Pasos:
1. Ingresa invalid@example.com
2. Ingresa contraseña correcta
3. Haz clic en "Entrar"

Resultado Esperado:
✅ Muestra error: "Email o contraseña incorrectos"
✅ NO redirige
✅ NO crea token

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

#### TC-003: Login Fallido - Contraseña Incorrecta
```
Pasos:
1. Ingresa email correcto
2. Ingresa password incorrecta
3. Haz clic en "Entrar"

Resultado Esperado:
✅ Muestra error: "Email o contraseña incorrectos"
✅ NO redirige

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

#### TC-004: Registro de Cliente
```
Pasos:
1. Haz clic en "Registrar Usuario"
2. Ingresa nombre: Juan Pérez
3. Ingresa email único
4. Ingresa password: Pass123!
5. Haz clic en "Crear Cuenta"

Resultado Esperado:
✅ Muestra confirmación
✅ Cliente puede iniciar sesión
✅ Datos se guardan en BD

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

#### TC-005: Logout
```
Pasos:
1. Inicia sesión como cliente
2. Haz clic en tu nombre
3. Haz clic en "Cerrar sesión"
4. Confirma

Resultado Esperado:
✅ Redirige a Home (no autenticado)
✅ Token JWT se elimina
✅ NO puede acceder a "Mis Boletas"

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

### 4.2 Catálogo de Productos

#### TC-010: Listar Productos
```
Pasos:
1. Haz clic en "Productos"
2. Espera a que cargue

Resultado Esperado:
✅ Muestra mínimo 10 productos
✅ Cada producto tiene: nombre, precio, imagen
✅ Muestra paginación si hay más de 10

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

#### TC-011: Buscar Producto
```
Pasos:
1. En la página de productos
2. Ingresa "masaje" en buscador
3. Presiona Enter

Resultado Esperado:
✅ Filtra productos que contienen "masaje"
✅ Muestra solo resultados relevantes

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

#### TC-012: Ver Detalle de Producto
```
Pasos:
1. En catálogo, haz clic en un producto

Resultado Esperado:
✅ Se abre modal con detalle
✅ Muestra: nombre, descripción, precio, stock
✅ Muestra imagen
✅ Botón "Agregar al carrito"

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

### 4.3 Carrito

#### TC-020: Agregar al Carrito
```
Precondición: Cliente viendo detalle de producto

Pasos:
1. Cambia cantidad a 2
2. Haz clic en "Agregar al carrito"

Resultado Esperado:
✅ Se confirma la adición
✅ Modal se cierra
✅ Icono 🛒 muestra "1" (1 item)

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

#### TC-021: Ver Carrito
```
Pasos:
1. Haz clic en 🛒 Carrito

Resultado Esperado:
✅ Muestra lista de items
✅ Muestra cantidad, precio unitario, subtotal
✅ Calcula IVA correctamente (19%)
✅ Muestra total correcto

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

#### TC-022: Modificar Cantidad en Carrito
```
Pasos:
1. Ve al carrito
2. Haz clic en + (incrementar cantidad)
3. Verifica cambio

Resultado Esperado:
✅ Cantidad aumenta
✅ Precio se recalcula
✅ Total se actualiza

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

#### TC-023: Eliminar del Carrito
```
Pasos:
1. Ve al carrito
2. Haz clic en ✕ de un producto

Resultado Esperado:
✅ Producto se elimina
✅ Total se recalcula
✅ Contador actualiza

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

### 4.4 Órdenes

#### TC-030: Crear Orden
```
Precondición: Cliente autenticado con items en carrito

Pasos:
1. Ve a carrito
2. Haz clic en "Proceder al Pago"
3. Verifica datos
4. Haz clic en "Confirmar Orden"

Resultado Esperado:
✅ Orden se crea con estado PENDIENTE
✅ Email de confirmación se envía
✅ Cliente redirige a "Mis Boletas"
✅ Carrito se vacía

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

#### TC-031: Ver Mis Compras
```
Pasos:
1. Inicia sesión
2. Haz clic en "Mis Boletas"

Resultado Esperado:
✅ Muestra lista de todas las órdenes
✅ Muestra: ID, fecha, total, estado
✅ Puede ver detalles de cada una

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

### 4.5 Agendamiento

#### TC-040: Agendar Cita
```
Precondición: Cliente autenticado

Pasos:
1. Haz clic en "Agendar"
2. Selecciona servicio: "Masaje Relajante"
3. Selecciona fecha: Mañana
4. Selecciona hora: 10:00
5. Haz clic en "Confirmar Cita"

Resultado Esperado:
✅ Cita se crea
✅ Email de confirmación se envía
✅ Aparece en "Mis Boletas" → "Citas"
✅ Horario no se puede volver a reservar

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

---

## 5. Casos de Prueba - App Admin

### 5.1 Autenticación Admin

#### TC-101: Login Admin
```
Precondición: Admin registrado

Pasos:
1. Abre panel admin
2. Ingresa email admin
3. Ingresa contraseña
4. Haz clic en "Entrar"

Resultado Esperado:
✅ Accede al Dashboard
✅ Ve todos los menus
✅ Token ADMIN se genera

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

### 5.2 Gestión de Productos (Admin)

#### TC-110: Crear Producto
```
Pasos:
1. Haz clic en "Crear Producto"
2. Completa formulario:
   - Nombre: "Masaje Tailandés"
   - Precio: 45000
   - Categoría: "Masajes"
   - Stock: 100
3. Haz clic en "Crear Producto"

Resultado Esperado:
✅ Producto se crea
✅ Aparece en tabla
✅ Clientes lo ven en catálogo

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

#### TC-111: Editar Producto
```
Pasos:
1. Ve a "Productos"
2. Haz clic en "Editar" de un producto
3. Cambia precio a 50000
4. Haz clic en "Guardar Cambios"

Resultado Esperado:
✅ Precio se actualiza
✅ Cambio es inmediato
✅ Clientes ven nuevo precio

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

#### TC-112: Desactivar Producto
```
Pasos:
1. En tabla de productos
2. Haz clic en "Desactivar"

Resultado Esperado:
✅ Producto cambia a estado inactivo
✅ NO aparece en catálogo para clientes
✅ Aún está en BD

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

### 5.3 Gestión de Categorías

#### TC-120: Crear Categoría
```
Pasos:
1. Haz clic en "Crear Categoría"
2. Ingresa nombre: "Terapias Relajantes"
3. Ingresa descripción
4. Haz clic en "Crear"

Resultado Esperado:
✅ Categoría se crea
✅ Aparece en dropdown cuando creas productos

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

### 5.4 Gestión de Usuarios Admin

#### TC-130: Crear Usuario Admin
```
Pasos:
1. Haz clic en "Crear Usuario"
2. Ingresa:
   - Nombre: "María García"
   - Email: maria@example.com
   - Contraseña: SecurePass123!
   - Rol: ADMIN
3. Haz clic en "Crear Usuario"

Resultado Esperado:
✅ Usuario se crea
✅ Email se envía con credenciales
✅ Usuario puede iniciar sesión
✅ Tiene acceso a panel admin

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

#### TC-131: Desactivar Usuario Admin
```
Pasos:
1. Ve a "Usuarios"
2. Haz clic en "Desactivar" de un usuario

Resultado Esperado:
✅ Usuario cambia a inactivo
✅ NO puede iniciar sesión
✅ Se mantiene su historial

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

### 5.5 Gestión de Clientes

#### TC-140: Ver Lista de Clientes
```
Pasos:
1. Haz clic en "Clientes"

Resultado Esperado:
✅ Muestra tabla con clientes
✅ Información: nombre, email, teléfono, total gastado
✅ Muestra paginación si hay muchos

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

#### TC-141: Ver Perfil de Cliente
```
Pasos:
1. En tabla de clientes
2. Haz clic en nombre de cliente

Resultado Esperado:
✅ Muestra perfil completo
✅ Muestra historial de compras
✅ Muestra citas agendadas
✅ Muestra total gastado

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

### 5.6 Gestión de Órdenes

#### TC-150: Cambiar Estado de Orden
```
Precondición: Existe una orden en estado PENDIENTE

Pasos:
1. Ve a Dashboard
2. Haz clic en orden
3. Cambia estado a CONFIRMADA
4. Haz clic en "Actualizar"

Resultado Esperado:
✅ Estado se actualiza
✅ Cliente recibe email de confirmación
✅ Cambio es inmediato

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail [ ] Bloqueado
```

---

## 6. Pruebas de Seguridad

### 6.1 Autenticación y Autorización

#### SEC-001: JWT Válido
```
Objetivo: Validar que token JWT es requerido

Pasos:
1. Intenta acceder a endpoint /api/protected sin token
2. Espera respuesta

Resultado Esperado:
✅ Status 401 Unauthorized
✅ Mensaje: "Token requerido"

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail
```

#### SEC-002: Contraseña Encriptada
```
Objetivo: Verificar que contraseñas están hasheadas

Pasos:
1. Crea usuario con contraseña "Test123!"
2. Consulta BD directamente

Resultado Esperado:
✅ Contraseña NO está en texto plano
✅ Está hasheada con bcrypt

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail
```

#### SEC-003: Autorización por Rol
```
Objetivo: Validar que solo ADMIN accede a panel

Pasos:
1. Intenta acceder a /admin como CUSTOMER
2. Verifica resultado

Resultado Esperado:
✅ Status 403 Forbidden
✅ Redirige a home

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail
```

### 6.2 Validación de Entrada

#### SEC-010: SQL Injection Prevention
```
Objetivo: Validar que no es vulnerable a SQL injection

Pasos:
1. En búsqueda, ingresa: ' OR '1'='1
2. Verifica resultado

Resultado Esperado:
✅ Input está escapado
✅ NO ejecuta SQL malicioso
✅ Muestra "sin resultados"

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail
```

#### SEC-011: XSS Prevention
```
Objetivo: Validar que no es vulnerable a XSS

Pasos:
1. En formulario, ingresa: <script>alert('XSS')</script>
2. Verifica resultado

Resultado Esperado:
✅ Script NO se ejecuta
✅ Se muestra como texto
✅ Está sanitizado

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail
```

---

## 7. Pruebas de Rendimiento

### 7.1 Carga de Página

#### PERF-001: Tiempo de Carga Home
```
Herramienta: Lighthouse / Chrome DevTools

Objetivo: Home debe cargar en < 2 segundos

Pasos:
1. Abre app en navegador limpio
2. Mide tiempo en Chrome DevTools
3. Registra tiempo

Resultado Esperado:
✅ First Contentful Paint (FCP): < 1.5s
✅ Largest Contentful Paint (LCP): < 2.5s
✅ Performance score: > 80

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail
```

#### PERF-002: Carga de Catálogo
```
Objetivo: Catálogo carga en < 3 segundos

Pasos:
1. Abre página de productos
2. Mide tiempo de carga

Resultado Esperado:
✅ Todos los productos se cargan
✅ Tiempo < 3 segundos

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail
```

### 7.2 API Response Time

#### PERF-010: GET /products
```
Objetivo: API responde en < 500ms

Herramienta: Postman / curl

Pasos:
1. GET http://api.example.com/api/products
2. Registra tiempo de respuesta

Resultado Esperado:
✅ Status 200
✅ Response time < 500ms
✅ Retorna JSON válido

Resultado Actual: ___________
Estado: [ ] Pass [ ] Fail
```

---

## 8. Defectos y Reportes

### 8.1 Formato de Reporte de Defecto

```
ID Defecto: BUG-001
Título: [Resumen breve]
Severidad: [ ] Crítico [ ] Mayor [ ] Menor [ ] Trivial
Prioridad: [ ] P1 [ ] P2 [ ] P3 [ ] P4
Estado: [ ] Nuevo [ ] Asignado [ ] En progreso [ ] Resuelto

Componente: [Qué parte afecta]
Versión: [Versión donde ocurre]

Descripción:
[Descripción detallada del defecto]

Pasos para Reproducir:
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

Resultado Esperado:
[Qué debería pasar]

Resultado Actual:
[Qué pasó]

Entorno:
- Navegador: [Chrome, Firefox, etc.]
- SO: [Windows, macOS, Linux]
- Versión: [Versión del sistema]

Adjuntos: [Screenshots, videos, logs]

Reportado por: [Nombre]
Fecha: [DD/MM/YYYY]
```

### 8.2 Ejemplo de Defecto

```
ID Defecto: BUG-001
Título: Carrito no se vacía después de compra
Severidad: [X] Crítico
Prioridad: [X] P1
Estado: [X] Nuevo

Componente: Módulo de Compra
Versión: 1.0.0

Descripción:
Cuando un cliente confirma una orden, el carrito no se vacía
automáticamente. Muestra los items anteriores.

Pasos para Reproducir:
1. Inicia sesión como cliente
2. Agrega 2 productos al carrito
3. Haz clic en "Proceder al Pago"
4. Confirma orden
5. Verifica carrito

Resultado Esperado:
Carrito debe estar vacío (cantidad = 0)

Resultado Actual:
Carrito sigue mostrando los 2 productos

Entorno:
- Navegador: Chrome v119
- SO: Windows 11
- Versión: 1.0.0

Reportado por: Juan Tester
Fecha: 23/11/2025
```

---

## 9. Criterios de Aceptación

### 9.1 Para Release a Producción

- ✅ 100% de casos de prueba PASS
- ✅ 0 defectos CRÍTICOS
- ✅ Máximo 2 defectos MAYORES (documentados)
- ✅ Cobertura de tests > 80%
- ✅ Performance score > 80 (Lighthouse)
- ✅ Cero vulnerabilidades de seguridad críticas
- ✅ OWASP Top 10 validado
- ✅ Documentación completa
- ✅ Sign-off de Product Manager

### 9.2 Métricas de Calidad

| Métrica | Target | Actual |
|---------|--------|--------|
| Pass Rate | > 95% | ___ |
| Cobertura | > 80% | ___ |
| Defectos Críticos | 0 | ___ |
| Response Time | < 500ms | ___ |
| Uptime | > 99% | ___ |

---

## 10. Ejecución de Tests

### 10.1 Tests Unitarios

```bash
# Ejecutar todos los tests
npm test

# Ejecutar test específico
npm test -- Navbar.test.jsx

# Con cobertura
npm test:cov

# Modo watch
npm test
```

### 10.2 Tests E2E (Próximamente)

```bash
# Ejecutar Cypress
npx cypress run

# Modo interactivo
npx cypress open
```

### 10.3 Testing Manual Checklist

```
[ ] Pruebas en Chrome
[ ] Pruebas en Firefox
[ ] Pruebas en Safari
[ ] Pruebas en Mobile (iPhone)
[ ] Pruebas en Mobile (Android)
[ ] Pruebas sin conexión
[ ] Pruebas con conexión lenta
```

---

**Documento preparado para:** QA Team, Developers  
**Próxima revisión:** Mensualmente  
**Responsable:** QA Lead

---
