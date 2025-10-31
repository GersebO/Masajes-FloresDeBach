# 🔐 Autenticación JWT - UserManagementService

## 📋 Resumen de Implementación

Se ha implementado un sistema completo de autenticación JWT para el registro y login de **Usuarios (Users)** y **Clientes (Customers)**.

---

## 🚀 Endpoints Disponibles

### 1️⃣ Registro de Usuario (Admin/Empleado/Terapeuta)
**POST** `http://localhost:8081/api/auth/register/user`

**Body (JSON):**
```json
{
  "run": "12345678-9",
  "firstName": "Juan",
  "lastName": "Pérez González",
  "email": "juan.perez@example.com",
  "password": "Pass123",
  "confirmPassword": "Pass123",
  "phone": "+56912345678",
  "address": "Av. Principal 123",
  "region": "Metropolitana",
  "commune": "Santiago",
  "birthDate": "1990-05-15",
  "role": "ADMIN"
}
```

**Roles válidos:** `ADMIN`, `EMPLOYEE`, `THERAPIST`

---

### 2️⃣ Registro de Cliente
**POST** `http://localhost:8081/api/auth/register/customer`

**Body (JSON):**
```json
{
  "run": "98765432-1",
  "firstName": "María",
  "lastName": "López Silva",
  "email": "maria.lopez@example.com",
  "password": "Pass456",
  "confirmPassword": "Pass456",
  "address": "Calle Secundaria 456",
  "region": "Valparaíso",
  "commune": "Viña del Mar"
}
```

---

### 3️⃣ Login (Usuarios y Clientes)
**POST** `http://localhost:8081/api/auth/login`

**Body (JSON):**
```json
{
  "email": "juan.perez@example.com",
  "password": "Pass123"
}
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "email": "juan.perez@example.com",
  "firstName": "Juan",
  "lastName": "Pérez González",
  "role": "ADMIN"
}
```

---

## 🔒 Uso del Token JWT

Una vez que obtienes el token en la respuesta del login o registro, debes incluirlo en el header `Authorization` de todas las peticiones protegidas:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Ejemplo con `fetch` (JavaScript/React):
```javascript
const response = await fetch('http://localhost:8081/api/users', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### Ejemplo con PowerShell:
```powershell
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}
Invoke-RestMethod -Method Get -Uri 'http://localhost:8081/api/users' -Headers $headers
```

---

## 🛡️ Seguridad Implementada

✅ **Contraseñas encriptadas** con BCrypt  
✅ **Tokens JWT** con expiración de 24 horas (configurable)  
✅ **Validación de duplicados** (email y RUN únicos)  
✅ **Sesiones stateless** (no se guardan en servidor)  
✅ **CORS configurado** para frontend en puertos 5173, 5174, 5175  
✅ **Endpoints públicos:** `/api/auth/**`, `/swagger-ui/**`  
✅ **Endpoints protegidos:** todos los demás requieren token JWT válido  

---

## 🔧 Configuración (application.properties)

```properties
# JWT Configuration
jwt.secret=MiSecretoSuperSeguroParaJWT2024FloresDeBachEstaEsUnaClaveMuyLargaYSegura123
jwt.expiration=86400000  # 24 horas en milisegundos
```

⚠️ **IMPORTANTE:** En producción, usa variables de entorno para `jwt.secret`:
```properties
jwt.secret=${JWT_SECRET:default-secret-only-for-dev}
```

---

## 📦 Archivos Creados/Modificados

### ✅ Nuevos archivos:
- `config/JwtTokenProvider.java` - Generación y validación de tokens
- `config/JwtAuthenticationFilter.java` - Filtro para interceptar requests
- `controller/AuthController.java` - Endpoints de autenticación
- `service/AuthService.java` - Lógica de registro y login
- `dto/request/RegisterUserRequest.java` - DTO para registro de usuarios
- `dto/response/AuthResponse.java` - Respuesta con token y datos

### 🔄 Archivos modificados:
- `pom.xml` - Añadidas dependencias `jjwt` (v0.12.5)
- `config/SecurityConfig.java` - Configurado JWT filter y sesiones stateless
- `application.properties` - Añadidas propiedades JWT

---

## 🧪 Pruebas Rápidas (PowerShell)

### 1. Registrar un cliente:
```powershell
Invoke-RestMethod -Method Post -Uri 'http://localhost:8081/api/auth/register/customer' `
  -ContentType 'application/json' `
  -Body '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"Pass123","confirmPassword":"Pass123","address":"Test 123","region":"RM","commune":"Santiago"}'
```

### 2. Login:
```powershell
$response = Invoke-RestMethod -Method Post -Uri 'http://localhost:8081/api/auth/login' `
  -ContentType 'application/json' `
  -Body '{"email":"test@example.com","password":"Pass123"}'

$token = $response.token
Write-Host "Token: $token"
```

### 3. Usar el token en request protegido:
```powershell
$headers = @{ "Authorization" = "Bearer $token" }
Invoke-RestMethod -Method Get -Uri 'http://localhost:8081/api/users' -Headers $headers
```

---

## 🐛 Errores Comunes

### ❌ "Las contraseñas no coinciden"
- Verifica que `password` y `confirmPassword` sean idénticos.

### ❌ "El email ya está registrado"
- Ese email ya existe en la base de datos (User o Customer).

### ❌ "Credenciales inválidas"
- Email o contraseña incorrectos.
- Usuario/Cliente inactivo (`isActive = false`).

### ❌ "401 Unauthorized"
- Token no incluido en el header `Authorization`.
- Token expirado (24 horas).
- Token inválido o mal formado.

---

## 🎯 Próximos Pasos Recomendados

1. **Refresh Tokens:** Implementar tokens de refresco para renovar sesiones sin re-login.
2. **Roles y Permisos:** Añadir `@PreAuthorize("hasRole('ADMIN')")` en endpoints específicos.
3. **Rate Limiting:** Limitar intentos de login para prevenir ataques de fuerza bruta.
4. **Auditoría:** Registrar intentos de login fallidos en logs o base de datos.
5. **Logout:** Endpoint para invalidar tokens (requiere blacklist de tokens).
6. **Recuperación de contraseña:** Endpoint para reset de password vía email.

---

## 📞 Soporte

Si encuentras problemas, revisa los logs del servidor en la terminal donde ejecutaste `mvnw spring-boot:run`.

**Puerto del servicio:** `8081`  
**Swagger UI:** http://localhost:8081/swagger-ui.html
