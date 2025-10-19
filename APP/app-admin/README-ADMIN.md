# 🌸 Maraflores de Bach – Panel Administrativo

Panel interno desarrollado en **React + Vite** para la administración de la tienda **Maraflores de Bach**.  
El proyecto está diseñado para ser modular, escalable y fácil de mantener, con una estructura basada en **layouts persistentes**, **rutas organizadas por páginas**, y **componentes funcionales** conectados a servicios REST.

---

## ⚙️ Tecnologías principales

- **React 18** – Biblioteca principal para la construcción de interfaces.
- **Vite** – Entorno de desarrollo rápido con soporte HMR.
- **React Router DOM** – Manejo de navegación interna.
- **ESLint** – Reglas y buenas prácticas para mantener la calidad del código.
- **CSS modularizado** – Estilos separados por componente.

---

## 🧭 Flujo general de la aplicación

1. **`src/main.jsx`** monta el componente principal `App` dentro de `StrictMode`.
2. **`App.jsx`** declara el `BrowserRouter` con todas las rutas internas (inicio, productos, usuarios, categorías y clientes).
3. Cada ruta carga un **page wrapper** definido en `src/app/**/pages.jsx`, que envuelve el contenido en el layout administrativo.
4. El **layout base (`AdminLayout`)** incluye la barra lateral (`Navbar`) y el `Footer` comunes a todo el panel.
5. Las vistas funcionales viven en `src/components/functional/**` y consumen datos desde microservicios REST (puertos **8081** y **8082**).

---

## 🧩 Estructura del layout

| Componente | Ubicación | Descripción |
|-------------|------------|--------------|
| **AdminLayout** | `components/layout/adminlayout/AdminLayout.jsx` | Define la estructura principal: sidebar + contenido + footer. |
| **Navbar** | `components/layout/navbar/Navbar.jsx` | Barra lateral colapsable con accesos rápidos a los módulos. |
| **Footer** | `components/ui/footer/Footer.jsx` | Pie de página común con enlaces generales. |

Gracias a esta arquitectura, **cualquier nueva vista** puede integrarse fácilmente envolviendo su componente dentro de `AdminLayout`, heredando automáticamente navegación y estilo.

---

## 🧱 Rutas disponibles

| Ruta | Page wrapper | Componente funcional | Descripción |
|------|---------------|----------------------|--------------|
| `/` | `app/admin/pages.jsx` | `Admin.jsx` | Portada de bienvenida con tarjetas informativas. |
| `/home` | `app/home/pages.jsx` | `Home.jsx` | Dashboard general con estadísticas en tiempo real. |
| `/product` | `app/product/pages.jsx` | `Product.jsx` | Listado de productos con filtros y acciones de estado. |
| `/product/create` | `app/product-create/pages.jsx` | `ProductCreate.jsx` | Formulario para crear productos (usa `useProductCreate`). |
| `/categories` | `app/category/pages.jsx` | `Category.jsx` | Gestión de categorías con activación/desactivación. |
| `/categories/create` | `app/category-create/pages.jsx` | `CategoryCreate.jsx` | Creación de nuevas categorías. |
| `/user` | `app/user/pages.jsx` | `User.jsx` | Tabla de usuarios con métricas y acciones. |
| `/user/create` | `app/user-create/pages.jsx` | `UserCreate.jsx` | Registro de usuarios internos. |
| `/customer` | `app/customer/pages.jsx` | `Customer.jsx` | Listado de clientes registrados. |
| `/customer/create` | `app/customer-create/pages.jsx` | `CustomerCreate.jsx` | Creación manual de clientes. |

---

## 🪝 Hooks reutilizables

- **`useFetch(url)`** → Obtiene datos de una URL y mantiene estado local (loading, error, data).
- **`useProductCreate`**, **`useCategoryCreate`**, **`useUserCreate`** → Encapsulan la lógica de envío `POST` hacia los microservicios REST, manejando validación, estado y redirección tras éxito.

Esto permite un desarrollo **DRY (Don’t Repeat Yourself)** y facilita el cambio futuro a un cliente HTTP más robusto (como Axios).

---

## 🔗 Integración con backend

- Los componentes consumen endpoints REST que devuelven **JSON normalizado**.  
- Los valores booleanos se transforman correctamente (`"true"` → `true`) para evitar errores de tipado.
- Las acciones de **activar/desactivar** usan peticiones `PATCH` y actualizan la vista tras confirmación.
- Las operaciones de creación (`POST`) muestran alertas de éxito y limpian el formulario o redirigen automáticamente al listado correspondiente.

---

## 🎨 Estilos y diseño

- Cada vista posee su propio archivo CSS en `components/functional/**`.
- El `layout` y el `sidebar` incluyen estilos compartidos para mantener coherencia visual.
- Diseño **responsive** con menú colapsable en dispositivos móviles.

---

## 🚀 Recomendaciones para escalar el proyecto

- Centralizar nuevos hooks y servicios dentro de `src/store` para mantener orden.
- Reemplazar recargas completas (`window.location.reload`) por actualizaciones de estado React.
- Implementar autenticación y protección de rutas (JWT o context API) en futuras versiones.
- Añadir manejo global de errores y notificaciones (por ejemplo, con un `ToastContext`).

---

## 🧠 Nota para contribuidores

Este README busca ofrecer una visión clara del **flujo de datos, la estructura modular** y las **convenciones internas** del proyecto.  
Si vas a contribuir, asegúrate de seguir las convenciones de nombres, mantener la coherencia de estilo y validar tus componentes con ESLint antes de hacer commit.

---

## 🧩 Recursos útiles

- [Documentación oficial de Vite](https://vitejs.dev/)
- [Guía de React Router](https://reactrouter.com/)
- [Buenas prácticas de React](https://react.dev/learn)
