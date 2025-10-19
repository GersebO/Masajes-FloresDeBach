# 🌿 Maraflores de Bach – Sitio Público

Aplicación desarrollada en **React + Vite** que implementa el sitio de cara al cliente para **Maraflores de Bach**.  
Su propósito es ofrecer una **navegación informativa**, formularios de **contacto y registro de usuarios**, y una integración inicial con los **servicios REST** del backend de clientes.

---

## ⚙️ Tecnologías principales

- **React 18** – Biblioteca principal para la interfaz de usuario.  
- **Vite** – Entorno de desarrollo rápido con recarga instantánea (HMR).  
- **React Router DOM** – Manejo de rutas y navegación entre páginas.  
- **Bootstrap 5** – Estilos globales y diseño responsive.  
- **ESLint** – Control de buenas prácticas y calidad del código.  
- **CSS modularizado** – Estilos individuales por componente.

---

## 🧭 Flujo general de la aplicación

1. **`src/main.jsx`** monta el componente raíz `App` dentro de `React.StrictMode` y registra los estilos globales de **Bootstrap** e internos.  
2. **`App.jsx`** envuelve el sitio dentro de `BrowserRouter`, renderizando la barra de navegación superior (`NavbarPages`) y el pie de página (`FooterPages`) de forma persistente.  
3. Cada ruta pública (`/`, `/AboutUs`, `/contact`, `/login`, `/register`, `/blogs`) apunta a un **page wrapper** en `src/app/**/pages.jsx`, el cual carga el componente funcional correspondiente dentro de `src/components/functional/**`.  
4. Los **componentes funcionales** renderizan el contenido específico, gestionan estados locales (formularios, validaciones) y se apoyan en utilidades compartidas (`src/utils`) y servicios (`src/store/services`).  

> El layout principal mantiene visibles el `NavbarPages` y el `FooterPages`, mientras que el `<Routes>` actualiza el contenido central dinámicamente.

---

## 📁 Estructura de carpetas destacada

```plaintext
app/
├── src/
│   ├── App.jsx               # Definición del router y layout global
│   ├── main.jsx              # Punto de entrada
│   ├── app/                  # Page wrappers que vinculan rutas con componentes funcionales
│   ├── assets/               # Imágenes y recursos estáticos
│   ├── components/
│   │   └── functional/       # Vistas con lógica y estilos específicos
│   ├── store/
│   │   └── services/         # Llamadas HTTP al backend (ej. clientes)
│   └── utils/                # Validadores y datos compartidos (regiones/comunas)
🌐 Rutas y pantallas
Ruta	Page wrapper	Componente principal	Descripción
/	app/home (inline en App.jsx)	—	Página principal con mensaje de bienvenida.
/AboutUs	app/about/pages.jsx	AboutUs.jsx	Presenta la historia, pilares y un llamado a la acción hacia los servicios.
/contact	app/contact/pages.jsx	Contact.jsx	Formulario controlado con validaciones y bloque informativo (mapa, redes).
/login	app/login/pages.jsx	Login.jsx	Maneja credenciales con validación local y llama a customerService.authenticate.
/register	app/register/pages.jsx	Register.jsx	Formulario extenso con selección dinámica de comunas y validaciones por campo.
/blogs	app/blog/pages.jsx	Blog.jsx	Listado de artículos informativos con tarjetas estilizadas.

Nota: Los wrappers de navbar y footer (app/navbar/pages.jsx, app/footer/pages.jsx) exponen directamente los componentes UI reutilizables para futuras variaciones.

🧮 Formularios y validaciones
Validadores reutilizables (src/utils/validators.js):
Centralizan expresiones regulares y funciones para RUN, nombres, correos y contraseñas. También formatean el RUN antes del envío al backend.

Datos maestros (src/utils/regionesData.js):
Contiene la lista de regiones y comunas chilenas, utilizada por el formulario de registro para poblar selectores dependientes.

Registro (Register.jsx):
Implementa reglas de validación por campo, marca inputs tocados para retroalimentación visual y normaliza datos antes de llamar a customerService.createCustomer.

Contacto (Contact.jsx):
Valida nombre, correo y mensaje mediante los helpers de validators. Actualmente imprime en consola, pero está preparado para integrarse con un endpoint real.

Login (Login.jsx):
Usa validaciones de correo y longitud mínima de contraseña, habilitando el botón solo cuando los datos son válidos. Llama a customerService.authenticate para autenticación.

🔗 Servicios y comunicación con backend
El servicio principal, src/store/services/customerService.js, encapsula todas las operaciones REST contra
http://localhost:8081/api/customers, incluyendo:

Creación de clientes (POST)

Verificación de email (GET)

Autenticación (POST /authenticate)

Consultas de listado o por ID (GET)

Cada método maneja errores de red o respuestas no exitosas, mostrando mensajes en consola y devolviendo estructuras predecibles.

Esta capa de servicios desacopla la lógica del frontend de los detalles del backend, lo que facilita pruebas y futuras migraciones (por ejemplo, hacia Axios o un sistema de tokens JWT).

🎨 Estilos y recursos
El proyecto importa Bootstrap globalmente desde main.jsx.

Cada componente funcional posee su propio archivo CSS (*.css) con clases semánticas y estilos aislados.

Los recursos visuales (imágenes del blog, íconos, fondos) se encuentran en src/assets/ o public/img/, accesibles mediante rutas relativas (/img/...).

🚀 Extensiones futuras
Conectar el formulario de contacto a un endpoint real.

Añadir indicadores de carga y alertas visuales (toasts, banners).

Implementar un contexto global o Redux para sesiones persistentes.

Agregar internacionalización (i18n) si el sitio se expande a otros idiomas.

🧠 Nota para contribuidores
Este documento sirve como guía rápida para nuevos desarrolladores que deseen comprender cómo fluye la información entre rutas, componentes y servicios dentro del sitio público.
Se recomienda seguir la estructura modular existente y validar los cambios con ESLint antes de realizar commits.