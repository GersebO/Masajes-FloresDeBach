# 🔒 Sistema de Autenticación - App Admin

## ✅ Configuración Completada

Tu aplicación **app-admin** ahora tiene un sistema de autenticación **obligatorio** donde:

### 🎯 Funcionamiento:

1. **Punto de Entrada Único**: 
   - La ruta raíz `/` redirige automáticamente a `/login`
   - No se puede acceder a ninguna ruta protegida sin autenticación

2. **Rutas Protegidas**:
   - Todas las rutas administrativas están envueltas en `<ProtectedRoute>`
   - Si intentas acceder sin login, te redirige automáticamente a `/login`

3. **Persistencia de Sesión**:
   - El usuario se guarda en `localStorage` como `adminUser`
   - Al recargar la página, la sesión se mantiene
   - Al hacer logout, se elimina de localStorage

4. **Catch-All Route**:
   - Cualquier ruta no definida redirige a `/login`
   - Previene acceso a URLs incorrectas

---

## 🔐 Rutas del Sistema

### Ruta Pública:
```
/login          - Página de inicio de sesión
```

### Rutas Protegidas (requieren autenticación):
```
/home           - Panel principal
/admin          - Administración general
/product        - Gestión de productos
/product/create - Crear producto
/product/edit/:id - Editar producto
/user           - Gestión de usuarios
/user/create    - Crear usuario
/categories     - Gestión de categorías
/categories/create - Crear categoría
/customer       - Gestión de clientes
/customer/create - Crear cliente
```

---

## 🛠️ Componentes del Sistema

### 1. **App.jsx**
- Define todas las rutas
- Redirige `/` a `/login`
- Envuelve rutas protegidas con `<ProtectedRoute>`
- Captura rutas no definidas con `path="*"`

### 2. **ProtectedRoute.jsx**
- Verifica si el usuario está autenticado
- Redirige a `/login` si no hay sesión
- Guarda la ubicación anterior para redirigir después del login

### 3. **useAuthStore.js** (Zustand)
- Maneja el estado global de autenticación
- Funciones: `login()`, `logout()`, `clearError()`
- Estado: `user`, `isAuthenticated`, `isLoading`, `error`

### 4. **auth.service.js**
- `loginUser()`: Autentica con el backend
- `logoutUser()`: Elimina sesión de localStorage
- `getCurrentUser()`: Recupera usuario de localStorage

---

## 📝 Flujo de Autenticación

```
1. Usuario abre app → Redirige a /login
2. Usuario ingresa credenciales
3. Se envía POST a: http://localhost:8081/api/users/authenticate
4. Backend valida y retorna usuario
5. Se guarda en localStorage como "adminUser"
6. Zustand actualiza estado: isAuthenticated = true
7. Usuario redirige a /home
8. Puede navegar por todas las rutas protegidas
9. Al hacer logout → limpia localStorage y redirige a /login
```

---

## 🚀 Cómo Usar

### Para el Usuario:
1. Abre la aplicación
2. Verás la pantalla de login
3. Ingresa email y contraseña
4. Click en "Iniciar Sesión"
5. Si las credenciales son correctas, accedes al panel
6. Para cerrar sesión, click en el botón de logout en el navbar

### Para Desarrollo:
```bash
# Asegúrate de que el backend esté corriendo
# Puerto: 8081 (UserManagementService)

# Usuario de prueba:
Email: admin@example.com
Password: admin123
```

---

## 🔧 Debugging

### Ver estado de autenticación en consola:
```javascript
// En DevTools Console:
console.log(localStorage.getItem('adminUser'));
```

### Ver logs del sistema:
- Los `console.log` en `ProtectedRoute.jsx` te dirán si estás autenticado
- Los logs en `auth.service.js` muestran el proceso de login

### Limpiar sesión manualmente:
```javascript
// En DevTools Console:
localStorage.removeItem('adminUser');
location.reload();
```

---

## ✅ Seguridad Implementada

1. ✅ No se puede acceder a rutas protegidas sin login
2. ✅ La sesión persiste en localStorage
3. ✅ El logout limpia completamente la sesión
4. ✅ Rutas no definidas redirigen al login
5. ✅ El estado de autenticación es global (Zustand)
6. ✅ Confirmación antes de cerrar sesión

---

## 🎨 Personalización

### Cambiar ruta después del login:
En `Login.jsx`, línea 18:
```javascript
navigate("/home"); // Cambia a la ruta que quieras
```

### Cambiar mensaje de logout:
En `Navbar.jsx`, línea 14:
```javascript
if (window.confirm("Tu mensaje personalizado")) {
  logout();
}
```

---

## 🐛 Solución de Problemas

### El usuario no se autentica:
1. Verifica que el backend esté corriendo en `localhost:8081`
2. Revisa la consola del navegador para errores
3. Verifica que las credenciales sean correctas

### La sesión no persiste al recargar:
1. Verifica que localStorage esté habilitado en el navegador
2. Revisa que no haya errores en `getCurrentUser()`

### No redirige al login:
1. Verifica que `isAuthenticated` sea `false`
2. Revisa que `ProtectedRoute` esté envolviendo las rutas correctamente

---

## 📚 Archivos Modificados

1. `app-admin/src/App.jsx` - Agregado catch-all route y comentarios
2. `app-admin/src/components/layout/ProtectedRoute.jsx` - Mejorado con logs y location state
3. Los demás archivos ya estaban correctamente configurados

---

¡El sistema está completamente funcional! 🎉
